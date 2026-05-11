import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Vestito di Seta Elegante",
    description: "Vestito da sera in pura seta con dettagli in pizzo. Perfetto per occasioni speciali e serate eleganti.",
    price: 129.99,
    imageUrl: "/images/products/dress-1.jpg",
  },
  {
    id: 2,
    name: "Bolso di Cuoio Artigianale",
    description: "Borsa a mano fatta a mano con cuoio genuino. Design unico e raffinato per ogni occasione.",
    price: 89.50,
    imageUrl: "/images/products/bag-1.jpg",
  },
  {
    id: 3,
    name: "Giacca in Vera Pelle",
    description: "Giacca in pelle genuina con finiture artigianali. Eleganza e stile per il tuo guardaroba.",
    price: 149.00,
    imageUrl: "/images/products/jacket-1.jpg",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const product = featuredProducts[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Product Info Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-md rounded-3xl bg-white/50 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-body text-xs tracking-[0.3em] uppercase text-foreground/70 mb-4"
            >
              Prodotto in Evidenza
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-4"
            >
              {product.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-body text-base text-foreground/80 leading-relaxed mb-6 line-clamp-3"
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <span className="font-heading text-2xl font-semibold text-foreground">
                €{product.price.toFixed(2)}
              </span>
              <Link
                to={`/product/${product.id}`}
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-body text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy Now
              </Link>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-6 justify-center">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-foreground w-6" : "bg-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/60">Scorri</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-white/40"
        />
      </motion.div>
    </section>
  );
}