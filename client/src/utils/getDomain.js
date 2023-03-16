export const getDomain = (link) => {
    const parts = link?.split("/");
    if (link?.toString().includes("http")) {
        return parts[2];
    } else {
        return parts[0];
    }
};
