const SSID = 'RedeBR-Kiara-2.4G'; // Nome da rede WiFi
const PASSWORD = 'joannamatos09092016';
const ENCRYPTION = 'WPA'; // Pode ser WEP, WPA ou deixar em branco para redes abertas

document.addEventListener("DOMContentLoaded", function() {
	var qrCodeText = `WIFI:T:${ENCRYPTION};S:${SSID};P:${PASSWORD};;`;
	var qrcode = new QRCode("qrcode", {
		text: qrCodeText,
		width: 450,
		height: 450,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
});
