import React from "react";

const Spinner = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "50%" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
