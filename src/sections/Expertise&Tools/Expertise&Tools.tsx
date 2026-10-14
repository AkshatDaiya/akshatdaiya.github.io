import type { IconType } from "react-icons";
import {
  HiOutlineBolt,
  HiOutlineCurrencyDollar,
  HiOutlineDevicePhoneMobile,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import {
  SiBootstrap,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGooglechrome,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const expertise: { icon: IconType; text: string }[] = [
  {
    icon: HiOutlineRocketLaunch,
    text: "Architecting scalable React applications for real-world, high-traffic use cases",
  },
  {
    icon: HiOutlineDevicePhoneMobile,
    text: "Designing mobile-first, accessible interfaces with strong UX fundamentals",
  },
  {
    icon: HiOutlineUserGroup,
    text: "Building community-driven platforms focused on performance and reliability",
  },
  {
    icon: HiOutlineCurrencyDollar,
    text: "Developing revenue-impacting features such as long-term mentorship systems",
  },
  {
    icon: HiOutlineBolt,
    text: "Continuously optimising frontend performance and user experience",
  },
];

const tools: {
  label: string;
  items: { name: string; icon: IconType }[];
}[] = [
  {
    label: "Frontend",
    items: [
      { name: "React.js", icon: SiReact },
      { name: "JavaScript (ES6+)", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    label: "State & routing",
    items: [
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "Context API", icon: SiReact },
      { name: "React Router", icon: SiReactrouter },
    ],
  },
  {
    label: "Styling & motion",
    items: [
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    label: "Backend & data",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    label: "Workflow",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
      { name: "Postman", icon: SiPostman },
      { name: "Chrome DevTools", icon: SiGooglechrome },
    ],
  },
];

export default function ExpertiseAndTools() {
  return (
    <section
      id="expertise"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Expertise and tools
          </h2>
          <p
            className="mt-3 text-slate-500 dark:text-slate-400"
            style={{ fontFamily: "Space Grotesk" }}
          >
            What I focus on, and the stack I use to build fast, scalable web
            applications.
          </p>
        </div>

        {/* Expertise */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {expertise.map(({ icon: Icon, text }, i) => (
            <li
              key={text}
              className={`flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-950/5 p-5 dark:border-slate-800 dark:bg-slate-900/70 ${
                i === expertise.length - 1 && expertise.length % 2 === 1
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950/10 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                <Icon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
              <p className="pt-1.5 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-200">
                {text}
              </p>
            </li>
          ))}
        </ul>

        {/* Tools */}
        <div className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800">
          <h3 className="text-center text-lg font-semibold text-slate-900 dark:text-slate-50">
            Tools
          </h3>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
            {tools.map((group) => (
              <div key={group.label}>
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  {group.label}
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map(({ name, icon: Icon }) => (
                    <li
                      key={name}
                      className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400"
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-slate-700 dark:text-slate-300"
                        aria-hidden="true"
                      />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
