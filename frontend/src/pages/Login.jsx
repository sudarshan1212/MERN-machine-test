import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../../redux/bazarSlice";
import Loading from "../components/Loading";
export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    loginFailed: false,
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.bazar.isAuthenticated);
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === "" || formData.password === "") {
      setErrors({ loginFailed: true });
      return;
    }

    let userName = formData.username;
    let password = formData.password;
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/",
        {
          userName,
          password,
        },
        config
      );
      setLoading(false);
      toast.success("sucess");

      // const da = await data;
      dispatch(
        addUsers({
          id: data.data._id,
          name: data.data.name,
          token: data.data.token,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
      // console.log(err);
    }

    // Clear error state if login is successful
    setErrors({ loginFailed: false });
  };
  return (
    <div className="bg-black h-screen">
      <div className="mx-auto max-w-screen-lg ">
        {" "}
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-full max-w-sm p-8 bg-[#141414] rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center text-white mb-6">
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-lg font-medium text-white mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-white mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.loginFailed && (
                  <p className="mt-2 text-sm text-red-600">
                    Login failed. Please check your credentials.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {loading ? <Loading /> : "login"}
              </button>
              <p className="text-center mt-4 text-sm text-gray-100">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-white font-medium hover:underline"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
