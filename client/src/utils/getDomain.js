export const getDomain = (link) => {
    const parts = link?.split("/");
    let domain;
    if (link?.toString().includes("http")) {
        domain = parts[2];
    }
    if (domain.includes("www.")) {
        domain = domain.split("www.")[1];
    }
    return domain;
};
