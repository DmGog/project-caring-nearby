import {Box, Typography} from "@mui/material";

export const InfoRow = ({label, value}: { label: string; value: string | number }) => (
    <Box display="flex" alignItems="center" gap="4px" mb="4px">
        <Typography variant="subtitle2">{label}:</Typography>
        <Typography variant="body2">{value}</Typography>
    </Box>
);