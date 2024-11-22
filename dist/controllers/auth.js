"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = exports.logout = exports.loginController = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validationSchema_1 = require("@/utils/validationSchema");
const logger_1 = __importDefault(require("@/utils/logger"));
const User_1 = __importDefault(require("@/db/schema/User"));
const config_1 = __importDefault(require("@/config"));
const Session_1 = __importDefault(require("@/db/schema/Session"));
const zod_1 = require("zod");
const register = async (req, res) => {
    try {
        const validatedData = validationSchema_1.registerSchema.parse(req.body);
        const exisitngUser = await User_1.default.findOne({ email: validatedData.email });
        if (exisitngUser) {
            logger_1.default.error("User Alreaddy exits");
            return res.status(400).json({ message: "User already exits" });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(validatedData.password, salt);
        const newUser = await new User_1.default({
            username: validatedData.username,
            email: validatedData.email,
            hashedPassword,
        });
        const newProfile = new Profile({
            user_id: newUser._id,
            name: newUser.username,
            email: newUser.email,
        });
        const user = await newUser.save();
        await newProfile.save();
        const accessToken = jsonwebtoken_1.default.sign({ userId: newUser._id }, config_1.default.accessTokenSecret, { expiresIn: config_1.default.accessTokenExpiry });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: newUser._id }, config_1.default.refreshTokenSecret, { expiresIn: config_1.default.refreshTokenExpiry });
        const session = new Session_1.default({ userId: newUser._id, refreshToken });
        logger_1.default.silly("User created Successfully");
        res.status(200).json({
            message: "User created successfully",
            session: { refreshToken: session.refreshToken, accessToken: accessToken },
            user: Object.assign({}, newProfile._doc),
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in singup:", error.errors);
            res.status(400).json({ errors: error.errors, message: error.message });
        }
        else {
            logger_1.default.error("Error in login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.register = register;
const loginController = async (req, res) => {
    try {
        const validatedData = validationSchema_1.loginSchema.parse(req.body);
        const user = await User_1.default.findOne({ email: validatedData.email });
        if (!user) {
            logger_1.default.error("User does not exits");
            return res.status(400).json({ message: "User does not exits" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(validatedData.password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.default.accessTokenSecret, { expiresIn: config_1.default.accessTokenExpiry });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.default.refreshTokenSecret, { expiresIn: config_1.default.refreshTokenExpiry });
        const session = new Session_1.default({ userId: user._id, refreshToken });
        res.status(200).json({
            message: "Login successful",
            session: {
                refreshToken: session.refreshToken,
                accessToken: accessToken,
            },
            user: { email: user.email, username: user.username },
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in login:", error.errors);
            res.status(400).json({ errors: error.errors });
        }
        else {
            logger_1.default.error("Error in login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.loginController = loginController;
const logout = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        await Session_1.default.findOneAndDelete({ refreshToken });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        logger_1.default.error("Error in logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.logout = logout;
const refreshTokenController = async (req, res) => {
    try {
        const { refreshToken } = validationSchema_1.refreshTokenSchema.parse(req.body);
        const session = await Session_1.default.findOne({ refreshToken });
        if (!session) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        jsonwebtoken_1.default.verify(refreshToken, config_1.default.refreshTokenSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
            const payload = decoded;
            if (!payload.userId) {
                return res.status(403).json({ message: "Invalid token payload" });
            }
            const accessToken = jsonwebtoken_1.default.sign({ userId: payload.userId }, config_1.default.accessTokenSecret, { expiresIn: config_1.default.accessTokenExpiry });
            res.json({ accessToken });
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in refreshToken:", error.errors);
            res.status(400).json({ errors: error.errors });
        }
        else {
            logger_1.default.error("Error in refreshToken:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=auth.js.map