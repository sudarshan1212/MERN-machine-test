import React, { useState } from "react";
import useFetchdata from "../../hooks/userFetchData";
import { BASE_URL } from "../../config";
import { LuSearch } from "react-icons/lu";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import EditEmployee from "../components/EditEmployee";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

const EmployeeList = () => {
  const { data, loading } = useFetchdata(`${BASE_URL}/api/employee`);
  const [popUp, setPopUp] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [exsistData, setExsistData] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const userInfo = useSelector((state) => state.bazar.userInfo);
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };
  console.log(data);
  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const parseDate = (dateString) => new Date(dateString);
  const filteredData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchField.toLowerCase()) ||
        item.email.toLowerCase().includes(searchField.toLowerCase())
      // item.id.toString().includes(searchField.toLowerCase())
      // item.date.includes(searchField.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return parseDate(a.date) - parseDate(b.date);
      } else if (a[sortBy] < b[sortBy]) {
        return -1;
      } else if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Short month name (e.g., "Feb")
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

    return `${day}-${month}-${year}`;
  };

  const getData = (data) => {
    setPopUp(true);
    // console.log(data);
    setExsistData(data);
  };

  const deleteFile = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.delete(
          `${BASE_URL}/api/employee/${id}`,
          config
        );
        toast.success(data.message);
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };
  const handlePopupClose = () => {
    setPopUp(false);
  };
  return (
    <div className="bg-[#141414] h-screen ">
      <div className=" mx-10 w-ful">
        <div className="flex pt-5 justify-between items-center">
          <div className=" flex gap-28 justify-center items-center">
            <h1 className="text-white text-2xl font-medium">
              Total Length : {data.length}
            </h1>
            <Link
              to="/createemployee"
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-green-500 rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#141414]"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-green-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Create Employee
              </span>
            </Link>
          </div>
          <div className=" bg-white flex items-center gap-5 justify-center rounded-xl px-5 w-auto py-2">
            <div className="mb-">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full mx-2 px-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="id">Sort by ID</option>
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>
            <LuSearch className="text-black text-2xl " />

            <input
              type="text"
              value={searchField}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full py-2 pl-4   rounded-lg shadow-sm focus:outline-none "
            />
          </div>
        </div>
        <div className="container mx-auto  pt-10 ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black ">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Unique ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user._id.slice(0, 4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      // src={user.pic}
                      src={
                        user.pic == null
                          ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          : user.pic
                      }
                      // alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.course.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {}
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-10">
                    <button
                      type="button"
                      onClick={() => getData(user)}
                      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteFile(user._id)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {popUp && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center  z-30">
          <div className="max-w-3xl bg-white p-10 rounded-3xl relative  shadow-mg">
            <IoClose
              onClick={() => setPopUp(false)}
              className="w-10 h-10 hover:rotate-90 duration-150 absolute right-5 top-5 mb-10  delay-75"
            />
            <EditEmployee
              className="pt-10"
              existingData={exsistData}
              setPopUp={handlePopupClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
