type Organization = {
    title: string;
    isVerified: boolean;
};

type ActionSchedule = {
    stepLabel: string;
    isDone: boolean;
};

type Location = {
    latitude: number;
    longitude: number;
    district: string;
    city: string;
};

type Contacts = {
    email: string;
    phone: string;
    website: string;
};

type HelperRequirements = {
    helperType: string;
    isOnline: boolean;
    qualification: string;
};

type HelpRequest = {
    id: string;
    title: string;
    organization: Organization;
    description: string;
    goalDescription: string;
    actionsSchedule: ActionSchedule[];
    endingDate: string;
    location: Location;
    contacts: Contacts;
    requesterType: "person" | "organization";
    helpType: "finance"|"material"
    helperRequirements: HelperRequirements;
    contributorsCount: number;
    requestGoal: number;
    requestGoalCurrentValue: number;
};

export type HelpRequests = HelpRequest[];