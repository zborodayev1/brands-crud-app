import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home.jsx';

export const App = () => {
  return (
    <div>
      <div></div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};
