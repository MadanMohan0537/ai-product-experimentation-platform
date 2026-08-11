"use client";

import { useState } from "react";

type View = "Command center" | "Experiments" | "Knowledge base";

const FREE_TRIAL_LIMIT = 2;
const FREE_TRIAL_STORAGE_KEY = "variant-free-designs-used";

const navItems: { label: View; icon: string }[] = [
  { label: "Command center", icon: "grid" },
  { label: "Experiments", icon: "flask" },
  { label: "Knowledge base", icon: "book" },
];

const experiments = [
  { name: "One-Click Checkout", owner: "Maya Chen", lift: "+6.8%", status: "Live", confidence: 96, priority: 97, tone: "violet" },
  { name: "AI Product Search", owner: "Theo Brooks", lift: "+4.2%", status: "Live", confidence: 89, priority: 88, tone: "blue" },
  { name: "Referral Rewards", owner: "Imani Cole", lift: "+9.1%", status: "Review", confidence: 94, priority: 91, tone: "green" },
  { name: "Dark Mode Prompt", owner: "Lena Ortiz", lift: "−0.7%", status: "Paused", confidence: 78, priority: 71, tone: "orange" },
];

const timeline = [
  { day: "AUG 02", title: "Experiment launched", detail: "10% of US mobile traffic", state: "done" },
  { day: "AUG 05", title: "Conversion trending up", detail: "+4.1% versus control", state: "done" },
  { day: "AUG 08", title: "Android risk detected", detail: "Verification drop-off +11%", state: "risk" },
  { day: "TODAY", title: "AI recommendation ready", detail: "Hold rollout and isolate Android", state: "now" },
  { day: "AUG 16", title: "Scheduled decision", detail: "Final readout · 4 days remaining", state: "future" },
];

const generatedDesign = {
  hypothesis: "Simplifying onboarding to three guided steps will increase completion by 8% for new mobile users.",
  primary: "Onboarding completion rate",
  guardrails: "Day-7 retention · Crash-free sessions",
  duration: "14 days · 18,400 users",
};

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    flask: <><path d="M9 3h6M10 3v6l-5.7 9.2A1.8 1.8 0 0 0 5.8 21h12.4a1.8 1.8 0 0 0 1.5-2.8L14 9V3"/><path d="M7.5 15h9"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    spark: <><path d="m12 3-1.2 4.1a5.4 5.4 0 0 1-3.7 3.7L3 12l4.1 1.2a5.4 5.4 0 0 1 3.7 3.7L12 21l1.2-4.1a5.4 5.4 0 0 1 3.7-3.7L21 12l-4.1-1.2a5.4 5.4 0 0 1-3.7-3.7L12 3Z"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    trend: <><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    dots: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function LineChart() {
  return (
    <div className="chart-wrap" aria-label="Conversion rate trend chart">
      <div className="chart-y"><span>6.0%</span><span>5.5%</span><span>5.0%</span><span>4.5%</span></div>
      <svg className="chart" viewBox="0 0 720 190" preserveAspectRatio="none" role="img">
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7165e8" stopOpacity=".22"/><stop offset="1" stopColor="#7165e8" stopOpacity="0"/></linearGradient>
        </defs>
        <g className="grid-lines"><path d="M0 20H720M0 70H720M0 120H720M0 170H720"/></g>
        <path className="area" d="M0 143 C55 140 74 129 112 131 S177 105 223 110 S295 86 338 91 S414 64 458 68 S524 43 570 53 S653 30 720 27 L720 190 L0 190Z"/>
        <path className="control-line" d="M0 150 C90 144 148 151 220 142 S338 147 420 138 S535 143 615 136 S682 135 720 132"/>
        <path className="variant-line" d="M0 143 C55 140 74 129 112 131 S177 105 223 110 S295 86 338 91 S414 64 458 68 S524 43 570 53 S653 30 720 27"/>
        <circle cx="720" cy="27" r="5" className="chart-point"/>
      </svg>
      <div className="chart-x"><span>Aug 2</span><span>Aug 5</span><span>Aug 8</span><span>Aug 11</span></div>
    </div>
  );
}

