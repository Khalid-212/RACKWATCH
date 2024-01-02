import React, { useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";


function ModalComponent() {
  const { user } = useUser();
  const email = user?.email;
  console.log(email)
  const [apiName, setApiName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const data = { apiName, apiUrl, email };
  console.log(data)

  const addApi = async () => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3232/api", {
        method: "POST",
        body: JSON.stringify({
          api_name: apiName,
          api: apiUrl,
          email: user,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response status is OK (200)
      if (!res.ok) {
        throw new Error(`HTTP error! Status is: ${res.status}`);
      }

      // Check if the response content type is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.");
      }

      // Parse the JSON response
      const data = await res.json();
      console.log("Data from the server:", data);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error or display an error message
    }
  };

  return (
    <div className="modal flex  w-max justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="bg-black rounded-lg h-max p-20">
        {/* form */}
        <h1 className="text-2xl font-bold">Add Api</h1>
        <form>
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
            <button onClick={addApi} className="bg-white text-black px-4 py-2 rounded-md">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalComponent;
