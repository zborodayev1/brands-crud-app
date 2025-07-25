import { Route, Routes } from 'react-router-dom';
import { SignIn } from './components/auth/sign-in/SignIn';
import { SignUp } from './components/auth/sign-up/SignUp';
import { CreateBrand } from './components/brands/create-brand/CreateBrand';
import { FullBrand } from './components/brands/full-brand/FullBrand';
import { UpdateBrand } from './components/brands/update-brand/UpdateBrand';
import Header from './components/header/Header';
import Admin from './components/lay-out/admin/Admin';
import { Home } from './components/lay-out/home/Home';

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

          <Route path="/create-brand" element={<CreateBrand />} />
          <Route path="/update-brand/:id" element={<UpdateBrand />} />
          <Route path="/brand/:id" element={<FullBrand />} />
        </Routes>
      </div>
    </div>
  );
};
