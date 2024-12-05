import React from "react";
import "../styles/Feedback.css";

const Feedback = () => {
  return (
    <div className="feedback-wrapper">
        <div className="feedback-form-container">
            <h2 className="feedback-header">Feedback Form</h2>

            <form className="feedback-form">
                <label htmlFor="name">Name:</label>
                <input type="text" className="name" name="name" placeholder="Enter Name"/>

                <label htmlFor="email">Email:</label>
                <input type="text" className="feedback-email" name="email" placeholder="Enter email"/>

                <label htmlFor="subject">Subject:</label>
                <input type="text" className="subject" name="subject" placeholder="Enter subject"/>

                <label htmlFor="message">Message:</label>
                <textarea className="message" name="message" placeholder="Enter message" style={{ height: "200px" }}></textarea>

                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
   
  );
};

export default Feedback;
