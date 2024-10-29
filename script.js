function validateForm() {
    const form = document.getElementById('registerForm');
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }
    return true;
}
