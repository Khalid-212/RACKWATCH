import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import "./Dashboard.css";
import { db } from "../../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ChartComponent from "../../Components/Chart/ChartComponent";
import nodata from "../../assets/nodata.svg";

function Dashboard() {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [endpoints, setEndpoints] = useState([]);
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    url: "",
    interval: "",
    protocol: "REST",
    method: "GET",
  });
  const [requestData, setRequestData] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePopUp = () => {
    setPopUpOpen(!isPopUpOpen);
  };

  // add new endpoint to the local storage
  const addEndpoint = async (e) => {
    e.preventDefault();
    const endpoint = {
      name: newEndpoint.name,
      url: newEndpoint.url,
      interval: newEndpoint.interval,
      method: newEndpoint.method,
      protocol: newEndpoint.protocol,
    };
    const data = localStorage.getItem("endpoints");
    if (data) {
      const endpoints = JSON.parse(data);
      endpoints.push(endpoint);
      localStorage.setItem("endpoints", JSON.stringify(endpoints));
    } else {
      localStorage.setItem("endpoints", JSON.stringify([endpoint]));
    }
    setNewEndpoint({
      name: "",
      url: "",
      interval: "",
      method: "GET",
      protocol: "REST",
    });
    togglePopUp();
  };

  const url = "http://127.0.0.1:5000/records";
  const endpointLists = JSON.parse(localStorage.getItem("endpoints"));
  console.log(endpointLists);

  const handleEndpointSelection = async (e) => {
    const selected = e.target.value;
    setSelectedEndpoint(selected);
  };

  useEffect(() => {
    fetch(url).then((res) => {
      res.json().then((data) => {
        setRequestData(data);
      });
    });
  }, []);
  console.log(requestData);
  const x_axis_data = requestData.map((data) => data.timestamp);
  console.log(x_axis_data);
  const y_axis_data = requestData.map((data) => data.responseTime);

  return (
    <div>
      <Header />
      <div className="cards">
        <div className="cards">
          <Card value="100" attribute="endpoints" color="gray" />
          <Card value="100" attribute="Active" color="green" />
          <Card value="100" attribute="Down" color="red" />
        </div>
      </div>
      <button className="btnAdd" onClick={togglePopUp}>
        Add Endpoint
      </button>
      {isPopUpOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="popUpWindow">
              <button className="closebtn" onClick={togglePopUp}>
                X
              </button>
              <h2>Add New Endpoint</h2>
              <form className="form">
                {/* Input fields for the new endpoint */}
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newEndpoint.name}
                  onChange={(e) =>
                    setNewEndpoint({ ...newEndpoint, name: e.target.value })
                  }
                />
                {/* Other input fields (url, interval, type) */}
                <label htmlFor="url">URL</label>
                <input
                  type="text"
                  value={newEndpoint.url}
                  id="url"
                  name="url"
                  onChange={
                    (e) =>
                      setNewEndpoint({ ...newEndpoint, url: e.target.value })
                  }
                />
                <label htmlFor="interval">Frequency (in minutes)</label>
                <input
                  type="text"
                  id="interval"
                  value={newEndpoint.interval}
                  name="interval"
                  onChange={(e) =>
                    setNewEndpoint({ ...newEndpoint, interval: e.target.value })
                  }
                />
                <label htmlFor="method">Method</label>
                <select
                onChange={(e) =>
                  setNewEndpoint({ ...newEndpoint, method: e.target.value })
                }
                
                 id="method" value={newEndpoint.method} name="method">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
                <label htmlFor="protocol">Protocol</label>
                <select 
                onChange={(e) =>
                  setNewEndpoint({ ...newEndpoint, protocol: e.target.value })
                }
                 id="protocol" value={newEndpoint.type} name="protocol">
                  <option value="REST">REST</option>
                  <option value="SOAP">SOAP</option>
                  <option value="GraphQL">GraphQL</option>
                </select>
                <button
                  className="submit-btn"
                  type="submit"
                  onClick={addEndpoint}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {requestData.length > 1 ? (
        <div className="endpoint-list">
          <h2>Available Endpoints</h2>
          <select
            id="select-endpoint"
            name="select-endpoint"
            value={selectedEndpoint}
            onChange={handleEndpointSelection}
          >
            <option value="">Select an Endpoint</option>
            {endpoints.map((endpoint, index) => (
              <option key={index} value={endpoint.url}>
                {endpoint.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        " "
      )}

      {requestData.length > 1 ? (
        <div className="dataDisplayContainer">
          {/* here */}
          <div className="graph">
            <ChartComponent
              timestamps={requestData.map((item) => item.timestamp)}
              responseTimes={requestData.map((item) => item.ping)}
            />
          </div>
          <div className="endpoint-list">
            <h2>Endpoint Status</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {requestData.length === 0 ? (
                  <p>No data available.</p>
                ) : (
                  <table className="table">
                    <thead className="tableHeader">
                      <tr>
                        <th>URL</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                        <th>Response Time (ms)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestData
                        .filter((data) => data.url === selectedEndpoint.url)
                        .map((data, index) => (
                          <tr key={index}>
                            <td className="table_item shorten">{url}</td>
                            <td
                              className="table_item"
                              style={{
                                color: data.response === 200 ? "green" : "red",
                              }}
                            >
                              {data.response}
                            </td>
                            <td className="table_item shorten">
                              {data.timestamp}
                            </td>
                            <td className="table_item">{data.ping}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <img
          src={nodata}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "contain",
            display: "grid",
            placeItems: "center",
            margin: "auto",
          }}
          alt=""
        />
      )}
    </div>
  );
}

export default Dashboard;
