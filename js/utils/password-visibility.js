export function togglePasswordVisibility() {
	const passwordInput = document.getElementById('password');
	const togglePasswordBtn = document.getElementById('toggle-password');

	if (togglePasswordBtn) {
		togglePasswordBtn.addEventListener('click', () => {
			if (passwordInput.type === 'password') {
				passwordInput.type = 'text';
				togglePasswordBtn.textContent = '🙈';
			} else {
				passwordInput.type = 'password';
				togglePasswordBtn.textContent = '👁️';
			}
		});
	}
}