import React from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  Menu,
  X,
  Home,
  Bot,
  LineChart as LineIcon,
  TrendingUp,
  ShieldCheck,
  Users,
  BadgeDollarSign,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import sodexoLogo from "./assets/sodexo-logo.svg";

const months = Array.from({ length: 12 }).map((_, i) => new Date(2024, i, 1).toLocaleString("en", { month: "short" }));
const adoptionSeries = months.map((month, i) => ({
  month,
  workflows: 80 + i * 8 + (i % 3) * 5,
  agentMAU: 1200 + i * 120 + (i % 4) * 60,
}));
const efficiencySeries = [
  { q: "Q1", hours: 18200, cost: 540000 },
  { q: "Q2", hours: 22400, cost: 690000 },
  { q: "Q3", hours: 25500, cost: 780000 },
  { q: "Q4", hours: 30100, cost: 940000 },
];
const roiTimeline = [
  { q: "Q1", invest: 260000, benefit: 540000 },
  { q: "Q2", invest: 280000, benefit: 690000 },
  { q: "Q3", invest: 310000, benefit: 780000 },
  { q: "Q4", invest: 330000, benefit: 940000 },
];
const qualitySeries = [
  { month: "Jan", accuracy: 92, incidents: 7, drift: 0.6 },
  { month: "Feb", accuracy: 93, incidents: 6, drift: 0.4 },
  { month: "Mar", accuracy: 93.5, incidents: 6, drift: 0.5 },
  { month: "Apr", accuracy: 94, incidents: 5, drift: 0.3 },
  { month: "May", accuracy: 94.5, incidents: 5, drift: 0.4 },
  { month: "Jun", accuracy: 95, incidents: 4, drift: 0.2 },
  { month: "Jul", accuracy: 95.2, incidents: 4, drift: 0.3 },
  { month: "Aug", accuracy: 95.4, incidents: 3, drift: 0.2 },
  { month: "Sep", accuracy: 95.7, incidents: 3, drift: 0.2 },
  { month: "Oct", accuracy: 96, incidents: 3, drift: 0.3 },
  { month: "Nov", accuracy: 96.2, incidents: 2, drift: 0.2 },
  { month: "Dec", accuracy: 96.5, incidents: 2, drift: 0.2 },
];
const revenueMix = [
  { name: "Upsell Reco", value: 38 },
  { name: "Lead Scoring", value: 22 },
  { name: "Churn Save", value: 18 },
  { name: "Pricing", value: 12 },
  { name: "Other", value: 10 },
];
const salesUplift = months.map((m, i) => ({ month: m, uplift: 3 + i * 0.4, conv: 12 + (i % 5) }));
const backlog = [
  { name: "Contract Review", type: "GenAI + Approval", owner: "Legal", impact: "High", status: "Queued" },
  { name: "Field Ticket Triage", type: "Routing Agent", owner: "Ops", impact: "Med", status: "Design" },
  { name: "Menu Optimization", type: "MenuAI", owner: "Ops", impact: "High", status: "Pilot" },
  { name: "Supply Enrichment", type: "Pegasus", owner: "Procurement", impact: "Med", status: "Backlog" },
  { name: "Collections Copilot", type: "Agentic", owner: "Finance", impact: "High", status: "Discovery" },
];
const workflowCatalog = [
  { name: "Invoice Reconciliation Bot", owner: "Finance", status: "Live", roi: 3.8 },
  { name: "Sales Playbook Agent", owner: "Sales", status: "Live", roi: 3.1 },
  { name: "Knowledge Answer Agent", owner: "Support", status: "Live", roi: 2.7 },
  { name: "Menu Optimization", owner: "Operations", status: "Pilot", roi: 2.5 },
  { name: "Supply Enrichment", owner: "Procurement", status: "Pilot", roi: 2.2 },
];
const vendorReplacement = [
  { tool: "Legacy OCR Suite", monthly: 22000, replacedBy: "Doc AI + Workflow", status: "Complete" },
  { tool: "RPA Licenses (10)", monthly: 18000, replacedBy: "Agentic Orchestration", status: "Phasing" },
  { tool: "Outbound Dialer", monthly: 9000, replacedBy: "AI Outreach", status: "Planned" },
];
const slaImprovements = [
  { process: "Ticket Resolution", manual: "3h 00m", agent: "0h 10m", improvement: "↓ 94%" },
  { process: "Invoice Approval", manual: "1h 45m", agent: "0h 12m", improvement: "↓ 89%" },
  { process: "Incident Dispatch", manual: "2h 20m", agent: "0h 14m", improvement: "↓ 90%" },
];
const incidents = [
  { id: "INC-1042", sev: "Med", area: "Support", desc: "Wrong article cited", sla: "Resolved <4h" },
  { id: "INC-1049", sev: "Low", area: "Sales", desc: "Duplicate suggestion", sla: "Resolved <24h" },
  { id: "INC-1054", sev: "High", area: "Finance", desc: "Miscalculation flagged", sla: "Under review" },
];

