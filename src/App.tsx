import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.js';
import { Home } from './components/home/Home.js';
import { SignUp } from './components/sign-up/SignUp.js';

export const App = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/sign-in" element={<SignIn />} /> */}
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};
