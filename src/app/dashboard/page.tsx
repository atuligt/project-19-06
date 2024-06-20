"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";


const page = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();

  const [number, setnumber] = useState();
 const [logout, setlogout] = useState(false);


  const router = useRouter();

  const getData = async () => {
    try {
        const token = localStorage.getItem("token");
        console.log(localStorage.getItem("token"));
      const response = await axios.get("http://localhost:1000/fetch-user", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (response.data.name === "TokenExpiredError" || response.data.name == "JsonWebTokenError") {
        return router.push("/login");
      }

        setlogout(true);
        console.log(response);
        const data = response.data;
        setname(data.name);
        setemail(data.email);
        setnumber(data.phone);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header token={logout}/>
      <div className="dashboard h-[100vh] bg-[#9f9a9a]">
        <div className="inner-dashboard flex items-center justify-center h-full">
          <div className="dashboard-box bg-black p-10 rounded-lg w-[500px]">
            <div className="">
              <h4 className="text-white text-xl">User Details</h4>
            </div>

            <div className="w-full pt-5">
              <div className="mt-6">
                <p className="text-white">
                  User Name : <span className="font-thin">{name}</span>
                </p>
              </div>
              <div className="mt-6">
                <p className="text-white">
                  User email : <span className="font-thin">{email}</span>
                </p>
              </div>
              <div className="mt-6">
                <p className="text-white">
                  Phone Number : <span className="font-thin">{number}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
