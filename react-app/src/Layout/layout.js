import React from "react";

export const Layout = (props) => {
  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: 50,
          backgroundColor: "#00338d",
          paddingTop: 20,
        }}
      >
        <p
          style={{ color: "#fff", fontSize: 30, marginLeft: 50, marginTop: 0 }}
        >
          Hybrid Calendar{" "}
        </p>
      </div>
      {props.children}
    </div>
  );
};

// put in a header bar (and footer eventually)
// header links to different pages (eventually)
