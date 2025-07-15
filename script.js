// Lista de ramos con prerrequisitos
const ramos = [
  // I Semestre
  { id: 'Enfermería Profesión y Disciplina', requisitos: [] },
  { id: 'Evolución de los Paradigmas en Salud', requisitos: [] },
  { id: 'Fundamentos químicos para Enfermería', requisitos: [] },
  { id: 'Fundamentos biológicos para Enfermería', requisitos: [] },
  { id: 'Morfología Humana I', requisitos: [] },
  { id: 'Primeros Auxilios', requisitos: [] },
  { id: 'Inglés I', requisitos: [] },

  // II Semestre
  { id: 'Salud Pública', requisitos: [] },
  { id: 'Comunicación e Interculturalidad en Enfermería', requisitos: ['Evolución de los Paradigmas en Salud'] },
  { id: 'Fundamentos Bioquímicos para Enfermería', requisitos: ['Fundamentos químicos para Enfermería', 'Fundamentos biológicos para Enfermería'] },
  { id: 'Biomatemática Aplicada a la Enfermería', requisitos: [] },
  { id: 'Morfología Humana II', requisitos: ['Morfología Humana I'] },
  { id: 'Fisiología Humana', requisitos: ['Morfología Humana I'] },
  { id: 'Psicología General y Evolutiva', requisitos: [] },
  { id: 'Inglés II', requisitos: ['Inglés I'] },

  // III Semestre
  { id: 'Cuidados en el ciclo vital I', requisitos: ['Morfología Humana II'] },
  { id: 'Introducción a la Investigación', requisitos: [] },
  { id: 'Fisiopatología para Enfermería I', requisitos: ['Fisiología Humana'] },
  { id: 'Farmacología para Enfermería I', requisitos: ['Fundamentos Bioquímicos para Enfermería'] },
  { id: 'Microbiología para Enfermería', requisitos: [] },
  { id: 'Introducción a la Fe', requisitos: [] },

  // IV Semestre
  { id: 'Cuidados en el ciclo vital II', requisitos: ['Cuidados en el ciclo vital I'] },
  { id: 'Paradigmas y Métodos Investigativos I', requisitos: ['Introducción a la Investigación'] },
  { id: 'Fisiopatología para Enfermería II', requisitos: ['Fisiopatología para Enfermería I'] },
  { id: 'Farmacología para Enfermería II', requisitos: ['Farmacología para Enfermería I'] },
  { id: 'Estadística aplicada a la Salud', requisitos: ['Biomatemática Aplicada a la Enfermería'] },
  { id: 'Integración de competencias I', requisitos: ['Enfermería Profesión y Disciplina'] },
  { id: 'Ética Cristiana', requisitos: ['Introducción a la Fe'] },

  // V Semestre
  { id: 'Cuidados en la Mujer, Neonato, Niño y Adolescente Ambulatorio', requisitos: ['Cuidados en el ciclo vital II'] },
  { id: 'Paradigmas y Métodos Investigativos II', requisitos: ['Paradigmas y Métodos Investigativos I'] },
  { id: 'Cuidados en Salud Mental y Psiquiatría', requisitos: ['Psicología General y Evolutiva'] },
  { id: 'Gestión y Liderazgo en Enfermería', requisitos: [] },
  { id: 'Bioética y Legislación en Enfermería', requisitos: [] },

  // VI Semestre
  { id: 'Cuidados en el Adulto y Persona Mayor Ambulatoria', requisitos: [] },
  { id: 'Formulación de proyectos investigativos en Enfermería', requisitos: ['Paradigmas y Métodos Investigativos II'] },
  { id: 'Cuidados en el Adulto y Persona Mayor Hospitalizada I', requisitos: [] },
  { id: 'Calidad y Planificación en Enfermería', requisitos: [] },
  { id: 'Certificación I', requisitos: [] },

  // VII Semestre
  { id: 'Cuidados en el Adulto y Persona Mayor Hospitalizada II', requisitos: ['Cuidados en el Adulto y Persona Mayor Hospitalizada I'] },
  { id: 'Seminario I', requisitos: ['Formulación de proyectos investigativos en Enfermería'] },
  { id: 'Cuidados en el neonato, niño y adolescente Hospitalizado I', requisitos: [] },
  { id: 'Enfermería en Salud Comunitaria', requisitos: [] },
  { id: 'Electivo de Profundización I', requisitos: [] },
  { id: 'Certificación II', requisitos: ['Certificación I'] },

  // VIII Semestre
  { id: 'Cuidados en el neonato, niño y adolescente Hospitalizado II', requisitos: ['Cuidados en el neonato, niño y adolescente Hospitalizado I'] },
  { id: 'Seminario II', requisitos: ['Seminario I'] },
  { id: 'Enfermería en urgencia y desastres', requisitos: [] },
  { id: 'Gestión en Centros de Salud', requisitos: [] },
  { id: 'Integración de competencias II', requisitos: ['Integración de competencias I'] },
  { id: 'Electivo de Profundización II', requisitos: ['Electivo de Profundización I'] },
  { id: 'Certificación III', requisitos: ['Certificación II'] },

  // IX Semestre
  { id: 'Gestión del Cuidado I', requisitos: [] },
  { id: 'Electivo de Profundización III', requisitos: ['Electivo de Profundización II'] },

  // X Semestre
  { id: 'Gestión del Cuidado II', requisitos: ['Gestión del Cuidado I'] },
];

// Guarda los ramos aprobados
const aprobados = new Set();

const contenedor = document.getElementById('malla');

// Crear elementos visuales
ramos.forEach(ramo => {
  const div = document.createElement('div');
  div.className = 'ramo bloqueado';
  div.textContent = ramo.id;
  div.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo.id);
  contenedor.appendChild(div);
});

function aprobarRamo(id) {
  const ramo = ramos.find(r => r.id === id);
  const div = document.getElementById(id);

  if (!div.classList.contains('bloqueado')) {
    div.classList.toggle('aprobado');
    if (div.classList.contains('aprobado')) {
      aprobados.add(id);
    } else {
      aprobados.delete(id);
    }
    actualizarEstado();
  }
}

function actualizarEstado() {
  ramos.forEach(ramo => {
    const div = document.getElementById(ramo.id);
    if (aprobados.has(ramo.id)) {
      div.classList.remove('bloqueado');
      div.classList.add('aprobado');
    } else {
      const requisitosCumplidos = ramo.requisitos.every(req => aprobados.has(req));
      if (requisitosCumplidos) {
        div.classList.remove('bloqueado');
      } else {
        div.classList.add('bloqueado');
        div.classList.remove('aprobado');
      }
    }
  });
}

actualizarEstado();
