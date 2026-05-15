export function getCurriculumGuide(
    curriculum: string
  ) {
    const value =
      curriculum
        ?.toLowerCase()
        ?.trim();
  
    switch (value) {
      /* =========================
         NIGERIAN CURRICULA
      ========================== */
  
      case "primary":
      case "nigerian primary curriculum":
        return `
  Primary Education Curriculum Standards:
  - Child-centered learning
  - Foundational literacy and numeracy
  - Activity-based teaching methodology
  - Simple and interactive instructional delivery
  - Foundational cognitive development
  - Continuous classroom engagement
  `;
  
      case "junior":
      case "junior secondary":
      case "nigerian junior secondary curriculum":
        return `
  Junior Secondary Curriculum Standards:
  - Basic education framework
  - Foundational subject mastery
  - Critical thinking development
  - Continuous assessment alignment
  - Learner-centered instruction
  - Practical classroom application
  `;
  
      case "waec":
      case "waec curriculum":
        return `
  WAEC Curriculum Standards:
  - Senior secondary school framework
  - Examination-oriented instruction
  - Theory and objective preparation
  - West African examination standards
  - Structured lesson delivery
  - Clear learning objectives
  `;
  
      case "neco":
      case "neco curriculum":
        return `
  NECO Curriculum Standards:
  - Nigerian national assessment framework
  - Cognitive and practical learning
  - Measurable educational outcomes
  - Structured instructional methodology
  - Classroom evaluation alignment
  `;
  
      case "ccmas":
      case "ccmas curriculum":
        return `
  CCMAS Curriculum Standards:
  - Nigerian university curriculum framework
  - Outcome-based higher education
  - Research and analytical learning
  - Academic instructional rigor
  - Critical thinking development
  - Tertiary education alignment
  `;
  
      case "nbte":
      case "nbte curriculum":
        return `
  NBTE Curriculum Standards:
  - Technical and vocational education
  - Practical competency development
  - Polytechnic instructional methodology
  - Hands-on technical training
  - Skill acquisition focus
  `;
  
      case "ncce":
      case "ncce curriculum":
        return `
  NCCE Curriculum Standards:
  - Teacher education framework
  - Pedagogical instructional methods
  - Educational psychology integration
  - Teaching practice alignment
  - Professional educator development
  `;
  
      case "nursing & health sciences curriculum":
        return `
  Nursing and Health Sciences Curriculum Standards:
  - Clinical and healthcare education
  - Patient-centered instructional approach
  - Practical and theoretical integration
  - Healthcare competency standards
  - Professional ethics and medical accuracy
  `;
  
      case "medical & allied health curriculum":
        return `
  Medical and Allied Health Curriculum Standards:
  - Medical science instructional rigor
  - Clinical competency development
  - Evidence-based healthcare education
  - Professional medical standards
  - Scientific and analytical methodology
  `;
  
      case "legal education curriculum":
        return `
  Legal Education Curriculum Standards:
  - Legal reasoning and analysis
  - Case-based instructional methodology
  - Professional legal education structure
  - Analytical and argumentative learning
  - Ethical and procedural legal standards
  `;
  
      /* =========================
         AFRICAN CURRICULA
      ========================== */
  
      case "cbc":
      case "cbc curriculum":
        return `
  CBC Curriculum Standards:
  - Competency-Based Curriculum
  - Learner-centered education
  - Skills acquisition and application
  - Creativity and innovation focus
  - Practical learning methodology
  - Competency assessment structure
  `;
  
      case "caps":
      case "caps curriculum":
        return `
  CAPS Curriculum Standards:
  - South African curriculum framework
  - Assessment-driven instruction
  - Practical and theoretical integration
  - Structured learning outcomes
  - National educational alignment
  `;
  
      /* =========================
         INTERNATIONAL CURRICULA
      ========================== */
  
      case "cambridge":
      case "cambridge curriculum":
        return `
  Cambridge Curriculum Standards:
  - International academic rigor
  - Inquiry-based learning methodology
  - Global educational competence
  - Structured assessment standards
  - Analytical and reflective instruction
  `;
  
      case "igcse":
      case "igcse curriculum":
        return `
  IGCSE Curriculum Standards:
  - International secondary education framework
  - Analytical and structured learning
  - Examination-focused instruction
  - International assessment alignment
  - Academic rigor and competency
  `;
  
      case "ib":
      case "ib curriculum":
        return `
  IB Curriculum Standards:
  - International Baccalaureate philosophy
  - Inquiry-driven education
  - Reflective and interdisciplinary learning
  - Global citizenship development
  - Research and critical thinking emphasis
  `;
  
      case "american":
      case "american curriculum":
        return `
  American Curriculum Standards:
  - Standards-based instructional methodology
  - Student-centered learning
  - Collaborative and critical learning
  - Practical classroom engagement
  - Progressive assessment structure
  `;
  
      case "british":
      case "british curriculum":
        return `
  British Curriculum Standards:
  - UK curriculum framework
  - Progressive learning structure
  - Assessment-focused methodology
  - Analytical instructional delivery
  - Academic competency development
  `;
  
      /* =========================
         DEFAULT / CUSTOM
      ========================== */
  
      default:
        return `
  Custom Curriculum Standards:
  - Follow institutional educational standards
  - Maintain professional instructional structure
  - Ensure curriculum alignment
  - Use educator-friendly methodology
  - Promote measurable learning outcomes
  - Adapt to institutional academic requirements
  `;
    }
  }