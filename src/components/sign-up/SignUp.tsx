import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../redux/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { PasswordStrengthBar } from '../../ui/password';
import { getPasswordStrength } from '../../utils/password';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const status = useAppSelector((state) => state.auth.status);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const password = watch('password');
  const passwordStrength = useMemo(() => getPasswordStrength(password || ''), [password]);

  const onSubmit = async (values: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    if (passwordStrength < 4) {
      setError('password', {
        type: 'manual',
        message: 'Password must be stronger',
      });
      return;
    }
    try {
      const { confirmPassword, ...data } = values;
      await dispatch(signUp(data)).unwrap();
      nav('/');
    } catch (err: unknown) {
      setError('root', {
        type: 'manual',
        message: err as string,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-12  px-8">
      <div className="max-w-lg w-full ">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Создать аккаунт</h2>
          <p className="mt-2 text-sm text-gray-600">Зарегистрируйтесь для доступа к системе</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && errors.root?.message?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{errors.root.message}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Полное имя
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName', { required: 'Полное имя обязательно' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Введите полное имя"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 ml-2">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email адрес
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email адрес обязателен',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Неправельный email адрес',
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Введите email адрес"
              />
              {errors.email && <p className="text-sm text-red-500 ml-2">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Пароль обязателен',
                    minLength: {
                      value: 8,
                      message: 'Пароль должен быть больше 8 символов',
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Введите пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-500 ml-2">{errors.password.message}</p>
                )}
              </div>
              <PasswordStrengthBar strength={passwordStrength} />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Подтвердите пароль
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Подтвердите пароль',
                    minLength: {
                      value: 8,
                      message: 'Пароль должен быть больше 8 символов',
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Подтвердите пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 ml-2">{errors.confirmPassword.message}</p>
                )}
              </div>
              <PasswordStrengthBar strength={passwordStrength} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
          </button>

          <div className="text-center">
            <Link
              to="/sign-in"
              className="text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
