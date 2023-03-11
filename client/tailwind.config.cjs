/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        colors: {
            /*DARK MODE*/
            "dark-1": "#161617",
            "dark-2": "#242526",
            "dark-3": "#363738",

            /*LIGHT MODE */
            "light-1": "#e6e8eb",
            "light-2": "#c4c4c4",
            "light-3": "#dadce0",

            /*COMMON */
            "green-1": "#6fc938",
            "green-2": "#4db010",
        },
    },
    plugins: [],
    darkMode: "class",
};
