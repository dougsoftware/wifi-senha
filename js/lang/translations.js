import { dicitionary } from './dictionary.js';

export function detectLanguage() {
	const lang = navigator.language || navigator.userLanguage;
	return lang.startsWith('pt') ? 'pt' : 'en';
}

export let currentLang = detectLanguage();

export function setCurrentLanguage(lang) {
	currentLang = lang;
}

export function applyTranslations() {
	const t = dicitionary[currentLang];
	document.getElementById('main-title').textContent = t.title;
	document.getElementById('form-desc').textContent = t.form_description;
	document.getElementById('label-ssid').textContent = t.label_ssid;
	document.getElementById('label-password').textContent = t.label_password;
	document.getElementById('password-help').textContent = t.password_help;
	document.getElementById('label-encryption').textContent = t.label_encryption;
	document.getElementById('ssid').placeholder = t.placeholder_ssid;
	document.getElementById('password').placeholder = t.placeholder_password;
	const encryption = document.getElementById('encryption');
	encryption.options[0].text = t.encryption_none;
	encryption.options[1].text = t.encryption_wpa;
	encryption.options[2].text = t.encryption_wpa2;
	encryption.options[3].text = t.encryption_wep;
	document.getElementById('apply').textContent = t.apply;
	document.getElementById('clear').textContent = t.clear;
	// document.getElementById('current-lang').textContent = t.lang;
	document.getElementById('toggle-lang-value').textContent = t.lang;
	document.getElementById('wifi-qr-generator').textContent = `${t.wifi_qr_generator} `;
	document.getElementById('all-rights').textContent = `${t.all_rights_reserved} `;
}

export function toggleLanguage() {
	setCurrentLanguage(currentLang === 'en' ? 'pt' : 'en');
	applyTranslations();
}
