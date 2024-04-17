
import "./NavBar.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function NavBar(){
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Assignment_1">Assignment_1</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;