import {Box, List, ListItem, Typography} from "@mui/material";
import {UserType} from "@/features";
import VkIcon from "@/shared/assets/icons/vk.svg"
import TelegramIcon from "@/shared/assets/icons/telegram.svg"
import WhatsappIcon from "@/shared/assets/icons/whatsapp.svg"
import {useOutletContext} from "react-router";

const socialNetworks = [
    {key: "vk", label: "VK", icon: VkIcon},
    {key: "telegram", label: "Telegram", icon: TelegramIcon},
    {key: "whatsapp", label: "WhatsApp", icon: WhatsappIcon}
];
export const Contacts = () => {

    const {data} = useOutletContext<{ data: UserType }>();
    const {email, phone, social} = data.contacts;
    return (
        <Box pt="30px">
            <Typography variant="h6" mb="10px">E-mail</Typography>
            <Typography variant="body2" mb="30px">{email}</Typography>
            <Typography variant="h6" mb="10px">Телефон</Typography>
            <Typography variant="body2" mb="30px">{phone}</Typography>
            <Typography variant="h6" mb="10px">Социальные сети</Typography>
            <List>
                {socialNetworks.map(({key, icon: IconComponent}) => (
                    social[key as keyof typeof social] ? (
                        <ListItem key={key} sx={{gap: "32px"}} dense disableGutters>
                            <IconComponent/>
                            {social[key as keyof typeof social]}
                        </ListItem>
                    ) : null
                ))}
            </List>
        </Box>
    );
};

