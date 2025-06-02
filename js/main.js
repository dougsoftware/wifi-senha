import { applyTranslations, toggleLanguage } from './lang/translations.js';
import { generateQRCode } from './qrcode/generate-qrcode-from-data.js';
import { applyTheme } from './theme/theme.js';
import { clearAllFields } from './utils/clearAllFields.js';
import { downloadQRCode } from './utils/download.js'
import { togglePasswordVisibility } from './utils/password-visibility.js';

document.addEventListener("DOMContentLoaded", function () {
	downloadQRCode();
	togglePasswordVisibility();
	applyTranslations();
	applyTheme();

	document.getElementById('toggle-lang').addEventListener('click', toggleLanguage);

	document.getElementById('apply').addEventListener('click', generateQRCode);

	document.getElementById('clear').addEventListener('click', clearAllFields);

	document.getElementById('copy-year').textContent = new Date().getFullYear();
});



