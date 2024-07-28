import GridLoader from "react-spinners/GridLoader";

const Loading = () => {
  return (
    <div className=" flex items-center justify-center w-full h-full">
      <GridLoader color="#ffffff" />
    </div>
  );
};

export default Loading;
