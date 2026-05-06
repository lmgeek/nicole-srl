import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const instagramImages = [
  {
    src: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/36af1a70c_generated_60b2ae0e.png",
    alt: "Tacco elegante rosa su sfondo terracotta",
  },
  {
    src: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/e02d0b9cc_generated_a27049c2.png",
    alt: "Donna elegante con scarpe italiane in piazza",
  },
  {
    src: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/fa483cd14_generated_01c797d3.png",
    alt: "Sandali dorati su lino naturale",
  },
  {
    src: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/82e4fa9b8_generated_f7e47174.png",
    alt: "Donna seduta su gradini di marmo con sandali",
  },
  {
    src: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/297c8416e_generated_ad44a7a4.png",
    alt: "Pochette in pelle rosa antico",
  },
  {
    src: "https://media.base44.com/images/public/69fa8bb77746872ce1649864/66807b05b_generated_01207e77.png",
    alt: "Sneakers bianche in pelle pregiata",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/50 mb-3">
            Seguici su Instagram
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            @nicoletrend.shop
          </h2>
          <p className="font-body text-sm text-foreground/60 max-w-md mx-auto">
            Unisciti alla nostra community e scopri le ultime tendenze in anteprima
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramImages.map((img, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/nicoletrend.shop/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://www.instagram.com/nicoletrend.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            Seguici
          </a>
        </motion.div>
      </div>

      <div
  dangerouslySetInnerHTML={{
    __html: `
      <blockquote class="instagram-media">
        <a href="https://www.instagram.com/p/nicoletrend.shop/"></a>
      </blockquote>
    `
  }}
/>

    </section>
  );
}