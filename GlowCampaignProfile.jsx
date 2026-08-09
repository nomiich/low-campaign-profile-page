/**
 * Glow — Campaign / Profile page
 * Recreation of the supplied "Sarah" reference.
 *
 * Drop-in: app/campaign/[slug]/page.jsx  →  <GlowCampaignProfile campaign={data} />
 * All copy/values come from the `campaign` prop, so this maps straight onto a
 * Supabase row. Nothing is hardcoded into the markup.
 *
 * Assumptions made in the absence of brand assets (all in ONE place, see TOKENS):
 *  - Display serif  : Cormorant Garamond  (matches the high-contrast serif in the reference)
 *  - Script         : Pinyon Script       (logo + "Gift a little glow")
 *  - Body / UI sans : Inter
 *  - Golds, creams, text greys sampled from the reference PNG
 * Swap the four font names and the TOKENS block for the real brand values and
 * the whole page updates — no other edits needed.
 *
 * In a real Next.js app, replace the @import with next/font/google for perf.
 */

const defaultCampaign = {
  name: "Sarah",
  age: 32,
  verified: true,
  location: "Sydney, Australia",
  photo: null, // pass a URL; falls back to a warm placeholder
  quote:
    "I've wanted to feel confident in my skin for so long. This is my step towards a new chapter.",
  procedure: "Upper Blepharoplasty",
  clinic: "Bangkok Clinic",
  date: "To be confirmed",
  currency: "A$",
  raised: 8150,
  goal: 12000,
  supporters: 156,
  daysLeft: 24,
  about: [
    "I'm a mum of two beautiful girls and a full-time teacher. After years of putting everyone else first, I'm ready to do something for me.",
    "This procedure isn't just about how I look – it's about how I feel when I look in the mirror.",
    "Thank you to everyone who supports me on this journey.",
  ],
  journey: [
    {
      icon: "check",
      title: "Quote Verified",
      body: "Quote for Upper Blepharoplasty verified by Glow.",
      meta: "A$12,000",
      state: "done",
    },
    {
      icon: "heart",
      title: "Fundraising",
      body: "Sarah's Glow Goal is being funded by kind supporters like you.",
      meta: "A$8,150",
      state: "active",
    },
    {
      icon: "calendar",
      title: "Procedure",
      body: "The date will be set once Sarah's Glow Goal is reached.",
      meta: "To be confirmed",
      state: "upcoming",
    },
    {
      icon: "sparkle",
      title: "Glow Story",
      body: "Sarah will share her story and results to inspire others.",
      meta: "Coming soon",
      state: "upcoming",
    },
  ],
  recentSupporters: [
    { name: "Amy", amount: "A$50", when: "2 hours ago" },
    { name: "Jess", amount: "A$25", when: "5 hours ago" },
    { name: "Megan", amount: "A$100", when: "1 day ago" },
    { name: "Sophia", amount: "A$30", when: "1 day ago" },
  ],
  giftAmounts: ["A$25", "A$50", "A$100"],
};

/* ── icons (inline SVG — no icon library dependency) ───────────────── */
const I = {
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12.5 9.5 18 20 6.5" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.3s-7.6-4.8-7.6-10A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.6 2.9c0 5.2-7.6 10-7.6 10z" /></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" /><line x1="8" y1="3" x2="8" y2="6.5" /><line x1="16" y1="3" x2="16" y2="6.5" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l1.9 5.6 5.6 1.9-5.6 1.9L12 17.6l-1.9-5.6-5.6-1.9 5.6-1.9L12 2.6z" /><path d="M19 15l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" opacity=".7" /></svg>
  ),
  procedure: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 3l1.4 4.1L14.5 8.5 10.4 9.9 9 14l-1.4-4.1L3.5 8.5l4.1-1.4L9 3z" /><path d="M17 12l.9 2.7 2.7.9-2.7.9-.9 2.7-.9-2.7-2.7-.9 2.7-.9.9-2.7z" opacity=".75" /></svg>
  ),
  clinic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.3" /></svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16.5" /><circle cx="12" cy="7.8" r=".9" fill="currentColor" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" /></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>
  ),
};

