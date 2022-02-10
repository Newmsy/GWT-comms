import React from "react";
import { useCreateEvent } from "../Store/Areas/Events/CreateEvent/hooks";

export const Layout = (props) => {
  const { createEvent } = useCreateEvent();

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
        <button
          onClick={() =>
            createEvent({
              userId: "1",
              emailAddress: "test",
              eventInfo: { date: new Date() },
            })
          }
        >
          Create The event
        </button>
      </div>
      {props.children}
    </div>
  );
};

// put in a header bar (and footer eventually)
// header links to different pages (eventually)
