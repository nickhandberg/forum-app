import "boxicons";
import { useState } from "react";
import Nav from "./components/Nav";
import "./index.css";
import Feed from "./pages/Feed";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`${darkMode && "dark"} `}>
            <div className="bg-light-2 dark:bg-dark-1">
                <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Feed />
            </div>
        </div>
    );
}

export default App;
