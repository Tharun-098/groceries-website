import Letter from "../models/letter.js";
export const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.json({ success: false, message: "Invalid email address." });
  }

  try {
    const existing = await Letter.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email already subscribed." });
    }

    await Letter.create({ email });
    res.json({ success: true, message: "Subscribed successfully." });
  } catch (err) {
    res.json({ success: false, message: "Server error." });
  }
};
