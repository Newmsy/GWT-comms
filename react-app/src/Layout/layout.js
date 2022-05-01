import React from "react";
import { useCreateEvent } from "../Store/Areas/Ticket/CreateTicket/hooks";
import { useSignInUser } from "../Store/Areas/User/hooks";
import { SignInModal } from "../Components/SignInModal";
import { CreateTicketModal } from "../Components/CreateTicketModal";
import { Box } from "@mui/material";
import { SavedTicketsModal } from "../Components/UpcomingEventsModal";

export const Layout = (props) => {
  const { createEvent } = useCreateEvent();

  const { isSignedIn, signIn, loadingSignIn, name, signOut } =
    useSignInUser();

  const [signInOpen, setSignInOpen] = React.useState(false);
  const [createEventOpen, setCreateEventOpen] = React.useState(false);
  const [SavedTicketsOpen, setSavedTicketsOpen] = React.useState(false);

  return (
    <div>
      <SignInModal
        open={signInOpen && !isSignedIn}
        loading={loadingSignIn}
        onSubmit={signIn}
        onClose={() => setSignInOpen(false)}
      />
      <CreateTicketModal
        open={isSignedIn && createEventOpen}
        onClose={() => setCreateEventOpen(false)}
        onSubmit={createEvent}
      />
      <SavedTicketsModal
        open={SavedTicketsOpen}
        onClose={() => setSavedTicketsOpen(false)}
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
                  <a href="/" className="nav-link px-2 text-white fs-3">
                    <b>GloWTrack Ticket Tracker</b>
                  </a>
                </li>
                <li>
                  {isSignedIn && (
                    <a
                      className="nav-link px-2 text-white fs-3"
                      style={{ marginLeft: 200 }}
                      href="/"
                    >
                      {name}
                    </a>
                  )}
                </li>
              </ul>

              <div className="text-end">
                {/* <button
                  type="button"
                  className="btn btn-light me-4"
                  onClick={() => {
                    setSavedTicketsOpen(true);
                  }}
                  disabled={!isSignedIn}
                >
                  Upcoming Events
                </button> */}
                <button
                  type="button"
                  className="btn btn-light me-4"
                  onClick={() => {
                    setCreateEventOpen(true);
                  }}
                  disabled={!isSignedIn}
                >
                  Add Item
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
      <Box display="flex"  style={{ width: "100vw" }}>
        {props.children}
      </Box>
    </div>
  );
};

// put in a header bar (and footer eventually)
// header links to different pages (eventually)
