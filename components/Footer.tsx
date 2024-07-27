import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Designed and Developed by{" "}
          <a
            style={{
              color: "#FFD700"
            }}
            href="http://www.unhired.dev"
          >
            Unhired.dev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
