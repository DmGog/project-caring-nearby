type BaseLocation = {
    latitude: number;
    longitude: number;
    district: string;
    city: string;
};

type Education = {
    organizationName: string;
    level: string;
    specialization: string;
    graduationYear: number;
};


type Contacts = {
    email: string;
    phone: string;
    social: {
        telegram: string;
        whatsapp: string;
        vk: string;
    };
};


export type UserType = {
    id: string;
    name: string;
    lastName: string;
    birthdate: string;
    status: string;
    baseLocations: BaseLocation[];
    educations: Education[];
    additionalInfo: string;
    contacts: Contacts;
    favouriteRequests: string[];
};