import s from "./header.module.scss"
import LogoIcon from "@/shared/assets/Logo.svg"
import RightArrowIcon from "@/shared/assets/Right-arrow.svg"

export const Header = () => {

    return (
        <div className={s.header}>
            <div className={s.container}>
                <LogoIcon/>
                <a href={"/#"} className={s.link}>
                    Запросы о помощи
                </a>
                <button className={s.btn}>
                    <span className={s.titleBtn}>ВОЙТИ</span>
                    <RightArrowIcon/>
                </button>
            </div>
        </div>
    )
}


