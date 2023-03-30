export const getUserPrefs = () => {
    let userPrefs = localStorage.getItem("userPrefs");
    if (userPrefs === null) {
        userPrefs = JSON.stringify({ darkMode: true, showGrid: false });
    }
    return JSON.parse(userPrefs);
};

export const setDarkModePref = (darkMode) => {
    let userPrefs = getUserPrefs();
    userPrefs.darkMode = darkMode;
    localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
};

export const setShowGridPref = (showGrid) => {
    let userPrefs = getUserPrefs();
    userPrefs.showGrid = showGrid;
    localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
};
