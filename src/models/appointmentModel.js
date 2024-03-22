import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    d_name: { type: String, ref: 'Doctor' }, // Details
    appoint_channel: { type: String, required: true },
    appoint_title: { type: String, required: true },
    p_name: { type: String, ref: 'Paitent' }, // Appointment Details
    ap_pid: { type: mongoose.Schema.Types.ObjectId, ref: 'Paitent' },
    walk_in_appoint: { type: Boolean, default: false },
    appoint_time: { type: String, enum : ['30 min slot','1 hr slot','2 hr slot'], required: true, default: '30 min slot' },
    appoint_date: { type: Date, required: true },
    appoint_type: { type: String, required: true, enum : ['abc','pqr','xyz'], default: 'abc' },
    bp: { type: Number, required: true },                                                 //Vital Info
    temp: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    spo2: { type: Number, required: true },
    pulse_rate: { type: Number, required: true },
    reason: { type: String, required: true },
    note_for_dr: { type: String, enum : ['lmn','jkl','asw'], default: 'lmn' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;