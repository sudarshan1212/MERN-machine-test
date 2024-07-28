import React, { useState } from "react";
import uplaodImageToCloudinary from "../utils/uploadCloudinary";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    file: "", // Ensure consistency here
  });
  const navigate = useNavigate();

  const handleFileInputChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const data = await uplaodImageToCloudinary(file); // Ensure the function is correctly defined

    setFormData((prevData) => ({
      ...prevData,
      file: data.url, // Ensure consistent naming here
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      handleFileInputChange(e);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const userInfo = useSelector((state) => state.bazar.userInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log(formData.name, formData.email);
      const { data } = await axios.post(
        `${BASE_URL}/api/employee/create`,
        {
          // user: userInfo.id,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          gender: formData.gender,
          designation: formData.designation,
          course: formData.courses, // Ensure correct naming here
          pic: formData.file, // Ensure consistent naming here
        },
        config
      );

      toast.success(data.Status);
      navigate("/employeelist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.log(err.response?.data);
    }
  };
  return (
    <section className="bg-[#141414] py-5">
      <div className="p-6 max-w-lg mx-auto bg-white text-balck shadow-md rounded-lg  ">
        <h2 className="text-xl font-bold mb-4">Registration Form</h2>
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
              <option value="developer">HR</option>
              <option value="designer">Sales</option>
              <option value="manager">Manager</option>
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
                <span className="ml-2">Male</span>2
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
            <div className="mt-2 s flex items-center gap-2 ">
              <label className=" items-center">
                <input
                  type="checkbox"
                  name="MCA"
                  value="MCA"
                  checked={formData.courses.includes("MCA")}
                  onChange={handleChange}
                  className="form-checkbox text-black"
                />
                <span className="ml-2">MCA</span>
              </label>
              <label className=" items-center">
                <input
                  type="checkbox"
                  name="BCA"
                  value="BCA"
                  checked={formData.courses.includes("BCA")}
                  onChange={handleChange}
                  className="form-checkbox text-black"
                />
                <span className="ml-2">BCA</span>
              </label>
              <label className=" items-center">
                <input
                  type="checkbox"
                  name="BSC"
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
              onChange={handleFileInputChange}
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
      </div>
    </section>
  );
};

export default EmployeeCreate;
