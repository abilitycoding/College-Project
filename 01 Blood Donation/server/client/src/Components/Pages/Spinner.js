import React from "react";
import { Spinner } from "react-bootstrap";

const CCSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh" // Set the height to 100% of the viewport height
      }}
    >
      <div>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default CCSpinner;
