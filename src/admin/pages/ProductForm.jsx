import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '@/admin/services/productService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const loadProduct = async () => {
        try {
          setLoading(true);
          const data = await productService.getById(Number(id));
          if (data) {
            setProduct(data);
          } else {
            setError('Prodotto non trovato');
          }
        } catch (err) {
          setError(err.message || 'Errore nel caricamento del prodotto');
        } finally {
          setLoading(false);
        }
      };

      loadProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!product.name || !product.price || !product.stock) {
      setError('Per favore completa tutti i campi obbligatori');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await productService.update(Number(id), product);
        setSuccess('Prodotto aggiornato correttamente');
      } else {
        await productService.create(product);
        setSuccess('Prodotto creato correttamente');
        setProduct({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          imageUrl: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Errore nel salvare il prodotto');
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
          {isEditMode ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate('/admin/prodotti')}
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrizione
          </label>
          <Textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Prezzo
            </label>
            <Input
              id="price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Scorta
            </label>
            <Input
              id="stock"
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <Select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 block w-full"
          >
            <option value="">Seleziona una categoria</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            <option value="calzado">Calzado</option>
            <option value="joyas">Joyas</option>
            <option value="otros">Otros</option>
          </Select>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL Immagine
          </label>
          <Input
            id="imageUrl"
            type="url"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/immagine.jpg"
            className="mt-1 block w-full"
          />
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
            onClick={() => navigate('/admin/prodotti')}
          >
            Annulla
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
