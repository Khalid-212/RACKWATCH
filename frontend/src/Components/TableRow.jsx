import React from "react";

function TableRow({ name, link, status, timeStamp }) {
  return (
    <>
      <tr className="">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="ps-3">
            <div className="text-base font-semibold truncate">{name}</div>
          </div>
        </th>
        <td className="px-6 py-4 truncate text-ellipsis">{link}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full me-2 ${
                status == "200" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            {status}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{timeStamp}</td>
      </tr>
    </>
  );
}
export default TableRow;
