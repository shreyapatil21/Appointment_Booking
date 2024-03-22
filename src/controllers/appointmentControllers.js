// appointmentController.js
import Appointment from '../models/appointmentModel.js';

async function createAppointmentHandle(req, res) {
    const body = req.body;
    if (
        !body || 
        !body.d_name ||
        !body.appoint_channel || 
        !body.appoint_title || 
        !body.p_name ||
        !body.ap_pid ||
        !body.appoint_date ||
        !body.appoint_type ||
        !body.appoint_time ||
        !body.bp ||
        !body.temp ||
        !body.height ||
        !body.weight ||
        !body.spo2 ||
        !body.pulse_rate ||
        !body.reason
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const appointmentData = req.body;
        const newAppointment = await Appointment.create( appointmentData );
        if(!newAppointment) {
            res.status(201).json({ message: 'Error while creating Appointment' });
        }
        res.status(201).json({ message: 'Success! New appointment created' });
    } catch (error) {
      res.status(400).json({ error: 'Server Error while creating Appointment' + error });
    }
}

export {
    createAppointmentHandle,
};