function getDataToCreateQRCode() {
	const ssid = document.getElementById('ssid').value;
	const password = document.getElementById('password').value;
	const encryption = document.getElementById('encryption').value;

	if (!ssid || !password) {
		alert("SSID e Senha são obrigatórios.");
		return null;
	}

	if (encryption === 'None') {
		return `WIFI:S:${ssid};P:${password};;`;
	}

	return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
}

function generateQRCode() {
	const qrCodeText = getDataToCreateQRCode();
	if (!qrCodeText) return;

	const qrcode = new QRCode("qrcode", {
		text: qrCodeText,
		width: 300,
		height: 300,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H
	});
}

function clearFields() {
	const ssid = document.getElementById('ssid');
	const password = document.getElementById('password');
	const encryption = document.getElementById('encryption');
	const qrCode = document.getElementById('qrcode');
	ssid.value = '';
	password.value = '';
	encryption.value = 'None';
	qrCode.innerHTML = '';
}


const translations = {
	en: {
		title: "WIFI QR Code",
		label_ssid: "SSID (WiFi Name):",
		label_password: "Password:",
		label_encryption: "Encryption:",
		placeholder_ssid: "Enter SSID",
		placeholder_password: "Enter Password",
		encryption_none: "None",
		encryption_wpa: "WPA",
		encryption_wpa2: "WPA2",
		encryption_wep: "WEP",
		apply: "Apply",
		clear: "Clear",
		lang: "English (US)",
		switch: "Switch Language"
	},
	pt: {
		title: "QR Code de WIFI",
		label_ssid: "SSID (Nome do WIFI):",
		label_password: "Senha:",
		label_encryption: "Criptografia:",
		placeholder_ssid: "Digite o SSID",
		placeholder_password: "Digite a senha",
		encryption_none: "Nenhuma",
		encryption_wpa: "WPA",
		encryption_wpa2: "WPA2",
		encryption_wep: "WEP",
		apply: "Aplicar",
		clear: "Limpar",
		lang: "Português (Brasil)",
		switch: "Trocar Idioma"
	}
};

function detectLanguage() {
	const lang = navigator.language || navigator.userLanguage;
	return lang.startsWith('pt') ? 'pt' : 'en';
}

let currentLang = detectLanguage();

function applyTranslations() {
	const t = translations[currentLang];
	document.getElementById('title').textContent = t.title;
	document.getElementById('label-ssid').textContent = t.label_ssid;
	document.getElementById('label-password').textContent = t.label_password;
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
	document.getElementById('current-lang').textContent = t.lang;
	document.getElementById('toggle-lang').textContent = t.switch;
}

function detectTheme() {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
}

function applyTheme(theme) {
	const body = document.body;
	body.classList.remove('light', 'dark');
	body.classList.add(theme);
	const themeBtn = document.getElementById('toggle-theme');
	if (themeBtn) {
		themeBtn.textContent = theme === 'dark' ? (currentLang === 'pt' ? 'Tema Claro' : 'Light Theme') : (currentLang === 'pt' ? 'Tema Escuro' : 'Dark Theme');
	}
}

document.addEventListener("DOMContentLoaded", function () {
	applyTranslations();

	document.getElementById('toggle-lang').addEventListener('click', () => {
		currentLang = currentLang === 'en' ? 'pt' : 'en';
		applyTranslations();
	});

	// Theme switcher
	let currentTheme = detectTheme();
	applyTheme(currentTheme);

	// Cria o botão se não existir
	let themeBtn = document.getElementById('toggle-theme');
	if (!themeBtn) {
		themeBtn = document.createElement('button');
		themeBtn.id = 'toggle-theme';
		const langSwitcher = document.querySelector('.lang-switcher');
		if (langSwitcher) {
			langSwitcher.appendChild(themeBtn);
		} else {
			document.body.prepend(themeBtn);
		}
	}
	themeBtn.addEventListener('click', () => {
		currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
		applyTheme(currentTheme);
	});

	// Atualiza texto do botão ao trocar idioma
	const oldApplyTranslations = applyTranslations;
	applyTranslations = function () {
		oldApplyTranslations();
		applyTheme(currentTheme);
	};
	applyTranslations();

	function getEncryptionValue() {
		const enc = document.getElementById('encryption').value;
		if (enc === 'None' || enc === 'Nenhuma') return '';
		return enc.replace('2', ''); // WPA2 -> WPA (para QR code padrão)
	}

	function generateQRCode() {
		const ssid = document.getElementById('ssid').value;
		const password = document.getElementById('password').value;

		if (!ssid || !password) {
			alert(currentLang === 'pt' ? "SSID e Senha são obrigatórios." : "SSID and Password are required.");
			return;
		}

		const encryption = getEncryptionValue();
		const qrCodeText = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
		const qrcodeDiv = document.getElementById('qrcode');
		qrcodeDiv.innerHTML = "";
		new QRCode(qrcodeDiv, {
			text: qrCodeText,
			width: 450,
			height: 450,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H
		});
	}

	document.getElementById('apply').addEventListener('click', generateQRCode);

	document.getElementById('clear').addEventListener('click', () => {
		document.getElementById('ssid').value = '';
		document.getElementById('password').value = '';
		document.getElementById('encryption').selectedIndex = 0;
		document.getElementById('qrcode').innerHTML = '';
	});
});

const applyBtn = document.getElementById('apply');
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download-qrcode');
const qrcodeDiv = document.getElementById('qrcode');

applyBtn.addEventListener('click', () => {
	// ...sua lógica de geração do QR code...
	// Supondo que o QR code é gerado como <canvas> dentro de #qrcode
	setTimeout(() => { // Aguarda o QR code ser renderizado
		const canvas = qrcodeDiv.querySelector('canvas');
		if (!canvas) return
		downloadBtn.style.display = 'inline-block';
	}, 300);
});

downloadBtn.addEventListener('click', () => {
	// Procura um <canvas> ou <img> dentro do #qrcode
	const canvas = qrcodeDiv.querySelector('canvas');
	if (canvas) {
		const link = document.createElement('a');
		link.href = canvas.toDataURL('image/png');
		link.download = 'wifi-qrcode.png';
		link.click();
	} else {
		// Caso use <img>
		const img = qrcodeDiv.querySelector('img');
		if (img) {
			const link = document.createElement('a');
			link.href = img.src;
			link.download = 'wifi-qrcode.png';
			link.click();
		}
	}
});

clearBtn.addEventListener('click', () => {
	downloadBtn.style.display = 'none';
});