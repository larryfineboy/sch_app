document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-info');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const classSelect = document.getElementById('class');
    const examSelect = document.getElementById('exam');
    const subjectSelect = document.getElementById('subject')
    const errorMessage = document.getElementById('errorMessage');

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('/api/get-available-data');
            if (response.ok) {
                const data = await response.json();
                populateSelect(examSelect, data.exams);
                populateSelect(subjectSelect, data.subjects);
            } else {
                console.error('Error fetching options:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });

    function populateSelect(selectElement, options) {
        
        if (selectElement.options[i] > 0) {
            selectElement.options.innerHTML = '';
        }
        
        options.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            selectElement.appendChild(optionElement);
        });
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const selectedClass = classSelect.value;
        const selectedExam = examSelect.value;
        const selectedSubject = subjectSelect.value;

        if (!firstName || !lastName || selectedClass === 'noclass' || selectedExam === 'selectExam' || selectedSubject === 'selectSubject') {
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
                    selectedExam,
                    selectedSubject,
                }),
            });

            if (response.ok) {
                window.location.href = "/cbt/cbt.html";
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
const mySelect1 = document.getElementById("exam");
const mySelect2 = document.getElementById("subject");

mySelect.addEventListener('change', () => {
    mySelect.options[0].disabled = true;
});

mySelect1.addEventListener('change', () => {
    mySelect1.options[0].disabled = true;
});

mySelect2.addEventListener('change', () => {
    mySelect2.options[0].disabled = true;
});
