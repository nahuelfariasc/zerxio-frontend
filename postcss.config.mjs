import tailwindcssAnimate from 'tailwindcss-animate';
export default {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "*.{js,ts,jsx,tsx,mdx}",
      ],
      prefix: "",
      theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        extend: {
          colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "#00BFFF", // azul eléctrico
              foreground: "#0f172a", // slate-900
            },
            secondary: {
              DEFAULT: "#475569", // slate-600
              foreground: "#ffffff",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "#334155", // slate-700
              foreground: "#cbd5e1", // slate-300
            },
            accent: {
              DEFAULT: "#00FFFF", // cian
              foreground: "#0f172a", // slate-900
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
            // Colores sci-fi personalizados
            cyan: {
              400: "#00FFFF", // cian brillante
              500: "#00E6E6", // cian medio
              600: "#00CCCC", // cian oscuro
            },
            blue: {
              400: "#00BFFF", // azul eléctrico
              500: "#0080FF", // azul eléctrico medio
              600: "#0066CC", // azul eléctrico oscuro
              700: "#004C99", // azul eléctrico más oscuro
              800: "#003366", // azul muy oscuro
            },
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
          keyframes: {
            "accordion-down": {
              from: { height: "0" },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: "0" },
            },
            pulse: {
              "0%, 100%": { opacity: "1" },
              "50%": { opacity: "0.3" },
            },
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          },
          fontFamily: {
            mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
          },
        },
      },
      plugins: [tailwindcssAnimate],
    },
    'autoprefixer': {},
  },
};