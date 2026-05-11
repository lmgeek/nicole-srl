import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '@/admin/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const isEditMode = !!id;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const loadUser = async () => {
        try {
          setLoading(true);
          const data = await userService.getById(Number(id));
          if (data) {
            setUser({
              username: data.username,
              role: data.role,
            });
          } else {
            setError('Utente non trovato');
          }
        } catch (err) {
          setError(err.message || 'Errore nel caricamento dell\'utente');
        } finally {
          setLoading(false);
        }
      };

      loadUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user.username) {
      setError('Per favore inserisci un nome utente');
      return;
    }

    if (!isEditMode && !user.password) {
      setError('Per favore inserisci una password');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        const updateData = {
          username: user.username,
          role: user.role
        };
        if (user.password && user.password.trim() !== '') {
          updateData.password = user.password;
        }
        
        await userService.update(Number(id), updateData);
        setSuccess('Utente aggiornato correttamente');
      } else {
        await userService.create(user);
        setSuccess('Utente creato correttamente');
        setUser({
          username: '',
          password: '',
          role: 'user'
        });
      }
    } catch (err) {
      setError(err.message || 'Errore nel salvare l\'utente');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="text-center py-12">Caricamento...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Modifica Utente' : 'Nuovo Utente'}
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate('/admin/utenti')}
          className="mr-2"
        >
          Torna alla lista
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Nome utente
          </label>
          <Input
            id="username"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        {!isEditMode || (isEditMode && showPassword) ? (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder={isEditMode ? 'Lascia vuoto per mantenere l\'attuale' : ''}
                required={!isEditMode}
                className="mt-1 block w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-0 mt-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Nascondi' : 'Mostra'}
              </button>
            </div>
          </div>
        ) : null}

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Ruolo
          </label>
          <Select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="mt-1 block w-full"
          >
            <option value="user">Utente</option>
            <option value="admin">Amministratore</option>
          </Select>
        </div>

        <div className="flex items-center">
          <Button
            type="submit"
            disabled={loading}
            className="mr-2"
          >
            {loading ? 'Salvataggio...' : isEditMode ? 'Aggiorna' : 'Crea'}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/utenti')}
          >
            Annulla
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
