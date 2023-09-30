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
            {/* Add your pop-up content here */}
            <h2>Add New Endpoint</h2>
            {/* Add form or other content for adding an endpoint */}
            <button className="close-btn" onClick={togglePopUp}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
