import {Footer, Header} from "@/shared";
import {Routing} from "@/app/router";
import {ToastContainer} from "react-toastify";
import {Box} from "@mui/material";

function App() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="100%" minHeight="100vh">
            <Header/>
            <Box display="flex" flexGrow="1" width="100%" maxWidth="1500px" height="100%" paddingTop="84px">
                <Routing/>
            </Box>
            <Footer/>
            <ToastContainer position={"bottom-right"} theme={"light"} autoClose={1000}/>
        </Box>
    );
}

export default App;
