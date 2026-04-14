export interface InstitutionalPageData {
  title: string;
  metaDescription: string;
  sections: { heading?: string; body: string }[];
}

export const institutionalPages: Record<string, InstitutionalPageData> = {
  "junta-directiva": {
    title: "Junta Directiva",
    metaDescription: "Conoce a los miembros de la Junta Directiva de UniBank, comprometidos con la excelencia y el buen gobierno corporativo.",
    sections: [
      {
        body: "La Junta Directiva de UniBank está conformada por profesionales de amplia trayectoria en el sector financiero, comprometidos con los más altos estándares de gobernanza y transparencia.",
      },
      {
        heading: "Nuestra Misión",
        body: "Guiar la estrategia institucional de UniBank con visión de largo plazo, asegurando la creación de valor sostenible para nuestros accionistas, clientes, colaboradores y la comunidad panameña.",
      },
      {
        heading: "Compromiso con la Excelencia",
        body: "Cada miembro de nuestra Junta aporta experiencia diversa en áreas como banca, finanzas, derecho, tecnología y gestión empresarial, lo que nos permite tomar decisiones informadas y estratégicas para el crecimiento del banco.",
      },
    ],
  },
  "unilideres": {
    title: "UniLíderes",
    metaDescription: "UniLíderes: el programa de liderazgo de UniBank que impulsa el desarrollo profesional y personal de nuestros colaboradores.",
    sections: [
      {
        body: "UniLíderes es nuestro programa insignia de desarrollo de talento, diseñado para identificar, formar y potenciar a los futuros líderes de UniBank.",
      },
      {
        heading: "Desarrollo Integral",
        body: "A través de mentorías, capacitaciones especializadas y experiencias de aprendizaje práctico, UniLíderes prepara a nuestros colaboradores para asumir roles de mayor responsabilidad dentro de la organización.",
      },
      {
        heading: "Impacto en la Organización",
        body: "Desde su creación, UniLíderes ha formado a cientos de profesionales que hoy ocupan posiciones clave en UniBank, contribuyendo directamente al crecimiento y la innovación del banco.",
      },
    ],
  },
  sostenibilidad: {
    title: "Sostenibilidad",
    metaDescription: "Conoce las iniciativas de sostenibilidad de UniBank y nuestro compromiso con el desarrollo social y ambiental de Panamá.",
    sections: [
      {
        body: "En UniBank, la sostenibilidad es un pilar fundamental de nuestra estrategia empresarial. Creemos que el éxito financiero debe ir de la mano con el bienestar social y la protección del medio ambiente.",
      },
      {
        heading: "Compromisos Ambientales",
        body: "Implementamos prácticas de eficiencia energética, reducción de huella de carbono y gestión responsable de recursos en todas nuestras operaciones, promoviendo un modelo de negocio más verde y consciente.",
      },
      {
        heading: "Impacto Social",
        body: "A través de programas de educación financiera, inclusión social y apoyo a comunidades vulnerables, trabajamos para generar un impacto positivo y duradero en la sociedad panameña.",
      },
    ],
  },
  "gestion-de-riesgo-operativo": {
    title: "Gestión de Riesgo Operativo",
    metaDescription: "Descubre cómo UniBank gestiona el riesgo operativo para garantizar la seguridad y continuidad de nuestros servicios financieros.",
    sections: [
      {
        body: "La gestión de riesgo operativo en UniBank es un proceso integral que busca identificar, medir, controlar y mitigar los riesgos asociados a nuestras operaciones diarias.",
      },
      {
        heading: "Marco de Gestión",
        body: "Contamos con un marco robusto de gestión de riesgos alineado con las mejores prácticas internacionales y los estándares regulatorios de la Superintendencia de Bancos de Panamá.",
      },
      {
        heading: "Continuidad del Negocio",
        body: "Nuestros planes de continuidad del negocio garantizan que los servicios críticos estén disponibles en todo momento, protegiendo los intereses de nuestros clientes y la estabilidad de la institución.",
      },
    ],
  },
  "cumplimiento-normativo": {
    title: "Cumplimiento Normativo",
    metaDescription: "Conoce el compromiso de UniBank con el cumplimiento normativo y la prevención del lavado de activos.",
    sections: [
      {
        body: "UniBank mantiene un firme compromiso con el cumplimiento de todas las normativas y regulaciones aplicables al sector bancario panameño e internacional.",
      },
      {
        heading: "Prevención de Lavado de Activos",
        body: "Contamos con políticas y procedimientos robustos para la prevención del blanqueo de capitales y el financiamiento del terrorismo, en cumplimiento con la legislación panameña y los estándares del GAFI.",
      },
      {
        heading: "Cultura de Cumplimiento",
        body: "Fomentamos una cultura de integridad y cumplimiento en todos los niveles de la organización, con programas de capacitación continua y canales de denuncia confidenciales.",
      },
    ],
  },
  "manual-de-gobierno-corporativo": {
    title: "Manual de Gobierno Corporativo",
    metaDescription: "Accede al Manual de Gobierno Corporativo de UniBank y conoce nuestros principios de transparencia y buena gobernanza.",
    sections: [
      {
        body: "El Manual de Gobierno Corporativo de UniBank establece los principios, políticas y procedimientos que rigen la administración y dirección de nuestra institución.",
      },
      {
        heading: "Principios Fundamentales",
        body: "Nuestro gobierno corporativo se basa en los principios de transparencia, equidad, responsabilidad y rendición de cuentas, asegurando que todas las decisiones se tomen en beneficio de nuestros stakeholders.",
      },
      {
        heading: "Estructura de Gobierno",
        body: "El manual detalla la estructura organizacional, las funciones de los órganos de gobierno, los comités de apoyo y los mecanismos de control interno que garantizan una gestión eficiente y ética.",
      },
    ],
  },
};
