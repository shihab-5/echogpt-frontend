import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const FORBIDDEN_CLASSES = [
  "bg-gradient-",
  "backdrop-blur-",
  "shadow-2xl",
  "shadow-inner",
  "animate-pulse",
  "rounded-3xl",
];

const FORBIDDEN_PATTERN = new RegExp(`\\b(${FORBIDDEN_CLASSES.join("|")})\\b`);

const antiTemplateRules = {
  files: ["src/**/*.{ts,tsx,js,jsx}"],
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: `Literal[value=/${FORBIDDEN_PATTERN.source}/]`,
        message:
          "Generic AI-SaaS pattern. See plan.md §16.5 / execution_plan.md P9 anti-template checklist.",
      },
      {
        selector: `TemplateElement[value.raw=/${FORBIDDEN_PATTERN.source}/]`,
        message:
          "Generic AI-SaaS pattern. See plan.md §16.5 / execution_plan.md P9 anti-template checklist.",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["react-spring", "motion-canvas", "three", "@react-three/*"],
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  antiTemplateRules,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
