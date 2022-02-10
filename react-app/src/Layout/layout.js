import React from "react";
import { useCreateEvent } from "../Store/Areas/Events/CreateEvent/hooks";
import { useSignInUser } from "../Store/Areas/User/hooks";
import { SignInModal } from "../Components/SignInModal";
import { Sidebar } from "./sidebar";

export const Layout = (props) => {
  const { createEvent } = useCreateEvent();
  const { isSignedIn, signIn, loadingSignIn, emailAddress, signOut } =
    useSignInUser();

  const [signInOpen, setSignInOpen] = React.useState(false);
  console.log(isSignedIn);

  return (
    <div>
      <SignInModal
        open={signInOpen && !isSignedIn}
        loading={loadingSignIn}
        onSubmit={signIn}
        onClose={() => setSignInOpen(false)}
      />
      <div style={{ maxWidth: "100vw" }}>
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
                      className="nav-link px-2 text-white fs-6"
                      style={{ marginLeft: 40 }}
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
                    createEvent({
                      emailAddress: "TestUser@Test.com",
                      userId: "",
                      eventInfo: { date: new Date() },
                    });
                  }}
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

      {props.children}
    </div>
  );
};

// put in a header bar (and footer eventually)
// header links to different pages (eventually)
