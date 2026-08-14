import type { Locale } from "@i18n/store";

export interface Project {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  status: "active" | "completed" | "planned";
  techStack: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    id: "fundacionjd10-website",
    title: {
      "es-419": "Sitio web Fundación JD10",
      "en-US": "Fundación JD10 Website",
      "pt-BR": "Site Fundación JD10",
    },
    description: {
      "es-419":
        "El sitio web oficial de la fundación, construido con Astro y React como ejemplo de desarrollo asistido por IA responsable.",
      "en-US":
        "The official foundation website, built with Astro and React as an example of responsible AI-assisted development.",
      "pt-BR":
        "O site oficial da fundação, construído com Astro e React como exemplo de desenvolvimento assistido por IA responsável.",
    },
    status: "active",
    techStack: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    url: "https://github.com/FundacionJD10/fundacionjd10.com",
  },
  {
    id: "oye-es-enserio",
    title: {
      "es-419": "Oye, es en serio / Oye, ¿es en serio? / Oye, ¡es en serio!",
      "en-US": "Hey, it's serious / Hey, is it serious? / Hey, it's serious!",
      "pt-BR": "Ei, é sério / Ei, é sério? / Ei, é sério!",
    },
    description: {
      "es-419":
        'Un proyecto inspirado en "Uy qué heavy" que busca incentivar el contacto humano y las relaciones interpersonales a través de preguntas',
      "en-US":
        'A project inspired by "Uy qué heavy" that seeks to encourage human contact and interpersonal relationships through questions',
      "pt-BR":
        'Um projeto inspirado em "Uy qué heavy" que busca incentivar o contato humano e os relacionamentos interpessoais através de perguntas',
    },
    status: "planned",
    techStack: ["TBD"],
  },
  {
    id: "hymnals-lyrics-and-music",
    title: {
      "es-419": "Himnarios, letras y música",
      "en-US": "Hymnals, lyrics and music",
      "pt-BR": "Hinos, letras e música",
    },
    description: {
      "es-419":
        "Un proyecto que busca recopilar y organizar himnarios, letras y música de diferentes tradiciones religiosas y culturales.",
      "en-US":
        "A project that seeks to collect and organize hymnals, lyrics and music from different religious and cultural traditions.",
      "pt-BR":
        "Um projeto que busca coletar e organizar hinários, letras e músicas de diferentes tradições religiosas e culturais.",
    },
    status: "planned",
    techStack: ["TBD"],
  },
];
