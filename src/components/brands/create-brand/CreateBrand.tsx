import { ArrowLeft, Plus, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { brandPayload } from '../../../interfaces/brand.interface';
import { createBrand } from '../../../redux/slices/brand.slice';
import { useAppDispatch } from '../../../redux/store';

export const CreateBrand = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      logoUrl: '',
    },
    mode: 'all',
  });

  const description = watch('description');
  const logoUrl = watch('logoUrl');

  const onSubmit = async (values: brandPayload) => {
    let description = '';
    let logoUrl = '';
    if (!values.description) {
      description = 'Без описания';
    } else {
      description = values.description;
    }
    if (!values.logoUrl) {
      logoUrl = 'https://www.svgrepo.com/show/443484/brand-thingiverse.svg';
    }

    try {
      const resultAction = await dispatch(
        createBrand({
          name: values.name,
          description: description,
          logoUrl: logoUrl,
        }),
      );
      if (createBrand.fulfilled.match(resultAction)) {
        nav('/admin');
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error as string,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Назад к списку брендов
        </button>

        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <Plus className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Создать новый бренд</h1>
            <p className="text-gray-600 mt-1">Заполните информацию о новом бренде</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
          {errors?.root &&
            typeof errors.root.message === 'string' &&
            errors.root.message.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Название бренда *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Название бренда обязательно' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Введите название бренда"
                />
                {errors.name && <p className="text-sm text-red-500 ml-2">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  URL логотипа
                </label>
                <input
                  id="logoUrl"
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="https://example.com/logo.png"
                  {...register('logoUrl')}
                />
                {logoUrl && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Предварительный просмотр:</p>
                    <img
                      src={logoUrl}
                      alt="logoUrl preview"
                      className="h-16 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {errors.logoUrl && (
                  <p className="text-sm text-red-500 ml-2">{errors.logoUrl.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Описание *
              </label>
              <textarea
                id="description"
                {...register('description')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                placeholder="Подробное описание бренда, его история, миссия и ценности..."
              />
              <div className="mt-2 text-sm text-gray-500">{description.length}/100 символов</div>{' '}
              {errors.description && (
                <p className="text-sm text-red-500 ml-2">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              Создать бренд
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
