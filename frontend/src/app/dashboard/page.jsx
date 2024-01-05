"use client";

import React, { use, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ModalComponent from "@/components/ModalComponent";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/components/Table";

function Dashboard() {
  const { user, error, isLoading } = useUser();
  const email = user?.email;
  console.log(email);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  // get user apis
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3232/apis", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const json = await res.json();
      setApis(json);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data");
  console.log(apis);

  if (isLoading)
    return (
      <div className="h-screen w-full grid place-items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Header image={true} />
      <ToastContainer />
      {user ? (
        <div className="w-8/12 m-auto">
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
          <div className="flex justify-between flex-wrap w-full">
            {apis.length > 0 ? (
              apis.map((item) => (
                <Card
                  key={item.id}
                  link={item.api}
                  name={item.api_name}
                  status={item.status}
                />
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-96">
                <h1 className="text-2xl font-bold">No APIs added yet!</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        location.replace("/api/auth/login")
      )}
      <div className="w-10/12 m-auto">
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;
