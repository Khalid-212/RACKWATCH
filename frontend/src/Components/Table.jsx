import React, { useEffect, useState } from "react";
import TableRow from "@/components/TableRow";
import { useUser } from "@auth0/nextjs-auth0/client";

function Table() {
  const { user, error, isLoading } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(api + "/user-api-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="mt-10 h-80 overflow-auto mb-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 z-10 w-full text-xs text-gray-700 uppercase bg-gradient-to-tr bg-black shadow-sm shadow-orange-800/40 dark:from-black dark:to-stone-900/30">
            <tr>
              <th scope="col" className="-4 px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Api
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                TimeStamp
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div>Loading...</div>
            ) : (data.length === 0) & (isLoading === false) ? (
              <div>No data</div>
            ) : (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  name={item.id}
                  link={item.api}
                  status={item.status}
                  timeStamp={item.timestamp}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
