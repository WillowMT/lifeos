import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const common = {
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function TodayIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M3.5 11.2 12 4l8.5 7.2" />
      <path d="M5.7 10.1v9.1h12.6v-9.1M9.2 19.2v-5.4h5.6v5.4" />
    </svg>
  );
}

export function MemoryIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="3" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function CaptureIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.1 4.1" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function BackIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3.5c.5 4.6 2.9 7 7.5 7.5-4.6.5-7 2.9-7.5 7.5-.5-4.6-2.9-7-7.5-7.5 4.6-.5 7-2.9 7.5-7.5Z" />
    </svg>
  );
}
