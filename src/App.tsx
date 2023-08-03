import { Route, Routes } from "react-router-dom";

import All from "./views/All";
import Dashboard from "./views/Dashboard";
import Create from "./views/Create";
import History from "./views/History";
import BarChart from "./views/BarChart";
import Edit from "./views/Edit";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="all" element={<All />} />
        <Route path="create" element={<Create />} />
        <Route path="history" element={<History />} />
        <Route path="chart" element={<BarChart />} />
        <Route path="edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
