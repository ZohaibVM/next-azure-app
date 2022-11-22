import { Provider } from "react-redux";
import store, { wrapper } from "../store/store";
import ContextProvider from "../context/GlobalContext";
import Dashboard from "../components/Dashboard/Dashboard";
import "fontawesome-4.7/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/vm-style.css";
import "../styles/style-billing.css";
import "../styles/features.css";
import "../styles/app-styles.css";
import "../fonts/feather/iconfont.css";
import "../styles/dashboard.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      </ContextProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
