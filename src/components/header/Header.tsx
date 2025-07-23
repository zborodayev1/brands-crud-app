import { Home, LogIn, LogOut, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname === '/admin' ? 'admin' : 'home';
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">Brand Manager</h1>

            <nav className="flex space-x-4">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Главная
              </button>

              <button
                onClick={() => navigate('/admin')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'admin'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Администрирование
              </button>
            </nav>
          </div>
          {isAuth ? (
            <div className="flex gap-3">
              <Link
                to="/sign-in"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-100 border-2 transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Войти
              </Link>{' '}
              <Link
                to="/sign-up"
                className="flex items-center border-2 border-transparent px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:border-gray-100 hover:bg-transparent transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" /> Зарегистрироваться
              </Link>
            </div>
          ) : (
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
