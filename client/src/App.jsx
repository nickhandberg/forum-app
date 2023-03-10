import "boxicons";
import Nav from "./components/Nav";
import "./index.css";
import Feed from "./pages/Feed";

function App() {
    return (
        <div className="bg-light-2 dark:bg-dark-1">
            <Nav />
            <Feed />
        </div>
    );
}

export default App;
