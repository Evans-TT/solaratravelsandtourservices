"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays, Check, Clock3, FileCheck2, Globe2, Headphones, Hotel, Mail,
  Map, MapPin, Menu, MessageCircle, Phone, Plane, Printer, Search, ShieldCheck,
  Sparkles, TicketCheck, X,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

type Visa = {
  country: string;
  label: string;
  mode: string;
  price: string;
  processing: string;
  validity: string;
  entry: string;
  flag: string;
  region: string;
  image: string;
  requirements: string[];
};

const whatsappNumber = "27612017515";
const whatsapp = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const visas: Visa[] = [
  {
    country: "Qatar", label: "Qatar eVisa", mode: "eVisa", price: "N120,000",
    processing: "5 days", validity: "90 days", entry: "Single entry", flag: "🇶🇦", region: "Middle East", image: "/destinations/qatar.jpg",
    requirements: ["Passport data page", "Passport photograph on a white background", "Confirmed return flight ticket", "Hotel booking (must be confirmed by us)"],
  },
  {
    country: "Tanzania", label: "Tanzania eVisa", mode: "eVisa", price: "N250,000",
    processing: "7 working days", validity: "90 days", entry: "Single entry", flag: "🇹🇿", region: "Africa", image: "/destinations/tanzania.jpg",
    requirements: ["International passport bio page, valid for at least 6 months", "Recent passport photograph on a white background", "Hotel booking confirmation matching your travel dates", "Round-trip flight ticket"],
  },
  {
    country: "South Africa", label: "South Africa eVisa", mode: "eVisa", price: "N1,000,000",
    processing: "5–10 working days", validity: "30–90 days", entry: "Single / multiple", flag: "🇿🇦", region: "Africa", image: "/destinations/south-africa.jpg",
    requirements: ["Valid international passport data page", "Passport photograph on a white background", "Three months bank statement", "Yellow Fever Card (compulsory)"],
  },
  {
    country: "Kenya", label: "Kenya eTA", mode: "eTA", price: "N100,000",
    processing: "1–3 days", validity: "90 days", entry: "Single entry", flag: "🇰🇪", region: "Africa", image: "/destinations/kenya.jpg",
    requirements: ["Passport bio data page, valid for at least 6 months", "Passport photograph on a white background", "Confirmed hotel reservation", "Round-trip flight ticket"],
  },
  {
    country: "Morocco", label: "Morocco eVisa", mode: "eVisa", price: "N250,000",
    processing: "2 days", validity: "180 days", entry: "Single entry", flag: "🇲🇦", region: "Africa", image: "/destinations/morocco.jpg",
    requirements: ["Passport data page", "Passport photograph on a white background", "Copy of a valid UK, USA, Canada, Schengen or Australian visa"],
  },
  {
    country: "Egypt", label: "Egypt Visa on Arrival", mode: "Okay to Board", price: "N230,000",
    processing: "2 days", validity: "30 days", entry: "Single entry", flag: "🇪🇬", region: "Africa", image: "/destinations/egypt.jpg",
    requirements: ["Passport data page", "Confirmed flight ticket on Egypt Air or Ethiopian Airlines", "Passport photograph on a white background", "Proof of accommodation", "USD 36 cash fee payable on arrival"],
  },
  {
    country: "Nigeria", label: "Nigeria Tourist eVisa", mode: "eVisa (F5A)", price: "From N350,000",
    processing: "5–7 days", validity: "90 days", entry: "Single entry", flag: "🇳🇬", region: "Africa", image: "/destinations/nigeria.jpg",
    requirements: ["Passport data page", "Passport photograph on a white background", "Return flight ticket", "Hotel booking or accommodation details", "Six months bank statement"],
  },
  {
    country: "United Kingdom", label: "UK Standard Visitor Visa", mode: "Sticker visa", price: "From N500,000",
    processing: "15 working days", validity: "6 months", entry: "Multiple entry", flag: "🇬🇧", region: "Europe", image: "/destinations/united-kingdom.jpg",
    requirements: ["Valid passport with at least 6 months validity", "Passport photograph on a white background", "Six months bank statements", "Proof of ties to your home country", "Invitation letter, if applicable"],
  },
  {
    country: "East Africa", label: "East Africa Tourist Visa", mode: "1 visa, 3 countries", price: "N350,000",
    processing: "4–7 business days", validity: "90 days", entry: "Multiple entry", flag: "🌍", region: "Africa", image: "/destinations/east-africa.jpg",
    requirements: ["Passport data page, valid for at least 6 months", "Passport photograph on a white background", "Travel itinerary or return ticket", "Hotel reservations or host letter", "Proof of funds / bank statement", "Yellow Fever Card (mandatory)"],
  },
  {
    country: "Zambia", label: "Zambia eVisa", mode: "eVisa", price: "N250,000",
    processing: "5–7 working days", validity: "90 days", entry: "Single entry", flag: "🇿🇲", region: "Africa", image: "/destinations/zambia.jpg",
    requirements: ["Passport data page, valid for at least 6 months", "Passport photograph on a white background", "Hotel reservation", "Confirmed round-trip flight ticket", "Cover letter (required for a business visa)"],
  },
  {
    country: "France", label: "France Schengen Visa", mode: "Sticker visa", price: "N300,000",
    processing: "10–15 working days", validity: "180 days", entry: "Multiple entry", flag: "🇫🇷", region: "Europe", image: "/destinations/france.jpg",
    requirements: ["Valid passport with at least 6 months validity and two blank pages", "Completed Schengen application form", "Two passport photographs to Schengen specifications", "Round-trip flight reservation", "Hotel booking or invitation letter", "Travel insurance with €30,000 cover", "Proof of funds and ties to your home country"],
  },
  {
    country: "Belgium", label: "Belgium Schengen Visa", mode: "Sticker visa", price: "N300,000",
    processing: "15 business days", validity: "180 days", entry: "Single / multiple", flag: "🇧🇪", region: "Europe", image: "/destinations/belgium.jpg",
    requirements: ["Valid passport with two blank pages, issued within the last 10 years", "Completed Visa On Web application form", "Two recent 35 × 45 mm colour photographs", "Round-trip flight itinerary", "Travel insurance with minimum €30,000 medical cover", "Hotel reservation or invitation letter", "Recent bank statements and supporting employment or business letters"],
  },
  {
    country: "Uganda", label: "Uganda eVisa", mode: "eVisa", price: "N250,000",
    processing: "3–7 working days", validity: "90 days", entry: "Single entry", flag: "🇺🇬", region: "Africa", image: "/destinations/uganda.jpg",
    requirements: ["Passport data page with at least 6 months validity", "Recent passport photograph on a white background", "Yellow Fever Vaccination Certificate"],
  },
  {
    country: "Indonesia", label: "Indonesia eVisa", mode: "eVisa", price: "N750,000",
    processing: "7 working days", validity: "90 days", entry: "Single entry", flag: "🇮🇩", region: "Asia", image: "/destinations/indonesia.jpg",
    requirements: ["International passport data page, valid for at least 6 months", "Passport photograph on a white background"],
  },
  {
    country: "Dubai", label: "Dubai Visit Visa", mode: "eVisa", price: "N1,500,000",
    processing: "5 working days", validity: "60 days", entry: "Single entry", flag: "🇦🇪", region: "Middle East", image: "/destinations/dubai.jpg",
    requirements: ["Applicant must be 41 years or older", "International passport valid for at least 6 months", "Recent passport photograph on a white background", "Six months bank statement"],
  },
  {
    country: "Ethiopia", label: "Ethiopia eVisa", mode: "eVisa", price: "N250,000",
    processing: "3–5 days", validity: "30 days", entry: "Single entry", flag: "🇪🇹", region: "Africa", image: "/destinations/ethiopia.jpg",
    requirements: ["Passport data page, valid for at least 6 months", "Recent passport photograph on a white background", "Travel itinerary and accommodation details"],
  },
  {
    country: "Seychelles", label: "Seychelles eTA", mode: "eTA", price: "N200,000",
    processing: "1–3 days", validity: "Travel dates", entry: "Single trip", flag: "🇸🇨", region: "Africa", image: "/destinations/seychelles.jpg",
    requirements: ["Passport data page, valid for the duration of your stay", "Recent passport photograph", "Confirmed return or onward ticket", "Confirmed accommodation", "Proof of sufficient funds"],
  },
  {
    country: "China", label: "China Business Visa", mode: "Sticker visa", price: "N1,100,000",
    processing: "10–15 business days", validity: "90 days", entry: "Single entry", flag: "🇨🇳", region: "Asia", image: "/destinations/china.jpg",
    requirements: ["International passport valid for at least 6 months", "Passport photograph", "Old visa or any valid visa", "CAC Certificate", "Six months bank statement"],
  },
];

