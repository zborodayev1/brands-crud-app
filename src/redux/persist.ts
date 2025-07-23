import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'store',
  storage,
  blacklist: ['brands'],
};

export { persistConfig };
