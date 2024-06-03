document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-info');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const classSelect = document.getElementById('class');
    const admissionInput = document.getElementById('admission-no');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const selectedClass = classSelect.value;
        const admissionNumber = admissionInput.value.trim();

        if (!firstName || !lastName || selectedClass === 'noclass' || !admissionNumber) {
            errorMessage.textContent = 'Please fill in all required fields.';
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    selectedClass,
                    admissionNumber,
                }),
            });
            console.log("response")

            if (response.ok) {
                window.location.href = "/result/result.html";
            } else {
                errorMessage.textContent = 'Invalid Login Credentials. Please try again.';
            }
        } catch (error) {
            console.error('Error during login:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        }
    });
    console.log(loginForm);
});

const mySelect = document.getElementById("class");

mySelect.addEventListener('change', () => {
    mySelect.options[0].disabled = true;
});
