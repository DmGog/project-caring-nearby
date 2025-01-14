import s from "./app.module.scss"
import {Footer, Header} from "@/shared";
import {Routing} from "@/app/router";
import {BrowserRouter} from "react-router";
import {AuthRedirect} from "@/features";
import {ToastContainer} from "react-toastify";


function App() {
    return (
        <BrowserRouter>
            <AuthRedirect/>
            <div className={s.root}>
                <Header/>
                <div className={s.wrapper}>
                    <Routing/>
                </div>
                <Footer/>
                <ToastContainer position={"bottom-right"} theme={"light"} autoClose={1000}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
