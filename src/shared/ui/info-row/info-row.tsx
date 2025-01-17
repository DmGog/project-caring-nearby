import {Box, Typography} from "@mui/material";

type Props = {
    label: string;
    value: string | number;
    marginBottom?: string
}
export const InfoRow = ({label, value, marginBottom = "4px"}: Props) => (
    <Box display="flex" alignItems="center" gap="4px" mb={marginBottom}>
        <Typography variant="subtitle2">{label}:</Typography>
        <Typography variant="body2">{value}</Typography>
    </Box>
);