function Sidebar({ view, setView }: { view: View; setView: (v: View) => void }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><span/><span/><span/></div><span>Variant</span></div>
    <nav>
      <p className="nav-label">WORKSPACE</p>
      {navItems.map(item => <button key={item.label} className={view === item.label ? "nav-item active" : "nav-item"} onClick={() => setView(item.label)}><Icon name={item.icon}/><span>{item.label}</span>{item.label === "Experiments" && <b>12</b>}</button>)}
      <p className="nav-label second">TOOLS</p>
      <button className="nav-item"><Icon name="trend"/><span>Metrics library</span></button>
      <button className="nav-item"><Icon name="users"/><span>Audiences</span></button>
      <button className="nav-item"><Icon name="shield"/><span>Feature flags</span></button>
    </nav>
    <div className="sidebar-bottom">
      <div className="team"><div className="avatar small">MX</div><div><strong>Momentum Labs</strong><span>Product team</span></div><Icon name="dots"/></div>
    </div>
  </aside>;
}

function Topbar({ onCreate, freeUsesRemaining }: { onCreate: () => void; freeUsesRemaining: number }) {
  return <header className="topbar">
    <div className="crumb"><span>Momentum Labs</span><b>/</b><strong>Experimentation</strong></div>
    <div className="top-actions">
      <div className={freeUsesRemaining > 0 ? "trial-badge" : "trial-badge ended"}>
        <Icon name={freeUsesRemaining > 0 ? "spark" : "clock"} size={14}/>
        <span>{freeUsesRemaining > 0 ? `${freeUsesRemaining} free ${freeUsesRemaining === 1 ? "analysis" : "analyses"} left` : "Free trial ended"}</span>
      </div>
      <button className="search"><Icon name="search" size={16}/><span>Search</span><kbd>⌘ K</kbd></button>
      <button className="icon-btn" aria-label="Notifications"><Icon name="bell"/><span className="notification"/></button>
      <button className="primary" onClick={onCreate}><Icon name="plus" size={16}/>New experiment</button>
      <div className="avatar">MC</div>
    </div>
  </header>;
}

