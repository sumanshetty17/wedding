import React, { useState, useEffect, useRef } from "react";
import {
  Star, Phone, Mail, ChevronDown, ChevronLeft, X,
  Sparkles, Camera, Video, Palette, LayoutGrid, UtensilsCrossed,
  Heart, Users, ShieldCheck, MessageSquare, MapPinned, CheckCircle2
} from "lucide-react";

/* =====================================================================
   SITE CONTENT — edit everything here.
   This is the only section you (or I, on your behalf) need to touch to
   change text, add real venues, swap photos/videos, or fill in your
   real contact details.
===================================================================== */

// Leave these blank until you're ready — the site shows a friendly
// placeholder until they're filled in.
const CONTACT_INFO = {
  phone: "",
  email: "",
};

const ABOUT_PARAGRAPHS = [
  "MarriHeaven is a dedicated wedding event organizing company committed to turning your dream wedding into reality. We work closely with couples and families to plan, coordinate, and execute weddings across indoor banquet halls, outdoor lawns, and coastal destinations.",
  "Our team brings together experienced venue coordinators, decorators, photographers, and planners under one roof, so you never have to manage multiple vendors on your own. Every recommendation we make comes from years of working directly with the venues and artists we feature.",
  "We hold ourselves to one simple standard: every wedding we organize should feel as personal and unforgettable as if we were planning it for our own family. That belief guides every venue we choose, every vendor we recommend, and every detail we oversee — because your day deserves nothing less.",
];

const INTRO_PARAGRAPHS = [
  "Finding the perfect venue and experiencing your wedding exactly as you imagined it — that's what we're here for. We help you discover beautiful indoor, outdoor, and coastal venues, each handpicked to reflect a different kind of celebration.",
  "From your very first venue visit to the final farewell of your reception, MarriHeaven stays by your side — coordinating every vendor, every detail, and every moment, so all you have to do is enjoy your day.",
];

const QUOTE_TEXT =
  "Marriages are made once in a lifetime — so let's plan it together and make it truly unforgettable.";

const STORY_BLOCKS = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    text: "Every love story deserves a setting as beautiful as the moment itself. Whether it's the warm glow of a decorated hall or the open sky of an outdoor lawn, we help you find a venue that feels like it was made for your day.",
  },
  {
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    text: "From the first walk down the aisle to the last dance of the night, we capture and craft every detail — so years from now, you can look back and relive it all over again.",
  },
];

const TRUST_PARAGRAPHS = [
  "Every venue we feature is personally reviewed by our team, and every wedding we plan is handled with the same care as if it were our own family's celebration. When you choose MarriHeaven, you're choosing a team that stays with you at every step — from your first venue visit to your final dance.",
  "We believe that no two weddings are alike, and neither is our approach. Every couple we work with receives a plan built around their own traditions, families, and vision — never a one-size-fits-all package.",
];

// Hero banner shown right below the header. Swap HERO_IMAGE for your own
// photo/video whenever you have one.
const HERO_IMAGE = "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=80";
const HERO_HEADING = "Your Wedding, Beautifully Planned";
const HERO_SUBTEXT = "From the perfect venue to the smallest detail — MarriHeaven brings your wedding vision to life.";

// Qualitative trust badges — intentionally not numeric claims (like "500+
// weddings") since those should only go up once they're actually true.
// Swap these for real stats/numbers once you have them.
const VALUE_PROPS = [
  { icon: Heart, title: "Handpicked Venues", description: "Every venue we feature is personally visited and reviewed by our team before it's listed." },
  { icon: Users, title: "One Dedicated Team", description: "A single point of contact from your first venue visit to your final dance." },
  { icon: ShieldCheck, title: "Transparent Pricing", description: "Clear budget ranges up front, with final pricing confirmed directly with you." },
];

const PROCESS_STEPS = [
  { icon: MessageSquare, title: "Share Your Requirements", description: "Tell us your wedding style, guest count, and budget." },
  { icon: MapPinned, title: "Explore Curated Venues", description: "Browse indoor, outdoor, and coastal venues that fit your vision." },
  { icon: CheckCircle2, title: "Confirm & Celebrate", description: "Lock in your venue and let our team handle the rest." },
];

const FAQS = [
  {
    question: "Do you help with venues outside the categories listed here?",
    answer: "Yes — Indoor, Outdoor, and Coastal are our most requested styles, but our team can help you find or arrange other types of venues as well. Just reach out with what you have in mind.",
  },
  {
    question: "How far in advance should we book our venue?",
    answer: "We recommend reaching out as early as possible, especially for weekend dates and peak wedding season, since popular venues can get booked quickly.",
  },
  {
    question: "Do you only help with the venue, or the full wedding?",
    answer: "We help with both — from finding and booking the right venue to coordinating décor, photography, videography, makeup, catering, and setup, so you have one team handling everything.",
  },
  {
    question: "Is the price range shown on each venue the final price?",
    answer: "The price range gives you a starting point for planning your budget. Final pricing depends on your date, guest count, and choice of add-on services, which our team will confirm with you directly.",
  },
];

const WEDDING_TYPES = ["Indoor Wedding", "Outdoor Wedding", "Coastal Wedding"];

