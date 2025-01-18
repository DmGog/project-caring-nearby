import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    styled,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useLoginMutation} from "@/features/auth/api";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {PATH} from "@/app/router";
import {SignInArgs} from "@/features/auth/api/types";
import {toast} from "react-toastify";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [logIn] = useLoginMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignInArgs>({
        defaultValues: {
            login: "",
            password: "",
        },
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit: SubmitHandler<SignInArgs> = async (data) => {
        try {
            const res = await logIn({login: data.login, password: data.password}).unwrap();
            if (res) {
                localStorage.setItem("auth", JSON.stringify(res.auth));
                localStorage.setItem("token", JSON.stringify(res.token));
                toast.success("Авторизация прошла успешно");
                navigate(PATH.HELPS_PAGE);
            } else {
                toast.error("Ошибка! Попробуйте еще раз");
            }
        } catch (error) {
            if (error) toast.error("Ошибка! Попробуйте еще раз")
        }
    };

    return (
        <Paper variant="outlined" elevation={0} square sx={{width: "100%", padding: "64px 40px"}}>
            <Typography variant="h4" mb="90px">Авторизация</Typography>
            <Typography variant="h5" mb="35px">Вход</Typography>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label={"Логин"}
                    placeholder={"Введите e-mail"}
                    type={"email"}
                    {...register("login", {
                        required: "Введите корректный email-адрес",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Введите корректный email-адрес",
                        },
                    })}
                    error={!!errors.login}
                    helperText={errors.login?.message}
                    sx={{mb: "30px"}}
                />
                <FormControl sx={{mb: "40px"}} error={!!errors.password}>
                    <InputLabel htmlFor="password">Пароль</InputLabel>
                    <OutlinedInput
                        {...register("password", {
                            required: "Введите корректный пароль",
                            minLength: {
                                value: 6,
                                message: "Пароль должен содержать минимум 6 символов",
                            },
                        })}
                        placeholder={"Введите пароль"}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={showPassword ? "hide the password" : "display the password"}
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    {errors.password && (
                        <FormHelperText sx={{color:"red"}}>Введите корректный пароль</FormHelperText>
                    )}
                </FormControl>
                <Button
                    type={"submit"}
                    variant={"contained"}
                    fullWidth
                    sx={{backgroundColor: "#1e88e5", height: "42px"}}
                >
                    ВОЙТИ
                </Button>
            </StyledForm>
        </Paper>
    );
};

const StyledForm = styled("form")`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 485px;
`;
