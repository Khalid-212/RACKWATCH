import React from "react";

function TableRow({ name, link, status, timeStamp }) {
  return (
    <>
      <tr class="">
        <th
          scope="row"
          class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div class="ps-3">
            <div class="text-base font-semibold truncate">{name}</div>
          </div>
        </th>
        <td class="px-6 py-4">{link}</td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full me-2 ${
                status == "200" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            {status}
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">{timeStamp}</td>
      </tr>
    </>
  );
}
export default TableRow;
