import {FilterGroupType} from "@/shared";

export const mainFilters: FilterGroupType[] = [
    {
        formLabel: "Кому мы помогаем",
        filters: [
            { label: "Пенсионеры", key: "person" },
            { label: "Дома престарелых", key: "organization" }
        ]
    },
    {
        formLabel: "Чем мы помогаем",
        filters: [
            { label: "Вещи", key: "material" },
            { label: "Финансирование", key: "finance" }
        ]
    }
];
export const volunteerActivity : FilterGroupType[] = [
    {
        formLabel: "Специализация",
        filters: [
            { label: "Квалифицированная", key: "professional" },
            { label: "Не требует профессии", key: "common" }
        ]
    },
    {
        formLabel: "Формат",
        filters: [
            { label: "Онлайн", key: "online" },
            { label: "Офлайн", key: "offline" }
        ]
    },
    {
        formLabel: "Необходимо волонтеров",
        filters: [
            { label: "Группа", key: "group" },
            { label: "Один", key: "single" }
        ]
    }
];