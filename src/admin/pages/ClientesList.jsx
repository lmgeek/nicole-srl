import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

const ClientesList = () => {
  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClienti = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const clientiData = [
        {
          id: 1,
          nome: "María González",
          email: "maria.gonzalez@email.com",
          telefono: "+34 600 111 222",
          indirizzo: "Calle Mayor 123, Madrid",
          dataRegistrazione: "2026-01-15",
          acquisti: 5,
          totaleSpeso: 450.00
        },
        {
          id: 2,
          nome: "Carlos Méndez",
          email: "carlos.mendez@email.com",
          telefono: "+34 600 333 444",
          indirizzo: "Avenida Diagonal 456, Barcelona",
          dataRegistrazione: "2026-02-20",
          acquisti: 3,
          totaleSpeso: 280.50
        },
        {
          id: 3,
          nome: "Laura Fernández",
          email: "laura.fernandez@email.com",
          telefono: "+34 600 555 666",
          indirizzo: "Plaza España 789, Sevilla",
          dataRegistrazione: "2026-03-10",
          acquisti: 8,
          totaleSpeso: 1200.75
        }
      ];
      
      setClienti(clientiData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Errore nel caricamento dei clienti');
      setClienti([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo cliente?')) {
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setClienti(clienti.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione del cliente');
    }
  };

  useEffect(() => {
    fetchClienti();
  }, []);

  if (loading) return <div className="text-center py-12">Caricamento...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Elenco dei Clienti</h1>
        <Link to="/admin/clienti/nuovo" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Nuovo Cliente
        </Link>
      </div>

      {clienti.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Nessun cliente registrato.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indirizzo</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acquisti</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Totale Speso</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clienti.map(cliente => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{cliente.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{cliente.nome}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{cliente.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{cliente.telefono}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{cliente.indirizzo}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{cliente.acquisti}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">€{cliente.totaleSpeso.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-right space-x-2">
                    <Link to={`/admin/clienti/${cliente.id}/modifica`} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-900 p-1">
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <button onClick={() => handleDelete(cliente.id)} className="flex items-center space-x-2 text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
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

export default ClientesList;
