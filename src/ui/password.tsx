import clsx from 'clsx';
import React from 'react';

interface Props {
  strength: number;
}

const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];
const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

export const PasswordStrengthBar: React.FC<Props> = ({ strength }) => (
  <div className="mt-2">
    <div className="flex space-x-1 mb-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded ${i < strength ? colors[strength - 1] : 'bg-gray-700'}`}
        />
      ))}
    </div>
    <p className="text-xs text-gray-400">
      Password strength:{' '}
      <span
        className={clsx({
          'text-green-500': strength === 5,
          'text-green-400': strength === 4,
          'text-yellow-500': strength === 3,
          'text-red-400': strength === 2,
          'text-red-500': strength === 1,
          'text-gray-400': strength === 0,
        })}
      >
        {strength > 0 ? labels[strength - 1] : 'none'}
      </span>
    </p>
  </div>
);
