import { Calendar, Image } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../interfaces/brand.interface';
import { getBrands } from '../../redux/slices/brand.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export const Home = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brands.brands);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <div className="mt-8 ml-8">
        <h1 className="text-5xl font-bold text-gray-900">Наши бренды</h1>
        <p className="mt-2 text-xl text-gray-600">
          Каталог всех зарегистрированных брендов в системе
        </p>
      </div>

      {brands.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет брендов</h3>
          <p className="text-gray-600">
            Перейдите в панель администрирования, чтобы добавить первый бренд
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 mt-5 gap-6">
          {brands.map((brand: Brand) => (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <Link to={`/brand/${brand._id}`} key={brand._id}>
                <div>
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ) : (
                    <Image />
                  )}
                </div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{brand.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{brand.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Создан:{' '}
                  {typeof brand.createdAt === 'string'
                    ? brand.createdAt
                    : brand.createdAt.toLocaleDateString('ru-RU')}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
