import { body, validationResult } from 'express-validator'; // Import body and validationResult from express-validator
import Patient from '../models/patientModel.js'; // Import the Patient model

const createPatientValidationRules = [
    body('p_name').trim().notEmpty().isAlpha().withMessage('Patient name is required'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('contact').trim().isLength({ min: 10 }).withMessage('Contact must be at least 10 characters long'),
    body('location').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Location is required'),
];

async function createPatientHandle(req, res) {
    console.log(req.body); // Logging the request body
    const { p_name, email, location, contact } = req.body;
    await Promise.all(createPatientValidationRules.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const existedPatient = await Patient.findOne({
        $or: [{ p_name }, { email }]
    });
    if (existedPatient) { 
        return res.status(409).json({ message: "Patient with this p_name or email already exists." }); 
    }
    try {
        const newPatient = await Patient.create({
            p_name,
            email,
            location,
            contact
        });
        console.log("New Patient: ", newPatient);
        if (!newPatient) {
            return res.status(500).json({ error: 'Patient creation failed' });
        }
        return res.status(201).json({ message: "Patient registered successfully!" });
    } catch (error) {
        return res.status(400).json({ error: 'Server Error while creating a patient ' + error });
    }
}

async function getPatientById(req, res) {
    const pid = req.params.pId;
    try {
        const patient = await Patient.findById(pid);
        if (!patient) return res.status(404).json({ error: "Patient not found" });
        return res.json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error while getting patient' });
    }
}

export {
    createPatientHandle,
    getPatientById,
};
