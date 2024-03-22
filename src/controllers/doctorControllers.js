import Doctor from "../models/doctorModel.js";
import { body, validationResult } from 'express-validator'; // Import body and validationResult from express-validator

const createDoctorValidationRules = [
    body('d_name').trim().notEmpty().isAlpha().withMessage('Doctor name is required'),
];

async function createDoctorHandle(req,res) {
    // Get patient from frontend
    console.log(req.body);
    const { d_name } = req.body;
    // Validate doctor data
    await Promise.all(createDoctorValidationRules.map(validation => validation.run(req)));
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array() });
    }
    const existedDoctor = await Doctor.findOne({ d_name });
    if (existedDoctor) { 
        return res.status(409).json({ message: "Doctor with this d_name already exists." }); 
    }
    // Create a doctor object (newDoctor) - create entry in db
    try {
        const newDoctor = await Doctor.create({
            d_name,
        });
        console.log("new Patient: ", newDoctor);
        if(!newDoctor) {
            return res.status(500).json({ error: 'Doctor creation failed' });
        }
        // Return response
        return res.status(201).json({ message: "Doctor registered Successfully!" });
    } catch (error) {
        return res.status(400).json({ error: 'Server Error while creating a doctor ' + error });
    }
}

async function getDoctorById(req, res) {
    const dId = req.params.dId;
    try {
      const doctor = await Doctor.findById(dId);
      if (!doctor) return res.status(404).json({ error: "dcotor not found" });
      return res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: 'Server Error while getting a doctor', details: error.message });
    }
}

// Need to change
async function getAllDoctorsHandle(req,res) {
    try{
        // Fetch all doctors from the database
        const doctors = await Doctor.find();
        return res.status(200).json(doctors);
    }
    catch(error) {
        return res.status(500).json({ error: 'Server Error while getting all doctors', details: error.message });
    }
}

export {
    createDoctorHandle,
    getDoctorById,
    getAllDoctorsHandle,
};