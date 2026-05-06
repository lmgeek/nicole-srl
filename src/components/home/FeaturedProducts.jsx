import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Sandalo Athena",
    price: "€ 89,00",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/fa483cd14_generated_01c797d3.png",
    alt: "Sandalo elegante Athena in pelle dorata",
    tag: "Nuovi Arrivi",
  },
  {
    name: "Tacco Valentina",
    price: "€ 129,00",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/36af1a70c_generated_60b2ae0e.png",
    alt: "Scarpa col tacco Valentina in pelle rosa",
    tag: "Più Venduti",
  },
  {
    name: "Sneaker Bianca Luna",
    price: "€ 79,00",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/66807b05b_generated_01207e77.png",
    alt: "Sneaker bianca Luna in pelle pregiata",
    tag: null,
  },
  {
    name: "Stivaletto Roma",
    price: "€ 159,00",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/63d8a4e4a_generated_ea3c96ee.png",
    alt: "Stivaletto Roma in pelle cognac",
    tag: null,
  },
  {
    name: "Ballerina Sofia",
    price: "€ 69,00",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/c3e400616_generated_33d903ca.png",
    alt: "Ballerina Sofia in pelle nude",
    tag: "Nuovi Arrivi",
  },
  {
    name: "Pochette Sera",
    price: "€ 59,00",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/297c8416e_generated_ad44a7a4.png",
    alt: "Pochette Sera in pelle rosa antico",
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