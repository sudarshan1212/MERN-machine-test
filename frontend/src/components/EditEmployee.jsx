import React, { useState } from "react";
import { BASE_URL } from "../../config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const EditEmployee = ({ existingData = {}, setPopUp }) => {
  console.log(existingData);
  const [formData, setFormData] = useState({
    name: existingData.name || "",
    email: existingData.email || "",
    mobile: existingData.mobile || "",
    designation: existingData.designation || "",
    gender: existingData.gender || "",
    courses: existingData.course || [],
    file: existingData.pic,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      const file = files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setFormData((prevData) => ({ ...prevData, file }));
      } else {
        alert("Please upload a .jpg or .png file");
        e.target.value = ""; // Clear the input field
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const userInfo = useSelector((state) => state.bazar.userInfo);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "file" && formData.file) {
        data.append("file", formData.file);
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => data.append("courses[]", item));
      } else {
        data.append(key, formData[key]);
      }
    });
    let id = existingData._id;
    try {
      // console.log(userInfo.token);

      const config = {
        "content-type": "application/json",

        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/employee/${id}`,
        {
          name: formData.name,
          designation: formData.designation,
          email: formData.email,
          mobile: formData.mobile,
          gender: formData.gender,
          course: formData.courses, // Ensure correct naming here
          pic: formData.file,
        }, // Ensure consistent naming here },
        config
      );
      toast.success(data.Status);
      setPopUp(false);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      {/* Mobile No Input */}
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium">
          Mobile No
        </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        />
      </div>

      {/* Designation Dropdown */}
      <div>
        <label htmlFor="designation" className="block text-sm font-medium">
          Designation
        </label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          required
        >
          <option value="">Select a designation</option>
          <option value="developer">Developer</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {/* Gender Radio Buttons */}
      <fieldset>
        <legend className="block text-sm font-medium">Gender</legend>
        <div className="mt-2 space-y-2 flex items-center gap-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              className="form-radio text-black"
              required
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              className="form-radio text-black"
              required
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
      </fieldset>

      {/* Courses Checkboxes */}
      <fieldset>
        <legend className="block text-sm font-medium">Courses</legend>
        <div className="mt-2 flex items-center gap-2">
          <label className="items-center">
            <input
              type="checkbox"
              name="courses"
              value="MCA"
              checked={formData.courses.includes("MCA")}
              onChange={handleChange}
              className="form-checkbox text-black"
            />
            <span className="ml-2">MCA</span>
          </label>
          <label className="items-center">
            <input
              type="checkbox"
              name="courses"
              value="BCA"
              checked={formData.courses.includes("BCA")}
              onChange={handleChange}
              className="form-checkbox text-black"
            />
            <span className="ml-2">BCA</span>
          </label>
          <label className="items-center">
            <input
              type="checkbox"
              name="courses"
              value="BSC"
              checked={formData.courses.includes("BSC")}
              onChange={handleChange}
              className="form-checkbox text-black"
            />
            <span className="ml-2">BSC</span>
          </label>
        </div>
      </fieldset>

      {/* File Upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium">
          Upload Image
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleChange}
          accept=".jpg,.jpeg,.png"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white rounded-md shadow-sm hover:bg-gray-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditEmployee;
