import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  Menu, X, ChevronRight, Users, Briefcase, Shield, Wrench, Globe,
  Award, MapPin, Phone, Mail, ArrowRight,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────────────────────── */

const services = [
  { icon: Users,    title: "Drilling Crews",         desc: "Certified drilling specialists, tool pushers, roughnecks, and rotary helpers for onshore and offshore operations across Saudi Arabia." },
  { icon: Wrench,   title: "Engineering & Technical", desc: "Process, mechanical, electrical, and instrumentation engineers for upstream and downstream projects with ARAMCO-standard vetting." },
  { icon: Shield,   title: "HSE & Safety",            desc: "NEBOSH-certified HSE officers, safety supervisors, and emergency response teams compliant with Saudi Aramco Safety Management Systems." },
  { icon: Briefcase,title: "Project Management",      desc: "Senior project managers and coordinators with proven track records in Aramco, SABIC, and NEOM environments." },
  { icon: Globe,    title: "Offshore Operations",     desc: "Qualified offshore installation managers, crane operators, scaffolders, and marine crew for Red Sea and Arabian Gulf assets." },
  { icon: Award,    title: "Logistics & Support",     desc: "Procurement officers, warehouse supervisors, camp bosses, and site administrative support for remote field camps." },
];

const stats = [
  { value: "5,000+", label: "Deployed Professionals" },
  { value: "200+",   label: "Client Companies" },
  { value: "17 Yrs", label: "Industry Experience" },
  { value: "24/7",   label: "Operational Support" },
];

type SectorKey = "upstream" | "downstream" | "midstream" | "petrochemical";
const sectors: Record<SectorKey, { title: string; desc: string; img: string }> = {
  upstream:      { title: "Upstream Exploration & Production", desc: "Drilling campaigns, well completion, reservoir management, and production optimization across Saudi Arabia's major fields — Ghawar, Safaniya, Shaybah, and Khurais.", img: "1504328345606-18bbc8c9d7d1" },
  downstream:    { title: "Downstream Refining",               desc: "Refinery operations, turnaround maintenance, and shutdown services for Aramco Downstream's Ras Tanura, Yanbu, and Jizan complexes.", img: "1518709268805-4e9042af9f23" },
  midstream:     { title: "Midstream Pipelines",               desc: "Pipeline construction, integrity management, and compressor station staffing across the Kingdom's 17,000-kilometre gas transmission network.", img: "1578662996442-48f60103fc96" },
  petrochemical: { title: "Petrochemicals",                    desc: "Technical and operations talent for SABIC and Aramco affiliates including SADAF, KEMYA, and National Chevron Phillips plants in Jubail and Yanbu.", img: "1557804506-669a67965ba0" },
};

const clients = ["SAUDI ARAMCO","SABIC","TOTAL ENERGIES","SCHLUMBERGER","BAKER HUGHES","HALLIBURTON","WORLEY","PETROFAC","WOOD GROUP","TECHNIP"];

const testimonials = [
  { quote: "They mobilized 120 qualified welders and fitters within 72 hours for our emergency shutdown at Jubail. Absolute professionals — we have used no one else since.", name: "Mohammed Al-Rashidi", role: "Maintenance Manager, SABIC Affiliate — Jubail" },
  { quote: "Our go-to partner for technical staffing in the Eastern Province. The quality of candidates they supply consistently exceeds our expectations and the ARAMCO compliance checks.", name: "James Whitfield", role: "Project Director, Aramco Offshore — Dhahran" },
];

const whyUs = [
  { icon: Award,    title: "Aramco Certified",   desc: "Approved vendor status with Saudi Aramco, SABIC, and 200+ operators since 2010." },
  { icon: Shield,   title: "Full Compliance",    desc: "IQAMA, GOSI, HRDF, Saudization, and Saudi Labor Law managed end-to-end for every hire." },
  { icon: Users,    title: "Rapid Deployment",   desc: "Emergency mobilization within 48–72 hours for shutdown and turnaround events." },
  { icon: Globe,    title: "Kingdom-Wide",       desc: "Offices in Riyadh, Dhahran, Jubail, Yanbu, and Jeddah serving all 13 regions." },
];

