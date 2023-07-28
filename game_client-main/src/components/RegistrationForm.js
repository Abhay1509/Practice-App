// RegistrationForm.js
import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration success
        setRegistrationMessage("Registration successful!");
        console.log("User data:", data.data);
      } else {
        // Registration error
        setRegistrationMessage(
          `Registration failed: ${data.data.errorMessage}`
        );
        console.error("Registration failed:", data.data.errorMessage);
      }
    } catch (error) {
      // Network or server error
      setRegistrationMessage("Error occurred: Please try again later.");
      console.error("Error occurred:", error.message);
    }
  };

  return (
    <div className="registration-container">
      <h1>User Registration</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
