import {Link} from "@mui/material";
import s from "./footer.module.scss"

export const Footer = () => {
    return (
        <div className={s.footer}>
            <Link className={s.link}>Об ивенте</Link>
            <Link className={s.link}>Github проекта</Link>
            <Link className={s.link}>мой telegram</Link>
        </div>
    );
};

