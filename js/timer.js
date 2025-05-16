import { TimerController } from './modules/TimerController.js';

// Datos temáticos
const THEME_WORDS = [
  'Venganza', 'Envidia', 'Lealtad', 'Ego', 'Traicion', 
  'Orgullo', 'Dominio', 'Respeto'
];

// Mapeo de formatos a nombres
const FORMAT_NAMES = {
  'minutoLibre': 'MINUTO LIBRE',
  'tematica': 'TEMÁTICA',
  'minutosLibre': 'MINUTOS LIBRE'
};

/**
 * Inicializar la aplicación de temporizador
 */
function initializeTimer() {
  // Recuperar parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  
  // Valores predeterminados
  let initialTime = 60;
  let currentFormat = "minutoLibre";
  let formatName = "MINUTO LIBRE";
  
  // Obtener valores de parámetros
  if (urlParams.has('formato')) currentFormat = urlParams.get('formato');
  if (urlParams.has('tiempo')) initialTime = parseInt(urlParams.get('tiempo'));
  
  // Obtener nombre de formato
  if (FORMAT_NAMES[currentFormat]) {
    formatName = FORMAT_NAMES[currentFormat];
  }
  
  // Elementos del DOM
  const elements = {
    formatInfo: document.getElementById('formatInfo'),
    timeNumber: document.getElementById('countdown'),
    wordLabel: document.getElementById('word-label'),
    startButton: document.getElementById('btnIniciar'),
    resetButton: document.getElementById('btnReiniciar'),
    backButton: document.getElementById('btnVolver'),
    circleTimer: document.querySelector('.circle-timer'),
    progressRing: document.querySelector('.progress-ring'),
    progressCircle: document.querySelector('.progress-ring__circle')
  };
  
  // Inicializar el controlador
  const timerController = new TimerController({
    elements,
    initialTime,
    formatName,
    themeWords: THEME_WORDS
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeTimer); 