import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Vestito Athena",
    price: "€ 129,00",
    image: "/images/products/dress-1.jpg",
    alt: "Vestito elegante Athena in seta dorata",
    tag: "Nuovi Arrivi",
  },
  {
    name: "Blusa Valentina",
    price: "€ 79,00",
    image: "/images/products/blouse-1.jpg",
    alt: "Blusa Valentina in seta rosa",
    tag: "Più Venduti",
  },
  {
    name: "Gonna Bianca Luna",
    price: "€ 89,00",
    image: "/images/products/skirt-1.jpg",
    alt: "Gonna bianca Luna in cotone pregiato",
    tag: null,
  },
  {
    name: "Giacca Roma",
    price: "€ 159,00",
    image: "/images/products/jacket-1.jpg",
    alt: "Giacca Roma in lana cognac",
    tag: null,
  },
  {
    name: "Pantaloni Sofia",
    price: "€ 99,00",
    image: "/images/products/pants-1.jpg",
    alt: "Pantaloni Sofia in cotone nude",
    tag: "Nuovi Arrivi",
  },
  {
    name: "Borsa Sera",
    price: "€ 69,00",
    image: "/images/products/bag-1.jpg",
    alt: "Borsa Sera in pelle rosa antico",
    tag: "Accessori",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/50 mb-3">
              Selezione Curata
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
              I Nostri<br /><span className="italic font-light">Preferiti</span>
            </h2>
          </div>
          <Link
            to="/collezione"
            className="font-body text-sm font-medium text-foreground/60 hover:text-foreground tracking-wide uppercase transition-colors underline underline-offset-4"
          >
            Vedi Tutto →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-background mb-4">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-body text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>
              <h3 className="font-heading text-lg md:text-xl font-medium text-foreground mb-1">
                {product.name}
              </h3>
              <p className="font-body text-sm text-foreground/60">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}