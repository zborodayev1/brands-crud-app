import { Route, Routes } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Header from './components/header/Header';
import { Home } from './components/home/Home';
import { SignIn } from './components/sign-in/SignIn';
import { SignUp } from './components/sign-up/SignUp';

export const App = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
};
