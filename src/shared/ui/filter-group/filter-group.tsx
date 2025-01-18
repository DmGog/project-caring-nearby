import {Checkbox, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

type Filter = {
    label: string;
    key: string;
};

export type FilterGroupType = {
    formLabel: string;
    filters: Filter[];
};

type Props = {
    marginBottom: string;
    filters: FilterGroupType[];
    selectedFilters: string[];
    handleChange: (filter: string) => void;
};


export const FilterGroup = ({
                                marginBottom,
                                filters,
                                selectedFilters,
                                handleChange
                            }: Props) => {
    return (
        <>
            {filters.map((group, index) => (
                <FormGroup key={index} sx={{marginBottom: marginBottom}}>
                    <FormLabel>{group.formLabel}</FormLabel>
                    {group.filters.map((filter) => (
                        <FormControlLabel
                            key={filter.key}
                            sx={{paddingLeft: "9px"}}
                            control={<Checkbox color="primary" size="medium"/>}
                            label={filter.label}
                            checked={selectedFilters.includes(filter.key)}
                            onChange={() => handleChange(filter.key)}
                        />
                    ))}
                </FormGroup>
            ))}
        </>
    );
};