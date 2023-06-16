import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Spinner = () => {
  return (
    <div className="bg-secondary-subtle d-flex align-items-center justify-content-center vh-100 z-3">
      <SyncLoader color="#222" size={25} />{" "}
    </div>
  );
};

export default Spinner;
