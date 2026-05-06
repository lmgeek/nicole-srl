import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Tacchi",
    subtitle: "Eleganza classica",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/36af1a70c_generated_60b2ae0e.png",
    alt: "Scarpa col tacco in pelle rosa su sfondo terracotta"
  },
  {
    name: "Stivali",
    subtitle: "Stile audace",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/63d8a4e4a_generated_ea3c96ee.png",
    alt: "Stivaletto in pelle cognac su superficie di marmo"
  },
  {
    name: "Sandali",
    subtitle: "Freschezza estiva",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/fa483cd14_generated_01c797d3.png",
    alt: "Sandalo flat in pelle dorata su tessuto di lino"
  },
  {
    name: "Zeppe",
    subtitle: "Comfort e stile",
    image: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/1474a42a1_generated_87dece0d.png",
    alt: "Espadrille con zeppa in juta e pelle crema"
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/50 mb-3">
            Categorie
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
            Esplora il<br /><span className="italic font-light">Nostro Mondo</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to="/collezione"
                className="group block relative overflow-hidden rounded-2xl aspect-[3/4] bg-card"
              >
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary-foreground/70 mb-1">
                    {cat.subtitle}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-primary-foreground">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}