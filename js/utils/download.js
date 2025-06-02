export function downloadQRCode() {
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
}