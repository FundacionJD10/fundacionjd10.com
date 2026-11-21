import type { Locale } from "@i18n/store";

export interface Project {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  details?: Record<Locale, string>;
  status: "active" | "completed" | "planned";
  techStack: string[];
  url?: string;
  /** A small screenshot in /public/projects, taken from sample or test data only. */
  image?: { src: string; alt: Record<Locale, string> };
}

export const projects: Project[] = [
  {
    id: "oye-es-enserio",
    title: {
      "es-419": "Oye, es en serio",
      "en-US": "Oye, es en serio",
      "pt-BR": "Oye, es en serio",
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
        "La propuesta invita a volver a lo más básico de las relaciones humanas: conocerse de verdad, en profundidad, y crear vínculos duraderos. A través de preguntas guiadas, dos o más personas exploran quiénes son y qué las une, en etapas para amigos, parejas y padres e hijos, cada quien desde su celular o todos frente al televisor. De forma opcional, el proceso puede acompañarse con el apoyo de un profesional, como un psicólogo, o de una persona de confianza que las participantes ya tengan como guía, según sus propias preferencias.",
      "en-US":
        "The project invites people back to the most basic part of human relationships: getting to know each other, deeply, and building lasting bonds. Through guided questions, two or more people explore who they are and what connects them, in stages for friends, couples, and parents and children, each on their own phone or all together in front of the TV. Optionally, the process can be supported by a professional, such as a psychologist, or by a trusted person the participants already rely on as a guide, according to their own preferences.",
      "pt-BR":
        "A proposta convida a voltar ao mais básico das relações humanas: conhecer-se de verdade, em profundidade, e criar vínculos duradouros. Por meio de perguntas guiadas, duas ou mais pessoas exploram quem são e o que as une, em etapas para amigos, casais e pais e filhos, cada um no seu celular ou todos diante da TV. De forma opcional, o processo pode contar com o apoio de um profissional, como um psicólogo, ou de uma pessoa de confiança que as participantes já tenham como guia, conforme suas próprias preferências.",
    },
    status: "active",
    techStack: ["Laravel", "React", "PostgreSQL", "Android TV", "Roku"],
    image: {
      src: "/projects/oye-es-en-serio.webp",
      alt: {
        "es-419":
          "La página de inicio de Oye, es en serio: la etapa Pareja con sus cuatro puertas, de Creo que me interesas a Seamos buenos esposos.",
        "en-US":
          "The Oye, es en serio home page: the Couple stage with its four doors, from getting interested to being good spouses.",
        "pt-BR":
          "A página inicial de Oye, es en serio: a etapa Casal com suas quatro portas, do primeiro interesse ao casamento.",
      },
    },
  },
  {
    id: "hymnals-lyrics-and-music",
    title: {
      "es-419": "Himnos",
      "en-US": "Hymns",
      "pt-BR": "Hinos",
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
        "Inspirado en el reproductor de himnarios de Gloria, este proyecto lleva la música y el hardware “clásico” a un formato moderno como aplicación web. Aunque parte de los himnarios, está pensado para cualquier tipo de música: permite importar archivos MIDI, letras y metadatos, y crear libremente desde la web, priorizando obras de dominio público.",
      "en-US":
        "Inspired by the Gloria hymnal player, this project brings “classic” music and hardware into a modern web-app form factor. Although it starts from hymnals, it is meant for any kind of music: it lets you import MIDI files, lyrics and metadata, and create freely on the web, prioritizing public domain works.",
      "pt-BR":
        "Inspirado no reprodutor de hinários da Gloria, este projeto leva a música e o hardware “clássico” a um formato moderno como aplicativo web. Embora parta dos hinários, é pensado para qualquer tipo de música: permite importar arquivos MIDI, letras e metadados, e criar livremente na web, priorizando obras de domínio público.",
    },
    status: "active",
    techStack: ["Laravel", "React", "PostgreSQL", "MIDI", "PWA"],
    image: {
      src: "/projects/himnos.webp",
      alt: {
        "es-419":
          "El himno Castillo fuerte (Martín Lutero, 1529; traducción de Juan B. Cabrera, 1886, de dominio público) con su letra, créditos y reproductor.",
        "en-US":
          "The hymn Castillo fuerte (A Mighty Fortress; Martin Luther, 1529; Spanish by Juan B. Cabrera, 1886, public domain) with its lyrics, credits and player.",
        "pt-BR":
          "O hino Castillo fuerte (Castelo forte; Martinho Lutero, 1529; tradução de Juan B. Cabrera, 1886, de domínio público) com a letra, os créditos e o reprodutor.",
      },
    },
  },
  {
    id: "church-management-system",
    title: {
      "es-419": "Sistema de gestión para iglesias (ChMS)",
      "en-US": "Church management system (ChMS)",
      "pt-BR": "Sistema de gestão para igrejas (ChMS)",
    },
    description: {
      "es-419":
        "Un panel para que el equipo de una iglesia cuide de su congregación: miembros y familias, eventos y asistencia, prédicas y reportes.",
      "en-US":
        "A panel for a church's team to care for its congregation: members and families, events and attendance, sermons and reports.",
      "pt-BR":
        "Um painel para a equipe de uma igreja cuidar da sua congregação: membros e famílias, eventos e frequência, pregações e relatórios.",
    },
    details: {
      "es-419":
        "Cada persona del equipo ve y edita solo lo que su rol le permite. Los datos de los miembros son de la iglesia y se tratan con cuidado: por eso aquí no mostramos capturas.",
      "en-US":
        "Each team member sees and edits only what their role allows. Members' data belongs to the church and is handled with care, which is why we show no screenshots here.",
      "pt-BR":
        "Cada pessoa da equipe vê e edita apenas o que o seu papel permite. Os dados dos membros pertencem à igreja e são tratados com cuidado: por isso não mostramos capturas aqui.",
    },
    status: "active",
    techStack: ["Laravel", "React", "PostgreSQL"],
  },
  {
    id: "fundacioncyms-website",
    title: {
      "es-419": "Sitio web Fundación Corazones y Manos Solidarias",
      "en-US": "Fundación Corazones y Manos Solidarias website",
      "pt-BR": "Site da Fundación Corazones y Manos Solidarias",
    },
    description: {
      "es-419":
        "El sitio de una fundación aliada que acompaña a la población más necesitada con ayuda humanitaria y desarrollo integral.",
      "en-US":
        "The website of a partner foundation that walks alongside those most in need with humanitarian aid and holistic development.",
      "pt-BR":
        "O site de uma fundação parceira que acompanha a população mais necessitada com ajuda humanitária e desenvolvimento integral.",
    },
    details: {
      "es-419":
        "En español e inglés, con su identidad, sus programas, transparencia y publicaciones, que el propio equipo de la fundación edita desde un panel.",
      "en-US":
        "In Spanish and English, with its identity, programs, transparency and posts, which the foundation's own team edits from a panel.",
      "pt-BR":
        "Em espanhol e inglês, com a sua identidade, programas, transparência e publicações, que a própria equipe da fundação edita a partir de um painel.",
    },
    status: "active",
    techStack: ["Laravel", "React", "PostgreSQL"],
    image: {
      src: "/projects/fundacioncyms.webp",
      alt: {
        "es-419":
          "La portada del sitio de la Fundación Corazones y Manos Solidarias, con su misión.",
        "en-US":
          "The home page of the Fundación Corazones y Manos Solidarias website, with its mission.",
        "pt-BR":
          "A página inicial do site da Fundación Corazones y Manos Solidarias, com a sua missão.",
      },
    },
  },
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
];
