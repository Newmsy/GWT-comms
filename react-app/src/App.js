import React from "react";
import { Layout } from "./Layout/layout";
import { Calendar } from "./Pages/Calendar";

function App() {
  return (
    <div className="App">
      <Layout>
        <Calendar />
      </Layout>
    </div>
  );
}

export default App;
