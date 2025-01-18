import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import dayjs, { Dayjs } from "dayjs";
import {HelpRequests} from "@/features";

export const useFilters = (data: HelpRequests) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [filters, setFilters] = useState<string[]>(searchParams.getAll("filter"));
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
        searchParams.get("date") ? dayjs(searchParams.get("date")) : null
    );
    const [filteredData, setFilteredData] = useState(data || []);
    const [typedSearchTerm, setTypedSearchTerm] = useState(searchTerm);

    const isDebouncing = useRef(false);

    useEffect(() => {
        let filtered = (data || []);

        if (filters.length > 0 || selectedDate || searchTerm) {
            filtered = filtered.filter(item => {
                const matchesFilters = filters.length === 0 || filters.every(filter =>
                    item.requesterType.includes(filter) ||
                    item.helpType.includes(filter) ||
                    item.helperRequirements.qualification.includes(filter) ||
                    item.helperRequirements.helperType.includes(filter) ||
                    (filter === "online" && item.helperRequirements.isOnline) ||
                    (filter === "offline" && !item.helperRequirements.isOnline)
                );

                const matchesDate = selectedDate ? dayjs(item.endingDate).isBefore(selectedDate, "day") : true;

                const matchesSearchTerm = searchTerm
                    ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.organization.title.toLowerCase().includes(searchTerm.toLowerCase())
                    : true;

                return matchesFilters && matchesDate && matchesSearchTerm;
            });
        }

        setFilteredData(filtered);
    }, [data, searchTerm, filters, selectedDate]);

    const debouncedSearch = debounce((value: string) => {
        setSearchParams(value ? { search: value } : {});
        setSearchTerm(value);
        isDebouncing.current = false;
    }, 600);

    const handleSearchChange = (value: string) => {
        setTypedSearchTerm(value);
        isDebouncing.current = true;
        debouncedSearch(value);
    };

    const handleFilterChange = (selectedFilters: string[]) => {
        setSearchParams(params => {
            params.delete("filter");
            selectedFilters.forEach(filter => params.append("filter", filter));
            return params;
        });
        setFilters(selectedFilters);
    };

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        setSearchParams(params => {
            if (date) {
                params.set("date", date.toISOString());
            } else {
                params.delete("date");
            }
            return params;
        });
    };

    return {
        searchTerm,
        typedSearchTerm,
        isDebouncing: isDebouncing.current,
        filters,
        selectedDate,
        filteredData,
        handleSearchChange,
        handleFilterChange,
        handleDateChange
    };
};
