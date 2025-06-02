import { currentLang } from '../lang/translations.js';

export let currentTheme;

export function detectTheme() {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
}

export function applyTheme(theme = detectTheme()) {
	const body = document.body;
	body.classList.remove('light', 'dark');
	body.classList.add(theme);
	let themeBtn = document.getElementById('toggle-theme');
	if (themeBtn) {
		themeBtn.textContent = theme === 'dark' ? (currentLang === 'pt' ? 'Claro' : 'Light') : (currentLang === 'pt' ? 'Escuro' : 'Dark');
	}
	// Cria o botão se não existir
	if (!themeBtn) {
		themeBtn = document.createElement('button');
		themeBtn.id = 'toggle-theme';
		themeBtn.textContent = theme === 'dark' ? (currentLang === 'pt' ? 'Claro' : 'Light') : (currentLang === 'pt' ? 'Escuro' : 'Dark');
		
		const themeContainer = document.getElementById('theme-container');
		
		if (themeContainer) {
			themeContainer.appendChild(themeBtn);
		}
	}
	themeBtn.addEventListener('click', () => {
		currentTheme = theme === 'dark' ? 'light' : 'dark';
		applyTheme(currentTheme);
	});
}