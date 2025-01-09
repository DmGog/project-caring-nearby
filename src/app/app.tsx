import s from "./app.module.scss"
import {Footer, GlobalToast, Header} from "@/shared";
import {Routing} from "@/app/router";
import {BrowserRouter} from "react-router";
import {AuthRedirect} from "@/features";



function App() {
    return (
        <BrowserRouter>
            <div className={s.root}>
                <Header/>
                <AuthRedirect/>
                <div className={s.wrapper}>
                    <Routing/>
                </div>
                <Footer/>
                <GlobalToast/>
            </div>
        </BrowserRouter>
    );
}

export default App;
