import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../Home/Home';
import Assignment_1 from '../Assignment_1/HelloWorld/Assignment_1';
import Assignment_2 from '../Assignment_2/Assignment_2';
import Assignment_3 from '../Assignment_3/Assignment_3';
import Assignment_4 from '../Assignment_4/Assignment_4';
import Assignment_5 from '../Assignment_5/Assignment_5';
import Assignment_6 from '../Assignment_6/Assignment_6';

function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Assignment_1" element={<Assignment_1 />} />
        <Route path="/Assignment_2" element={<Assignment_2 />} />
        <Route path="/Assignment_3" element={<Assignment_3 />} />
        <Route path="/Assignment_4" element={<Assignment_4 />} />
        <Route path="/Assignment_5" element={<Assignment_5 />} />
        <Route path="/Assignment_6" element={<Assignment_6 />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;