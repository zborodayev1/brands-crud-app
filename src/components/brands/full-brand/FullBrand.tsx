import { ArrowLeft, Calendar, Edit2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteBrand, getBrands, getOneBrand } from '../../../redux/slices/brand.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

export const FullBrand = () => {
  const { id } = useParams();
  const fullBrand = useAppSelector((state) => state.brands.fullBrand);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (id) {
      const resultAction = await dispatch(deleteBrand(id));
      if (deleteBrand.fulfilled.match(resultAction)) {
        nav('/admin');
        dispatch(
          getBrands({
            page: 1,
            limit: 10,
            sortBy: 'createdAt',
            sortOrder: 'desc',
            search: '',
          }),
        );
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getOneBrand(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!fullBrand) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fullBrand, loading]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading || !fullBrand ? (
        <div></div>
      ) : (
        <>
          <div className="mb-6">
            <Link
              to="/admin"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Назад к списку брендов
            </Link>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{fullBrand.name}</h1>
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  Создан: {fullBrand.createdAt}
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/update-brand/${fullBrand._id}`}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Редактировать
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Описание</h2>
                  <p className="text-gray-700 leading-relaxed break-all text-lg">
                    {fullBrand.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Информация</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-medium text-gray-900">#{fullBrand._id}</span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Название:</span>
                        <span className="font-medium text-gray-900">{fullBrand.name}</span>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-600">Дата создания:</span>
                        <span className="font-medium text-gray-900">{fullBrand.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Логотип</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <img
                      src={fullBrand.logoUrl}
                      alt={`${fullBrand.name} logo`}
                      className="max-w-full h-24 mx-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
