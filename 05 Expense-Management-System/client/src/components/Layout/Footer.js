import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-dark text-light p-1 position-absolute bottom-0 start-0 end-0">
      <h6 className="text-center text-white">&copy; {currentYear} Expense Tracker</h6>
    </div>
  );
};

export default Footer;
