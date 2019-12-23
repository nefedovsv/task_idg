import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { App } from "./App";
import { Auth0Provider } from "./utils/react-auth0-spa";
import config from "./utils/auth_config.json";
import history from "./utils/history";
import { store } from "./store/index";
import "antd/dist/antd.css";
import { Layout } from "antd";
import styles from "./index.module.css";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Layout className={styles.root}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      audience={config.audience}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Provider {...store}>
        <App />
      </Provider>
    </Auth0Provider>
  </Layout>,
  document.getElementById("root")
);
