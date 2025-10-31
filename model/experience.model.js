import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  price: Number,
  images: [String],
  availableSlots: [
    {
      date: String,
      time: String,
      isBooked: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("Experience", experienceSchema);
