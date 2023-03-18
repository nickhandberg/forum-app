export const getDomain = (link) => {
    const parts = link?.split("/");

    let domain;
    if (link?.toString().includes("http")) {
        domain = parts[2];
    } else if (link.includes("www.")) {
        domain = link.split("www.")[1];
    } else {
        domain = link;
    }
    return domain;
};
