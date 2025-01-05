import s from "./app.module.scss"
import {Footer, Header} from "@/shared";
import {LoginForm} from "@/features";

function App() {
    return (
        <div className={s.root}>
            <Header/>
            <div className={s.wrapper}>
                <LoginForm/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
