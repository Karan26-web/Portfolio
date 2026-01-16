import emailjs from "@emailjs/browser";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      "YOUR_NEWSLETTER_TEMPLATE_ID",
      { subscriber_email: email },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus("Subscribed successfully!");
      setEmail("");
    })
    .catch(() => {
      setStatus("Something went wrong. Try again.");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Subscribe</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default Newsletter;
