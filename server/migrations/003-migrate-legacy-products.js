const categoryMap = {
  'ropa': 'vestiti',
  'accesorios': 'accessori',
  'calzado': 'accessori',
  'joyas': 'accessori',
  'otros': 'accessori',
};

const up = async (models) => {
  const { Product } = models;

  const products = await Product.find();

  for (const product of products) {
    const updates = {};

    if (product.imageUrl && (!product.images || product.images.length === 0)) {
      updates.images = [product.imageUrl];
    }

    if (product.category && categoryMap[product.category]) {
      updates.category = categoryMap[product.category];
    }

    if (Object.keys(updates).length > 0) {
      await Product.updateOne({ _id: product._id }, { $set: updates });
      console.log(`  ✅ Aggiornato: ${product.name}`);
    }
  }

  console.log('  ✅ Migrazione prodotti legacy completata');
};

export default { name: '003-migrate-legacy-products', up };
