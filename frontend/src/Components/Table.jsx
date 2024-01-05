import React, { useEffect, useState } from "react";
import TableRow from "@/components/TableRow";

function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3232/all-responses");
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
  // console.log(data);
  return (
    <>
      <div class="mt-10 h-80 overflow-auto mb-5 relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gradient-to-tr shadow-sm shadow-orange-800/40 dark:from-black dark:to-stone-900/30">
            <tr>
              <th scope="col" class="-4 px-6 py-3">
                Id
              </th>
              <th scope="col" class="px-6 py-3">
                Api
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                TimeStamp
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div>Loading...</div>
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
            {/* <TableRow 
            name={"name"}
            link={"link"}
            status={"active"}
            timeStamp={"01-22-12"}
           /> */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
