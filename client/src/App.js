import React, { useState } from "react";
import "./App.css";

const UserApp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    address: "",
    nationality: "",
    educationBackground: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit form data to API
    try {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      if (data.statusCode === 201) {
        alert("User created successfully!");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Firstname is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Lastname is required";
    }
    if (!formData.dob.trim()) {
      errors.dob = "Dob is required";
    }
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumer = "Mobile number is required";
    }
    return errors;
  };

  return (
    <div>
      <h1>User App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Firstname:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {<span className="error">{errors.firstName}</span>}
          </div>
          <div>
            <label>Lastname:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {<span className="error">{errors.lastName}</span>}
          </div>
          <div>
            <label>email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {<span className="error">{errors.email}</span>}
          </div>

          <div>
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            {<span className="error">{errors.mobileNumber}</span>}
          </div>
          <div>
            <label>Date of birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {<span className="error">{errors.dob}</span>}
          </div>

          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            {<span className="error">{errors.gender}</span>}
          </div>
          <div>
            <label>address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {<span className="error">{errors.address}</span>}
          </div>
          <div>
            <label>Nationality:</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
            {<span className="error">{errors.nationality}</span>}
          </div>
          <div>
            <label for="educationBackground">Education Background</label>
            <select name="educationBackground" onChange={handleChange}>
              <option value="HIGH_SCHOOL">HIGH_SCHOOL</option>
              <option value="DIPLOMA">DIPLOMA</option>
              <option value="BACHELOR_DEGREE">BACHELOR_DEGREE</option>
            </select>
          </div>
          <div>
            <label for="contact">Contact</label>
            <select name="contact" onChange={handleChange}>
              <option value="EMAIL">EMAIL</option>
              <option value="PHONE">PHONE</option>
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserApp;
