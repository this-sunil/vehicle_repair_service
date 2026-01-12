import express from "express";
import upload from "../middleware/upload.js";
import { addSettingController, deleteSettingController, fetchSettingController, updateSettingController } from "../controller/settingController.js";
const router=express.Router();
router.post("/addSetting",upload.single('photo'),addSettingController);
router.post("/updateSetting",upload.single('photo'),updateSettingController);
router.delete("/deleteSetting",upload.none(),deleteSettingController);
router.post("/fetchSetting",upload.none(),fetchSettingController);
export default router;