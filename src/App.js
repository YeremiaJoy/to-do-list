import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from './pages/list'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
