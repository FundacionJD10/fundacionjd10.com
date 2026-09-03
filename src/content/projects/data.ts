import type { Locale } from "@i18n/store";

export interface Project {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  details?: Record<Locale, string>;
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
        'Un proyecto inspirado en "Uy qué heavy" que busca incentivar el contacto humano y las relaciones interpersonales a través de preguntas.',
      "en-US":
        'A project inspired by "Uy qué heavy" that seeks to encourage human contact and interpersonal relationships through questions.',
      "pt-BR":
        'Um projeto inspirado em "Uy qué heavy" que busca incentivar o contato humano e os relacionamentos interpessoais através de perguntas.',
    },
    details: {
      "es-419":
        "La propuesta invita a volver a lo más básico de las relaciones humanas: conocerse de verdad, en profundidad, y crear vínculos duraderos. A través de preguntas guiadas, dos o más personas exploran quiénes son y qué las une. De forma opcional, el proceso puede acompañarse con el apoyo de un profesional, como un psicólogo, o de una persona de confianza que las participantes ya tengan como guía, según sus propias preferencias.",
      "en-US":
        "The project invites people back to the most basic part of human relationships: getting to know each other, deeply, and building lasting bonds. Through guided questions, two or more people explore who they are and what connects them. Optionally, the process can be supported by a professional, such as a psychologist, or by a trusted person the participants already rely on as a guide, according to their own preferences.",
      "pt-BR":
        "A proposta convida a voltar ao mais básico das relações humanas: conhecer-se de verdade, em profundidade, e criar vínculos duradouros. Por meio de perguntas guiadas, duas ou mais pessoas exploram quem são e o que as une. De forma opcional, o processo pode contar com o apoio de um profissional, como um psicólogo, ou de uma pessoa de confiança que as participantes já tenham como guia, conforme suas próprias preferências.",
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
        "Una aplicación web para digitalizar música y equipos clásicos en un formato moderno: reproducir música y mostrar letras con formato, a partir de obras de dominio público.",
      "en-US":
        "A web app to digitalize classic music and hardware into a modern form factor: play music and display formatted lyrics, based on public domain works.",
      "pt-BR":
        "Um aplicativo web para digitalizar música e equipamentos clássicos em um formato moderno: reproduzir música e exibir letras formatadas, a partir de obras de domínio público.",
    },
    details: {
      "es-419":
        "Inspirado en el reproductor de himnarios de Gloria, este proyecto lleva la música y el hardware \u201cclásico\u201d a un formato moderno como aplicación web. Aunque parte de los himnarios, está pensado para cualquier tipo de música: permite importar archivos MIDI, letras y metadatos, y crear libremente desde la web, priorizando obras de dominio público.",
      "en-US":
        "Inspired by the Gloria hymnal player, this project brings \u201cclassic\u201d music and hardware into a modern web-app form factor. Although it starts from hymnals, it is meant for any kind of music: it lets you import MIDI files, lyrics and metadata, and create freely on the web, prioritizing public domain works.",
      "pt-BR":
        "Inspirado no reprodutor de hinários da Gloria, este projeto leva a música e o hardware \u201cclássico\u201d a um formato moderno como aplicativo web. Embora parta dos hinários, é pensado para qualquer tipo de música: permite importar arquivos MIDI, letras e metadados, e criar livremente na web, priorizando obras de domínio público.",
    },
    status: "planned",
    techStack: ["TBD"],
  },
];
