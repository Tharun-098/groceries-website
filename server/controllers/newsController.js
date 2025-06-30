import Letter from "../models/letter.js";
export const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.json({ success: false, message: "Invalid email address." });
  }
  const trimmedEmail = email.trim().toLowerCase();
  
  try {
    const existing = await Letter.findOne({ email:trimmedEmail });
    if (existing) {
      return res.json({ success: false, message: "Email already subscribed." });
    }

    await Letter.create({ email:trimmedEmail });
    res.json({ success: true, message: "Subscribed successfully." });
  } catch (err) {
    res.json({ success: false, message: "Server error." });
  }
};
