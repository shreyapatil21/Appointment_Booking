import express from 'express';
import {
    createPatientHandle,
    getPatientById,
    getPatients
} from '../controllers/patientControllers.js';

const patientRoutes = express.Router();

// Route for registering a patient
patientRoutes.post('/register', createPatientHandle);
// Route for getting a patient by ID
patientRoutes.get('/:pId', getPatientById);
patientRoutes.get("/", getPatients); //

export default patientRoutes;

