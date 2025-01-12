export const removeBrackets = (str: string) => {
    return str.replace(/\[\d+\]\s*/, "").trim();
}