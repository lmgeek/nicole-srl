const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initialProducts = [
  {
    id: 1,
    name: "Vestito di Seta Elegante",
    description: "Vestito da sera in pura seta con dettagli in pizzo.",
    price: 129.99,
    stock: 15,
    category: "ropa",
    imageUrl: "https://example.com/vestito-seta.jpg",
    createdAt: "2026-05-01T10:00:00Z",
    updatedAt: "2026-05-01T10:00:00Z"
  },
  {
    id: 2,
    name: "Bolso di Cuoio Artigianale",
    description: "Borsa a mano fatta a mano con cuoio genuino.",
    price: 89.50,
    stock: 8,
    category: "accesorios",
    imageUrl: "https://example.com/bolso-cuoio.jpg",
    createdAt: "2026-05-02T14:30:00Z",
    updatedAt: "2026-05-02T14:30:00Z"
  },
  {
    id: 3,
    name: "Scarpe con Tacco Classico",
    description: "Scarpe col tacco alto per occasioni speciali.",
    price: 65.00,
    stock: 12,
    category: "calzado",
    imageUrl: "https://example.com/scarpe-tacco.jpg",
    createdAt: "2026-05-03T09:15:00Z",
    updatedAt: "2026-05-03T09:15:00Z"
  }
];

let products = [...initialProducts];

export const productService = {
  getAll: async () => {
    await delay(500);
    return [...products];
  },

  getById: async (id) => {
    await delay(500);
    const product = products.find(p => p.id === id);
    return product ? { ...product } : null;
  },

  create: async (productData) => {
    await delay(500);
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    return newProduct;
  },

  update: async (id, productData) => {
    await delay(500);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    const updatedProduct = {
      ...products[index],
      ...productData,
      id,
      updatedAt: new Date().toISOString()
    };
    products[index] = updatedProduct;
    return updatedProduct;
  },

  delete: async (id) => {
    await delay(500);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    products = products.filter(p => p.id !== id);
    return id;
  }
};
