import { ChevronLeft, ChevronRight, Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brand } from '../../../interfaces/brand.interface';
import { deleteBrand, getBrands, PaginationType } from '../../../redux/slices/brand.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Pagination } from '../../../ui/pagination';

const Admin = () => {
  const brands = useAppSelector((state) => state.brands.brands);
  const loading = useAppSelector((state) => state.brands.loading);
  const reduxPagination = useAppSelector((state) => state.brands.pagination);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [searchInput, setSearchInput] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
  });

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleDelete = async (id: string) => {
    if (id) {
      const resultAction = await dispatch(deleteBrand(id));
      if (deleteBrand.fulfilled.match(resultAction)) {
        nav('/admin');
        dispatch(getBrands(pagination));
      }
    }
  };

  useEffect(() => {
    dispatch(getBrands(pagination));
  }, [dispatch, pagination]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Управление брендами</h1>
          <p className="mt-2 text-gray-600">Добавляйте, редактируйте и удаляйте бренды</p>
        </div>

        <Link
          to="/create-brand"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить бренд
        </Link>
      </div>
      <div className="flex mt-5 mb-8">
        <Pagination
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {brands.length === 0 && !loading ? (
          <div className="text-center py-12">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет брендов</h3>
            <p className="text-gray-600">Начните с добавления первого бренда</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Название
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Описание
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата создания
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {brands.map((brand: Brand) => (
                  <tr key={brand._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {brand.name}
                        {brand.logoUrl && (
                          <img
                            src={brand.logoUrl}
                            alt={`${brand.name} logo`}
                            className="inline-block w-6 h-6 ml-2 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {brand.description}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {brand.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/brand/${brand._id}`}
                          className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
                          title="Просмотр"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/update-brand/${brand._id}`}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="Редактировать"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            handleDelete(brand._id);
                          }}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
    </div>
  );
};

export default Admin;
