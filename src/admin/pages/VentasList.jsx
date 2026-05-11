import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

const VentasList = () => {
  const [vendite, setVendite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendite = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const venditeData = [
        {
          id: 1,
          cliente: "María González",
          prodotto: "Vestito di Seta Elegante",
          quantita: 1,
          totale: 129.99,
          stato: "Completato"
        },
        {
          id: 2,
          cliente: "Carlos Méndez",
          prodotto: "Bolso di Cuoio Artigianale",
          quantita: 2,
          totale: 179.00,
          stato: "In sospeso"
        },
        {
          id: 3,
          cliente: "Laura Fernández",
          prodotto: "Scarpe con Tacco Classico",
          quantita: 1,
          totale: 65.00,
          stato: "Completato"
        },
        {
          id: 4,
          cliente: "María González",
          prodotto: "Scarpe con Tacco Classico",
          quantita: 1,
          totale: 65.00,
          stato: "Spedito"
        }
      ];
      
      setVendite(venditeData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Errore nel caricamento delle vendite');
      setVendite([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa vendita?')) {
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setVendite(vendite.filter(v => v.id !== id));
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione della vendita');
    }
  };

  useEffect(() => {
    fetchVendite();
  }, []);

  if (loading) return <div className="text-center py-12">Caricamento...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Elenco delle Vendite</h1>
        <Link to="/admin/vendite/nuovo" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Nuova Vendita
        </Link>
      </div>

      {vendite.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Nessuna vendita registrata.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodotto</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantità</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Totale</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendite.map(vendita => (
                <tr key={vendita.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{vendita.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{vendita.cliente}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{vendita.prodotto}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700">{vendita.quantita}</td>
                  <td className="py-3 px-4 text-right text-sm text-gray-700">€{vendita.totale.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${vendita.stato === 'Completato' ? 'bg-green-100 text-green-800' : 
                        vendita.stato === 'In sospeso' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {vendita.stato}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right space-x-2">
                    <Link to={`/admin/vendite/${vendita.id}/modifica`} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-900 p-1">
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <button onClick={() => handleDelete(vendita.id)} className="flex items-center space-x-2 text-red-600 hover:text-red-900 p-1">
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

export default VentasList;
