const asyncHandler = require("express-async-handler");
const Employee = require("../model/employeeModel");
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobile, gender, course, pic, designation } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userExists = await Employee.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "User already exists" });
  }
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "Invalid Email" });
  }
  const regexPattern = /^\d{10}$/;
  // console.log(!regexPattern.test(mobile));

  if (!regexPattern.test(mobile)) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "Invalid Mobile Number" });
  }
  if (!name || !email || !mobile || !gender || !designation || !course) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "please fill all the fields" });
  } else {
    const note = new Employee({
      user: req.user._id,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      pic,
    });
    const createdNote = await note.save();
    res.status(200).json({ Status: "SUCCESS", message: "super", createdNote });
  }
});
const getEmployee = asyncHandler(async (req, res) => {
  const notes = await Employee.find({ user: req.user.id });
  res.json(notes);
});
const updateEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobile, gender, course, pic, designation } = req.body;

  if (!name || !email || !mobile || !gender || !course) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "please fill all the fields" });
  }
  const note = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (note) {
    res.status(200).json({ Status: "SUCCESS", data: note });
  } else {
    res
      .status(400)
      .json({ Status: "INVALID", message: "note not found update user" });
  }
});
const deleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deltedNote = await Employee.findByIdAndDelete(id);
  if (deltedNote) {
    res
      .status(200)
      .json({ Status: "SUCCESS", message: "deleted Successfully" });
  } else {
    res.status(400).json({ Status: "INVALID", message: "can't delete" });
  }
});
module.exports = {
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
