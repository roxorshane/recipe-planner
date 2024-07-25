import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrimaryLayout } from 'layouts';
import { DashboardView } from 'views';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route element={<PrimaryLayout />}>
        <Route path="/" element={<DashboardView />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
