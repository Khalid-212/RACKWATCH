'use client';

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ModalComponent from "@/components/ModalComponent";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/components/Table";

function Dashboard() {
  const { user, error, isLoading } = useUser();
  const email = user?.email;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${api}/userapis`, {
        method: "POST",
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
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [email]);

  if (isLoading) {
    return (
      <div className="h-screen w-full grid place-items-center">
        <div role="status">{/* Your loading spinner or message */}</div>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Header image={true} />
      <ToastContainer />

      {user ? (
        <div className="w-11/12 mx-auto md:w-10/12 lg:w-8/12 xl:w-7/12">
          <div className="flex flex-col mt-5 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold md:text-4xl">Dashboard</h1>
            <button
              className="btn-header mt-3 md:mt-0 cursor-pointer font-bold px-4 md:px-8 py-2.5 rounded-xl bg-white text-black border-stone-100 dark:border-stone-700 hover:dark:text-black border w-full md:w-auto hover:bg-stone-100 dark:hover:bg-stone-700"
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
          </div>
          <div className="flex flex-wrap justify-between w-full">
            {loading ? (
              <div className="flex justify-center items-center w-full h-96">
                <h1 className="text-2xl font-bold">Loading...</h1>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      ) : (
        location.replace("/api/auth/login")
      )}

      <div className="w-11/12 mx-auto md:w-10/12 lg:w-8/12 xl:w-7/12 mt-8">
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;
