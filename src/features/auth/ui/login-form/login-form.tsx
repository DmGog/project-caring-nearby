import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import s from "./login-form.module.scss"
import InfoIcon from "@/shared/assets/icons/Info.svg"
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useLoginMutation} from "@/features/auth/api";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {PATH} from "@/app/router";
import {SignInArgs} from "@/features/auth/api/types";
import {toast} from "react-toastify";

type TestData = {
    id: number,
    name: string,
    login: string,
    password: string
}


const testData: TestData[] = [
    {
        id: 1,
        name: "Первый пользователь",
        login: "testUser0@test.com",
        password: "password0",
    },
    {
        id: 2,
        name: "Второй пользователь",
        login: "testUser1@test.com",
        password: "password1",
    },
    {
        id: 3,
        name: "Третий пользователь",
        login: "testUser2@test.com",
        password: "password2",
    },

]


export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [logIn] = useLoginMutation()
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<SignInArgs>(
        {
            defaultValues: {
                login: "",
                password: ""
            }
        }
    )
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const onSubmit: SubmitHandler<SignInArgs> = async data => {
        try {
            const res = await logIn({login: data.login, password: data.password}).unwrap();
            if (res) {
                sessionStorage.setItem("auth", JSON.stringify(res.auth));
                sessionStorage.setItem("token", JSON.stringify(res.token));
                toast.success("Авторизация прошла успешно")
                navigate(PATH.HELPS.HELPS_PAGE);
            } else {
                toast.error("Ошибка! Попробуйте еще раз")
            }
        } catch (error) {
            if (error) {
                toast.error("Ошибка! Попробуйте еще раз")
            }
        }

    }

    return (
        <div className={s.loginForm}>
            <div className={s.loginWrapper}>
                <span className={s.titleCard}>Авторизация</span>
                <span className={s.textEntrance}>Вход</span>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <TextField label={"Логин"} placeholder={"Введите e-mail"} type={"email"}
                               {...register("login", {
                                   required: "Введите корректный email-адрес",
                                   pattern: {
                                       value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                       message: "Введите корректный email-адрес",
                                   },
                               })}
                               sx={{mb: "30px"}}/>
                    <FormControl sx={{mb: "40px"}}>
                        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                        <OutlinedInput
                            {...register("password")}
                            placeholder={"Введите пароль"}
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? "hide the password" : "display the password"
                                        }
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button type={"submit"} variant={"contained"} fullWidth
                            sx={{backgroundColor: "#1e88e5", height: "42px"}}>ВОЙТИ</Button>
                </form>
            </div>
            <div className={s.profileWrapper}>
                <span className={s.titleCard}>Тестовые профили</span>
                <div className={s.container}>
                    {testData.map(profile => {
                        return (
                            <div className={s.profileContainer} key={profile.id}>
                                <div className={s.icon}><InfoIcon/></div>
                                <div className={s.textContainerProfile}>
                                    <span className={s.nameProfile}>{profile.name}</span>
                                    <span className={s.loginProfile}>Логин: {profile.login}</span>
                                    <span className={s.passwordProfile}>Пароль: {profile.password}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
