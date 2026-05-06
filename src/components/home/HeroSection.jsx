import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69fa8bb77746872ce1649864/4532eca80_generated_464f8b13.png"
          alt="Scarpe eleganti da donna su strada italiana al tramonto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='3' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-foreground/70 mb-6"
          >
            Abbigliamento e Accessori
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-[0.9] tracking-tight mb-8"
          >
            L'Eleganza
            <br />
            <span className="italic font-light">ai Tuoi</span>
            <br />
            Piedi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-body text-base md:text-lg text-foreground/70 leading-relaxed max-w-md mb-10"
          >
            Scopri la collezione esclusiva di calzature e accessori firmati Nicole Trend Shop. Stile italiano, eleganza senza tempo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/collezione"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-all group"
            >
              Scopri la Collezione
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40">Scorri</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
}