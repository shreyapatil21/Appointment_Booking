import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  d_name: { type: String, unique: true, required: true, trim: true},
});


const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;