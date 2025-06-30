import Letter from "../models/letter.js";
import { sendEmail } from "../utils/nodemailer.js";
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
    await sendEmail(
      email,
      "Welcome to Our Newsletter!",
      "Thanks for subscribing to our newsletter. Stay tuned for updates, deals, and offers!"
    );
    res.json({ success: true, message: "Subscribed successfully." });
  } catch (err) {
    res.json({ success: false, message: "Server error." });
  }
};
