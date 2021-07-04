import React from "react"
import ReactDOM from "react-dom"
// import App from "./App";
import NewApp from "./NewApp"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux"
import store from "./redux/store"
import { MetaMaskProvider } from "metamask-react"
import { StoreProvider } from "./pages/Testing/StoreContext" // added
import "./App.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MetaMaskProvider>
        <StoreProvider>
          <NewApp />
        </StoreProvider>
      </MetaMaskProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
)
