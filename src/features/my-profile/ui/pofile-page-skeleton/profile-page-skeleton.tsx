import {Box, Skeleton} from "@mui/material";

export const ProfilePageSkeleton = () => {
    return (
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" width="100%" >
            <Skeleton variant="rounded" width="320px" height="436px"/>
            <Skeleton variant="rounded" width="1080px" height="1025px"/>
        </Box>
    );
};

