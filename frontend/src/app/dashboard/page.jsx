"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ModalComponent from "@/components/ModalComponent";
import Modal from "react-modal";

function Dashboard() {
  const { user, error, isLoading } = useUser();
  const email = user?.email;
  console.log(email)
  const createUser = async () => {
    try {
      const res = await fetch("http://localhost:3232/user", {
        method: "POST",
        body: JSON.stringify({
          email: "neww@email.com",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response status is OK (200)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Check if the response content type is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.");
      }

      // Parse the JSON response
      const data = await res.json();
      console.log(data);
      if (data == "user exists") {
        localStorage.setItem("user", email);
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error or display an error message
    }
  };
  // get all apis
  const [apis, setApis] = useState([]);
  const getApis = async () => {
    try {
      const res = await fetch("http://localhost:3232/apis", {
        method: "GET",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => console.log(response.json()));
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error or display an error message
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  function closeModal() {
    setIsOpen(!modalIsOpen);
  }
  const apilist=[]
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      createUser();
      getApis(user);
    }
  }, [apilist.length, createUser, getApis, user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Header image={true} />
      {user ? (
        <div className="w-7/12 m-auto">
          <div className="flex mt-5 mb-5">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <button
              className="btn-header mr-2 m-auto cursor-pointer font-bold px-4 md:px-[25px] py-2.5 rounded-xl bg-white text-black  border-stone-100 dark:border-stone-700 hover:dark:text-black  border w-max"
              onClick={toggleModal}
            >
              Add Api
            </button>
            {modalIsOpen && (
              <div className="modalWrapper">
                <button className="btn-wrapper" onClick={toggleModal}>
                  X
                </button>
                <ModalComponent />
              </div>
            )}
            <div></div>
          </div>
          <div className="flex justify-between">
            <div className="w-80">
              <Card
                link={"https://rtm-survey-web.vercel.app/s/rtm-survey_web"}
                name={"RTM Survey"}
                status={"Active"}
              />
            </div>
          </div>
        </div>
      ) : (
        location.replace("/api/auth/login")
      )}
    </div>
  );
}

export default Dashboard;
