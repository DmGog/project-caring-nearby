import {createRoot} from "react-dom/client";
import "@/shared/styles/index.scss";
import App from "@/app/app";
import {Provider} from "react-redux";
import {store} from "@/app/store";
import {BrowserRouter} from "react-router";


createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
