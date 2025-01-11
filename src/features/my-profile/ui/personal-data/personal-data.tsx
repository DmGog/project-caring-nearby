import {Box, Typography} from "@mui/material";
import {BaseLocation, Education, useUserProfileQuery} from "@/features";
import {useNavigate} from "react-router";
import {PATH} from "@/app/router";
import {formatDate, InfoRow} from "@/shared";

export const PersonalData = () => {
    const {data} = useUserProfileQuery()
    const navigate = useNavigate();
    if (!data) {
        navigate(PATH.NOT_FOUND_PAGE)
        return null
    }
    return (
        <Box paddingTop="30px">
            <Typography variant="h6" mb="10px">Профиль</Typography>
            <Box mb={"30px"}>
                <InfoRow label="Фамилия" value={data.lastName}/>
                <InfoRow label="Имя" value={data.name}/>
            </Box>
            <Typography variant="h6" mb="10px">Дата Рождения</Typography>
            <Typography variant="body2" mb="30px">{formatDate(data.birthdate)}</Typography>
            <Typography variant="h6" mb="10px">Локация для помощи</Typography>
            <Box mb={"30px"}>
                {data.baseLocations.map((location: BaseLocation, index: number) => (
                    <Box key={index} mb="16px">
                        <InfoRow label="Область" value={location.district}/>
                        <InfoRow label="Населенный пункт" value={location.city}/>
                    </Box>
                ))}
            </Box>
            <Typography variant={"h6"} mb={"10px"}>Образование</Typography>
            <Box mb={"30px"}>
                {data.educations.map((education: Education, index: number) => (
                    <Box key={index} mb="16px" gap={"4px"}>
                        <InfoRow label={"Учреждение"} value={education.organizationName}/>
                        <InfoRow label={"Уровень Образования"} value={education.level}/>
                        {education.specialization && <InfoRow label={"Направление"} value={education.specialization}/>}
                        <InfoRow label={"Год окончания"} value={education.graduationYear}/>
                    </Box>
                ))}
            </Box>
            <Typography variant={"h6"} mb={"10px"}>Обо мне</Typography>
            <Typography maxWidth={"550px"} variant={"body2"}>{data.additionalInfo}</Typography>
        </Box>
    );
};

