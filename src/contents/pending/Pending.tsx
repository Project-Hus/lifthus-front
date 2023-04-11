import React from "react";

const Pending = () => {
  // get target path from url
  const target_path = window.location.pathname.slice(8);

  return (
    <div>
      {target_path}
      <div></div>
      <a href="http://localhost:9091/auth/session/new">aa</a>
    </div>
  );
};

export default Pending;