/* ─── helpers ───────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = { show: { transition: { staggerChildren: 0.1 } } };

/** 3-D tilt card — tracks mouse inside the element */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ rx: -y * 14, ry: x * 14 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry, scale: tilt.rx || tilt.ry ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── floating 3-D diamond in hero ─────────────────────────────────── */
function FloatingDiamond() {
  return (
    <motion.div
      className="absolute right-[8vw] top-[18vh] pointer-events-none"
      animate={{ y: [0, -24, 0], rotateZ: [0, 12, 0], rotateY: [0, 180, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* outer ring */}
      <div className="w-36 h-36 border border-primary/30 rotate-45 relative">
        {/* inner fill */}
        <div className="absolute inset-4 bg-primary/8 rotate-0" />
        {/* glow */}
        <div className="absolute inset-0 bg-primary/5 blur-xl" />
      </div>
      {/* second ring offset */}
      <motion.div
        className="absolute inset-0 w-36 h-36 border border-primary/15 rotate-45"
        animate={{ rotate: [45, 90, 45], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─── small orbiting ring decoration ───────────────────────────────── */
function OrbRing({ size, delay, className }: { size: number; delay: number; className?: string }) {
  return (
    <motion.div
      className={`absolute border border-primary/10 rounded-full pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
      transition={{ rotate: { duration: 20 + delay * 5, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay } }}
    />
  );
}

/* ─── scroll progress bar ───────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60]"
    />
  );
}

/* ─── main component ─────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeTab, setActiveTab] = useState<SectorKey>("upstream");

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // hero parallax values
  const bgY    = useTransform(scrollY, [0, 600], [0, 140]);
  const heroY  = useTransform(scrollY, [0, 600], [0, -60]);
  const heroO  = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden" style={{ perspective: "1200px" }}>
      <ScrollProgress />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-3.5 h-3.5 border-2 border-primary-foreground rotate-45" />
            </motion.div>
            <div>
              <span className="font-display text-lg font-black tracking-widest text-foreground uppercase leading-none">Al Nakhla</span>
              <span className="block text-[9px] font-mono text-primary tracking-[0.22em] uppercase leading-none mt-0.5">Manpower Solutions</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[["Services","#services"],["Sectors","#sectors"],["About","#about"],["Why Us","#why-us"],["Contact","#contact"]].map(([label, href]) => (
              <motion.a key={label} href={href} whileHover={{ y: -2, color: "var(--color-primary)" }} className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground transition-colors">
                {label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a href="tel:+966112345678" className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors">
              <Phone size={12} /> +966 11 234 5678
            </a>
            <motion.a href="#contact" whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }} className="bg-primary text-primary-foreground px-5 py-2.5 text-[11px] font-mono tracking-[0.25em] uppercase">
              Deploy Now
            </motion.a>
          </div>

          <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden text-foreground p-1" aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="lg:hidden bg-card border-t border-border overflow-hidden">
            <div className="px-6 py-6 flex flex-col gap-4">
              {[["Services","#services"],["Sectors","#sectors"],["About","#about"],["Why Us","#why-us"],["Contact","#contact"]].map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground">{label}</a>
              ))}
              <a href="#contact" className="bg-primary text-primary-foreground px-5 py-3.5 text-[11px] font-mono tracking-[0.25em] uppercase text-center mt-2">Deploy Now</a>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-[#040609]">
        {/* Parallax background image */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1800&h=1000&fit=crop&auto=format"
            alt="Oil drilling rig at dusk in Saudi Arabia"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#040609] via-[#040609]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040609]/85 via-transparent to-transparent" />

        {/* 3-D floating decorations */}
        <FloatingDiamond />
        <OrbRing size={320} delay={0}   className="top-[10%] right-[5%]" />
        <OrbRing size={180} delay={1.5} className="top-[30%] right-[18%]" />
        <OrbRing size={80}  delay={3}   className="top-[55%] right-[12%]" />

        {/* Animated diagonal lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: Math.max(0, 0.18 - i * 0.022), scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bg-primary pointer-events-none"
            style={{ width: 1, height: "130%", top: "-15%", right: `${i * 44}px`, transform: "rotate(14deg)", transformOrigin: "top" }}
          />
        ))}

        {/* Hero copy */}
        <motion.div className="relative max-w-7xl mx-auto px-6 w-full" style={{ y: heroY, opacity: heroO }}>
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
              className="font-mono text-primary text-[10px] tracking-[0.5em] uppercase mb-6"
            >
              Kingdom of Saudi Arabia · Est. 2007
            </motion.p>

            <motion.h1
              initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="font-display font-black uppercase leading-[0.88] tracking-tight text-foreground mb-8"
              style={{ fontSize: "clamp(3.2rem,10vw,7.5rem)" }}
            >
              {["Powering", "Saudi Arabia's", "Energy", "Workforce"].map((word, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 60, rotateX: -30 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }} className="block" style={{ transformStyle: "preserve-3d" }}>
                  {i === 1 ? <><span className="text-primary">Saudi</span> Arabia&apos;s</> : word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7 }} className="text-muted-foreground text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              Al Nakhla deploys certified oil and gas professionals across the Kingdom — from Aramco&apos;s Eastern Province fields to NEOM&apos;s emerging industrial corridors.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="flex flex-wrap gap-4">
              <motion.a href="#contact" whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 40px rgba(200,146,10,0.35)" }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-mono text-[11px] tracking-[0.3em] uppercase group">
                Request Workforce <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a href="#services" whileHover={{ scale: 1.03, y: -2, borderColor: "var(--color-primary)", color: "var(--color-primary)" }} className="flex items-center gap-3 border border-border text-foreground px-8 py-4 font-mono text-[11px] tracking-[0.3em] uppercase transition-colors">
                Our Services
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 }} className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
          <motion.div animate={{ scaleY: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="w-px h-16 bg-gradient-to-b from-primary to-transparent origin-top" />
          <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Scroll</span>
        </motion.div>
      </section>

      {/* ── STATS RIBBON ─────────────────────────────────────────────── */}
      <motion.section
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="bg-primary"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-primary-foreground/20">
          {stats.map(({ value, label }) => (
            <motion.div key={label} variants={fadeUp}
              whileHover={{ scale: 1.04, z: 20, backgroundColor: "rgba(0,0,0,0.12)" }}
              style={{ transformStyle: "preserve-3d" }}
              className="px-8 py-8 text-center lg:text-left transition-colors cursor-default"
            >
              <div className="font-display text-4xl md:text-5xl font-black text-primary-foreground leading-none">{value}</div>
              <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-primary-foreground/60 mt-2">{label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <motion.p variants={fadeUp} className="font-mono text-primary text-[10px] tracking-[0.45em] uppercase mb-4">What We Deploy</motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-black uppercase leading-none">Workforce<br />Services</motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xs leading-relaxed text-sm lg:text-base">
              From roughnecks to reservoir engineers — we source, vet, and deploy talent across every discipline in the oil and gas value chain.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border" style={{ perspective: "800px" }}>
            {services.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}>
                <TiltCard className="bg-card p-8 group hover:bg-secondary transition-colors duration-200 cursor-default h-full">
                  <motion.div
                    whileHover={{ rotateY: 15, scale: 1.1 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-10 h-10 border border-primary/25 flex items-center justify-center mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-200"
                  >
                    <Icon size={17} className="text-primary" />
                  </motion.div>
                  <h3 className="font-display text-xl font-black uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-2 mt-6 text-primary text-[10px] font-mono tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ChevronRight size={11} />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.p variants={fadeUp} className="font-mono text-primary text-[10px] tracking-[0.45em] uppercase mb-4">Who We Are</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-black uppercase leading-none mb-8">
              Built for<br />Saudi Arabia&apos;s<br /><span className="text-primary">Energy Future</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-5 text-sm lg:text-base">
              Al Nakhla Manpower Solutions was founded in Riyadh in 2007 with a single mandate: close the talent gap in Saudi Arabia&apos;s rapidly expanding oil and gas sector. Today we are one of the Kingdom&apos;s most trusted manpower agencies, with regional offices in Dhahran, Jubail, Yanbu, and Jeddah.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10 text-sm lg:text-base">
              We hold Aramco Approved Vendor status and are fully compliant with IQAMA, GOSI, and Saudi Labor Law requirements. Every professional we deploy carries verified certifications and is covered under comprehensive group insurance.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 gap-px bg-border">
              {[{ val: "2010", label: "Aramco Approved Since" },{ val: "40%", label: "Saudi Nationalization" },{ val: "85+", label: "Active Contracts" },{ val: "12", label: "Cities Covered" }].map(({ val, label }) => (
                <motion.div key={label} variants={fadeUp} whileHover={{ scale: 1.04, z: 16 }} style={{ transformStyle: "preserve-3d" }} className="bg-background p-5 cursor-default">
                  <div className="font-display text-3xl font-black text-primary leading-none">{val}</div>
                  <div className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase mt-1.5">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3-D image panel */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateY: 4, scale: 1.02 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-[480px] lg:h-[620px] overflow-hidden bg-secondary"
          >
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&h=1100&fit=crop&auto=format"
              alt="Oil and gas professionals at an industrial installation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/40 bg-card/75 backdrop-blur-sm">
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-primary mb-1">Registered & Compliant</p>
              <p className="text-xs text-muted-foreground">Saudi Ministry of Human Resources · License No. 4201-XXXX</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTORS ──────────────────────────────────────────────────── */}
      <section id="sectors" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-10">
            <motion.p variants={fadeUp} className="font-mono text-primary text-[10px] tracking-[0.45em] uppercase mb-4">Where We Operate</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-black uppercase leading-none">Sectors</motion.h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-px bg-border mb-px overflow-x-auto">
            {(Object.keys(sectors) as SectorKey[]).map((key) => (
              <motion.button key={key} onClick={() => setActiveTab(key)}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                className={`px-7 py-4 font-mono text-[10px] tracking-[0.35em] uppercase whitespace-nowrap transition-colors flex-shrink-0 ${activeTab === key ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
              >
                {key}
              </motion.button>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border border-border grid lg:grid-cols-2">
            <motion.div key={activeTab + "-text"} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="p-10 lg:p-14 flex flex-col justify-center bg-card">
              <h3 className="font-display text-3xl md:text-4xl font-black uppercase leading-tight mb-5 text-primary">{sectors[activeTab].title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm lg:text-base mb-8">{sectors[activeTab].desc}</p>
              <motion.a href="#contact" whileHover={{ gap: "1rem" }} className="inline-flex items-center gap-2 text-primary font-mono text-[10px] tracking-[0.35em] uppercase transition-all">
                Staff This Sector <ArrowRight size={13} />
              </motion.a>
            </motion.div>
            <motion.div key={activeTab + "-img"} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="h-64 lg:h-auto relative overflow-hidden bg-secondary min-h-[280px]">
              <img src={`https://images.unsplash.com/photo-${sectors[activeTab].img}?w=900&h=700&fit=crop&auto=format`} alt={sectors[activeTab].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CLIENTS ──────────────────────────────────────────────────── */}
      <section className="py-14 bg-card border-y border-border overflow-hidden">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono text-muted-foreground text-[9px] tracking-[0.45em] uppercase text-center mb-8">
          Trusted by Saudi Arabia&apos;s Energy Leaders
        </motion.p>
        <div className="flex gap-12 overflow-x-auto px-6 max-w-7xl mx-auto [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {clients.map((name, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ scale: 1.1, color: "var(--color-muted-foreground)" }}
              className="flex-shrink-0 font-display text-lg font-black tracking-[0.15em] text-border uppercase cursor-default pb-1 transition-colors"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-mono text-primary text-[10px] tracking-[0.45em] uppercase mb-14 text-center">
            Client Testimonials
          </motion.p>
          <div className="grid md:grid-cols-2 gap-px bg-border" style={{ perspective: "900px" }}>
            {testimonials.map(({ quote, name, role }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, rotateX: -20, y: 40 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, delay: i * 0.15, ease: [0.22,1,0.36,1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="bg-card p-10 lg:p-12 h-full">
                  <div className="font-display text-8xl font-black text-primary/20 leading-none select-none mb-2">&ldquo;</div>
                  <p className="text-foreground text-lg leading-relaxed mb-8">{quote}</p>
                  <div className="border-t border-border pt-6">
                    <div className="font-display font-black uppercase tracking-wider text-foreground">{name}</div>
                    <div className="text-muted-foreground text-xs font-mono mt-1.5">{role}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────── */}
      <section id="why-us" className="py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <motion.p variants={fadeUp} className="font-mono text-primary text-[10px] tracking-[0.45em] uppercase mb-4">The Al Nakhla Advantage</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-black uppercase leading-none">Why Choose Us</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border" style={{ perspective: "800px" }}>
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} whileHover={{ scale: 1.03, rotateY: 4, z: 30 }} style={{ transformStyle: "preserve-3d" }} className="bg-background p-8 lg:p-10 text-center group cursor-default">
                <motion.div
                  whileHover={{ rotateY: 360 }}
                  transition={{ duration: 0.7 }}
                  className="w-12 h-12 border border-primary/30 flex items-center justify-center mx-auto mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-200"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Icon size={19} className="text-primary" />
                </motion.div>
                <h3 className="font-display text-xl font-black uppercase tracking-wide mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-12 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1800&h=900&fit=crop&auto=format" alt="Industrial refinery background" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>

        {/* Animated bg orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-32 -left-32 w-96 h-96 bg-primary-foreground rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }} transition={{ duration: 10, repeat: Infinity, delay: 3 }} className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-primary-foreground rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="pt-2">
            <motion.p variants={fadeUp} className="font-mono text-primary-foreground/55 text-[10px] tracking-[0.45em] uppercase mb-4">Get Staffed</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-black uppercase leading-none text-primary-foreground mb-6">
              Deploy Your<br />Workforce<br />Today
            </motion.h2>
            <motion.p variants={fadeUp} className="text-primary-foreground/65 leading-relaxed mb-10 text-sm lg:text-base max-w-sm">
              Tell us your headcount, disciplines, and mobilization timeline. Our team responds within 4 business hours — guaranteed.
            </motion.p>
            <motion.ul variants={stagger} className="flex flex-col gap-4 text-primary-foreground/75 font-mono text-sm">
              {[{ icon: Phone, text: "+966 11 234 5678" },{ icon: Mail, text: "operations@alnakhla.com.sa" },{ icon: MapPin, text: "King Fahd Road, Riyadh 12214, KSA" }].map(({ icon: Icon, text }) => (
                <motion.li key={text} variants={fadeUp} className="flex items-center gap-3">
                  <Icon size={13} className="text-primary-foreground flex-shrink-0" />
                  {text}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40, rotateY: -12 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="bg-background p-8 lg:p-10 flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Company</label>
                <input className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors" placeholder="Saudi Aramco" />
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Contact Name</label>
                <input className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors" placeholder="Mohammed Al-Ahmad" />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Disciplines Required</label>
              <input className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors" placeholder="Drilling engineers, HSE officers, welders..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Headcount</label>
                <input type="number" min={1} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors" placeholder="50" />
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Mobilization Date</label>
                <input type="date" className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[9px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Project Details</label>
              <textarea rows={3} className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none" placeholder="Location, duration, special certifications required..." />
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(200,146,10,0.4)" }} whileTap={{ scale: 0.98 }} className="bg-primary text-primary-foreground py-4 font-mono text-[11px] tracking-[0.35em] uppercase mt-1">
              Submit Request
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-card border-t border-border">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-primary flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 border-2 border-primary-foreground rotate-45" />
              </div>
              <span className="font-display font-black tracking-wider uppercase text-foreground">Al Nakhla</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">Saudi Arabia&apos;s trusted partner for oil and gas manpower since 2007.</p>
            <p className="font-mono text-[10px] text-muted-foreground/50 leading-relaxed">CR: 1010-XXXXXX<br />VAT: 300-XXXXXXXXX-003</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-5">Services</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              {services.map(({ title }) => (
                <li key={title}><a href="#services" className="hover:text-primary transition-colors">{title}</a></li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-5">Offices</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              {["Riyadh (HQ)","Dhahran","Jubail Industrial City","Yanbu Al-Sinaiyah","Jeddah"].map(city => (
                <li key={city} className="flex items-center gap-2.5"><div className="w-1 h-1 bg-primary flex-shrink-0" />{city}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-mono text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-5">Contact</h4>
            <ul className="flex flex-col gap-3.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5"><Phone size={12} className="mt-0.5 flex-shrink-0 text-primary" />+966 11 234 5678</li>
              <li className="flex items-start gap-2.5"><Mail size={12} className="mt-0.5 flex-shrink-0 text-primary" />operations@alnakhla.com.sa</li>
              <li className="flex items-start gap-2.5"><MapPin size={12} className="mt-0.5 flex-shrink-0 text-primary" />King Fahd Road, Riyadh 12214, Kingdom of Saudi Arabia</li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-muted-foreground font-mono">
            <span>© 2026 Al Nakhla Manpower Solutions. All rights reserved.</span>
            <span>Authorized by Saudi Ministry of Human Resources & Social Development</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
