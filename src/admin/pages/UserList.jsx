import React, { useState, useEffect } from 'react';
import { userService } from '@/admin/services/userService';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getAll();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Errore nel caricamento degli utenti');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      return;
    }

    try {
      await userService.delete(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione dell\'utente');
    }
  };

  if (loading) return <div className="text-center py-12">Caricamento...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Elenco degli Utenti</h1>
        <Link to="/admin/utenti/nuovo" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Nuovo Utente
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Nessun utente registrato.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Utente</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruolo</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Creazione</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{user.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{user.username}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role === 'admin' ? 'Amministratore' : 'Utente'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {new Date(user.createdAt || 0).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-right space-x-2">
                    <Link to={`/admin/utenti/${user.id}/modifica`} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-900 p-1">
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    {!((users.filter(u => u.role === 'admin').length <= 1 && user.role === 'admin') ||
                      (user.username === 'admin' && users.length === 1)) && (
                      <button onClick={() => handleDelete(user.id)} className="flex items-center space-x-2 text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
