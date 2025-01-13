import {Box, List, ListItem, Typography} from "@mui/material";
import {useUserProfileQuery} from "@/features";
import VkIcon from "@/shared/assets/icons/vk.svg"
import TelegramIcon from "@/shared/assets/icons/telegram.svg"
import WhatsappIcon from "@/shared/assets/icons/whatsapp.svg"


export const Contacts = () => {
    const {data} = useUserProfileQuery()
    if (!data) {
        return null
    }
    return (
        <Box paddingTop={"30px"}>
            <Typography variant="h6" mb={"10px"}>E-mail</Typography>
            <Typography variant="body2" mb={"30px"}>{data.contacts.email}</Typography>
            <Typography variant="h6" mb={"10px"}>Телефон</Typography>
            <Typography variant="body2" mb={"30px"}>{data.contacts.phone}</Typography>
            <Typography variant="h6" mb={"10px"}>Социальные сети</Typography>
            <List>
                <ListItem sx={{gap: "32px"}} dense disableGutters><VkIcon/>{data.contacts.social.vk}</ListItem>
                <ListItem sx={{gap: "32px"}} dense disableGutters><TelegramIcon/>{data.contacts.social.telegram}
                </ListItem>
                <ListItem sx={{gap: "32px"}} dense disableGutters><WhatsappIcon/>{data.contacts.social.whatsapp}
                </ListItem>
            </List>

        </Box>
    );
};