const SERVICES = [
  { name: "Venue Decoration", icon: Sparkles, description: "Traditional and contemporary décor themes tailored to your venue and vision." },
  { name: "Photography", icon: Camera, description: "Candid and traditional photography that captures every meaningful moment." },
  { name: "Videography", icon: Video, description: "Cinematic wedding films and highlight reels you'll treasure for years." },
  { name: "Bridal Makeup", icon: Palette, description: "Professional bridal and family makeup artists for your big day." },
  { name: "Wedding Setup & Planning", icon: LayoutGrid, description: "End-to-end planning, timelines, and on-day coordination." },
  { name: "Catering", icon: UtensilsCrossed, description: "Curated menus and catering partners for every guest count and taste." },
];

// Sample placeholder venues — replace with your real venues, photos, and
// videos whenever you're ready. Add as many venues to each category as
// you like by adding more objects to the "venues" array.
const CATEGORIES = [
  {
    id: "indoor",
    name: "Indoor Wedding",
    tagline: "Elegant halls and banquet spaces for a grand celebration",
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    venues: [
      {
        id: "grand-mandapa-hall",
        name: "The Grand Mandapa Hall",
        rating: 4.9,
        priceRange: "₹4,00,000 – ₹8,00,000",
        photos: [
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A grand, air-conditioned banquet hall with seating for up to 500 guests, a dedicated stage and mandap area, in-house lighting, and ample parking. Popular for traditional ceremonies and grand receptions alike.",
      },
      {
        id: "royal-crystal-banquet",
        name: "Royal Crystal Banquet",
        rating: 4.9,
        priceRange: "₹3,50,000 – ₹7,00,000",
        photos: [
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A classic banquet hall known for its crystal chandeliers and marble interiors. Comes with an in-house décor team and a private bridal suite for getting-ready photos.",
      },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Wedding",
    tagline: "Open-air lawns and gardens for a natural, breathtaking setting",
    heroImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    venues: [
      {
        id: "emerald-garden-lawns",
        name: "Emerald Garden Lawns",
        rating: 4.9,
        priceRange: "₹3,50,000 – ₹7,50,000",
        photos: [
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "Sprawling landscaped lawns with a floral mandap area, string-lit walkways, and space for up to 400 guests under the open sky. Includes a backup covered pavilion for weather flexibility.",
      },
      {
        id: "courtyard-estate",
        name: "The Courtyard Estate",
        rating: 4.9,
        priceRange: "₹4,50,000 – ₹9,00,000",
        photos: [
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A heritage-style courtyard estate with stone architecture and open-sky seating, perfect for a royal outdoor wedding theme. Includes on-site guest accommodation.",
      },
    ],
  },
  {
    id: "coastal",
    name: "Coastal Wedding",
    tagline: "Barefoot ceremonies by the shore, with the ocean as your backdrop",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f29c1fe8ce?auto=format&fit=crop&w=1200&q=80",
    venues: [
      {
        id: "golden-shore-resort",
        name: "Golden Shore Resort",
        rating: 4.9,
        priceRange: "₹5,00,000 – ₹10,00,000",
        photos: [
          "https://images.unsplash.com/photo-1519167758481-83f29c1fe8ce?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A private beachfront resort with a dedicated ceremony deck facing the sunset, in-house catering, and guest rooms overlooking the ocean. Ideal for both intimate and large coastal weddings.",
      },
      {
        id: "azure-bay-lawn",
        name: "Azure Bay Wedding Lawn",
        rating: 4.9,
        priceRange: "₹4,50,000 – ₹8,50,000",
        photos: [
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
        ],
        videos: [],
        details:
          "A coastal lawn just steps from the shoreline, with a rustic wooden mandap and fairy-lit seating for evening ceremonies. Sunset time slots are the most requested.",
      },
    ],
  },
];

/* =====================================================================
   COMPONENTS
===================================================================== */

function VenueMediaSlider({ media }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= media.length) setIdx(0);
  }, [media.length, idx]);

  const current = media[idx];

  useEffect(() => {
    if (!current || media.length <= 1) return undefined;
    if (current.type === "image") {
      const t = setTimeout(() => setIdx((i) => (i + 1) % media.length), 1000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [idx, media.length, current]);

  if (!current) {
    return <div className="no-media">No photos or videos added yet.</div>;
  }

  return (
    <div className="venue-slider">
      <div className="venue-slider-frame">
        {current.type === "image" ? (
          <img src={current.src} alt="" />
        ) : (
          <video
            key={current.src}
            src={current.src}
            autoPlay
            muted
            loop={media.length <= 1}
            playsInline
            onEnded={() => { if (media.length > 1) setIdx((i) => (i + 1) % media.length); }}
          />
        )}
      </div>
      {media.length > 1 && (
        <div className="venue-slider-dots">
          {media.map((m, i) => (
            <span key={i} className={"dot" + (i === idx ? " active" : "")} onClick={() => setIdx(i)} />
          ))}
        </div>
      )}
    </div>
  );
}

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function QuoteModal({ onClose }) {
  const [step, setStep] = useState("form"); // "form" | "otp" | "thanks"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [weddingType, setWeddingType] = useState("");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const isFormValid =
    name.trim().length > 1 &&
    /^[6-9]\d{9}$/.test(phone.trim()) &&
    location.trim().length > 1 &&
    !!weddingType;

  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) return undefined;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, resendTimer]);

  function sendOtp() {
    const code = generateOtp();
    setGeneratedOtp(code);
    setOtpDigits(["", "", "", ""]);
    setOtpError("");
    setResendTimer(30);
  }

  function handleSendOtp() {
    if (!isFormValid) return;
    sendOtp();
    setStep("otp");
  }

  function handleOtpChange(i, rawValue) {
    const digit = rawValue.replace(/[^0-9]/g, "").slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < 3 && otpRefs[i + 1].current) {
      otpRefs[i + 1].current.focus();
    }
  }

  function handleVerify() {
    const entered = otpDigits.join("");
    if (entered.length < 4) {
      setOtpError("Please enter the 4-digit code.");
      return;
    }
    if (entered === generatedOtp) {
      setOtpError("");
      setStep("thanks");
    } else {
      setOtpError("That code doesn't match. Please enter the correct OTP.");
    }
  }

  return (
    <div className="quote-modal-backdrop" onClick={onClose}>
      <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quote-modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>

        {step === "form" && (
          <>
            <h2>Let's Start Planning Together</h2>
            <p className="quote-modal-sub">Tell us a little about your big day, and one of our wedding planners will personally reach out to you.</p>

            <input
              className="quote-input"
              placeholder="Enter your name"
              value={name}
              onFocus={() => setTypeDropdownOpen(false)}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="quote-phone-row">
              <span className="quote-phone-prefix">+91</span>
              <input
                className="quote-input quote-phone-input"
                placeholder="Enter phone number"
                inputMode="numeric"
                value={phone}
                onFocus={() => setTypeDropdownOpen(false)}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
              />
            </div>

            <input
              className="quote-input"
              placeholder="Tell us your event location"
              value={location}
              onFocus={() => setTypeDropdownOpen(false)}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="quote-select-wrap">
              <button
                type="button"
                className={"quote-select-trigger" + (typeDropdownOpen ? " open" : "")}
                onClick={() => setTypeDropdownOpen((o) => !o)}
              >
                <span className={weddingType ? "" : "quote-select-placeholder"}>
                  {weddingType || "Tell us your wedding type"}
                </span>
                <ChevronDown size={16} className={"quote-select-chevron" + (typeDropdownOpen ? " open" : "")} />
              </button>
              {typeDropdownOpen && (
                <div className="quote-select-panel">
                  {WEDDING_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={"quote-select-option" + (weddingType === t ? " selected" : "")}
                      onClick={() => { setWeddingType(t); setTypeDropdownOpen(false); }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="quote-otp-note">We will send an OTP to verify your number</p>

            <button className={"quote-submit" + (isFormValid ? " ready" : "")} disabled={!isFormValid} onClick={handleSendOtp}>
              Submit
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <button className="quote-back" onClick={() => setStep("form")} aria-label="Back"><ChevronLeft size={18} /></button>
            <h2>Enter OTP</h2>
            <p className="quote-modal-sub">
              We have sent a 4-digit verification code to<br /><strong>+91-{phone}</strong>
            </p>
            <p className="quote-demo-note">
              Demo mode: this site isn't connected to a real SMS service yet, so here's your code for testing — <strong>{generatedOtp}</strong>
            </p>

            <div className="quote-otp-boxes">
              {otpDigits.map((d, i) => (
                <input
                  key={i}
                  ref={otpRefs[i]}
                  className="quote-otp-box"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>

            {otpError && <p className="quote-otp-error">{otpError}</p>}

            <p className="quote-resend">
              {resendTimer > 0 ? (
                <>Resend OTP in 00:{String(resendTimer).padStart(2, "0")}</>
              ) : (
                <button type="button" className="quote-resend-link" onClick={sendOtp}>Resend OTP</button>
              )}
            </p>

            <button className="quote-submit ready" onClick={handleVerify}>Submit</button>
          </>
        )}

        {step === "thanks" && (
          <div className="quote-thanks">
            <CheckCircle2 size={44} className="quote-thanks-icon" />
            <h2>Thank You For Consulting MarriHeaven</h2>
            <p>We will make your marriage unforgettable. Our team will reach out to you shortly.</p>
            <button className="quote-submit ready" onClick={onClose}>Close</button>
          </div>
        )}

        <div className="quote-modal-brand"><span className="diamond" />MARRIHEAVEN<span className="diamond" /></div>
      </div>
    </div>
  );
}

function navClass(view, type) {
  return "nav-link" + (view.type === type ? " active" : "");
}

function Header({ view, goHome, goAbout, goContact }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={goHome}>
        <span className="brand-name">MARRIHEAVEN</span>
        <span className="brand-tagline">Marriages are made in heaven</span>
      </button>
      <nav className="main-nav">
        <button className={navClass(view, "about")} onClick={goAbout}>About Us</button>
        <button className={navClass(view, "contact")} onClick={goContact}>Contact Us</button>
      </nav>
    </header>
  );
}

function HeroBanner({ onExplore }) {
  return (
    <section className="hero-banner">
      <img src={HERO_IMAGE} alt="" />
      <div className="hero-overlay">
        <h1>{HERO_HEADING}</h1>
        <p>{HERO_SUBTEXT}</p>
        <button className="hero-cta" onClick={onExplore}>Explore Venues</button>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="value-props-section">
      <div className="value-props-grid">
        {VALUE_PROPS.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} className="value-prop">
              <div className="value-prop-icon"><Icon size={22} /></div>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="process-section">
      <h2>How It Works</h2>
      <div className="ornament"><span className="diamond" /></div>
      <div className="process-grid">
        {PROCESS_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="process-step">
              <div className="process-step-number">{i + 1}</div>
              <div className="process-step-icon"><Icon size={20} /></div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="ornament"><span className="diamond" /></div>
      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className={"faq-item" + (isOpen ? " open" : "")}>
              <button className="faq-question" onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                <span>{item.question}</span>
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              {isOpen && <p className="faq-answer">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HomePage({ goToCategory }) {
  function scrollToCategories() {
    const el = typeof document !== "undefined" ? document.getElementById("categories") : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="page home-page">
      <HeroBanner onExplore={scrollToCategories} />

      <ValueProps />

      <section className="intro-section">
        {INTRO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <section className="quote-section">
        <div className="quote-border">
          <p>{QUOTE_TEXT}</p>
        </div>
      </section>

      <section className="story-section">
        {STORY_BLOCKS.map((block, i) => (
          <div key={i} className={"story-block" + (i % 2 === 1 ? " reverse" : "")}>
            <div className="story-media">
              <img src={block.image} alt="" />
            </div>
            <div className="story-text">
              <p>{block.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="categories-section" id="categories">
        <h2>Choose Your Wedding Style</h2>
        <div className="ornament"><span className="diamond" /></div>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} className="category-card" onClick={() => goToCategory(cat.id)}>
              <div className="category-card-img">
                <img src={cat.heroImage} alt="" />
              </div>
              <div className="category-card-label">{cat.name}</div>
            </button>
          ))}
        </div>
      </section>

      <HowItWorks />

      <section className="services-section">
        <h2>What We Provide</h2>
        <div className="ornament"><span className="diamond" /></div>
        <div className="services-grid">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="service-card">
                <div className="service-icon"><Icon size={22} /></div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <FaqSection />

      <section className="trust-section">
        <div className="ornament"><span className="diamond" /></div>
        {TRUST_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page about-page">
      <h1>About Us</h1>
      <div className="ornament"><span className="diamond" /></div>
      <div className="content-card">
        {ABOUT_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <div className="ornament"><span className="diamond" /></div>
      <div className="content-card contact-card">
        <div className="contact-row">
          <Phone size={18} />
          {CONTACT_INFO.phone ? <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a> : <span className="muted">Phone number to be added</span>}
        </div>
        <div className="contact-row">
          <Mail size={18} />
          {CONTACT_INFO.email ? <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> : <span className="muted">Email to be added</span>}
        </div>
      </div>
    </div>
  );
}

function CategoryPage({ categoryId, goToVenue }) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return <div className="page">Category not found.</div>;

  return (
    <div className="page category-page">
      <h1>{category.name}</h1>
      <p className="category-tagline">{category.tagline}</p>
      <div className="ornament"><span className="diamond" /></div>
      <div className="venue-list-vertical">
        {category.venues.map((v) => (
          <button key={v.id} className="venue-row-card" onClick={() => goToVenue(category.id, v.id)}>
            <div className="venue-photo-wrap">
              <img src={v.photos[0]} alt="" />
              <div className="venue-rating-badge"><Star size={12} fill="currentColor" /> {v.rating}</div>
              <div className="venue-price-badge">{v.priceRange}</div>
            </div>
            <div className="venue-row-name">{v.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function VenuePage({ categoryId, venueId }) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const venue = category && category.venues.find((v) => v.id === venueId);
  if (!category || !venue) return <div className="page">Venue not found.</div>;

  const media = [
    ...venue.photos.map((p) => ({ type: "image", src: p })),
    ...(venue.videos || []).map((v) => ({ type: "video", src: v })),
  ];

  return (
    <div className="page venue-page">
      <h1>{venue.name}</h1>
      <div className="venue-rating-line"><Star size={14} fill="currentColor" /> {venue.rating} rated</div>
      <div className="content-card venue-detail-card">
        <VenueMediaSlider media={media} />
        <div className="venue-detail-info">
          <div className="venue-price-line">{venue.priceRange}</div>
          <p>{venue.details}</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="ornament small"><span className="diamond" /></div>
      <div className="footer-row">
        <Phone size={16} />
        {CONTACT_INFO.phone ? <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a> : <span className="muted">Contact number coming soon</span>}
      </div>
      <div className="footer-row">
        <Mail size={16} />
        {CONTACT_INFO.email ? <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> : <span className="muted">Email coming soon</span>}
      </div>
    </footer>
  );
}

/* ---------------------------------- URL routing (so the browser Back
   button works properly, like on any normal website) ---------------------------------- */

function parseHash() {
  if (typeof window === "undefined") return { type: "home" };
  const h = window.location.hash.replace(/^#\/?/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return { type: "home" };
  if (parts[0] === "about") return { type: "about" };
  if (parts[0] === "contact") return { type: "contact" };
  if (parts[0] === "category" && parts[1]) return { type: "category", id: parts[1] };
  if (parts[0] === "venue" && parts[1] && parts[2]) return { type: "venue", catId: parts[1], venueId: parts[2] };
  return { type: "home" };
}

function viewToHash(view) {
  switch (view.type) {
    case "about": return "#/about";
    case "contact": return "#/contact";
    case "category": return `#/category/${view.id}`;
    case "venue": return `#/venue/${view.catId}/${view.venueId}`;
    default: return "#/";
  }
}

export default function App() {
  const [view, setView] = useState(parseHash);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    function onHashChange() {
      setView(parseHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function navigate(nextView) {
    const hash = viewToHash(nextView);
    if (typeof window !== "undefined" && window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setView(nextView);
    }
  }

  const goHome = () => navigate({ type: "home" });
  const goAbout = () => navigate({ type: "about" });
  const goContact = () => navigate({ type: "contact" });
  const goToCategory = (id) => navigate({ type: "category", id });
  const goToVenue = (catId, venueId) => navigate({ type: "venue", catId, venueId });

  return (
    <div className="app-root">
      <GlobalStyles />
      <Header view={view} goHome={goHome} goAbout={goAbout} goContact={goContact} />
      <main className="site-main">
        {view.type === "home" && <HomePage goToCategory={goToCategory} />}
        {view.type === "about" && <AboutPage />}
        {view.type === "contact" && <ContactPage />}
        {view.type === "category" && <CategoryPage categoryId={view.id} goToVenue={goToVenue} />}
        {view.type === "venue" && <VenuePage categoryId={view.catId} venueId={view.venueId} />}
      </main>
      <Footer />

      <button className="floating-cta" onClick={() => setShowQuoteModal(true)}>Start My Wedding Planning</button>
      {showQuoteModal && <QuoteModal onClose={() => setShowQuoteModal(false)} />}
    </div>
  );
}

/* =====================================================================
   STYLES
===================================================================== */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

      .app-root {
        /* Rich white-and-gold theme: near-black serif headings, a vivid
           magenta/rose accent (buttons, links, active states), warm gold
           ornamental detail, on a soft cream background. */
        --ivory: #FFFDF6;
        --surface: #FFFFFF;
        --wine: #C2255C;
        --wine-dark: #211A17;
        --gold: #B8935A;
        --gold-light: #F3E2C4;
        --charcoal: #4A4038;
        --muted: #8B8074;
        --border: #ECE4D3;

        font-family: 'Jost', sans-serif;
        background: radial-gradient(ellipse at top, #FFF6DE 0%, var(--ivory) 65%);
        color: var(--charcoal);
        min-height: 100vh;
      }
      .app-root *, .app-root *:before, .app-root *:after { box-sizing: border-box; }
      .app-root button { font-family: inherit; cursor: pointer; background: none; border: none; }
      .app-root a { color: var(--wine); text-decoration: none; }
      .app-root a:hover { text-decoration: underline; }
      .app-root button:focus-visible, .app-root a:focus-visible {
        outline: 2px solid var(--wine); outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        .app-root * { transition: none !important; animation: none !important; }
      }

      /* header */
      .app-root { border-top: 4px double var(--gold); }
      .site-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 26px 40px; background: var(--surface); border-bottom: 1px solid var(--gold);
        flex-wrap: wrap; gap: 12px;
      }
      .brand { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; text-align: left; }
      .brand-name {
        font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 30px;
        letter-spacing: 2px; color: var(--wine);
      }
      .brand-tagline { font-size: 12px; font-style: italic; color: var(--muted); letter-spacing: 0.3px; }
      .main-nav { display: flex; gap: 28px; }
      .nav-link {
        font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;
        color: var(--charcoal); padding-bottom: 3px; border-bottom: 2px solid transparent;
      }
      .nav-link:hover, .nav-link.active { color: var(--wine); border-bottom-color: var(--gold); }

      .site-main { max-width: 1040px; margin: 0 auto; padding: 40px 24px 60px; }
      .page h1 {
        font-family: 'Playfair Display', serif; font-weight: 800; font-size: 38px; color: var(--wine-dark);
        text-align: center; margin: 0 0 6px;
      }

      .ornament {
        width: 130px; height: 14px; margin: 16px auto; position: relative;
        display: flex; align-items: center; justify-content: center;
      }
      .ornament::before, .ornament::after {
        content: ''; position: absolute; top: 50%; width: 50px; height: 1px;
        background: var(--gold); transform: translateY(-50%);
      }
      .ornament::before { left: 0; }
      .ornament::after { right: 0; }
      .ornament > .diamond { width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg); }
      .ornament.small { width: 90px; margin: 0 auto 16px; }

      /* home sections */
      /* hero banner */
      .hero-banner {
        position: relative;
        width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-right: calc(50% - 50vw);
        margin-bottom: 50px;
        overflow: hidden;
      }
      .hero-banner img { width: 100%; height: min(64vh, 560px); object-fit: cover; display: block; }
      .hero-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(36,29,26,0.15) 0%, rgba(36,29,26,0.55) 75%, rgba(36,29,26,0.75) 100%);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 20px;
      }
      .hero-overlay h1 {
        font-family: 'Playfair Display', serif; font-weight: 800; font-size: 46px; color: #fff;
        margin: 0 0 12px; text-shadow: 0 2px 12px rgba(0,0,0,0.3);
      }
      .hero-overlay p { font-size: 16px; color: var(--gold-light); max-width: 480px; margin: 0 0 26px; }
      .hero-cta {
        background: var(--wine); color: #fff; border: 1px solid var(--gold);
        border-radius: 30px; padding: 13px 30px; font-size: 14px; letter-spacing: 0.5px;
      }
      .hero-cta:hover { background: var(--wine-dark); color: var(--ivory); }
      @media (max-width: 560px) {
        .hero-overlay h1 { font-size: 30px; }
      }

      /* value props */
      .value-props-section { margin-bottom: 50px; }
      .value-props-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
      .value-prop { text-align: center; padding: 10px 14px; }
      .value-prop-icon {
        width: 48px; height: 48px; border-radius: 50%; background: var(--gold-light); color: var(--wine);
        display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
      }
      .value-prop h3 { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--wine-dark); margin: 0 0 6px; }
      .value-prop p { font-size: 13.5px; line-height: 1.6; color: var(--muted); margin: 0; }

      /* process / how it works */
      .process-section { text-align: center; margin-bottom: 50px; }
      .process-section h2 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 28px; color: var(--wine-dark); }
      .process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 10px; }
      .process-step {
        position: relative; border: 1px solid var(--gold); border-radius: 4px; padding: 28px 18px 20px; background: var(--surface);
      }
      .process-step-number {
        position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
        width: 28px; height: 28px; border-radius: 50%; background: var(--wine); color: #fff;
        display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;
        border: 2px solid var(--ivory);
      }
      .process-step-icon { color: var(--gold); margin: 6px 0 10px; display: flex; justify-content: center; }
      .process-step h3 { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: var(--wine-dark); margin: 0 0 8px; }
      .process-step p { font-size: 13.5px; line-height: 1.6; color: var(--muted); margin: 0; }

      /* faq */
      .faq-section { max-width: 680px; margin: 0 auto 50px; text-align: center; }
      .faq-section h2 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 28px; color: var(--wine-dark); }
      .faq-list { text-align: left; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
      .faq-item { border: 1px solid var(--gold); border-radius: 4px; background: var(--surface); overflow: hidden; }
      .faq-question {
        width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px;
        padding: 14px 18px; font-size: 14.5px; color: var(--charcoal); text-align: left;
      }
      .faq-chevron { color: var(--gold); flex-shrink: 0; transition: transform 0.2s ease; }
      .faq-item.open .faq-chevron { transform: rotate(180deg); }
      .faq-answer { padding: 0 18px 16px; font-size: 14px; line-height: 1.7; color: var(--muted); margin: 0; }

      .intro-section { max-width: 680px; margin: 0 auto 40px; text-align: center; }
      .intro-section p { font-size: 17px; line-height: 1.8; color: var(--charcoal); margin: 0 0 16px; }
      .intro-section p:last-child { margin-bottom: 0; }

      .quote-section { display: flex; justify-content: center; margin-bottom: 50px; }
      .quote-border {
        border: 3px double var(--gold); border-radius: 2px; padding: 30px 40px;
        max-width: 620px; text-align: center; background: var(--surface);
      }
      .quote-border p {
        font-family: 'Cormorant Garamond', serif; font-size: 22px; font-style: italic;
        color: var(--wine-dark); margin: 0; line-height: 1.6;
      }

      .story-section { display: flex; flex-direction: column; gap: 30px; margin-bottom: 50px; }
      .story-block {
        display: flex; align-items: center; gap: 30px;
        border: 1px solid var(--gold); border-radius: 4px; overflow: hidden; background: var(--surface);
      }
      .story-block.reverse { flex-direction: row-reverse; }
      .story-media { flex: 1; min-width: 0; }
      .story-media img { width: 100%; height: 280px; object-fit: cover; display: block; }
      .story-text { flex: 1; min-width: 0; padding: 20px 30px; }
      .story-text p { font-size: 15px; line-height: 1.8; color: var(--charcoal); }
      @media (max-width: 700px) {
        .story-block, .story-block.reverse { flex-direction: column; }
        .story-media img { height: 220px; }
      }

      .categories-section, .services-section, .trust-section { text-align: center; margin-bottom: 50px; }
      .categories-section h2, .services-section h2 {
        font-family: 'Playfair Display', serif; font-weight: 700; font-size: 28px; color: var(--wine-dark);
      }
      .category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-top: 10px; }
      .category-card {
        border: 1px solid var(--gold); border-radius: 4px; overflow: hidden; background: var(--surface);
        text-align: left;
      }
      .category-card:hover { border-color: var(--wine); }
      .category-card-img { height: 180px; overflow: hidden; }
      .category-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .category-card-label {
        padding: 14px; font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--wine-dark); text-align: center;
        border-top: 1px solid var(--gold-light);
      }

      .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 10px; }
      .service-card {
        border: 1px solid var(--gold); border-radius: 4px; padding: 24px 18px; background: var(--surface);
        position: relative;
      }
      .service-card::before {
        content: ''; position: absolute; inset: 5px; border: 1px solid var(--gold-light); border-radius: 2px; pointer-events: none;
      }
      .service-icon {
        width: 44px; height: 44px; border-radius: 50%; background: var(--gold-light); color: var(--wine);
        display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; position: relative;
      }
      .service-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--wine-dark); margin: 0 0 8px; position: relative; }
      .service-card p { font-size: 13.5px; line-height: 1.6; color: var(--muted); margin: 0; position: relative; }

      .trust-section p { max-width: 640px; margin: 0 auto 14px; font-size: 15px; line-height: 1.8; color: var(--charcoal); font-style: italic; }
      .trust-section p:last-child { margin-bottom: 0; }

      /* footer */
      .site-footer {
        border-top: 3px double var(--gold); padding: 30px 24px 100px; text-align: center;
        display: flex; flex-direction: column; align-items: center; gap: 10px;
      }
      .footer-row { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--charcoal); }
      .muted { color: var(--muted); font-style: italic; }

      /* content card (about/contact) */
      .content-card {
        max-width: 640px; margin: 20px auto 0; background: var(--surface);
        border: 3px double var(--gold); border-radius: 2px; padding: 30px 36px;
      }
      .content-card p { font-size: 15.5px; line-height: 1.8; color: var(--charcoal); margin: 0 0 14px; }
      .content-card p:last-child { margin-bottom: 0; }
      .contact-card { display: flex; flex-direction: column; gap: 16px; align-items: center; }
      .contact-row { display: flex; align-items: center; gap: 10px; font-size: 16px; }

      /* category page */
      .category-tagline { text-align: center; color: var(--muted); font-size: 14px; margin: 0; }

      .venue-list-vertical { display: flex; flex-direction: column; gap: 20px; max-width: 480px; }
      .venue-row-card {
        display: flex; flex-direction: column; text-align: left;
        border: 1px solid var(--gold); border-radius: 4px; overflow: hidden; background: var(--surface);
      }
      .venue-row-card:hover { border-color: var(--wine); }
      .venue-photo-wrap { position: relative; width: 100%; height: 220px; }
      .venue-photo-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .venue-rating-badge {
        position: absolute; top: 10px; right: 10px;
        background: rgba(36,29,26,0.72); color: var(--gold-light);
        border-radius: 20px; padding: 4px 10px; font-size: 12px;
        display: flex; align-items: center; gap: 4px;
      }
      .venue-price-badge {
        position: absolute; bottom: 10px; right: 10px;
        background: var(--wine); color: #fff;
        border-radius: 20px; padding: 4px 12px; font-size: 12px;
      }
      .venue-row-name {
        padding: 14px 16px; font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--wine-dark);
      }

      /* venue detail page */
      .venue-page { text-align: center; }
      .venue-rating-line {
        display: inline-flex; align-items: center; gap: 5px; color: var(--gold);
        font-size: 13px; margin-bottom: 20px;
      }
      .venue-detail-card { text-align: left; padding: 20px; }
      .venue-slider { display: flex; flex-direction: column; gap: 10px; }
      .venue-slider-frame { width: 100%; border-radius: 6px; overflow: hidden; background: var(--ivory); }
      .venue-slider-frame img, .venue-slider-frame video { width: 100%; max-height: 440px; object-fit: cover; display: block; }
      .venue-slider-dots { display: flex; justify-content: center; gap: 6px; }
      .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); cursor: pointer; }
      .dot.active { background: var(--wine); }
      .no-media { padding: 60px 20px; text-align: center; color: var(--muted); border: 1px dashed var(--border); border-radius: 6px; }
      .venue-detail-info { margin-top: 18px; }
      .venue-price-line {
        display: inline-block; background: var(--gold-light); color: var(--wine-dark);
        border-radius: 20px; padding: 5px 16px; font-size: 14px; margin-bottom: 14px; font-weight: 500;
      }
      .venue-detail-info p { font-size: 15px; line-height: 1.8; color: var(--charcoal); }

      /* floating CTA + quote modal */
      .floating-cta {
        position: fixed; bottom: 22px; left: 0; right: 0; margin: 0 auto;
        width: fit-content; max-width: calc(100vw - 40px);
        background: var(--wine); color: #fff; border: 1px solid rgba(255,255,255,0.25); border-radius: 30px;
        padding: 15px 28px; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;
        box-shadow: 0 6px 18px rgba(33,26,23,0.3); z-index: 200;
      }
      .floating-cta:hover { background: var(--wine-dark); }

      .quote-modal-backdrop {
        position: fixed; inset: 0; background: rgba(33,26,23,0.55);
        display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 300;
      }
      .quote-modal {
        position: relative; background: var(--surface); border-radius: 12px;
        max-width: 420px; width: 100%; padding: 34px 30px 28px;
        text-align: center; max-height: 90vh; overflow-y: auto;
        box-shadow: 0 24px 60px rgba(33,26,23,0.25);
        border-top: 3px solid var(--gold);
      }
      .quote-modal-close {
        position: absolute; top: 14px; right: 14px; color: var(--muted);
        width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      }
      .quote-modal-close:hover { color: var(--wine); }
      .quote-back {
        position: absolute; top: 16px; left: 16px; color: var(--charcoal);
        width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      }
      .quote-modal h2 {
        font-family: 'Playfair Display', serif; font-weight: 700; font-size: 21px; color: var(--wine-dark);
        margin: 6px 0 8px;
      }
      .quote-modal-sub { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin: 0 0 20px; }
      .quote-demo-note {
        font-size: 12px; color: var(--wine); background: var(--gold-light); border-radius: 6px;
        padding: 8px 12px; margin: 0 0 18px; line-height: 1.5;
      }
      .quote-input {
        width: 100%; background: var(--ivory); border: 1px solid var(--border); border-radius: 8px;
        padding: 13px 14px; font-size: 14px; color: var(--charcoal); margin-bottom: 12px;
      }
      .quote-input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(184,147,90,0.15); }
      .quote-phone-row { display: flex; gap: 8px; }
      .quote-phone-prefix {
        display: flex; align-items: center; justify-content: center;
        background: var(--ivory); border: 1px solid var(--border); border-radius: 8px;
        padding: 0 14px; font-size: 14px; color: var(--charcoal);
      }
      .quote-phone-input { flex: 1; }

      .quote-select-wrap { position: relative; margin-bottom: 12px; }
      .quote-select-trigger {
        width: 100%; display: flex; align-items: center; justify-content: space-between;
        background: var(--ivory); border: 1px solid var(--border); border-radius: 8px;
        padding: 13px 14px; font-size: 14px; color: var(--charcoal); text-align: left;
        transition: border-color 0.15s ease;
      }
      .quote-select-trigger.open { border-color: var(--gold); }
      .quote-select-placeholder { color: var(--muted); }
      .quote-select-chevron { color: var(--muted); transition: transform 0.15s ease; flex-shrink: 0; margin-left: 8px; }
      .quote-select-chevron.open { transform: rotate(180deg); }
      .quote-select-panel {
        position: absolute; top: calc(100% + 6px); left: 0; right: 0;
        background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
        box-shadow: 0 14px 34px rgba(33,26,23,0.18);
        padding: 6px; z-index: 5; text-align: left;
        max-height: 200px; overflow-y: auto;
      }
      .quote-select-option {
        width: 100%; text-align: left; padding: 11px 12px; border-radius: 6px;
        font-size: 14px; color: var(--charcoal);
      }
      .quote-select-option:hover { background: var(--gold-light); }
      .quote-select-option.selected { background: var(--wine); color: #fff; }

      .quote-otp-note { font-size: 12.5px; color: var(--muted); margin: 4px 0 18px; }
      .quote-submit {
        width: 100%; border: none; border-radius: 30px; padding: 14px;
        font-size: 14.5px; font-weight: 600; color: #fff; background: #b9b0a8;
        transition: box-shadow 0.2s ease;
      }
      .quote-submit.ready { background: linear-gradient(135deg, #E8447D, var(--wine)); box-shadow: 0 8px 22px rgba(194,37,92,0.35); }
      .quote-submit.ready:hover { background: var(--wine-dark); }
      .quote-submit:disabled { cursor: not-allowed; }

      .quote-otp-boxes { display: flex; justify-content: center; gap: 12px; margin: 6px 0 14px; }
      .quote-otp-box {
        width: 48px; height: 54px; text-align: center; font-size: 20px;
        border: 1px solid var(--border); border-radius: 8px; background: var(--ivory); color: var(--charcoal);
      }
      .quote-otp-box:focus { outline: none; border-color: var(--wine); }
      .quote-otp-error { color: var(--wine); font-size: 13px; margin: 0 0 12px; }
      .quote-resend { font-size: 13px; color: var(--muted); margin: 0 0 18px; }
      .quote-resend-link { color: var(--wine); font-weight: 500; }
      .quote-resend-link:hover { text-decoration: underline; }

      .quote-thanks { padding: 10px 0 4px; }
      .quote-thanks-icon { color: var(--wine); margin-bottom: 12px; }
      .quote-thanks h2 { font-size: 20px; margin-bottom: 10px; }
      .quote-thanks p { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 22px; }

      .quote-modal-brand {
        margin-top: 22px; font-family: 'Cormorant Garamond', serif; font-weight: 700;
        letter-spacing: 1.5px; font-size: 13px; color: var(--gold);
      }

      @media (max-width: 560px) {
        .site-header { padding: 18px 20px; }
        .brand-name { font-size: 22px; }
        .site-main { padding: 30px 16px 40px; }
        .floating-cta { padding: 13px 22px; font-size: 13px; bottom: 16px; }
      }
    `}</style>
  );
}
