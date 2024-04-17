import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../Home/Home';
import Assignment_1 from '../Assignment_1/HelloWorld/Assignment_1';

function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Assignment_1" element={<Assignment_1 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;