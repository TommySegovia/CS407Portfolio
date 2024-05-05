import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../Home/Home';
import Assignment_1 from '../Assignment_1/HelloWorld/Assignment_1';
import Assignment_2 from '../Assignment_2/Assignment_2';

function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Assignment_1" element={<Assignment_1 />} />
        <Route path="/Assignment_2" element={<Assignment_2 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;