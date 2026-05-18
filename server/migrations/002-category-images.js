const up = async (models) => {
  const { Category } = models;

  const categoryImages = [
    { slug: 'tutto', image: '/images/products/dress-2.jpg' },
    { slug: 'vestiti', image: '/images/products/dress-1.jpg' },
    { slug: 'bluse', image: '/images/products/blouse-1.jpg' },
    { slug: 'gonne', image: '/images/products/skirt-1.jpg' },
    { slug: 'pantaloni', image: '/images/products/pants-1.jpg' },
    { slug: 'giacche', image: '/images/products/jacket-1.jpg' },
    { slug: 'accessori', image: '/images/products/bag-1.jpg' },
  ];

  for (const item of categoryImages) {
    await Category.updateOne(
      { slug: item.slug },
      { $set: { image: item.image } }
    );
  }

  console.log('  ✅ Immagini categorie aggiornate');
};

export default { name: '002-category-images', up };
