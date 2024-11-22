"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const Profile_1 = __importDefault(require("@/db/schema/Profile"));
const validationSchema_1 = require("@/utils/validationSchema");
const zod_1 = require("zod");
const getProfile = async (req, res) => {
    try {
        console.log(req.user);
        const profile = await Profile_1.default.findOne({ user_id: req.user });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const validatedData = validationSchema_1.profileValidationSchema.parse(req.body);
        console.log("🚀 ~ validatedData:", validatedData);
        const profile = await Profile_1.default.findOneAndUpdate({ user_id: req.user }, Object.assign(Object.assign({}, validatedData), { jobTitle: validatedData.jobtitle }), { new: true, runValidators: true });
        console.log("🚀 ~ profile:", profile);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ errors: error.errors, message: error.message });
        }
        else {
            res.status(500).json({ message: "Error updating profile" });
        }
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=profile.js.map