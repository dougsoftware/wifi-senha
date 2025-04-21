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
		width: 380,
		height: 380,
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
	qrCode.style.display = 'none';
	document.getElementById('qrcode').style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function () {
	const generateButton = document.getElementById('apply');
	const clearButton = document.getElementById('clear');

	generateButton?.addEventListener('click', function () {
		generateQRCode();
	});

	console.log("Botão de gerar QR Code encontrado:", generateButton);
	console.log("Botão de limpar encontrado:", clearButton);
	

	clearButton?.addEventListener('click', function () {
		clearFields();
	});
});