function CommandCenter({ rollout, onRollout, onCreate }: { rollout: number; onRollout: (n: number) => void; onCreate: () => void }) {
  const [decision, setDecision] = useState("Hold at 25%");
  return <div className="page-shell">
    <div className="page-heading">
      <div><p className="eyebrow">MONDAY, AUGUST 10</p><h1>Good morning, Maya.</h1><p>Here’s what needs your attention across the experiment portfolio.</p></div>
      <div className="health"><span className="pulse"/><div><strong>System healthy</strong><small>All event streams operational</small></div></div>
    </div>
    <section className="metric-grid">
      <article><div className="metric-icon purple"><Icon name="flask"/></div><div><span>Active experiments</span><strong>8</strong><small><b>+2</b> this week</small></div></article>
      <article><div className="metric-icon green"><Icon name="trend"/></div><div><span>Portfolio win rate</span><strong>42%</strong><small><b>+6.4%</b> vs last quarter</small></div></article>
      <article><div className="metric-icon blue"><Icon name="clock"/></div><div><span>Avg. time to learn</span><strong>11.4d</strong><small><b>−2.1d</b> improvement</small></div></article>
      <article><div className="metric-icon orange"><Icon name="shield"/></div><div><span>Needs attention</span><strong>3</strong><small className="warning">1 high-priority risk</small></div></article>
    </section>

    <section className="focus-grid">
      <article className="panel experiment-focus">
        <div className="panel-head"><div><span className="live"><i/>LIVE EXPERIMENT</span><h2>One-Click Checkout</h2><p>Reducing checkout from five steps to two</p></div><button className="more" aria-label="More options"><Icon name="dots"/></button></div>
        <div className="experiment-meta"><span><b>Owner</b><i className="mini-avatar">MC</i>Maya Chen</span><span><b>Audience</b>US mobile users</span><span><b>Running</b>10 of 14 days</span><span><b>Traffic</b>{rollout}% treatment</span></div>
        <div className="chart-head"><div><span>PRIMARY METRIC</span><h3>Checkout conversion <b>+6.8%</b></h3></div><div className="legend"><span><i className="dot variant"/>Variant 5.84%</span><span><i className="dot control"/>Control 5.47%</span></div></div>
        <LineChart/>
        <div className="confidence-row"><div className="ring"><span>96%</span></div><div><strong>Statistically significant</strong><p>The result clears the experiment’s pre-set 95% significance threshold.</p></div><button className="text-link">View full analysis <Icon name="arrow" size={15}/></button></div>
      </article>

      <article className="panel ai-card">
        <div className="ai-head"><div className="ai-icon"><Icon name="spark"/></div><div><span>AI DECISION BRIEF</span><small>Updated 8 minutes ago</small></div><span className="confidence-pill">91% confidence</span></div>
        <h2>Hold rollout at {rollout}%</h2>
        <p className="ai-summary">Conversion is improving overall, but a meaningful retention risk is concentrated among new Android users.</p>
        <div className="finding"><div className="finding-icon danger">!</div><div><strong>Android verification drop-off</strong><p>New Android users are abandoning account verification <b>11.2% more often</b> than control.</p></div></div>
        <div className="finding"><div className="finding-icon good"><Icon name="trend" size={15}/></div><div><strong>High-intent users respond well</strong><p>Returning users show <b>+9.4% conversion</b> with no guardrail impact.</p></div></div>
        <div className="recommendation"><span>RECOMMENDED NEXT STEP</span><p>Keep iOS and returning-user traffic live. Investigate Android verification before expanding.</p></div>
        <div className="decision-buttons"><button className={decision === "Hold at 25%" ? "selected" : ""} onClick={() => setDecision("Hold at 25%")}>Hold at 25%</button><button onClick={() => setDecision("Open investigation")}>Open investigation</button></div>
        <p className="decision-note"><Icon name="check" size={14}/> Decision logged: {decision}</p>
      </article>
    </section>

    <section className="lower-grid">
      <article className="panel guardrails"><div className="section-head"><div><span>GUARDRAILS</span><h2>Risk monitor</h2></div><button>View all</button></div>
        <div className="guardrail-row"><div><span>Crash-free sessions</span><small>Target ≥ 99.5%</small></div><strong>99.82%</strong><span className="status ok">Healthy</span></div>
        <div className="guardrail-row"><div><span>p95 checkout latency</span><small>Target &lt; 900ms</small></div><strong>742ms</strong><span className="status ok">Healthy</span></div>
        <div className="guardrail-row"><div><span>7-day retention · Android</span><small>Target ≥ 31.0%</small></div><strong>28.7%</strong><span className="status risk">At risk</span></div>
        <div className="guardrail-row"><div><span>Support contact rate</span><small>Target &lt; 1.8%</small></div><strong>1.4%</strong><span className="status ok">Healthy</span></div>
      </article>
      <article className="panel timeline"><div className="section-head"><div><span>EXPERIMENT TIMELINE</span><h2>What changed</h2></div><button>Full history</button></div>
        <div className="timeline-list">{timeline.map((item, i) => <div className={`timeline-item ${item.state}`} key={item.title}><div className="time-day">{item.day}</div><div className="time-node">{item.state === "risk" ? "!" : item.state === "now" ? <Icon name="spark" size={13}/> : <Icon name="check" size={13}/>}</div><div><strong>{item.title}</strong><p>{item.detail}</p></div>{i < timeline.length - 1 && <i className="connector"/>}</div>)}</div>
      </article>
    </section>

    <section className="panel rollout-panel"><div><span className="eyebrow">PROGRESSIVE DELIVERY</span><h2>Current rollout</h2><p>Increase treatment traffic only when primary and guardrail metrics remain within bounds.</p></div><div className="rollout-control"><div className="rollout-steps">{[1,5,10,25,50,100].map(n => <button key={n} onClick={() => onRollout(n)} className={n <= rollout ? "filled" : ""}>{n}%</button>)}</div><div className="rollout-track"><span style={{width: `${rollout}%`}}/></div></div><button className="secondary" onClick={onCreate}>Plan next phase <Icon name="chevron" size={15}/></button></section>
  </div>;
}

