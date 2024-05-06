import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../Home/Home';
import Assignment_1 from '../Assignment_1/HelloWorld/Assignment_1';
import Assignment_2 from '../Assignment_2/Assignment_2';
import Assignment_3 from '../Assignment_3/Assignment_3';

function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Assignment_1" element={<Assignment_1 />} />
        <Route path="/Assignment_2" element={<Assignment_2 />} />
        <Route path="/Assignment_3" element={<Assignment_3 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;