import { Search, X } from 'lucide-react';
import React from 'react';
import { PaginationType } from '../redux/slices/brand.slice';

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

export const Pagination: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  pagination,
  setPagination,
}) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-8 mr-5">
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Поиск бренда..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                search: searchInput,
                page: 1,
              }))
            }
            className="bg-blue-600 text-white px-3 rounded-r-md flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                setPagination((prev) => ({
                  ...prev,
                  search: '',
                  page: 1,
                }));
              }}
              type="button"
              className="p-2 mx-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
            >
              <X />
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Сортировать по</label>
          <select
            value={pagination.sortBy}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                sortBy: e.target.value as 'createdAt' | 'updatedAt' | 'name',
                page: 1,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="createdAt">Дате создания</option>
            <option value="updatedAt">Дате обновления</option>
            <option value="name">Названию</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Порядок</label>
          <select
            value={pagination.sortOrder}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                sortOrder: e.target.value as 'asc' | 'desc',
                page: 1,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">На странице</label>
          <select
            value={pagination.limit}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                limit: Number(e.target.value),
                page: 1,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};
