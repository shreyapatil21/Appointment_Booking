import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  p_name: { type: String, required: true, trim: true},
  email: { type: String, required: false, unique: true, trim: true},
  avatar: {
    type: String,
    //required: true,
  },
  location: {type: String, required: false, trim: true},
  contact: {type: Number, require: true, trim: true},
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;