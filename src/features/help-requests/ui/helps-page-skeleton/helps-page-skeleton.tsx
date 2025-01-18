import {Box, Skeleton} from "@mui/material";

export const HelpsPageSkeleton = () => {
    return (
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" width="100%">
            <Skeleton variant="rounded" width="320px" height="947px"/>
            <Box gap="20px" display="flex" flexDirection="column">
                <Skeleton variant="rounded" width="1080px" height="149px"/>
                <Skeleton variant="rounded" width="1080px" height="1025px"/>
            </Box>
        </Box>
    );
};