function ExperimentsView({ onCreate }: { onCreate: () => void }) {
  return <div className="page-shell list-page"><div className="list-heading"><div><p className="eyebrow">EXPERIMENT PORTFOLIO</p><h1>Experiments</h1><p>Prioritize ideas, monitor live tests, and capture decisions.</p></div><button className="primary" onClick={onCreate}><Icon name="plus" size={16}/>New experiment</button></div>
    <div className="filter-row"><div className="search wide"><Icon name="search" size={16}/><span>Search experiments...</span></div><button className="filter active">All <b>12</b></button><button className="filter">Live <b>4</b></button><button className="filter">Needs review <b>3</b></button><button className="filter">Completed <b>5</b></button></div>
    <div className="experiment-table panel"><div className="table-row table-head"><span>EXPERIMENT</span><span>STATUS</span><span>PRIORITY</span><span>OBSERVED LIFT</span><span>CONFIDENCE</span><span/></div>{experiments.map(exp => <div className="table-row" key={exp.name}><div className="exp-title"><i className={`exp-mark ${exp.tone}`}/><div><strong>{exp.name}</strong><small>Owned by {exp.owner}</small></div></div><span className={`status ${exp.status.toLowerCase()}`}>{exp.status}</span><div className="priority"><span style={{width:`${exp.priority}%`}}/><b>{exp.priority}</b></div><strong className={exp.lift.startsWith("+") ? "positive" : "negative"}>{exp.lift}</strong><div className="confidence"><span style={{width:`${exp.confidence}%`}}/><b>{exp.confidence}%</b></div><button className="more"><Icon name="chevron"/></button></div>)}</div>
  </div>;
}

function KnowledgeView() {
  const cards = [
    { tag: "CHECKOUT", title: "Guest checkout reduced abandonment by 12%", body: "Removing forced account creation improved completion without lowering repeat purchase rate.", outcome: "Rolled out", date: "Jun 18" },
    { tag: "ONBOARDING", title: "Progress indicators helped only complex flows", body: "A step counter improved completion for business accounts but added friction for individual users.", outcome: "Segmented", date: "May 29" },
    { tag: "SEARCH", title: "AI summaries increased result engagement", body: "Search summaries drove more clicks, while latency above 1.2s erased most of the observed gain.", outcome: "Rolled out", date: "Apr 11" },
    { tag: "PRICING", title: "Annual-plan default harmed trial starts", body: "Revenue per visitor stayed flat because a higher annual mix was offset by fewer trial activations.", outcome: "Rolled back", date: "Mar 22" },
  ];
  return <div className="page-shell knowledge-page"><div className="list-heading"><div><p className="eyebrow">ORGANIZATIONAL MEMORY</p><h1>Experiment knowledge base</h1><p>Find past decisions before your team repeats an experiment.</p></div></div><div className="knowledge-search"><Icon name="search"/><input aria-label="Search knowledge base" placeholder="Search hypotheses, metrics, segments, or outcomes..."/><kbd>⌘ K</kbd></div><div className="knowledge-stats"><span><b>128</b> experiments indexed</span><span><b>47</b> decisions this year</span><span><b>2.4k</b> lessons captured</span></div><div className="knowledge-grid">{cards.map(card => <article className="panel knowledge-card" key={card.title}><div><span className="tag">{card.tag}</span><small>{card.date}</small></div><h2>{card.title}</h2><p>{card.body}</p><footer><span className={card.outcome === "Rolled back" ? "status risk" : "status ok"}>{card.outcome}</span><button>Open readout <Icon name="arrow" size={14}/></button></footer></article>)}</div></div>;
}

