import React from "react";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden
  >
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 17.5H6.12V10.5h2.22v7zm-1.11-8.1a1.28 1.28 0 1 1 0-2.56 1.28 1.28 0 0 1 0 2.56zM18 17.5h-2.22v-3.5c0-.84-.67-1.5-1.5-1.5s-1.5.66-1.5 1.5v3.5H10.5V10.5h2.12v.98c.47-.7 1.41-1.11 2.37-1.11 1.95 0 3.51 1.56 3.51 3.5v3.13z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden
  >
    <path d="M12 0.5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.55-3.88-1.55-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.14 1.18A10.9 10.9 0 0112 6.8c.97 0 1.95.13 2.86.38 2.17-1.5 3.13-1.18 3.13-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.35.78 1.04.78 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.21.67.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

type Item = {
  id: string;
  href: string;
  label: string;
  Icon: React.FC;
};

const items: Item[] = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/akshat-daiya-a0b67b355/",
    label: "linkedin.com/in/akshat-daiya",
    Icon: LinkedInIcon,
  },
  {
    id: "github",
    href: "https://github.com/AkshatDaiya?tab=overview&from=2025-12-01&to=2025-12-24",
    label: "github.com/AkshatDaiya",
    Icon: GitHubIcon,
  },
];

const SocialIcons: React.FC = () => {
  return (
    // hide on small screens (mobile) to avoid taking precious screen space
    <div className="fixed left-4 top-4 z-50 flex flex-col gap-3">
      {items.map(({ id, href, label, Icon }) => (
        <div key={id} className="group">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="relative flex items-center gap-3 rounded-full text-sm font-medium text-slate-900 dark:text-slate-100"
          >
            {/* Icon container */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Icon />
            </div>

            {/* Sliding label: starts translated left and invisible, slides in on hover */}
            <span className="absolute left-12 -translate-x-6 opacity-0 transition-all duration-250 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap rounded-md bg-slate-50 px-3 py-2 text-xs shadow-md dark:bg-slate-800">
              {label}
            </span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialIcons;
