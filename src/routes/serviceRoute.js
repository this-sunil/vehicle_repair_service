import express from "express";
import upload from "../middleware/upload.js";
import { addServiceController, deleteVehicleController, getAllVehicleServiceController, updateServiceController } from "../controller/servicesController.js";
const router=express.Router();
router.post("/addService",upload.single('photo'),addServiceController);
router.put("/updateService",upload.single('photo'),updateServiceController);
router.post("/deleteService",upload.none(),deleteVehicleController);
router.post("/getAllVehicle",upload.none(),getAllVehicleServiceController);
export default router;