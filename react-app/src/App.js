import React from "react";
import { Layout } from "./Layout/layout";
import { Calendar } from "./Pages/Calendar";
import { configureStore } from "./Store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout>
          <Calendar />
        </Layout>
      </div>
    </Provider>
  );
}

export default App;
