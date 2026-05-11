import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center h-10">
            <span className="text-xl font-semibold text-gray-800">Pannello Admin</span>
          </div>
        </div>
        <nav className="mt-5 space-y-1">
          <NavLink
            to="/admin/prodotti"
            className={( { isActive } ) =>
              isActive
                ? 'flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-indigo-50 rounded-md hover:bg-indigo-100 hover:text-indigo-900'
                : 'flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
          >
            Prodotti
          </NavLink>
          <NavLink
            to="/admin/utenti"
            className={( { isActive } ) =>
              isActive
                ? 'flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-indigo-50 rounded-md hover:bg-indigo-100 hover:text-indigo-900'
                : 'flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
          >
            Utenti
          </NavLink>
          <NavLink
            to="/admin/clienti"
            className={( { isActive } ) =>
              isActive
                ? 'flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-indigo-50 rounded-md hover:bg-indigo-100 hover:text-indigo-900'
                : 'flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
          >
            Clienti
          </NavLink>
          <NavLink
            to="/admin/vendite"
            className={( { isActive } ) =>
              isActive
                ? 'flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-indigo-50 rounded-md hover:bg-indigo-100 hover:text-indigo-900'
                : 'flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
          >
            Vendite
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user?.username || 'Administratore'}
                </span>
                <button
                  onClick={() => logout()}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Esci
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto min-h-[calc(100%-5rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
