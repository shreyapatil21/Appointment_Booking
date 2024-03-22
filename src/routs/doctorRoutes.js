import express from 'express';
import { 
    createDoctorHandle,
    getDoctorById,
    getAllDoctorsHandle
} from '../controllers/doctorControllers.js';

const doctorRoutes = express.Router();

// Direct Routes for register

doctorRoutes.post('/register', createDoctorHandle );
doctorRoutes.get('/appointment', getAllDoctorsHandle );
doctorRoutes.get('/', getDoctorById );

export default doctorRoutes;