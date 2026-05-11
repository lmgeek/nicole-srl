import React, { useState, useEffect } from 'react';
import { productService } from '@/admin/services/productService';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Check } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const allCategories = ['ropa', 'accesorios', 'calzado', 'joyas', 'otros'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Errore nel caricamento dei prodotti');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      return;
    }

    try {
      await productService.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione del prodotto');
    }
  };

  const filteredProducts = selectedCategories.length === 0 
    ? products 
    : products.filter(product => selectedCategories.includes(product.category));

  const groupedProducts = selectedCategories.length > 0 
    ? Object.entries(
        filteredProducts.reduce((acc, product) => {
          const category = product.category || 'N/A';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {})
      )
    : [];

  if (loading) return <div className="text-center py-12">Caricamento...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Elenco dei Prodotti</h1>
        <div className="flex justify-between items-center">
          <Link to="/admin/prodotti/nuovo" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Nuovo Prodotto
          </Link>
          <div className="space-x-2">
            {allCategories.map(category => (
              <label key={category} className="flex items-center text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
                    }
                  }}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Nessun prodotto trovato per le categorie selezionate.
        </div>
      ) : (
        <div className="overflow-x-auto">
          {selectedCategories.length > 0 && groupedProducts.length > 0 ? (
            <>
              {groupedProducts.map(([category, productsInCategory]) => (
                <div key={category} className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    {category.charAt(0).toUpperCase() + category.slice(1)} 
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded ml-2">
                      ({productsInCategory.length})
                    </span>
                  </h2>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prezzo</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scorta</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productsInCategory.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">{product.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{product.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">€{product.price?.toFixed(2) || '0.00'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{product.stock || 0}</td>
                          <td className="py-3 px-4 text-sm text-right space-x-2">
                            <Link to={`/admin/prodotti/${product.id}/modifica`} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-900 p-1">
                              <Edit2 className="h-4 w-4" />
                            </Link>
                            <button onClick={() => handleDelete(product.id)} className="flex items-center space-x-2 text-red-600 hover:text-red-900 p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prezzo</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scorta</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{product.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">€{product.price?.toFixed(2) || '0.00'}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{product.stock || 0}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{product.category || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-right space-x-2">
                      <Link to={`/admin/prodotti/${product.id}/modifica`} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-900 p-1">
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="flex items-center space-x-2 text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
