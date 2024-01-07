import React, { useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { ToastContainer, toast } from "react-toastify";

function ModalComponent() {
  const { user } = useUser();
  const email = user?.email;
  // console.log(email)
  const [apiName, setApiName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const data = { apiName, apiUrl, email };
  const [api, setApi] = useState("");
  const [loadingApi, setLoadingApi] = useState(false);
  // console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingApi(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(api + "/add-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api: apiUrl,
          api_name: apiName,
          user_email: email,
        }),
      });
      console.log(res.status);
      const json = await res.json();
      if (res.ok) {
        toast.success("Api added successfully!");
      } else {
        toast.error("Unknown Error");
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingApi(false);
  };

  return (
    <>
      <div className="modal flex w-max justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="bg-black rounded-lg h-max p-20">
          {/* form */}
          <h1 className="text-2xl font-bold">Add Api</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="mt-6 flex max-w-md gap-x-4 ">
                <input
                  id="api-name"
                  name="apiName"
                  type="text"
                  autoComplete="text"
                  required
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your Api Name"
                />
              </div>
              <div className="mt-3 flex max-w-md gap-x-4 ">
                <input
                  id="api-url"
                  name="apiUrl"
                  type="text"
                  autoComplete="text"
                  required
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your Api Url"
                />
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <input
                type="submit"
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalComponent;
