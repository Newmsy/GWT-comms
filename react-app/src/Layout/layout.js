import React from "react";
import { Sidebar } from "./sidebar";

export const Layout = (props) => {
  return (
    <div>
      <div style={{ maxWidth: "100vw" }}>
        <header
          class="p-3 text-white"
          style={{ backgroundColor: "#00338d", width: "100vw", padding: 0 }}
        >
          <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <a href="#" class="nav-link px-2 text-white fs-3">
                    <b>KPMG Hybrid Calendar</b>
                  </a>
                </li>
              </ul>

              <div class="text-end">
                <button type="button" class="btn btn-light me-4">
                  Create Event
                </button>
                <button type="button" class="btn btn-danger">
                  Sign Out
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
