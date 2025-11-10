import React from "react";
import { useLoaderData } from "react-router";

const AllUsers = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="grid grid-cols-3 justify-center items-center gap-5 my-5">
      {data.map((user) => (
        <div className="card bg-base-100 shadow-sm mt-4">
          <figure className="px-10 pt-10">
            <img className="h-[380px] w-[320px]" src={user.profileimage} />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-center gap-4">
              <div>
                <h1>{user.name}</h1>
              </div>
              <div>{user.location}</div>
            </div>
            <h2 className="card-title">{user.subject}</h2>
            <div className="flex justify-between items-center">
              <div>{user.availabilityTime}</div>
              <div className="text-green-500">{user.studyMode}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>{user.rating} out of 5</div>
              <div>{user.experienceLevel}</div>
            </div>
            <div className="card-actions">
              <button className="btn btn-primary text-center w-full">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
