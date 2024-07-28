import React from "react";
import { GoSignOut } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { removeUsers } from "../../redux/bazarSlice";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    // localStorage.removeItem("userInfo");
    dipatch(removeUsers());
    toast.success("logout successflully");
    navigate("/login");
  };
  const dipatch = useDispatch();
  const userInfo = useSelector((state) => state.bazar.userInfo);

  return (
    <div className="bg-black  h-20  ">
      <div className="mx-10 px-20 border-b h-full flex justify-between items-center">
        <div className="text-5xl font-black text-white ">Logo.</div>
        {userInfo != null && (
          <ul className="text-white flex gap-10 text-2xl font-medium capitalize">
            <Link
              to="/dashboard"
              className="hover:text-slate-300 duration-100 "
            >
              Home
            </Link>
            <Link
              to="/employeelist"
              className="hover:text-slate-300 duration-100"
            >
              employee List
            </Link>
          </ul>
        )}
        <div className="flex gap-x-20">
          {userInfo != null && (
            <div>
              {" "}
              <h1 className="text-white font-extrabold text-3xl ">
                {userInfo.name}
              </h1>
              {/* <button></button> */}
            </div>
          )}
          {userInfo != null && (
            <Link
              to="/login"
              onClick={logout}
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              data-primary-reset="{}"
            >
              <GoSignOut className="text-2xl mr-3 font-bold" /> Sign Out
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
