// appointmentRoutes.js
import express from 'express';
import {
    createAppointmentHandle
} from '../controllers/appointmentControllers.js';

const appointmentRoutes = express.Router();

appointmentRoutes.route('/').post(createAppointmentHandle);

export default appointmentRoutes;
