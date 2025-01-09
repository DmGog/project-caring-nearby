import s from "./footer.module.scss"
import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <div className={s.footer}>
            <Link className={s.link} to={"#"}>Об ивенте</Link>
            <Link className={s.link} to={"#"}>Github проекта</Link>
            <Link className={s.link} to={"#"}>мой telegram</Link>
        </div>
    );
};

