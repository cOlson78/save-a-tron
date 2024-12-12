import { useState } from "react";
import "../styles/Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Feedback sent successfully!");
      } else {
        alert("Failed to send feedback.");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      alert("Error sending feedback.");
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-form-container">
        <h2 className="feedback-header">Feedback Form</h2>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="feedback-email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            className="subject"
            name="subject"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <label htmlFor="message">Message:</label>
          <textarea
            className="message"
            name="message"
            placeholder="Enter message"
            style={{ height: "200px" }}
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Feedback;