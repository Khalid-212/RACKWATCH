import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import Card from '../../Components/Card/Card'
import "./Dashboard.css";
function Dashboard() {
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  // Step 2: Function to open and close the pop-up
  const togglePopUp = () => {
    setPopUpOpen(!isPopUpOpen);
  };
  const addEndpoint = () => {
    // Step 3: Add code to add the endpoint to the database 
    // and close the pop-up
  };
  return (
    <div>
      <Header/>
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
            <button className='closebtn' onClick={
              togglePopUp
            }>X</button>
            {/* Add your pop-up content here */}
            <h2>Add New Endpoint</h2>
            {/* Add form or other content for adding an endpoint */}
            <form className='form'>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="url">URL</label>
              <input type="text" id="url" name="url" />
              <label htmlFor="interval">Interval</label>
              <input type="text" id="interval" name="interval" />
              <label htmlFor="type">Type</label>
              <select id="type" name="type">
                <option value="REST">REST</option>
                <option value="SOAP">SOAP</option>
                <option value="GraphQL">GraphQL</option>
                </select>
            <button className="submit-btn" onClick={addEndpoint}>
              Submit
            </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
