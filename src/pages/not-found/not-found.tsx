import s from "./not-found.module.scss"
import ErrorImage from "@/shared/assets/images/not-found.png"

export const NotFoundPage = () => {
    return (
        <div className={s.notFoundPage}>
            <img src={ErrorImage} alt={"Error 404"}/>
            <span className={s.notFound}>404</span>
            <h2 className={s.notFoundText}>Страница не найдена</h2>
        </div>
    );
};