const fmt = new Intl.NumberFormat("en-US");
const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const adoptionHighlights = [
  {
    label: "Automation Coverage",
    value: "46%",
    description: "% of eligible workflows automated vs. manual baseline",
  },
  {
    label: "Agent Utilization",
    value: "37%",
    description: "% of employees working with AI agents each month",
  },
  {
    label: "Collaboration Index",
    value: "2.4 : 1",
    description: "Human-to-agent interaction ratio across automated workflows",
  },
  {
    label: "Training Completion",
    value: "72%",
    description: "Portion of workforce completing AI enablement programs",
  },
];
const efficiencyHighlights = [
  {
    label: "Hours Saved (YTD)",
    value: fmt.format(30100),
    description: "Cumulative labor hours reinvested through automation",
  },
  {
    label: "Cost Savings",
    value: money(940000),
    description: "Operational spend avoided in the last quarter",
  },
  {
    label: "Vendor Replacement",
    value: money(49000),
    description: "Monthly spend displaced by retiring legacy tools",
  },
  {
    label: "Energy Savings",
    value: "18%",
    description: "Reduction in compute & storage consumption from optimized models",
  },
];
const revenueHighlights = [
  {
    label: "AI-Enabled ARR",
    value: "$2.1M",
    description: "Run-rate revenue from AI-driven offerings",
  },
  {
    label: "Sales Uplift",
    value: "+6.8%",
    description: "Increase in conversion from predictive targeting",
  },
  {
    label: "Innovation Pipeline",
    value: "7 initiatives",
    description: "Emerging use cases progressing toward commercialization",
  },
  {
    label: "Market Expansion",
    value: "3 regions",
    description: "New markets entered with AI-supported services",
  },
];
const roiHighlights = [
  {
    label: "ROAI",
    value: "2.9x",
    description: "Blended return on AI investment across the portfolio",
  },
  {
    label: "Payback Period",
    value: "7.5 mo",
    description: "Time to break even on enterprise AI spend",
  },
  {
    label: "Scenario Upside",
    value: "+38%",
    description: "Modeled value lift when backlog automations go live",
  },
  {
    label: "Board-Ready Cases",
    value: "11",
    description: "Use cases with audited ROI packages for governance",
  },
];
const riskHighlights = [
  {
    label: "Workflow Accuracy",
    value: "96.5%",
    description: "Outputs meeting quality thresholds in December",
  },
  {
    label: "Compliance Coverage",
    value: "96%",
    description: "Policies and controls aligned with AI governance standards",
  },
  {
    label: "Incidents (30d)",
    value: "3",
    description: "AI-related events escalated for human review",
  },
  {
    label: "Explainability",
    value: "82%",
    description: "Automations equipped with transparency tooling",
  },
];
const engagementHighlights = [
  {
    label: "Executive Sessions",
    value: "295",
    description: "Leadership interactions with the control center YTD",
  },
  {
    label: "Adoption Champions",
    value: "58",
    description: "Recognized teams coaching peers on AI workflows",
  },
  {
    label: "Feedback Loop",
    value: "214 inputs",
    description: "Ideas and issues submitted via change management hub",
  },
  {
    label: "Employee NPS",
    value: "+48",
    description: "Net promoter score for AI-enabled ways of working",
  },
];

