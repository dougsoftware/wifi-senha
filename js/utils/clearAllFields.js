export function clearAllFields() {
	document.getElementById('ssid').value = '';
	document.getElementById('password').value = '';
	document.getElementById('encryption').selectedIndex = 0;
	document.getElementById('qrcode').innerHTML = '';
}