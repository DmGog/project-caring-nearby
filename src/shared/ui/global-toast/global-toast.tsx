import {useAppDispatch, useAppSelector} from "@/app";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import {setError, setMessage} from "@/entities";

export const GlobalToast = () => {
    const dispatch = useAppDispatch();
    const message = useAppSelector(state => state.app.messageSuccess);
    const error = useAppSelector(state => state.app.error)

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(setMessage({messageSuccess: null}));
        }
        if (error) {
            toast.error(message);
            dispatch(setError({error: null}));
        }
    }, [message, error, dispatch]);

    return <ToastContainer position={"bottom-right"} theme={"light"}/>;
};