function usePageTitle() {
  const { pathname } = useLocation();
  const map: Record<string, string> = {
    "/": "Overview",
    "/adoption": "Adoption Metrics",
    "/efficiency": "Efficiency & Cost Savings",
    "/revenue": "Revenue Impact",
    "/roi": "Business Value & ROI",
    "/quality": "Quality & Risk",
    "/engagement": "Engagement & Change Mgmt",
  };
  return map[pathname] ?? "Global AI Business Control Center";
}

function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const title = usePageTitle();
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-[#ddd]">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-lg border border-[#ddd] bg-[#f2f2f7]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Gauge size={22} />
          <div className="font-semibold">Global AI Business Control Center</div>
          <div className="ml-auto flex flex-wrap items-center gap-3 sm:gap-5 justify-end text-[#555]">
            <div className="text-xs sm:text-sm font-medium whitespace-nowrap">{title}</div>
            <span className="hidden sm:block h-6 w-px bg-[#ddd]" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <img
                src={sodexoLogo}
                alt="Sodexo logo"
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-12 gap-4">
        <AnimatePresence initial={false}>
          {open && (
            <motion.aside
              key="aside"
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -12, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="col-span-12 sm:col-span-3 lg:col-span-2"
            >
              <nav className="border border-[#ddd] rounded-2xl bg-[#f9f9fb] p-2">
                <SideLink to="/" icon={<Home size={16} />}>Overview</SideLink>
                <SideLink to="/adoption" icon={<Bot size={16} />}>Adoption</SideLink>
                <SideLink to="/efficiency" icon={<LineIcon size={16} />}>Efficiency & Cost</SideLink>
                <SideLink to="/revenue" icon={<TrendingUp size={16} />}>Revenue</SideLink>
                <SideLink to="/roi" icon={<BadgeDollarSign size={16} />}>Business Value & ROI</SideLink>
                <SideLink to="/quality" icon={<ShieldCheck size={16} />}>Quality & Risk</SideLink>
                <SideLink to="/engagement" icon={<Users size={16} />}>Engagement</SideLink>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className={open ? "col-span-12 sm:col-span-9 lg:col-span-10" : "col-span-12"}>{children}</main>
      </div>
    </div>
  );
}

function SideLink({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-xl border ${
          isActive
            ? "bg-[#e0e0f9] border-[#c5c5e8]"
            : "bg-white border-[#e8e8ee] hover:border-[#cfcfe2]"
        }`
      }
      end
    >
      {icon}
      <span className="text-sm">{children}</span>
    </NavLink>
  );
}

function HomePage() {
  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPI
          label="Workflows Automated"
          value={fmt.format(adoptionSeries.at(-1)!.workflows)}
          hint="% eligible automated: 46%"
        />
        <KPI
          label="Agent MAU"
          value={fmt.format(adoptionSeries.at(-1)!.agentMAU)}
          hint="% employees assisted: 37%"
        />
        <KPI label="Hours Saved (QTD)" value={fmt.format(efficiencySeries.at(-1)!.hours)} />
        <KPI label="AI ROI (Blended)" value="2.9x" hint="Top case: Finance Reconciliation" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2" title="Adoption Trend">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adoptionSeries} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="workflows" name="Workflows Automated" />
                <Area type="monotone" dataKey="agentMAU" name="Agent MAU" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Revenue Mix (AI-enabled)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie dataKey="value" data={revenueMix} cx="50%" cy="50%" outerRadius={100} label>
                  {revenueMix.map((_, idx) => (
                    <Cell key={idx} fill={["#8884d8", "#82ca9d", "#ffc658", "#8dd1e1", "#a4de6c"][idx % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Adoption & Agentic AI Signals">
          <Highlights items={adoptionHighlights} />
        </Card>
        <Card title="Efficiency & Cost Focus">
          <Highlights items={efficiencyHighlights} />
        </Card>
        <Card title="Revenue Acceleration">
          <Highlights items={revenueHighlights} />
        </Card>
        <Card title="Business Value & ROI Readout">
          <Highlights items={roiHighlights} />
        </Card>
        <Card title="Quality, Risk & Compliance Watch">
          <Highlights items={riskHighlights} />
        </Card>
        <Card title="Engagement & Change Management Pulse">
          <Highlights items={engagementHighlights} />
        </Card>
      </div>
    </div>
  );
}

function AdoptionPage() {
  return (
    <div className="grid gap-4">
      <Card title="Automation Coverage & Catalog">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Stat label="Eligible Workflows Automated" value="46%" />
            <Stat label="Employees Assisted by AI" value="37%" />
            <Stat label="Active Agents" value="128" />
            <Stat label="Automated Sites" value="64%" />
          </div>
          <div className="overflow-auto">
            <Table
              headers={["Workflow/Agent", "Owner", "Status", "ROI"]}
              rows={workflowCatalog.map((w) => [w.name, w.owner, w.status, `${w.roi.toFixed(1)}x`] as React.ReactNode[])}
            />
          </div>
        </div>
      </Card>

      <Card title="Adoption Trend">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adoptionSeries} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="agentMAU" name="Agent MAU" />
              <Line type="monotone" dataKey="workflows" name="Workflows Automated" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Automation Utilization Heatmap">
        <Heatmap labels={["Finance", "Sales", "Support", "Ops", "Procurement", "HR", "IT"]} months={months} />
      </Card>

      <Card title="Bottleneck Backlog">
        <Table
          headers={["Name", "Type", "Owner", "Impact", "Status"]}
          rows={backlog.map((b) => [b.name, b.type, b.owner, b.impact, b.status] as React.ReactNode[])}
        />
      </Card>
    </div>
  );
}

function EfficiencyPage() {
  return (
    <div className="grid gap-4">
      <Card title="Hours & Cost Saved">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={efficiencySeries} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="q" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" name="Hours Saved" />
              <Bar dataKey="cost" name="Cost Saved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Cost per Workflow (AI vs Manual)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { label: "Contract Review", ai: 4.2, manual: 9.6 },
                  { label: "Invoice Recon", ai: 2.1, manual: 6.4 },
                  { label: "Ticket Triage", ai: 1.8, manual: 3.9 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ai" name="AI ($ per task)" />
                <Bar dataKey="manual" name="Manual ($ per task)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Vendor Replacement & Cost Avoided">
          <Table
            headers={["Legacy Tool", "Monthly Cost", "Replaced By", "Status"]}
            rows={vendorReplacement.map((v) => [v.tool, money(v.monthly), v.replacedBy, v.status] as React.ReactNode[])}
          />
        </Card>
      </div>

      <Card title="Efficiency Benchmarking">
        <Table
          headers={["Division", "AI Hours Saved/Q", "Cost Saved/Q", "Coverage %"]}
          rows={[
            ["Corporate Services", fmt.format(8200), money(240000), "52%"],
            ["Healthcare", fmt.format(6200), money(190000), "44%"],
            ["Universities", fmt.format(4800), money(155000), "38%"],
            ["ENR", fmt.format(3900), money(120000), "31%"],
          ]}
        />
      </Card>

      <Card title="SLA Improvement Metrics">
        <div className="space-y-3">
          <Table
            headers={["Workflow", "Manual SLA", "Agent SLA", "Improvement"]}
            rows={slaImprovements.map((s) => [s.process, s.manual, s.agent, s.improvement] as React.ReactNode[])}
          />
          <div className="text-xs text-[#555] leading-snug">
            Tracking SLA compression highlights service reliability gains beyond pure ROI—for example, ticket
            resolution accelerating from three hours manually to ten minutes with an agent.
          </div>
        </div>
      </Card>
    </div>
  );
}

function RevenuePage() {
  return (
    <div className="grid gap-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1" title="Revenue Mix (AI-enabled)">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie dataKey="value" data={revenueMix} cx="50%" cy="50%" outerRadius={110} label>
                  {revenueMix.map((_, idx) => (
                    <Cell key={idx} fill={["#8884d8", "#82ca9d", "#ffc658", "#8dd1e1", "#a4de6c"][idx % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="lg:col-span-2" title="Sales Uplift & Conversion">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesUplift}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uplift" name="Sales Uplift %" />
                <Line type="monotone" dataKey="conv" name="Lead Conversion %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Upsell & Cross-Sell (Incremental)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ seg: "SMB", up: 140, cross: 60 }, { seg: "Mid", up: 220, cross: 110 }, { seg: "Enterprise", up: 260, cross: 140 }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="seg" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="up" name="Upsell ($k)" />
                <Bar dataKey="cross" name="Cross-sell ($k)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Innovation Pipeline">
          <Table
            headers={["Idea", "Stage", "Owner", "Est. ARR"]}
            rows={[
              ["AI-Enabled Menu Planning", "Discovery", "Ops", "$180k"],
              ["Proactive Churn Save", "Pilot", "Success", "$240k"],
              ["Dynamic Pricing", "Design", "Finance", "$320k"],
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

function RoiPage() {
  return (
    <div className="grid gap-4">
      <Card title="ROI Timeline (Invest vs Benefit)">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={roiTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="q" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area dataKey="benefit" name="Benefit ($)" />
              <Area dataKey="invest" name="Investment ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Use Case ROI (Top 5)">
          <Table
            headers={["Use Case", "Owner", "ROI", "Stage"]}
            rows={[
              ["Invoice Reconciliation", "Finance", "3.8x", "Live"],
              ["Sales Playbook Agent", "Sales", "3.1x", "Live"],
              ["Knowledge Answer Agent", "Support", "2.7x", "Live"],
              ["Menu Optimization", "Ops", "2.5x", "Pilot"],
              ["Supply Enrichment", "Procurement", "2.2x", "Pilot"],
            ]}
          />
        </Card>
        <Card title="Investment Summary">
          <div className="grid gap-2 text-sm">
            <Row l="Payback (blended)" r="7.5 months" />
            <Row l="Top ROI Use Case" r="Invoice Reconciliation" />
            <Row l="Vendor Cost Offset" r={money(420000)} />
            <Row l="Internal Effort Saved" r={`${fmt.format(30100)} hrs`} />
            <Row l="ROAI (cumulative)" r="2.9x" />
          </div>
        </Card>
      </div>

      <Card title="Scenario Modeling (What-if)">
        <Table
          headers={["Scenario", "Adoption +", "Benefit ($)", "Payback (mo)"]}
          rows={[
            ["Base", "+0%", money(940000), "7.5"],
            ["Scale Agents", "+20%", money(1120000), "6.4"],
            ["Automate Backlog", "+35%", money(1300000), "5.7"],
          ]}
        />
      </Card>
    </div>
  );
}

function QualityPage() {
  return (
    <div className="grid gap-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Accuracy & Incidents">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualitySeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accuracy" name="Workflow Accuracy (%)" />
                <Line type="monotone" dataKey="incidents" name="Incidents" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Model Drift (KL/PSI proxy)">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={qualitySeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area dataKey="drift" name="Drift Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Compliance & Governance">
          <Table
            headers={["Control", "Status", "Notes"]}
            rows={[
              ["GDPR/CCPA Alignment", "On track", "PII minimization, DSRs automated"],
              ["AI Policy Coverage", "96%", "Exceptions under review"],
              ["Audit Trails", "Enabled", "All critical workflows"],
            ]}
          />
        </Card>
        <Card title="Incident Management">
          <Table
            headers={["ID", "Severity", "Area", "Description", "SLA"]}
            rows={incidents.map((i) => [i.id, i.sev, i.area, i.desc, i.sla] as React.ReactNode[])}
          />
        </Card>
      </div>
    </div>
  );
}

function EngagementPage() {
  return (
    <div className="grid gap-4">
      <Card title="Executive & Training Engagement">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { month: "Jan", execVisits: 120, trainings: 320 },
                { month: "Feb", execVisits: 138, trainings: 410 },
                { month: "Mar", execVisits: 160, trainings: 480 },
                { month: "Apr", execVisits: 172, trainings: 520 },
                { month: "May", execVisits: 188, trainings: 540 },
                { month: "Jun", execVisits: 205, trainings: 580 },
                { month: "Jul", execVisits: 220, trainings: 630 },
                { month: "Aug", execVisits: 238, trainings: 670 },
                { month: "Sep", execVisits: 251, trainings: 710 },
                { month: "Oct", execVisits: 268, trainings: 760 },
                { month: "Nov", execVisits: 281, trainings: 800 },
                { month: "Dec", execVisits: 295, trainings: 840 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="execVisits" name="Executive Visits" />
              <Bar dataKey="trainings" name="Training Completions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Change Adoption Curve">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adoptionSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area dataKey="workflows" name="Cumulative Adopters (proxy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Satisfaction & NPS">
          <Table
            headers={["Team", "Satisfaction", "NPS"]}
            rows={[
              ["Finance", "4.5/5", "+56"],
              ["Sales", "4.3/5", "+48"],
              ["Support", "4.2/5", "+44"],
              ["Ops", "4.1/5", "+42"],
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

function KPI({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border border-[#ddd] rounded-2xl bg-[#f9f9fb] p-4">
      <div className="text-sm text-[#555]">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {hint && <div className="text-xs text-[#777] mt-1">{hint}</div>}
    </div>
  );
}

function Card({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-[#ddd] rounded-2xl bg-[#f9f9fb] p-4 ${className ?? ""}`}>
      <div className="text-sm text-[#555] mb-2">{title}</div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#e8e8ee] rounded-xl bg-white p-3">
      <div className="text-xs text-[#666]">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Row({ l, r }: { l: React.ReactNode; r: React.ReactNode }) {
  return (
    <div className="flex justify-between text-sm">
      <span>{l}</span>
      <span>{r}</span>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left font-medium text-[#666] border-t border-b border-[#e8e8ee] px-3 py-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-white/60">
              {r.map((c, j) => (
                <td key={j} className="border-t border-[#f0f0f4] px-3 py-2">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Heatmap({ labels, months }: { labels: string[]; months: string[] }) {
  const data = React.useMemo(
    () => labels.map(() => months.map(() => Math.floor(30 + Math.random() * 70))),
    [labels.join("|"), months.join("|")]
  );
  const color = (v: number) => `hsl(${120 * (v / 100)}, 60%, ${92 - v * 0.35}%)`;
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left font-medium text-[#666] border-b border-[#e8e8ee] px-3 py-2">Unit</th>
            {months.map((m) => (
              <th key={m} className="text-left font-medium text-[#666] border-b border-[#e8e8ee] px-3 py-2">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((lbl, i) => (
            <tr key={lbl}>
              <td className="border-t border-[#f0f0f4] px-3 py-2">{lbl}</td>
              {months.map((m, j) => (
                <td key={`${m}-${j}`} className="border-t border-[#f0f0f4] px-1 py-1">
                  <div className="rounded-md text-center text-xs font-medium" style={{ background: color(data[i][j]) }}>
                    {data[i][j]}%
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Highlights({
  items,
}: {
  items: { label: string; value: string; description: string }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className="border border-[#e0e0f2] rounded-xl bg-white px-3 py-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-semibold text-[#2d2d4d]">{item.label}</span>
            <span className="text-[#5b5bd6] font-semibold">{item.value}</span>
          </div>
          <div className="text-xs text-[#555] mt-1 leading-snug">{item.description}</div>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adoption" element={<AdoptionPage />} />
          <Route path="/efficiency" element={<EfficiencyPage />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/roi" element={<RoiPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/engagement" element={<EngagementPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
