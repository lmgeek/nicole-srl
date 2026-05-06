import { motion } from "framer-motion";

export default function LifestyleSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src="https://media.base44.com/images/public/69fa8bb77746872ce1649864/e02d0b9cc_generated_a27049c2.png"
                alt="Donna elegante che cammina per una piazza italiana al tramonto"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden mt-8"
            >
              <img
                src="https://media.base44.com/images/public/69fa8bb77746872ce1649864/4ce767324_generated_50ec7120.png"
                alt="Borsa e scarpe in pelle caramello su marmo con luce dorata"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:pl-12"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/50 mb-3">
              La Nostra Filosofia
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-8">
              Lo Stile È<br /><span className="italic font-light">Un'Attitudine</span>
            </h2>
            <p className="font-body text-base text-foreground/70 leading-relaxed mb-6 max-w-lg">
              Da Nicole Trend Shop, ogni pezzo viene selezionato con cura per offrirti il meglio della moda italiana. Crediamo che l'eleganza non sia solo ciò che indossi, ma come lo indossi.
            </p>
            <p className="font-body text-base text-foreground/70 leading-relaxed max-w-lg">
              Le nostre collezioni combinano artigianalità e tendenze contemporanee, per una donna che non segue la moda — la definisce.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}