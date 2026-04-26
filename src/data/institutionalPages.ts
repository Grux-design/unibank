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
  "cumplimiento-normativo": {
    title: "Cumplimiento Normativo",
    metaDescription: "Conoce el compromiso de UniBank con el cumplimiento normativo y la prevención del blanqueo de capitales y financiamiento del terrorismo.",
    sections: [
      {
        body: "En <strong>Unibank, S.A. y Subsidiarias</strong> nos aseguramos de cumplir y regirnos acorde a las regulaciones locales y en apego a las mejores prácticas y estándares internacionales, creadas en materia de prevención del blanqueo de capitales y contra el financiamiento del terrorismo. Por tal motivo, hemos estructurado programas para proteger a nuestros clientes y servicios sobre del uso indebido de los mismos y así evitar que sean utilizados para cometer actividades ilícitas.",
      },
      {
        body: "Los valores que mantenemos en <strong>Unibank, S.A. y Subsidiarias</strong> como la integridad, honestidad, confidencialidad, y profesionalismo son los cimientos de las políticas de nuestra organización, constituyéndose los elementos antes mencionados en la base de nuestras actuaciones.",
      },
      {
        body: "Conocer a nuestros clientes es uno de los principales objetivos que tenemos como parte de nuestra cultura de organización y para asegurar el cumplimiento de ese compromiso, en <strong>Unibank, S.A. y Subsidiarias</strong> nos aseguramos de cumplir con las Políticas de Debida Diligencia y de Conocimiento del Cliente.",
      },
    ],
  },
};
