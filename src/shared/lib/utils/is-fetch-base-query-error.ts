type Error = {
    data: string;
    status: string;
    error: string;
    originalStatus: number;
};

export const isFetchBaseQueryError = (error: unknown): error is Error => {
    return (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        "originalStatus" in error &&
        typeof (error as Error).status === "string" &&
        typeof (error as Error).originalStatus === "number"
    );
};