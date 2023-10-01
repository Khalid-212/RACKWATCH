import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import "./Dashboard.css";
import { db } from "../../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ChartComponent from "../../Components/Chart/ChartComponent";

function Dashboard() {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [endpoints, setEndpoints] = useState([]);
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    url: "",
    interval: "",
    type: "REST",
  });
  const [requestData, setRequestData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch and update the list of endpoints when the component mounts
    fetchendpoints();
    // Start periodic requests
    const intervalId = setInterval(fetchendpoints, newEndpoint.interval); // 20 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
    // fetchdata();
  }, []);

  const togglePopUp = () => {
    setPopUpOpen(!isPopUpOpen);
  };

  const addEndpoint = async (e) => {
    e.preventDefault();
    // Add the new endpoint to the list of endpoints
    console.log(newEndpoint);
    togglePopUp();
  };

  const fetchendpoints = async () => {};

  const handleEndpointSelection = async (e) => {
    const selected = e.target.value;
    setSelectedEndpoint(selected);
  };

  const url = "http://127.0.0.1:5000/records";

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
                <input type="text" id="url" name="url" />
                <label htmlFor="interval">Frequency (in minutes)</label>
                <input type="text" id="interval" name="interval" />
                <label htmlFor="type">Method</label>
                <select id="type" name="type">
                  <option value="REST">GET</option>
                  <option value="SOAP">POST</option>
                </select>
                <label htmlFor="type">Protocol</label>
                <select id="type" name="type">
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

      {/* Select available endpoints from local storage */}
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

      {/* Display the table of request data */}
      {/* Display the table of request data */}
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
                <table>
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
                        <tr className="table" key={index}>
                          <td className="table_item shorten">{url}</td>
                          <td className="table_item"
                            style={{
                              color:
                                data.response === 200 ? "green" : "red",
                            }}
                          >{data.response}</td>
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

        {/* Display the simple graph */}

      </div>
    </div>
  );
}

export default Dashboard;
