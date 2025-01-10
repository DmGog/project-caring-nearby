import {Box, Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import {SyntheticEvent, useState} from "react";
import {useNavigate} from "react-router";
import {PATH} from "@/app/router";

export const TabsComponent = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: "100%"}}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
                <Tab onClick={() => navigate(PATH.PROFILE.PROFILE_PAGE_PERSONAL_DATA)} label="ЛИЧНЫЕ ДАННЫЕ"/>
                <Tab onClick={() => navigate(PATH.PROFILE.PROFILE_PAGE_CONTACTS)} label="КОНТАКТЫ"/>
                <Tab onClick={() => navigate(PATH.PROFILE.PROFILE_PAGE_FAVORITES)} label="ИЗБРАННОЕ"/>
            </Tabs>
        </Box>
    );
}