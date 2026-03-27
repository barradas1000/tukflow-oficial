
// Cores dinâmicas para cards ao fazer scroll (mobile e desktop)
const featureCards = document.querySelectorAll('.feature-card-yellow, .feature-card-orange, .feature-card-coral, .feature-card-blue');
const dynamicColors = [
	'linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%)', // amarelo
	'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', // laranja
	'linear-gradient(135deg, #FFECB3 0%, #FFAB91 100%)', // coral
	'linear-gradient(135deg, #E3F2FD 0%, #B3E5FC 100%)', // azul
	'linear-gradient(135deg, #FFD180 0%, #FFAB40 100%)', // laranja vibrante
	'linear-gradient(135deg, #FFF59D 0%, #FFF176 100%)', // amarelo claro
];

function setDynamicCardColors() {
	featureCards.forEach((card, idx) => {
		const rect = card.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		// Se o card está visível na viewport, aplica cor dinâmica
		if (rect.top < windowHeight && rect.bottom > 0) {
			const colorIdx = (Math.floor(window.scrollY / 100) + idx) % dynamicColors.length;
			card.style.background = dynamicColors[colorIdx];
			card.style.transition = 'background 0.7s';
		}
	});
}

window.addEventListener('scroll', setDynamicCardColors, { passive: true });
window.addEventListener('resize', setDynamicCardColors);
document.addEventListener('DOMContentLoaded', setDynamicCardColors);
