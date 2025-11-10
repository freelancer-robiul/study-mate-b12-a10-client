import React from "react";
import AllUsers from "../../Components/AllUsers";

const Home = () => {
  return (
    <div className="my-10">
      <div>
        <h1>This slider area</h1>
      </div>
      <div className="mt-7 grid grid-cols-3 items-center justify-center gap-5">
        <AllUsers></AllUsers>
      </div>
    </div>
  );
};

export default Home;
