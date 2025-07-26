import { Calendar, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../../interfaces/brand.interface';
import { getBrands, PaginationType } from '../../../redux/slices/brand.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Pagination } from '../../../ui/pagination';

export const Home = () => {
  const brands = useAppSelector((state) => state.brands.brands);
  const loading = useAppSelector((state) => state.brands.loading);
  const reduxPagination = useAppSelector((state) => state.brands.pagination);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState<string>('');

  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
  });

  useEffect(() => {
    dispatch(getBrands(pagination));
  }, [dispatch, pagination]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <div className="flex justify-between">
        <div className="mt-8 ml-8">
          <h1 className="text-5xl font-bold text-gray-900">Наши бренды</h1>
          <p className="mt-2 text-xl text-gray-600">
            Каталог всех зарегистрированных брендов в системе
          </p>
        </div>
        <Pagination
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>

      {brands.length === 0 && !loading ? (
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
        <>
          <div className="grid grid-cols-3 mt-5 gap-6">
            {brands.map((brand: Brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <Link to={`/brand/${brand._id}`}>
                  <div className="flex justify-center items-center">
                    {brand.logoUrl ? (
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        className="max-w-50 max-y-50 rounded-md"
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
                    Создан: {brand.createdAt}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(Math.max(pagination.page - 1, 1))}
              disabled={pagination.page === 1}
              className="p-2 rounded-md border disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              Страница {pagination.page} из {reduxPagination?.totalPages || '?'}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={reduxPagination && pagination.page >= reduxPagination.totalPages}
              className="p-2 rounded-md border disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
