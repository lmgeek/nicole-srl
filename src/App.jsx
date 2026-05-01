import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.666.116.471-.074 1.608-.695 1.835-1.388.227-.692.227-1.284.153-1.399-.074-.114-.27-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            <img src="/nicole_logo.png" alt="NICOLE SRL" />
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <li onClick={() => scrollToSection('home')}>Home</li>
            <li onClick={() => scrollToSection('chi-siamo')}>Chi Siamo</li>
            <li onClick={() => scrollToSection('servizi')}>Servizi</li>
            <li onClick={() => scrollToSection('collezioni')}>Collezioni</li>
            <li onClick={() => scrollToSection('contatti')}>Contatti</li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-bg" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80)'}}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Eleganza e Stile a Terracina</h1>
          <p>Scopri le ultime tendenze della moda nel cuore di Terracina</p>
          <button className="cta-button" onClick={() => scrollToSection('collezioni')}>
            Scopri le Collezioni
          </button>
        </div>
      </section>

      <section id="chi-siamo" className="chi-siamo">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">La Nostra Storia</span>
            <h2>Benvenuti da NICOLE SRL</h2>
          </div>
          <div className="chi-siamo-grid">
            <div className="chi-siamo-image">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Negozio NICOLE SRL" />
              <div className="image-frame"></div>
            </div>
            <div className="chi-siamo-text">
              <p>
                Da più di vent'anni NICOLE SRL rappresenta il punto di riferimento per la moda a Terracina. 
                La nostra passione per l'eleganza e la qualità ci ha permesso di costruire un rapporto solido 
                con una clientela fedele che ci considera il proprio stylist di fiducia.
              </p>
              <p>
                Nel nostro negozio troverai un'accurata selezione di capi d'abbigliamento, accessori e calzature 
                delle migliori marche, accuratamente scelti per soddisfare ogni esigenza di stile. Il nostro 
                team è sempre pronto ad accoglerti con professionalità e disponibilità.
              </p>
              <div className="values">
                <div className="value-item">
                  <span className="value-number">20+</span>
                  <span className="value-label">Anni di esperienza</span>
                </div>
                <div className="value-item">
                  <span className="value-number">50+</span>
                  <span className="value-label">Brand selezionati</span>
                </div>
                <div className="value-item">
                  <span className="value-number">10k+</span>
                  <span className="value-label">Clienti soddisfatti</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servizi" className="servizi">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Cosa Offriamo</span>
            <h2>I Nostri Servizi</h2>
          </div>
          <div className="servizi-grid">
            <div className="servizio-card">
              <div className="servizio-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Consulenza di Stile Personale</h3>
              <p>I nostri esperti ti aiutano a trovare il look perfetto per ogni occasione, consigliandoti capi e accessori che valorizzano la tua figura e il tuo stile personale.</p>
            </div>
            <div className="servizio-card">
              <div className="servizio-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <h3>Ampia Scelta di Brand</h3>
              <p>Selezioniamo i migliori marchi nazionali e internazionali per offrirti sempre le ultime tendenze e capi di alta qualità.</p>
            </div>
            <div className="servizio-card">
              <div className="servizio-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>Politica Resi Flessibile</h3>
              <p>Acquista con tranquillità: offriamo una politica di resi semplice e veloce per garantire la tua piena soddisfazione.</p>
            </div>
            <div className="servizio-card">
              <div className="servizio-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <h3>Pronto Intervento Moda</h3>
              <p>Hai un evento importante? Ti aiutiamo a trovare l'outfit perfetto in tempi rapidi, con un servizio personalizzato e attento alle tue esigenze.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="collezioni" className="collezioni">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Le Nostre Proposte</span>
            <h2>Le Collezioni</h2>
          </div>
          <div className="collezioni-grid">
            <div className="collezione-card donna">
              <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80" alt="Donna" />
              <div className="collezione-overlay">
                <h3>Donna</h3>
                <p>Eleganza e femminilità per ogni occasione</p>
              </div>
            </div>
            <div className="collezione-card uomo">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="Uomo" />
              <div className="collezione-overlay">
                <h3>Uomo</h3>
                <p>Classico e moderno per l'uomo sofisticato</p>
              </div>
            </div>
            <div className="collezione-card accessori">
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" alt="Accessori" />
              <div className="collezione-overlay">
                <h3>Accessori</h3>
                <p>Borse, gioielli e dettagli che fanno la differenza</p>
              </div>
            </div>
            <div className="collezione-card novita">
              <img src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80" alt="Novità" />
              <div className="collezione-overlay">
                <h3>Novità</h3>
                <p>Le ultime tendenze appena arrivate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contatti" className="contatti">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Resta in Contatto</span>
            <h2>Contattaci</h2>
          </div>
          <div className="contatti-grid">
            <div className="contatti-info">
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h4>Indirizzo</h4>
                  <p>Terracina, Latina<br/>Lazio, Italia</p>
                </div>
              </div>
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h4>Telefono</h4>
                  <p>+39 0773 70XXXX</p>
                </div>
              </div>
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>info@nicole-srl.it</p>
                </div>
              </div>
              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <h4>Orari di Apertura</h4>
                  <p>Lunedì - Sabato<br/>09:00 - 13:00 | 16:00 - 20:00</p>
                </div>
              </div>
            </div>
            <div className="contatti-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" placeholder="Nome e Cognome" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Telefono" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Messaggio" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-button">Invia Messaggio</button>
              </form>
            </div>
          </div>
          <div className="mappa">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.5!2d12.9!3d41.5333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1320a5d4e4a4a4a1%3A0x4a4a4a4a4a4a4a4a!2sTerracina%2C%20Latina%2C%20Lazio%2C%20Italia!5e0!3m2!1sit!2sit!4v1630000000000!5m2!1sit!2sit" 
              width="100%" 
              height="350" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa di Terracina"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo"><img src="/nicole_logo.png" alt="NICOLE SRL" /></div>
            <div className="footer-social">
              <a href="https://wa.me/393000000000" className="social-link" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 NICOLE SRL. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App