'use client';

import { useAuth } from '@/context/AuthContext';

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-end px-8">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900">{user?.name || user?.email}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold text-sm">
          {(user?.name || user?.email || '?').charAt(0).toUpperCase()}
        </div>
        <button
          onClick={logout}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 ml-2"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
