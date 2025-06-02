import { currentLang } from "../lang/translations.js";

export function getEncryptionValue() {
	const enc = document.getElementById('encryption').value;
	if (enc === 'None' || enc === 'Nenhuma') return '';
	return enc.replace('2', ''); // WPA2 -> WPA (para QR code padrão)
}

export function getDataToCreateQRCode() {
	const encryption = getEncryptionValue();
	const ssid = document.getElementById('ssid').value;
	const password = document.getElementById('password').value;

	if (!ssid || !password) {
		alert(currentLang === 'pt' ? "SSID e Senha são obrigatórios." : "SSID and Password are required.");
		return;
	}

	if (encryption === 'None') {
		return `WIFI:S:${ssid};P:${password};;`;
	}

	return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
}

export function generateQRCode(e) {
	e.preventDefault();
	const ssid = document.getElementById('ssid').value;
	const password = document.getElementById('password').value;

	if (!ssid || !password) {
		alert(currentLang === 'pt' ? "SSID e Senha são obrigatórios." : "SSID and Password are required.");
		return;
	}

	const qrCodeText = getDataToCreateQRCode();

	const qrcode = new QRCode("qrcode", {
		text: qrCodeText,
		width: 300,
		height: 300,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H
	});
}