const services = [
  { icon: Plane, id: "flights", number: "01", title: "Flight booking", text: "Thoughtful routing, competitive fares and support from search to boarding pass." },
  { icon: Hotel, id: "hotels", number: "02", title: "Hotel booking", text: "Handpicked stays for business, family escapes and once-in-a-lifetime journeys." },
  { icon: Map, id: "tours", number: "03", title: "Tour packages", text: "Curated itineraries that turn your destination into a story worth remembering." },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selectedVisa, setSelectedVisa] = useState<Visa | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredVisas = useMemo(() => {
    const term = query.trim().toLowerCase();
    return visas.filter((visa) =>
      (region === "All" || visa.region === region) &&
      (!term || visa.country.toLowerCase().includes(term) || visa.label.toLowerCase().includes(term) || visa.mode.toLowerCase().includes(term)),
    );
  }, [query, region]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => document.documentElement.style.setProperty("--scroll-y", `${Math.min(window.scrollY * 0.16, 120)}px`);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Solara Travels home"><img src="/solara-header-logo.png" alt="Solara Travel and Tours Services" /></a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a><a href="#visas" onClick={closeMenu}>Visa requirements</a>
          <a href="#flights" onClick={closeMenu}>Flights</a><a href="#hotels" onClick={closeMenu}>Hotels</a>
          <a href="#tours" onClick={closeMenu}>Tours</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="button button-gold header-apply" href={whatsapp("Hello Solara Travels, I would like help planning my trip.")} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Apply now</a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><Sparkles size={15} /> Travel beyond borders</p>
          <h1>Your next chapter<br />starts <em>elsewhere.</em></h1>
          <p className="hero-intro">Visas, flights, stays and journeys, designed with care and handled by people who know the way.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#visas">Explore visa options</a>
            <a className="button button-ghost" href={whatsapp("Hello Solara Travels, I would like to plan a trip.")} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat with us</a>
          </div>
          <div className="trust-row" aria-label="Service highlights"><span><ShieldCheck size={18} /> Expert guidance</span><span><Globe2 size={18} /> Global destinations</span><span><Headphones size={18} /> Human support</span></div>
        </div>
        <div className="hero-visual" data-reveal>
          <div className="hero-image-wrap">
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=82&w=1600&auto=format&fit=crop" alt="Traveller looking across a new destination" />
            <div className="hero-stamp"><Plane size={24} /><span>Pretoria<br />to the world</span></div>
          </div>
          <div className="flight-card card-one"><span className="flight-icon"><Plane size={20} /></span><div><small>Dream route</small><strong>JNB · DXB</strong></div></div>
          <div className="flight-card card-two"><span className="flight-icon"><TicketCheck size={20} /></span><div><small>Applications</small><strong>18 destinations</strong></div></div>
        </div>
        <a className="scroll-note" href="#visas">Scroll to explore <span /></a>
      </section>

      <section className="visa-section" id="visas">
        <div className="section-heading" data-reveal><div><p className="eyebrow green">Visa desk</p><h2>Find your way in.</h2></div><p>Clear requirements, practical support and a seamless path from application to approval.</p></div>
        <div className="visa-tools" data-reveal>
          <label className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where are you going?" aria-label="Search visa destinations" /></label>
          <div className="filter-chips" aria-label="Filter by region">
            {["All", "Africa", "Europe", "Asia", "Middle East"].map((item) => <button key={item} type="button" className={region === item ? "active" : ""} onClick={() => setRegion(item)}>{item}</button>)}
          </div>
        </div>
        <div className="visa-grid">
          {filteredVisas.map((visa, index) => (
            <article className="visa-card" key={visa.country} data-reveal style={{ "--delay": `${(index % 6) * 55}ms` } as React.CSSProperties}>
              <div className="visa-card-image">
                <img src={visa.image} alt={`${visa.country} travel destination`} loading="lazy" />
                <span className="flag" aria-hidden="true">{visa.flag}</span><span className="mode-pill">{visa.mode}</span>
              </div>
              <p className="visa-kicker">Get a visa to</p><h3>{visa.country}</h3>
              <div className="visa-meta"><span><Clock3 size={15} /> {visa.processing}</span><span><CalendarDays size={15} /> {visa.validity}</span></div>
              <div className="visa-price"><small>Assistance from</small><strong>{visa.price}</strong></div>
              <div className="visa-actions"><button type="button" onClick={() => setSelectedVisa(visa)}>View requirements</button><a href={whatsapp(`Hello Solara Travels, I would like to apply for the ${visa.label}.`)} target="_blank" rel="noreferrer">Apply now</a></div>
            </article>
          ))}
        </div>
        {filteredVisas.length === 0 && <div className="empty-state"><Globe2 /><h3>No destination found</h3><p>Try another country name, or ask our travel desk for help.</p></div>}
      </section>

      <section className="signature-journey" aria-label="Featured destination">
        <div className="journey-image" data-reveal><img src="https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?fm=jpg&ixlib=rb-4.1.0&q=82&w=1600&auto=format&fit=crop" alt="Cape Town and Table Mountain" /><span className="image-caption">Cape Town · South Africa</span></div>
        <div className="journey-copy" data-reveal><p className="eyebrow light">Curated journeys</p><h2>We handle the details.<br />You keep the memories.</h2><p>From the first idea to the final check-in, Solara brings every moving part of your trip into one beautifully managed experience.</p>
          <div className="journey-stat"><strong>01</strong><span>Tell us where you want to go</span></div><div className="journey-stat"><strong>02</strong><span>We shape the visa, flight and stay</span></div><div className="journey-stat"><strong>03</strong><span>You travel with clarity and confidence</span></div>
          <a className="button button-light" href={whatsapp("Hello Solara Travels, please help me curate my trip.")} target="_blank" rel="noreferrer">Plan my journey</a>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading" data-reveal><div><p className="eyebrow green">Beyond visas</p><h2>One journey.<br />Every detail.</h2></div><p>Everything you need to move from “someday” to departure day, coordinated by one trusted travel partner.</p></div>
        <div className="service-list">
          {services.map(({ icon: Icon, ...service }) => <article className="service-row" id={service.id} key={service.id} data-reveal><span className="service-number">{service.number}</span><span className="service-icon"><Icon size={26} /></span><div><h3>{service.title}</h3><p>{service.text}</p></div><a href={whatsapp(`Hello Solara Travels, I need help with ${service.title.toLowerCase()}.`)} target="_blank" rel="noreferrer">Enquire</a></article>)}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-mark" data-reveal><img src="/solara-logo.jpeg" alt="Solara Travel and Tours Services logo" /></div>
        <div className="about-copy" data-reveal><p className="eyebrow light">About Solara</p><h2>Travel, elevated by genuine care.</h2><p>Solara Travel and Tours Services helps travellers cross borders with less friction and more confidence. Based in Pretoria, we pair practical expertise with personal support because a great trip begins long before take-off.</p>
          <div className="about-values"><span><Check size={18} /> Clear guidance</span><span><Check size={18} /> Thoughtful planning</span><span><Check size={18} /> Responsive service</span><span><Check size={18} /> End-to-end support</span></div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro" data-reveal><p className="eyebrow green">Start a conversation</p><h2>Where will you go next?</h2><p>Visit us, call us, or start your application on WhatsApp. Our travel desk is ready when you are.</p><a className="button button-gold" href={whatsapp("Hello Solara Travels, I am ready to start planning.")} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a></div>
        <div className="contact-card" data-reveal>
          <a href="https://maps.google.com/?q=291+Thabo+Sehume+Street+Pretoria+South+Africa" target="_blank" rel="noreferrer"><MapPin /><span><small>Visit us</small>291 Thabo Sehume Street<br />Pretoria, South Africa</span></a>
          <a href="tel:+27612017515"><Phone /><span><small>Mobile</small>+27 61 201 7515</span></a><a href="tel:+27128802776"><Phone /><span><small>Telephone</small>012 880 2776</span></a>
          <span><Printer /><span><small>Fax</small>086 451 0831</span></span><a href="mailto:info@solaratraveltours.com"><Mail /><span><small>Email</small>info@solaratraveltours.com</span></a>
        </div>
      </section>

      <footer><div className="footer-main"><img src="/solara-logo.jpeg" alt="Solara Travel and Tours Services" /><p>Making every trip easy, considered and memorable across borders and beyond expectations.</p><div className="footer-links"><a href="#visas">Visa assistance</a><a href="#flights">Flight booking</a><a href="#hotels">Accommodation</a><a href="#tours">Tour packages</a><a href="#contact">Contact us</a></div></div><div className="footer-bottom"><span>© 2026 Solara Travel and Tours Services. All rights reserved.</span><span>solaratravelsandtourservices.com</span></div></footer>
      <a className="floating-whatsapp" href={whatsapp("Hello Solara Travels, how can you help me?")} target="_blank" rel="noreferrer" aria-label="Chat with Solara Travels on WhatsApp"><MessageCircle /></a>

      <Dialog open={Boolean(selectedVisa)} onOpenChange={(open) => !open && setSelectedVisa(null)}>
        <DialogContent className="visa-dialog">
          {selectedVisa && <><DialogHeader><span className="dialog-flag" aria-hidden="true">{selectedVisa.flag}</span><p className="eyebrow green">Visa requirements</p><DialogTitle>{selectedVisa.label}</DialogTitle><DialogDescription>{selectedVisa.processing} processing · {selectedVisa.validity} validity · {selectedVisa.entry}</DialogDescription></DialogHeader>
            <div className="dialog-body"><h4><FileCheck2 size={19} /> Required documents</h4><ul>{selectedVisa.requirements.map((requirement) => <li key={requirement}><Check size={16} /> <span>{requirement}</span></li>)}</ul><div className="dialog-note"><ShieldCheck size={20} /><p>Our team reviews your documents before submission and guides you through every step.</p></div></div>
            <div className="dialog-actions"><span><small>Assistance from</small><strong>{selectedVisa.price}</strong></span><a className="button button-gold" href={whatsapp(`Hello Solara Travels, I would like to apply for the ${selectedVisa.label}.`)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Apply on WhatsApp</a></div></>}
        </DialogContent>
      </Dialog>
    </main>
  );
}
