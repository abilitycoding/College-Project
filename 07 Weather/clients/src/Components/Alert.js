import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./Alert.css";

const AlertComponent = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const districts = [
    { label: "Ariyalur", value: "Ariyalur" },
    { label: "Chengalpattu", value: "Chengalpattu" },
    { label: "Chennai", value: "Chennai" },
    { label: "Coimbatore", value: "Coimbatore" },
    { label: "Cuddalore", value: "Cuddalore" },
    { label: "Dharmapuri", value: "Dharmapuri" },
    { label: "Dindigul", value: "Dindigul" },
    { label: "Erode", value: "Erode" },
    { label: "Kallakurichi", value: "Kallakurichi" },
    { label: "Kancheepuram", value: "Kancheepuram" },
    { label: "Karur", value: "Karur" },
    { label: "Krishnagiri", value: "Krishnagiri" },
    { label: "Madurai", value: "Madurai" },
    { label: "Mayiladuthurai", value: "Mayiladuthurai" },
    { label: "Nagapattinam", value: "Nagapattinam" },
    { label: "Namakkal", value: "Namakkal" },
    { label: "Nilgiris", value: "Nilgiris" },
    { label: "Perambalur", value: "Perambalur" },
    { label: "Pudukkottai", value: "Pudukkottai" },
    { label: "Ramanathapuram", value: "Ramanathapuram" },
    { label: "Ranipet", value: "Ranipet" },
    { label: "Salem", value: "Salem" },
    { label: "Sivaganga", value: "Sivaganga" },
    { label: "Tenkasi", value: "Tenkasi" },
    { label: "Thanjavur", value: "Thanjavur" },
    { label: "Theni", value: "Theni" },
    { label: "Thoothukudi", value: "Thoothukudi" },
    { label: "Tiruchirappalli", value: "Tiruchirappalli" },
    { label: "Tirunelveli", value: "Tirunelveli" },
    { label: "Tirupathur", value: "Tirupathur" },
    { label: "Tiruppur", value: "Tiruppur" },
    { label: "Tiruvallur", value: "Tiruvallur" },
    { label: "Tiruvannamalai", value: "Tiruvannamalai" },
    { label: "Tiruvarur", value: "Tiruvarur" },
    { label: "Vellore", value: "Vellore" },
    { label: "Viluppuram", value: "Viluppuram" },
    { label: "Virudhunagar", value: "Virudhunagar" }
  ];

  const handleDistrictSelect = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };

  const handleAlert = async () => {
    if (selectedDistrict) {
      try {
        await axios.post(`${BACKEND_URL}/alerts`, {
          district: selectedDistrict.value
        });

        alert(`Alert for ${selectedDistrict.label} sent successfully!`);
      } catch (error) {
        console.error("Error sending alert:", error);
        alert("Error sending alert. Please try again.");
      }
    } else {
      alert("Please select a district before clicking the alert button.");
    }
  };

  return (
    <div className="alert_container d-flex gap-3">
      <Select
        value={selectedDistrict}
        onChange={handleDistrictSelect}
        options={districts}
        placeholder="Select District"
      />

      <div className="d-flex align-items-center">
        <Button
          className="w-100"
          variant="danger"
          onClick={handleAlert}
        >
          Alert
        </Button>
      </div>
    </div>
  );
};

export default AlertComponent;
