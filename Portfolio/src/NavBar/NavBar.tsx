
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
                    <Link to="/Assignment_1">Assignment 1</Link>
                </li>
                <li>
                    <Link to="/Assignment_2">Assignment 2</Link>
                </li>
                <li>
                    <Link to="/Assignment_3">Assignment 3</Link>
                </li>
                <li>
                    <Link to="/Assignment_4">Assignment 4</Link>
                </li>
                <li>
                    <a href="https://github.com/TommySegovia/CS407Portfolio">Github</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;