export default function GlowCampaignProfile({ campaign = defaultCampaign }) {
  const c = campaign;
  const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
  const money = (n) => c.currency + n.toLocaleString("en-AU");

  return (
    <div className="glow-root">
      <style>{css}</style>

      {/* ── header ─────────────────────────────────────────────── */}
      <header className="glow-header">
        <div className="glow-shell glow-header__inner">
          <a className="glow-logo" href="/">
            <span className="glow-logo__word">
              Glow<span className="glow-logo__star">{I.sparkle}</span>
            </span>
            <span className="glow-logo__tag">Gift a little glow</span>
          </a>

          <nav className="glow-nav">
            <a href="#">Explore Procedures <i className="glow-nav__chev">{I.chevron}</i></a>
            <a href="#">How It Works</a>
            <a href="#">About Glow</a>
            <a href="#">Glow Stories</a>
            <a href="#">For Clinics <span className="glow-tagpill">New</span></a>
          </nav>

          <div className="glow-header__actions">
            <button className="glow-iconbtn" aria-label="Search">{I.search}</button>
            <button className="glow-btn glow-btn--ghost">Log in</button>
            <button className="glow-btn glow-btn--gold">Get Started</button>
          </div>
        </div>
      </header>

      <main className="glow-shell glow-main">
        {/* ── hero ─────────────────────────────────────────────── */}
        <section className="glow-hero">
          <article className="glow-card glow-profile">
            <div className="glow-portrait">
              {c.photo ? (
                <img src={c.photo} alt={`${c.name}, ${c.age}`} />
              ) : (
                <div className="glow-portrait__ph" role="img" aria-label="Portrait" />
              )}
            </div>

            <div className="glow-profile__body">
              <div className="glow-nameline">
                <h1 className="glow-name">{c.name}, {c.age}</h1>
                {c.verified && (
                  <span className="glow-verified"><i>{I.check}</i>Verified</span>
                )}
              </div>

              <p className="glow-loc"><i>{I.pin}</i>{c.location}</p>

              <blockquote className="glow-quote">
                <span className="glow-quote__mark">&ldquo;</span>
                <p>&ldquo;{c.quote}&rdquo; <i className="glow-inlineheart">{I.heart}</i></p>
              </blockquote>

              <dl className="glow-meta">
                <div className="glow-meta__item">
                  <dt><i>{I.procedure}</i>Procedure</dt>
                  <dd>{c.procedure}</dd>
                </div>
                <div className="glow-meta__item">
                  <dt><i>{I.clinic}</i>Clinic</dt>
                  <dd>{c.clinic}</dd>
                </div>
                <div className="glow-meta__item">
                  <dt><i>{I.calendar}</i>Date</dt>
                  <dd>{c.date}</dd>
                </div>
              </dl>
            </div>
          </article>

          {/* ── glow goal + orb ────────────────────────────────── */}
          <article className="glow-card glow-goal">
            <div className="glow-goal__head">
              <span className="glow-eyebrow">Glow Goal <i className="glow-info">{I.info}</i></span>
            </div>

            <div className="glow-goal__row">
              <div className="glow-goal__figures">
                <p className="glow-amount">{money(c.raised)}</p>
                <p className="glow-of">of {money(c.goal)} goal</p>
              </div>

              {/* Glow Orb — signature element */}
              <div className="glow-orb" role="img" aria-label={`${pct} percent of goal`}>
                <span className="glow-orb__halo" aria-hidden="true" />
                <span className="glow-orb__ring" aria-hidden="true" />
                <span className="glow-orb__core" aria-hidden="true" />
                <span className="glow-orb__label">
                  <strong>{pct}%</strong>
                  <em>of goal</em>
                </span>
              </div>
            </div>

            <div className="glow-meter" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <span className="glow-meter__fill" style={{ width: `${pct}%` }}>
                <span className="glow-meter__shimmer" aria-hidden="true" />
                <span className="glow-meter__tip" aria-hidden="true" />
              </span>
            </div>

            <div className="glow-goal__foot">
              <span className="glow-hearts"><i>{I.heart}</i>Raised by {c.supporters} kind hearts</span>
              <span className="glow-days">{c.daysLeft} days to go</span>
            </div>
          </article>
        </section>

        {/* ── trust bar ────────────────────────────────────────── */}
        <section className="glow-card glow-trust">
          <div className="glow-trust__col">
            <span className="glow-trust__icon glow-trust__icon--plain">{I.sparkle}</span>
            <div>
              <h2 className="glow-eyebrow">Verified Fundraiser</h2>
              <p>
                {c.name}&rsquo;s procedure, quote and clinic have been verified by Glow.{" "}
                <a href="#" className="glow-link">Learn more <i>{I.arrow}</i></a>
              </p>
            </div>
          </div>

          <span className="glow-trust__rule" aria-hidden="true" />

          <div className="glow-trust__col">
            <span className="glow-trust__icon">{I.lock}</span>
            <div>
              <h2 className="glow-eyebrow">Privacy on her terms</h2>
              <p>
                {c.name} has chosen to share her story and progress publicly.{" "}
                <a href="#" className="glow-link glow-link--u">Learn about privacy on Glow.</a>
              </p>
            </div>
          </div>
        </section>

        {/* ── three columns ────────────────────────────────────── */}
        <section className="glow-cols">
          {/* about */}
          <article className="glow-card glow-about">
            <header className="glow-card__head">
              <h2 className="glow-h2">About {c.name}</h2>
              <i className="glow-cardheart">{I.heart}</i>
            </header>
            {c.about.map((p, i) => (
              <p className="glow-body" key={i}>
                {p}
                {i === c.about.length - 1 && <i className="glow-inlineheart">{I.heart}</i>}
              </p>
            ))}
            <button className="glow-btn glow-btn--outline"><i>{I.heart}</i>Follow {c.name}</button>
          </article>

          {/* journey */}
          <article className="glow-card glow-journey">
            <header className="glow-card__head">
              <h2 className="glow-h2 glow-h2--ruled">{c.name}&rsquo;s Journey</h2>
            </header>
            <ol className="glow-timeline">
              {c.journey.map((s, i) => (
                <li className={`glow-step glow-step--${s.state}`} key={i}>
                  <span className="glow-step__node">{I[s.icon]}</span>
                  <div className="glow-step__text">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                  <span className="glow-step__meta">{s.meta}</span>
                </li>
              ))}
            </ol>
          </article>

          {/* supporters */}
          <article className="glow-card glow-supporters">
            <header className="glow-card__head">
              <h2 className="glow-h2 glow-h2--ruled">Recent Supporters</h2>
              <i className="glow-cardheart">{I.heart}</i>
            </header>
            <ul className="glow-suplist">
              {c.recentSupporters.map((s, i) => (
                <li key={i}>
                  <span className="glow-avatar">{s.name[0]}</span>
                  <span className="glow-sup__name">{s.name}</span>
                  <span className="glow-sup__amt">{s.amount}</span>
                  <span className="glow-sup__when">{s.when}</span>
                  <i className="glow-sup__heart">{I.heart}</i>
                </li>
              ))}
            </ul>
            <button className="glow-btn glow-btn--outline glow-btn--wide">
              See all supporters <i className="glow-btn__arrow">{I.arrow}</i>
            </button>
          </article>
        </section>

        {/* ── donate bar ───────────────────────────────────────── */}
        <section className="glow-card glow-donate">
          <div className="glow-donate__brand">
            <p className="glow-script">Gift a little glow <i className="glow-inlineheart">{I.heart}</i></p>
            <p className="glow-script__sub">Every gift brings her closer</p>
          </div>

          <p className="glow-donate__copy">
            Your support can help {c.name} take her next step towards confidence and a future she deserves.
          </p>

          <div className="glow-donate__actions">
            <div className="glow-amounts">
              {c.giftAmounts.map((a, i) => (
                <button key={a} className={`glow-amt${i === 1 ? " is-selected" : ""}`}>{a}</button>
              ))}
              <button className="glow-amt">Other</button>
            </div>
            <button className="glow-btn glow-btn--gold glow-btn--cta">
              Gift a Little Glow <i>{I.heart}</i>
            </button>
          </div>

          <p className="glow-secure"><i>{I.lock}</i>100% secure. You can choose to remain anonymous.</p>
        </section>
      </main>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Styles. Scoped under .glow-root so nothing leaks into the rest of
   the site. Move to GlowCampaignProfile.module.css if you prefer —
   the class names are already namespaced for it.
   ──────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&family=Pinyon+Script&display=swap');

.glow-root{
  /* ── TOKENS ── replace with the real brand values ── */
  --cream:#FCF9F4;
  --card:#FFFFFF;
  --ink:#3B342C;
  --ink-soft:#6B6259;
  --muted:#948B80;
  --line:#F0E9DD;

  --gold:#D3A24A;
  --gold-deep:#B98529;
  --gold-soft:#EFD9AC;
  --gold-pale:#FBF1DE;
  --ember-1:#FFF6E4;
  --ember-2:#FFD79A;
  --ember-3:#F5B45E;

  --shadow-s:0 1px 2px rgba(150,120,70,.05), 0 6px 18px rgba(150,120,70,.06);
  --shadow-m:0 2px 4px rgba(150,120,70,.05), 0 14px 40px rgba(150,120,70,.08);
  --r-lg:22px;
  --r-md:16px;

  font-family:'Inter',system-ui,-apple-system,sans-serif;
  color:var(--ink);
  background:
    radial-gradient(1100px 520px at 78% -8%, #FFF6E7 0%, rgba(255,246,231,0) 62%),
    var(--cream);
  min-height:100%;
  -webkit-font-smoothing:antialiased;
}
.glow-root *,.glow-root *::before,.glow-root *::after{box-sizing:border-box}
.glow-root p,.glow-root h1,.glow-root h2,.glow-root h3,.glow-root dl,.glow-root dd,.glow-root ol,.glow-root ul,.glow-root blockquote{margin:0;padding:0}
.glow-root ol,.glow-root ul{list-style:none}
.glow-root i{display:inline-flex;align-items:center;justify-content:center}
.glow-root svg{width:1em;height:1em;display:block}
.glow-root button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}
.glow-root a{color:inherit;text-decoration:none}
.glow-root :focus-visible{outline:2px solid var(--gold);outline-offset:3px;border-radius:8px}

.glow-shell{max-width:1180px;margin:0 auto;padding:0 22px;width:100%}

/* ── header ───────────────────────────────────────────── */
.glow-header{background:rgba(255,255,255,.72);backdrop-filter:blur(10px);border-bottom:1px solid rgba(240,233,221,.9)}
.glow-header__inner{display:flex;align-items:center;gap:34px;height:82px}
.glow-logo{display:flex;flex-direction:column;gap:1px;flex-shrink:0}
.glow-logo__word{font-family:'Pinyon Script',cursive;font-size:34px;line-height:1.05;color:var(--gold-deep);position:relative;padding-right:16px}
.glow-logo__star{position:absolute;right:-2px;top:2px;font-size:11px;color:var(--gold);filter:drop-shadow(0 0 5px rgba(233,183,96,.8))}
.glow-logo__tag{font-size:8.5px;letter-spacing:.19em;text-transform:uppercase;color:var(--muted);font-weight:500}

.glow-nav{display:flex;align-items:center;gap:28px;font-size:13.5px;font-weight:500;color:var(--ink-soft);margin-right:auto}
.glow-nav a{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;transition:color .2s}
.glow-nav a:hover{color:var(--gold-deep)}
.glow-nav__chev{font-size:13px;opacity:.65}
.glow-tagpill{font-size:9.5px;font-weight:600;letter-spacing:.04em;color:#fff;background:linear-gradient(135deg,var(--gold),var(--gold-deep));padding:2.5px 7px;border-radius:999px}

.glow-header__actions{display:flex;align-items:center;gap:12px;flex-shrink:0}
.glow-iconbtn{font-size:19px;color:var(--ink-soft);padding:6px}

.glow-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:13.5px;font-weight:500;border-radius:999px;padding:10px 22px;transition:transform .18s,box-shadow .22s,background .22s}
.glow-btn--ghost{border:1px solid var(--line);background:#fff;box-shadow:var(--shadow-s)}
.glow-btn--ghost:hover{border-color:var(--gold-soft)}
.glow-btn--gold{color:#fff;font-weight:600;background:linear-gradient(135deg,#F0C173 0%,var(--gold) 45%,var(--gold-deep) 100%);box-shadow:0 3px 12px rgba(203,150,60,.32),0 0 22px rgba(240,193,115,.4)}
.glow-btn--gold:hover{transform:translateY(-1px);box-shadow:0 5px 18px rgba(203,150,60,.4),0 0 30px rgba(240,193,115,.55)}

.glow-main{padding:26px 22px 60px;display:flex;flex-direction:column;gap:20px}
.glow-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:var(--shadow-m)}

/* ── hero ─────────────────────────────────────────────── */
.glow-hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:20px;align-items:stretch}
.glow-profile{display:grid;grid-template-columns:302px minmax(0,1fr);gap:30px;padding:16px}
.glow-portrait{border-radius:var(--r-md);overflow:hidden;position:relative;box-shadow:0 10px 30px rgba(150,110,50,.16)}
.glow-portrait img{width:100%;height:100%;object-fit:cover;display:block}
.glow-portrait__ph{width:100%;height:100%;min-height:318px;background:
  radial-gradient(120% 80% at 30% 20%,#FFE9C4 0%,#F3C283 42%,#D89B58 78%,#B97A3E 100%)}

.glow-profile__body{padding:22px 18px 16px 0;display:flex;flex-direction:column}
.glow-nameline{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.glow-name{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:500;letter-spacing:.005em;line-height:1.05}
.glow-verified{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--gold-deep);background:var(--gold-pale);border:1px solid var(--gold-soft);border-radius:999px;padding:5px 13px}
.glow-verified i{font-size:10px}

.glow-loc{display:flex;align-items:center;gap:6px;color:var(--ink-soft);font-size:13.5px;margin-top:12px}
.glow-loc i{font-size:15px;color:var(--muted)}

.glow-quote{position:relative;margin-top:20px;padding-left:34px;max-width:330px}
.glow-quote__mark{position:absolute;left:0;top:-6px;font-family:'Cormorant Garamond',serif;font-size:40px;color:var(--gold-soft);line-height:1}
.glow-quote p{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19.5px;line-height:1.55;color:var(--ink)}
.glow-inlineheart{font-size:13px;color:var(--gold);vertical-align:-1px;margin-left:4px}

.glow-meta{display:flex;gap:32px;margin-top:auto;padding-top:26px;flex-wrap:wrap}
.glow-meta__item dt{display:flex;align-items:center;gap:5px;font-size:10.5px;letter-spacing:.05em;color:var(--muted);margin-bottom:5px}
.glow-meta__item dt i{font-size:12px;color:var(--gold)}
.glow-meta__item dd{font-size:12.5px;color:var(--ink-soft);font-weight:500}

/* ── glow goal card ───────────────────────────────────── */
.glow-goal{padding:26px 28px 24px;display:flex;flex-direction:column;position:relative;overflow:hidden}
.glow-goal::after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(70% 90% at 88% 22%,rgba(255,215,154,.20) 0%,rgba(255,215,154,0) 62%)}
.glow-goal > *{position:relative;z-index:1}
.glow-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft)}
.glow-info{font-size:13px;color:var(--muted)}

.glow-goal__row{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:14px}
.glow-amount{font-family:'Cormorant Garamond',serif;font-size:54px;font-weight:500;line-height:1;letter-spacing:-.01em}
.glow-of{font-size:15px;color:var(--ink-soft);margin-top:8px}

/* ── the Glow Orb ─────────────────────────────────────── */
.glow-orb{position:relative;width:132px;height:132px;flex-shrink:0;display:grid;place-items:center;isolation:isolate}
/* outermost bloom — fades out completely, no hard edge anywhere */
.glow-orb__halo{position:absolute;width:230%;height:230%;border-radius:50%;
  background:radial-gradient(circle closest-side,
    rgba(255,206,132,.42) 0%,
    rgba(255,196,116,.24) 32%,
    rgba(252,186,106,.10) 55%,
    rgba(250,180,100,0) 76%);
  filter:blur(6px)}
/* the luminous ring: light, not a stroke */
.glow-orb__ring{position:absolute;inset:0;border-radius:50%;
  background:radial-gradient(circle closest-side,
    rgba(255,240,210,0) 40%,
    rgba(255,243,216,.55) 58%,
    rgba(255,231,183,.95) 70%,
    rgba(250,199,124,.80) 80%,
    rgba(245,180,94,.34) 90%,
    rgba(243,172,84,0) 100%);
  filter:blur(1.5px)}
/* warm interior body so it reads as a glowing sphere, not a donut */
.glow-orb__core{position:absolute;width:78%;height:78%;border-radius:50%;
  background:radial-gradient(circle at 42% 36%,
    rgba(255,252,242,.95) 0%,
    rgba(255,238,201,.80) 38%,
    rgba(253,214,146,.55) 68%,
    rgba(250,196,116,.18) 100%);
  box-shadow:0 0 34px 6px rgba(255,205,133,.55), inset 0 -6px 20px rgba(233,168,80,.20);
  filter:blur(.4px)}
.glow-orb__label{position:relative;z-index:2;text-align:center;line-height:1;text-shadow:0 1px 6px rgba(170,115,40,.35)}
.glow-orb__label strong{display:block;font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:600;color:#fff}
.glow-orb__label em{display:block;font-style:normal;font-size:10.5px;font-weight:500;color:rgba(255,255,255,.92);margin-top:4px;letter-spacing:.02em}

/* ── meter ────────────────────────────────────────────── */
.glow-meter{position:relative;height:26px;border-radius:999px;margin-top:22px;
  background:#EFEAE1;box-shadow:inset 0 1px 3px rgba(140,115,75,.16)}
.glow-meter__fill{position:absolute;left:0;top:0;bottom:0;border-radius:999px;overflow:hidden;
  background:linear-gradient(90deg,#E2A94F 0%,#EFC377 26%,#FBE3B4 62%,#FFF3D9 86%,#F6D9A2 100%);
  box-shadow:0 0 16px rgba(238,182,100,.75),0 0 34px rgba(238,182,100,.35),inset 0 1px 1px rgba(255,255,255,.7)}
.glow-meter__shimmer{position:absolute;inset:0;
  background:
    radial-gradient(1.4px 1.4px at 12% 34%,rgba(255,255,255,.95),transparent),
    radial-gradient(1.6px 1.6px at 27% 66%,rgba(255,255,255,.8),transparent),
    radial-gradient(1.2px 1.2px at 41% 26%,rgba(255,255,255,.9),transparent),
    radial-gradient(1.7px 1.7px at 58% 60%,rgba(255,255,255,.85),transparent),
    radial-gradient(1.3px 1.3px at 72% 32%,rgba(255,255,255,.9),transparent),
    radial-gradient(1.5px 1.5px at 88% 62%,rgba(255,255,255,.8),transparent);
  animation:glow-twinkle 4.5s ease-in-out infinite}
.glow-meter__tip{position:absolute;right:-2px;top:0;bottom:0;width:26px;border-radius:999px;
  background:radial-gradient(circle closest-side,rgba(255,251,238,.95),rgba(255,236,196,0) 78%)}
@keyframes glow-twinkle{0%,100%{opacity:.5}50%{opacity:1}}

.glow-goal__foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:18px;font-size:13px;color:var(--ink-soft)}
.glow-hearts{display:inline-flex;align-items:center;gap:8px}
.glow-hearts i{font-size:15px;color:var(--gold)}
.glow-days{color:var(--ink-soft)}

/* ── trust bar ────────────────────────────────────────── */
.glow-trust{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:30px;padding:22px 28px}
.glow-trust__col{display:flex;align-items:center;gap:18px}
.glow-trust__col p{font-size:13px;color:var(--ink-soft);line-height:1.6;margin-top:5px}
.glow-trust__icon{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;font-size:21px;color:var(--gold-deep);flex-shrink:0;
  background:radial-gradient(circle at 40% 32%,#FFF8EA,#FBEBCE);border:1px solid var(--gold-soft);
  box-shadow:0 0 18px rgba(245,205,140,.5)}
.glow-trust__icon--plain{background:none;border:0;box-shadow:none;font-size:26px;color:var(--gold);filter:drop-shadow(0 0 10px rgba(240,190,110,.8))}
.glow-trust__rule{width:1px;height:52px;background:linear-gradient(180deg,transparent,var(--line),transparent)}
.glow-link{color:var(--gold-deep);font-weight:500;display:inline-flex;align-items:center;gap:5px;text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--gold-soft)}
.glow-link i{font-size:11px}
.glow-link--u{text-decoration-color:var(--gold-soft)}

/* ── three columns ────────────────────────────────────── */
.glow-cols{display:grid;grid-template-columns:0.82fr 1.03fr 1.05fr;gap:20px;align-items:start}
.glow-card__head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:18px}
.glow-h2{font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:500;line-height:1.2}
.glow-h2--ruled{position:relative;padding-bottom:12px}
.glow-h2--ruled::after{content:'';position:absolute;left:0;bottom:0;width:42px;height:2px;border-radius:2px;
  background:linear-gradient(90deg,var(--gold),rgba(211,162,74,0))}
.glow-cardheart{font-size:16px;color:var(--gold-soft)}

.glow-about,.glow-journey,.glow-supporters{padding:24px 24px 26px}
.glow-body{font-size:13.5px;line-height:1.72;color:var(--ink-soft);margin-bottom:14px}
.glow-btn--outline{border:1px solid var(--line);background:#fff;font-size:13px;padding:10px 20px;box-shadow:var(--shadow-s);margin-top:6px}
.glow-btn--outline:hover{border-color:var(--gold-soft);background:#FFFDF9}
.glow-btn--outline i{font-size:14px;color:var(--gold)}
.glow-btn--wide{width:100%;justify-content:center;margin-top:16px;padding:13px 20px}
.glow-btn__arrow{margin-left:auto;font-size:15px;color:var(--ink-soft)}

/* timeline */
.glow-timeline{display:flex;flex-direction:column}
.glow-step{position:relative;display:grid;grid-template-columns:38px minmax(0,1fr) auto;gap:16px;padding-bottom:22px}
.glow-step:last-child{padding-bottom:0}
.glow-step::before{content:'';position:absolute;left:18.5px;top:38px;bottom:0;width:1.5px;
  background:linear-gradient(180deg,var(--gold-soft),rgba(239,217,172,.35))}
.glow-step:last-child::before{display:none}
.glow-step__node{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:16px;color:#fff;
  background:linear-gradient(140deg,#F3CE8E,var(--gold) 55%,var(--gold-deep));
  box-shadow:0 0 0 4px rgba(251,241,222,.9),0 2px 10px rgba(200,150,60,.28),0 0 18px rgba(240,195,120,.55)}
.glow-step--upcoming .glow-step__node{color:var(--gold-deep);
  background:radial-gradient(circle at 40% 34%,#FFFCF5,#FBEFD8);
  border:1px solid var(--gold-soft);
  box-shadow:0 0 0 4px rgba(252,247,238,.9),0 2px 8px rgba(200,150,60,.12)}
.glow-step__text h3{font-size:14px;font-weight:600;color:var(--ink);margin-bottom:4px}
.glow-step__text p{font-size:12.5px;line-height:1.6;color:var(--ink-soft)}
.glow-step__meta{font-size:12.5px;color:var(--muted);white-space:nowrap;padding-top:2px}

/* supporters */
.glow-suplist li{display:grid;grid-template-columns:36px minmax(0,1fr) auto auto 20px;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid var(--line)}
.glow-suplist li:last-child{border-bottom:0}
.glow-avatar{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:600;color:var(--gold-deep);
  background:radial-gradient(circle at 38% 32%,#FFF9EE,#FAEDD5);border:1px solid rgba(239,217,172,.8)}
.glow-sup__name{font-size:13.5px;font-weight:500}
.glow-sup__amt{font-size:13.5px;font-weight:600;color:var(--ink)}
.glow-sup__when{font-size:11.5px;color:var(--muted);white-space:nowrap}
.glow-sup__heart{font-size:15px;color:var(--gold-soft)}

/* ── donate bar ───────────────────────────────────────── */
.glow-donate{display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:'brand copy actions' 'brand secure actions';gap:6px 34px;align-items:center;padding:22px 28px}
.glow-donate__brand{grid-area:brand}
.glow-script{font-family:'Pinyon Script',cursive;font-size:35px;line-height:1.15;color:var(--gold-deep)}
.glow-script__sub{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-top:2px}
.glow-donate__copy{grid-area:copy;font-size:13px;line-height:1.65;color:var(--ink-soft);max-width:250px}
.glow-donate__actions{grid-area:actions;display:flex;align-items:center;gap:16px}
.glow-amounts{display:flex;gap:10px}
.glow-amt{border:1px solid var(--line);background:#fff;border-radius:12px;padding:12px 22px;font-size:14px;font-weight:500;color:var(--ink-soft);transition:.2s}
.glow-amt:hover{border-color:var(--gold-soft)}
.glow-amt.is-selected{border-color:var(--gold);color:var(--gold-deep);background:#FFFCF4;box-shadow:0 0 0 3px rgba(240,205,140,.22)}
.glow-btn--cta{padding:16px 34px;font-size:15px;border-radius:999px}
.glow-btn--cta i{font-size:17px}
.glow-secure{grid-area:secure;display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--muted);margin-top:4px}
.glow-secure i{font-size:13px}

/* ── responsive ───────────────────────────────────────── */
@media (max-width:1100px){
  .glow-nav{display:none}
  .glow-hero{grid-template-columns:1fr}
  .glow-cols{grid-template-columns:1fr 1fr}
  .glow-supporters{grid-column:1 / -1}
  .glow-donate{grid-template-columns:auto minmax(0,1fr);grid-template-areas:'brand copy' 'actions actions' 'secure secure';gap:18px 30px}
  .glow-donate__actions{justify-content:space-between}
}
@media (max-width:820px){
  .glow-profile{grid-template-columns:1fr;gap:0}
  .glow-portrait__ph{min-height:300px}
  .glow-profile__body{padding:22px 6px 6px}
  .glow-quote{max-width:none}
  .glow-cols{grid-template-columns:1fr}
  .glow-supporters{grid-column:auto}
}
@media (max-width:640px){
  .glow-shell{padding:0 16px}
  .glow-main{padding:18px 16px 44px;gap:16px}
  .glow-header__inner{height:70px;gap:12px}
  .glow-logo{margin-right:auto}
  .glow-logo__word{font-size:29px}
  .glow-btn--ghost{display:none}
  .glow-name{font-size:34px}
  .glow-quote p{font-size:17.5px}
  .glow-meta{gap:22px}
  .glow-goal{padding:22px 20px}
  .glow-goal__row{gap:12px}
  .glow-amount{font-size:40px}
  .glow-orb{width:104px;height:104px}
  .glow-orb__label strong{font-size:27px}
  .glow-orb__label em{font-size:9px}
  .glow-meter{height:22px}
  .glow-trust{grid-template-columns:1fr;gap:20px;padding:20px}
  .glow-trust__rule{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--line),transparent)}
  .glow-about,.glow-journey,.glow-supporters{padding:20px}
  .glow-step{grid-template-columns:38px minmax(0,1fr);gap:14px}
  .glow-step__meta{grid-column:2;padding-top:6px}
  .glow-suplist li{grid-template-columns:36px minmax(0,1fr) auto;gap:12px}
  .glow-sup__when{grid-column:2;font-size:11px}
  .glow-sup__heart{display:none}
  .glow-donate{grid-template-columns:1fr;grid-template-areas:'brand' 'copy' 'actions' 'secure';padding:22px 20px;text-align:left}
  .glow-donate__copy{max-width:none}
  .glow-donate__actions{flex-direction:column;align-items:stretch;gap:14px}
  .glow-amounts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .glow-btn--cta{width:100%}
}
@media (prefers-reduced-motion:reduce){
  .glow-root *{animation:none !important;transition:none !important}
}
`;
