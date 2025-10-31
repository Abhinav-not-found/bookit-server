import Experience from "../model/experience.model.js";
import Booking from "../model/booking.model.js";

export const getExp = async (req, res, next) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    next(err)
  }
};
export const getExpDetails = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.json(experience);
  } catch (err) {
    next(err)
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { experienceId, name, email, date, time, totalPrice } = req.body;

    const existingBooking = await Booking.findOne({ experienceId, date, time });
    if (existingBooking)
      return res.status(400).json({ message: "Slot already booked" });

    const booking = new Booking({
      experienceId,
      name,
      email,
      date,
      time,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    next(err)
  }
};

export const validatePromo = async (req, res, next) => {
  try {
    const { code } = req.body;
    const promos = {
      SAVE10: 0.1,
      FLAT100: 100,
    };

    if (!promos[code])
      return res.status(400).json({ valid: false, message: "Invalid promo code" });

    res.json({ valid: true, discount: promos[code] });
  } catch (err) {
    next(err)
  }
};