function CreateExperiment({ onClose, freeUsesRemaining, onUseFreeAnalysis }: { onClose: () => void; freeUsesRemaining: number; onUseFreeAnalysis: () => boolean }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("Increase onboarding completion for new mobile users");
  const design = generatedDesign;
  const trialEnded = freeUsesRemaining === 0 && step === 1;
  const continueFlow = () => {
    if (step === 1) {
      if (onUseFreeAnalysis()) setStep(2);
      return;
    }
    if (step === 2) setStep(3);
    else onClose();
  };
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className="drawer" role="dialog" aria-modal="true" aria-label="Create experiment"><header><div><span className="eyebrow">AI EXPERIMENT DESIGNER</span><h2>Create an experiment</h2></div><button className="icon-btn" onClick={onClose}><Icon name="close"/></button></header><div className="stepper">{[1,2,3].map(n => <div className={n <= step ? "active" : ""} key={n}><span>{n < step ? <Icon name="check" size={13}/> : n}</span><p>{n === 1 ? "Goal" : n === 2 ? "Design" : "Review"}</p></div>)}</div>
      {trialEnded ? <div className="form-step trial-ended-state"><div className="trial-ended-mark"><Icon name="spark" size={28}/></div><span className="eyebrow">FREE TRIAL COMPLETE</span><h3>You’ve used both free analyses</h3><p>Your two complimentary experiment designs have been used. Upgrade your workspace to continue creating AI-assisted experiments.</p><div className="trial-summary"><div><Icon name="check" size={15}/><span>2 experiment designs created</span></div><div><Icon name="check" size={15}/><span>Hypotheses and metrics generated</span></div><div><Icon name="check" size={15}/><span>Recommendations saved to your workspace</span></div></div></div> : step === 1 && <div className="form-step"><div className="trial-callout"><Icon name="spark" size={16}/><div><strong>{freeUsesRemaining} free {freeUsesRemaining === 1 ? "analysis" : "analyses"} remaining</strong><span>No payment details required</span></div></div><label>What outcome do you want to improve?</label><textarea value={goal} onChange={e => setGoal(e.target.value)} rows={4}/><div className="prompt-help"><Icon name="spark"/><p><strong>Tip</strong> Describe the user, behavior, and outcome. The AI designer will propose a testable hypothesis and measurement plan.</p></div><label>Product area</label><select defaultValue="Onboarding"><option>Onboarding</option><option>Checkout</option><option>Search</option><option>Retention</option></select></div>}
      {step === 2 && <div className="form-step generated"><div className="generated-label"><Icon name="spark"/>AI-GENERATED DESIGN <span>Based on: “{goal}”</span></div><label>Hypothesis</label><div className="generated-field">{design.hypothesis}</div><div className="two-col"><div><label>Primary metric</label><div className="generated-field">{design.primary}</div></div><div><label>Guardrails</label><div className="generated-field">{design.guardrails}</div></div></div><label>Recommended sample</label><div className="generated-field">{design.duration}</div></div>}
      {step === 3 && <div className="form-step review-step"><div className="success-mark"><Icon name="check" size={28}/></div><h3>Your experiment is ready for review</h3><p>The hypothesis, measurement plan, audience, and statistical assumptions will be saved as a draft.</p><div className="review-card"><span>EXPERIMENT</span><strong>Guided mobile onboarding</strong><small>{design.primary} · {design.duration}</small></div></div>}
      <footer>{trialEnded ? <button className="primary" onClick={onClose}>Got it</button> : <><button className="secondary" onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? "Cancel" : "Back"}</button><button className="primary" onClick={continueFlow}>{step === 1 ? <><Icon name="spark" size={15}/>Generate design · {freeUsesRemaining} free left</> : step === 2 ? "Review experiment" : "Save draft"}<Icon name="arrow" size={15}/></button></>}</footer>
    </div></div>;
}

export default function Home() {
  const [view, setView] = useState<View>("Command center");
  const [rollout, setRollout] = useState(25);
  const [creating, setCreating] = useState(false);
  const [freeUsesRemaining, setFreeUsesRemaining] = useState(() => {
    if (typeof window === "undefined") return FREE_TRIAL_LIMIT;
    const used = Number.parseInt(window.localStorage.getItem(FREE_TRIAL_STORAGE_KEY) ?? "0", 10);
    const safeUsed = Number.isFinite(used) ? Math.min(Math.max(used, 0), FREE_TRIAL_LIMIT) : 0;
    return FREE_TRIAL_LIMIT - safeUsed;
  });
  const useFreeAnalysis = () => {
    if (freeUsesRemaining <= 0) return false;
    const nextRemaining = freeUsesRemaining - 1;
    setFreeUsesRemaining(nextRemaining);
    window.localStorage.setItem(FREE_TRIAL_STORAGE_KEY, String(FREE_TRIAL_LIMIT - nextRemaining));
    return true;
  };
  return <main className="app"><Sidebar view={view} setView={setView}/><div className="workspace"><Topbar onCreate={() => setCreating(true)} freeUsesRemaining={freeUsesRemaining}/>{view === "Command center" && <CommandCenter rollout={rollout} onRollout={setRollout} onCreate={() => setCreating(true)}/>} {view === "Experiments" && <ExperimentsView onCreate={() => setCreating(true)}/>} {view === "Knowledge base" && <KnowledgeView/>}</div>{creating && <CreateExperiment onClose={() => setCreating(false)} freeUsesRemaining={freeUsesRemaining} onUseFreeAnalysis={useFreeAnalysis}/>}</main>;
}
