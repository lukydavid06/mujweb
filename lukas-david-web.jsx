import { useState, useEffect, useRef } from "react";
import {
  Shield, TrendingUp, Home, ChevronDown, ChevronUp,
  Phone, Mail, MapPin, Star, CheckCircle, ArrowRight,
  Users, Key, FileText, Wrench, BarChart2, Award, Menu, X
} from "lucide-react";

const GOLD = "#d4af37";
const NAVY = "#1e293b";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
};

const GoldDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div style={{ width: 40, height: 1, background: GOLD }} />
    <div style={{ width: 8, height: 8, background: GOLD, transform: "rotate(45deg)" }} />
    <div style={{ width: 40, height: 1, background: GOLD }} />
  </div>
);

const faqs = [
  { q: "Kolik stojí vaše finanční poradenství?", a: "Finanční poradenství poskytuji zcela bezplatně. Jsem odměňován provizemi od finančních institucí, ale tato skutečnost nijak neovlivňuje mé doporučení – porovnávám celý trh a vždy doporučuji to nejlepší řešení pro vás." },
  { q: "Proč se obrátit na vás místo přímo na banku?", a: "Banka nabízí pouze vlastní produkty. Já jako nezávislý poradce porovnávám desítky bank a pojišťoven a vyberu to, co skutečně odpovídá vašim potřebám a finanční situaci – bez skrytých zájmů." },
  { q: "Jak funguje bezplatná revize stávajících smluv?", a: "Přinesite mi stávající pojistné smlouvy a já provedu detailní analýzu – zda máte dostatečné krytí, zda neplatíte zbytečně a zda nejsou lepší alternativy. Vše bezplatně a nezávazně." },
  { q: "Jak probíhá správa nemovitosti?", a: "Po podpisu smlouvy přebírám kompletní péči o vaši nemovitost – inzerci, výběr nájemníků, přípravu smluv, technický servis i pravidelné kontroly. Vy dostáváte měsíční reporty a nemusíte řešit nic." },
  { q: "Co se stane, když nájemník přestane platit?", a: "Právě pro tyto situace je tu garance nájmu. Dle zvoleného tarifu dostanete 60 % nájmu i při neplatícím nájemníkovi. Váš příjem je tedy chráněn i v těchto nepříjemných situacích." },
  { q: "Pomůžete mi i při změně životní situace (rozvod, nové dítě, ztráta zaměstnání)?", a: "Absolutně. Jsem váš dlouhodobý partner, ne jednorázový zprostředkovatel. Pravidelně revidujeme vaše smlouvy a reagujeme na změny v životě – aby vaše finanční zajištění vždy odpovídalo vaší situaci." }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const navLinks = [
    { label: "Služby", href: "#services" },
    { label: "Správa nemovitostí", href: "#realestate" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontakt", href: "#contact" }
  ];

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: NAVY, overflowX: "hidden" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;500;600&display=swap');
        h1,h2,h3,h4,h5 { font-family: 'Montserrat', sans-serif; }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        .gold-btn {
          background: ${GOLD};
          color: ${NAVY};
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          letter-spacing: 0.5px;
          transition: all 0.25s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .gold-btn:hover { background: #c49b2a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.35); }
        .card { background: white; border-radius: 8px; padding: 36px 28px; box-shadow: 0 4px 24px rgba(30,41,59,0.08); transition: all 0.3s; border-top: 3px solid transparent; }
        .card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(30,41,59,0.14); border-top-color: ${GOLD}; }
        .section-title { font-size: clamp(26px, 4vw, 40px); font-weight: 800; color: ${NAVY}; text-align: center; }
        .section-sub { text-align: center; color: #64748b; max-width: 600px; margin: 0 auto; font-size: 16px; line-height: 1.7; }
        input, textarea { width: 100%; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 6px; font-family: 'Open Sans', sans-serif; font-size: 15px; transition: border-color 0.2s; outline: none; color: ${NAVY}; }
        input:focus, textarea:focus { border-color: ${GOLD}; }
        .accordion-item { border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; transition: border-color 0.2s; }
        .accordion-item.open { border-color: ${GOLD}; }
        nav a { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: 0.3px; }
        .hero-pattern { background-image: radial-gradient(circle at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 40%); }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{ background: NAVY, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div>
            <div style={{ color: GOLD, fontFamily: "Montserrat", fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>LUKÁŠ DAVID</div>
            <div style={{ color: "#94a3b8", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginTop: -2 }}>Finanční poradce</div>
          </div>
          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden md:flex">
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} style={{ background: "none", border: "none", cursor: "pointer", color: "#cbd5e1", textDecoration: "none" }}>
                <a style={{ color: "#cbd5e1", textDecoration: "none" }}>{l.label}</a>
              </button>
            ))}
            <button className="gold-btn" onClick={() => scrollTo("#contact")} style={{ padding: "10px 22px", fontSize: 13 }}>
              Konzultace zdarma
            </button>
          </div>
          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "white", display: "none" }} className="md:hidden block">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#0f172a", padding: "16px 24px 24px" }}>
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "#cbd5e1", padding: "12px 0", cursor: "pointer", fontFamily: "Montserrat", fontWeight: 600, fontSize: 15, borderBottom: "1px solid #1e293b" }}>
                {l.label}
              </button>
            ))}
            <button className="gold-btn" onClick={() => scrollTo("#contact")} style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>
              Konzultace zdarma
            </button>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero-pattern" style={{ background: NAVY, padding: "100px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", border: `1px solid rgba(212,175,55,0.12)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", border: `1px solid rgba(212,175,55,0.08)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 350, height: 350, borderRadius: "50%", border: `1px solid rgba(212,175,55,0.07)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,175,55,0.15)", border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 100, padding: "6px 18px", marginBottom: 28 }}>
            <Star size={12} fill={GOLD} color={GOLD} />
            <span style={{ color: GOLD, fontSize: 12, fontFamily: "Montserrat", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Nezávislý finanční poradce · Praha</span>
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 24 }}>
            Stavím vaše finance<br />
            <span style={{ color: GOLD }}>na pevných základech</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.75, marginBottom: 44, maxWidth: 620, margin: "0 auto 44px" }}>
            Od neprůstřelného pojištění po cestu k vlastnímu bydlení. Individuální strategie, objektivní srovnání celého trhu a nadstandardní péče o váš majetek pod jednou střechou.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="gold-btn" onClick={() => scrollTo("#contact")}>
              Nezávazná konzultace <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("#services")} style={{ background: "transparent", border: `2px solid rgba(255,255,255,0.2)`, color: "white", padding: "14px 32px", borderRadius: 4, cursor: "pointer", fontFamily: "Montserrat", fontWeight: 600, fontSize: 15, transition: "all 0.25s" }}
              onMouseOver={e => e.target.style.borderColor = GOLD}
              onMouseOut={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}>
              Prozkoumat služby
            </button>
          </div>
          {/* Trust badges */}
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
            {[["Celý trh", "bank a pojišťoven"], ["100%", "objektivní srovnání"], ["ČNB", "registrace"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ color: GOLD, fontFamily: "Montserrat", fontWeight: 800, fontSize: 28 }}>{val}</div>
                <div style={{ color: "#64748b", fontSize: 12, letterSpacing: 0.5, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ background: "#f8fafc", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ textAlign: "center", color: GOLD, fontFamily: "Montserrat", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Hlavní pilíře</p>
            <h2 className="section-title">S čím vám pomůžu</h2>
            <GoldDivider />
            <p className="section-sub" style={{ marginTop: 16 }}>Komplexní finanční servis na jednom místě – vše posuzuji nezávisle, z pohledu vašich zájmů.</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28, marginTop: 56 }}>
            {[
              {
                icon: <Shield size={36} color={GOLD} />,
                title: "Pojištění",
                desc: "Komplexní ochrana vás a vašeho majetku. Ochrana příjmu při invaliditě a vážných onemocněních, pojištění majetku a vozidel.",
                items: ["Bezplatná revize stávajících smluv", "Ochrana příjmu (invalidita, nemoc)", "Pojištění majetku a vozidel", "Srovnání desítek pojišťoven"],
                delay: 0
              },
              {
                icon: <TrendingUp size={36} color={GOLD} />,
                title: "Investice a spoření",
                desc: "Chraňte úspory před inflací a budujte dlouhodobou finanční rentu. Analytický přístup přizpůsobený vašim cílům.",
                items: ["Ochrana úspor před inflací", "Budování dlouhodobé renty", "Spoření pro děti (vzdělání, start do života)", "Investiční strategie na míru"],
                delay: 0.1
              },
              {
                icon: <Home size={36} color={GOLD} />,
                title: "Financování a úvěry",
                desc: "Kompletní vyřízení hypotéky nebo úvěru od A do Z. Porovnám všechny banky na trhu, vy se staráte jen o stěhování.",
                items: ["Srovnání hypoték celého trhu", "Administrativa a komunikace s bankou", "Refinancování stávajících úvěrů", "Příprava žádosti a zastupování"],
                delay: 0.2
              },
              {
                icon: <BarChart2 size={36} color={GOLD} />,
                title: "Finanční plánování",
                desc: "Komplexní pohled na vaše finance – od sestavení rodinného rozpočtu po dlouhodobou strategii finanční svobody.",
                items: ["Analýza aktuální finanční situace", "Nastavení krátkodobých i dlouhodobých cílů", "Plán finanční nezávislosti", "Pravidelné revize a aktualizace plánu"],
                delay: 0.3
              }
            ].map(({ icon, title, desc, items, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div className="card" style={{ height: "100%" }}>
                  <div style={{ marginBottom: 20 }}>{icon}</div>
                  <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 20, marginBottom: 12, color: NAVY }}>{title}</h3>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {items.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 14, color: "#475569" }}>
                        <CheckCircle size={16} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REAL ESTATE ─── */}
      <section id="realestate" style={{ background: "white", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ textAlign: "center", color: GOLD, fontFamily: "Montserrat", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Prémiová služba</p>
            <h2 className="section-title">Správa nemovitostí v Praze</h2>
            <GoldDivider />
            <p className="section-sub" style={{ marginTop: 16 }}>
              Vy máte klid, já zodpovědnost. Postarám se o vše – od vyhledání nájemníků po kontrolu plateb.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginTop: 60 }}>
            {/* Services grid */}
            <FadeIn delay={0}>
              <div>
                <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 22, marginBottom: 24, color: NAVY }}>Co zahrnuje správa?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { icon: <Users size={20} color={GOLD} />, title: "Výběr nájemníků", desc: "Prověření v registrech dlužníků, platební schopnost, reference" },
                    { icon: <FileText size={20} color={GOLD} />, title: "Smluvní dokumentace", desc: "Příprava nájemní smlouvy a veškeré administrativy" },
                    { icon: <Key size={20} color={GOLD} />, title: "Pravidelné kontroly", desc: "2× ročně fyzická kontrola stavu nemovitosti" },
                    { icon: <BarChart2 size={20} color={GOLD} />, title: "Měsíční reporty", desc: "Přehled plateb, stavu nemovitosti a veškeré komunikace" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ background: `rgba(212,175,55,0.12)`, borderRadius: 8, padding: 10, flexShrink: 0 }}>{icon}</div>
                      <div>
                        <div style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 15, color: NAVY, marginBottom: 3 }}>{title}</div>
                        <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Pricing card */}
            <FadeIn delay={0.15}>
              <div>
                <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 22, marginBottom: 24, color: NAVY }}>Cenový model</h3>

                {/* Basic plan */}
                <div style={{ border: `2px solid ${GOLD}`, borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: GOLD, padding: "14px 24px" }}>
                    <div style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: 17, color: NAVY }}>Plán Základní</div>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    {[
                      { label: "Váš podíl z nájmu", val: "91 %", note: null },
                      { label: "Garance při neplatičích", val: "60 %\u00a0*", note: true },
                      { label: "Platba při neobsazenosti", val: "1 Kč", note: null },
                    ].map(({ label, val, note }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ color: "#64748b", fontSize: 14 }}>{label}</span>
                        <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 15, color: note ? GOLD : NAVY, textAlign: "right" }}>{val}</span>
                      </div>
                    ))}
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 14, marginBottom: 0, lineHeight: 1.6 }}>
                      * K vyplacení dojde po úspěšném vymožení dlužné částky.
                    </p>
                    <button className="gold-btn" onClick={() => scrollTo("#contact")} style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                      Mám zájem <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ background: "#f8fafc", padding: "90px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ textAlign: "center", color: GOLD, fontFamily: "Montserrat", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Dotazy</p>
            <h2 className="section-title">Časté otázky</h2>
            <GoldDivider />
          </FadeIn>
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className={`accordion-item ${activeAccordion === i ? "open" : ""}`}>
                  <button onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "white", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
                    <span style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 15, color: NAVY, lineHeight: 1.4 }}>{faq.q}</span>
                    {activeAccordion === i
                      ? <ChevronUp size={18} color={GOLD} style={{ flexShrink: 0 }} />
                      : <ChevronDown size={18} color="#94a3b8" style={{ flexShrink: 0 }} />
                    }
                  </button>
                  {activeAccordion === i && (
                    <div style={{ padding: "0 22px 20px", background: "white" }}>
                      <div style={{ borderTop: `1px solid #f1f5f9`, paddingTop: 16 }}>
                        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ background: "white", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ textAlign: "center", color: GOLD, fontFamily: "Montserrat", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Spojme se</p>
            <h2 className="section-title">Kontakt</h2>
            <GoldDivider />
            <p className="section-sub" style={{ marginTop: 16 }}>Napište mi – první konzultace je vždy bezplatná a nezávazná.</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, marginTop: 56, alignItems: "start" }}>
            {/* Info */}
            <FadeIn delay={0}>
              <div>
                <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 20, marginBottom: 28, color: NAVY }}>Lukáš David</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { icon: <Phone size={18} color={GOLD} />, label: "Telefon", val: "+420 XXX XXX XXX" },
                    { icon: <Mail size={18} color={GOLD} />, label: "E-mail", val: "lukas.david@gfsgroup.cz" },
                    { icon: <MapPin size={18} color={GOLD} />, label: "Oblast působení", val: "Praha a okolí" },
                  ].map(({ icon, label, val }) => (
                    <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ background: `rgba(212,175,55,0.12)`, borderRadius: 8, padding: 10, flexShrink: 0 }}>{icon}</div>
                      <div>
                        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                        <div style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 15, color: NAVY }}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 40, padding: 20, background: "#f8fafc", borderRadius: 8, borderLeft: `4px solid ${GOLD}` }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                    Registrovaný u České národní banky (ČNB). První konzultace vždy bezplatně a nezávazně.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.1}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: 48 }}>
                  <CheckCircle size={56} color={GOLD} style={{ marginBottom: 16 }} />
                  <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 22, marginBottom: 10 }}>Zpráva odeslána!</h3>
                  <p style={{ color: "#64748b", fontSize: 15 }}>Ozvu se vám co nejdříve, zpravidla do 24 hodin.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontFamily: "Montserrat", fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Jméno *</label>
                      <input required placeholder="Jan Novák" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontFamily: "Montserrat", fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Telefon</label>
                      <input placeholder="+420 777 888 999" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontFamily: "Montserrat", fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>E-mail *</label>
                    <input required type="email" placeholder="jan@novak.cz" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontFamily: "Montserrat", fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Zpráva</label>
                    <textarea rows={4} placeholder="Popište, s čím vám mohu pomoci..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                  <button type="submit" className="gold-btn" style={{ justifyContent: "center", marginTop: 4 }}>
                    Odeslat zprávu <ArrowRight size={16} />
                  </button>
                  <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", margin: 0 }}>Vaše údaje jsou v bezpečí a nebudou sdíleny třetím stranám.</p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: NAVY, padding: "40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ color: GOLD, fontFamily: "Montserrat", fontWeight: 800, fontSize: 18, letterSpacing: 1, marginBottom: 8 }}>LUKÁŠ DAVID</div>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
            Finanční poradce registrovaný u ČNB · Praha
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 20 }}>
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 13, fontFamily: "Montserrat", fontWeight: 600 }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: 20 }}>
            <p style={{ color: "#334155", fontSize: 12, margin: 0 }}>© {new Date().getFullYear()} Lukáš David. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
