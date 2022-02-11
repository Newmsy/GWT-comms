import React from "react";
import { useCreateEvent } from "../Store/Areas/Events/CreateEvent/hooks";
import { useSignInUser } from "../Store/Areas/User/hooks";
import { SignInModal } from "../Components/SignInModal";
import { CreateEventModal } from "../Components/CreateEventModal";
import { Sidebar } from "./sidebar";
import { Box } from "@mui/material";
import { useEvents } from "../Store/Areas/Events/FetchEvents/hooks";
import { SavedEventsModal } from "../Components/UpcomingEventsModal";

export const Layout = (props) => {
  const { createEvent } = useCreateEvent();

  const { setViewDate, fetchEvents } = useEvents();
  const { isSignedIn, signIn, loadingSignIn, emailAddress, signOut } =
    useSignInUser();

  const [signInOpen, setSignInOpen] = React.useState(false);
  const [createEventOpen, setCreateEventOpen] = React.useState(false);
  const [savedEventsOpen, setSavedEventsOpen] = React.useState(false);

  return (
    <div>
      <SignInModal
        open={signInOpen && !isSignedIn}
        loading={loadingSignIn}
        onSubmit={signIn}
        onClose={() => setSignInOpen(false)}
      />
      <CreateEventModal
        open={isSignedIn && createEventOpen}
        onClose={() => setCreateEventOpen(false)}
        onSubmit={createEvent}
      />
      <SavedEventsModal
        open={savedEventsOpen}
        onClose={() => setSavedEventsOpen(false)}
      />
      <div style={{ maxWidth: "100vw", zIndex: 100 }}>
        <header
          className="p-3 text-white"
          style={{ backgroundColor: "#00338d", width: "100vw", padding: 0 }}
        >
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="#" className="nav-link px-2 text-white fs-3">
                    <b>KPMG Hybrid Calendar</b>
                  </a>
                </li>
                <li>
                  {isSignedIn && (
                    <a
                      className="nav-link px-2 text-white fs-3"
                      style={{ marginLeft: 200 }}
                    >
                      {emailAddress}
                    </a>
                  )}
                </li>
              </ul>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-light me-4"
                  onClick={() => {
                    setSavedEventsOpen(true);
                  }}
                  disabled={!isSignedIn}
                >
                  Upcoming Events
                </button>
                <button
                  type="button"
                  className="btn btn-light me-4"
                  onClick={() => {
                    setCreateEventOpen(true);
                  }}
                  disabled={!isSignedIn}
                >
                  Create Event
                </button>

                <button
                  type="button"
                  className={`btn btn-${isSignedIn ? "danger" : "success"}`}
                  onClick={() => {
                    setSignInOpen(false);
                    isSignedIn ? signOut() : setSignInOpen(true);
                  }}
                >
                  {isSignedIn ? "Sign Out" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Box display="flex" flexDirection="row" style={{ width: "100vw" }}>
        <Sidebar setViewDate={setViewDate} />
        {props.children}
      </Box>
    </div>
  );
};

// put in a header bar (and footer eventually)
// header links to different pages (eventually)
