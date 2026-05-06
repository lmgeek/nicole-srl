import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const CATEGORIES = ["Tutto", "Tacchi", "Sandali", "Stivali", "Sneakers", "Ballerine", "Accessori"];

const PRODUCTS = [
  { name: "Sandalo Athena", price: "€ 89,00", category: "Sandali", image: "https://picsum.photos/seed/fa483cd14/600/800", alt: "Sandalo Athena in pelle dorata" },
  { name: "Tacco Valentina", price: "€ 129,00", category: "Tacchi", image: "https://picsum.photos/seed/36af1a70c/600/800", alt: "Tacco Valentina in pelle rosa" },
  { name: "Sneaker Luna", price: "€ 79,00", category: "Sneakers", image: "https://picsum.photos/seed/66807b05b/600/800", alt: "Sneaker bianca Luna in pelle" },
  { name: "Stivaletto Roma", price: "€ 159,00", category: "Stivali", image: "https://picsum.photos/seed/63d8a4e4a/600/800", alt: "Stivaletto Roma in pelle cognac" },
  { name: "Ballerina Sofia", price: "€ 69,00", category: "Ballerine", image: "https://picsum.photos/seed/c3e400616/600/800", alt: "Ballerina Sofia in pelle nude" },
  { name: "Pochette Sera", price: "€ 59,00", category: "Accessori", image: "https://picsum.photos/seed/297c8416e/600/800", alt: "Pochette Sera in pelle rosa antico" },
  { name: "Zeppa Estate", price: "€ 99,00", category: "Sandali", image: "https://picsum.photos/seed/1474a42a1/600/800", alt: "Espadrille con zeppa in jute e pelle" },
  { name: "Tacco Firenze", price: "€ 139,00", category: "Tacchi", image: "https://picsum.photos/seed/36af1a70c/600/800", alt: "Tacco elegante Firenze" },
];

export default function Collezione() {
  const [activeFilter, setActiveFilter] = useState("Tutto");

  const filtered = activeFilter === "Tutto"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-28 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/50 mb-3">
              Abbigliamento e Accessori
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground leading-tight">
              La Nostra<br /><span className="italic font-light">Collezione</span>
            </h1>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-body text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-all ${
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground/60 hover:text-foreground hover:bg-card/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, index) => (
              <motion.div
                key={product.name + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                 <div className="shadow-lg">
                   <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card mb-4">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-primary/80 text-primary-foreground font-body text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                   </div>
                 </div>
                 <h3 className="font-heading text-base md:text-lg font-medium text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-foreground/60">{product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}