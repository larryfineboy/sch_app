function disableInput(inputElement) {
    inputElement.disabled = true;
    var lastUpdated = localStorage.getItem('lastUpdated');
    var now = Date.now();
    var timeRemaining = (48 * 60 * 60 * 1000) - (now - lastUpdated);

    setTimeout(function() {
        inputElement.disabled = false;
        localStorage.removeItem('lastUpdated');
    }, timeRemaining);
}

function fetchPersonalDetails() {
  fetch('/api/get-personal-details')
    .then(response => response.json())
    .then(data => {
      document.getElementById('profile-pic').src = data.filePath;

      document.getElementById('name').textContent = data.name;
      document.getElementById('class').textContent = data.class;
      document.getElementById('examType').textContent = data.examType;
      document.getElementById('subject').textContent = data.subject;

      var lastUpdated = localStorage.getItem('lastUpdated');
      var now = Date.now();

      if (lastUpdated && now - lastUpdated < 48 * 60 * 60 * 1000) {
        disableInput(document.getElementById('profile'));
      }
    })
    .catch(error => console.error('Error fetching personal details:', error));
}

document.addEventListener('DOMContentLoaded', fetchPersonalDetails);

document.getElementById('profile').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('profileImage', file);

    fetch('/api/update-profile-picture', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('profile-pic').src = data.filePath;

        localStorage.setItem('lastUpdated', Date.now());

        disableInput(event.target);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profile-pic').src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('profile-pic').addEventListener('click', function() {
    var profileInput = document.getElementById('profile');
    var lastUpdated = localStorage.getItem('lastUpdated');
    var now = Date.now();

    if (lastUpdated && now - lastUpdated < 48 * 60 * 60 * 1000) {
        document.getElementById('errorMessage').textContent = 'You can only change your profile picture once every 48 hours.';
    } else {
        profileInput.click();
    }
});

function start() {
    const blankPage = document.getElementById("notifier");
    const dashboard = document.getElementById("dashboard");
    const greeting = document.querySelector("h2");
    const nameLabel = document.querySelector(".name");
    const classLabel = document.querySelector(".class");
    const examLabel = document.querySelector(".exam");
    const subjectLabel = document.querySelector(".subject");
    const startBtn = document.getElementById("startBtn");
    const profile = document.getElementById("profile-pic");
    const questionDiv = document.getElementById("questionContainer");
    const numberSection = document.getElementById("numberSection");

    blankPage.style.display = "none";
    dashboard.style.width = "20%";
    dashboard.style.backgroundColor = "white";
    dashboard.style.color = "#35006e";
    dashboard.style.borderRight = "5px solid green"
    dashboard.style.borderRadius = "0";
    dashboard.style.fontWeight = "bold";
    dashboard.style.margin = "12px";
    dashboard.style.padding = "25px";
    greeting.style.color = "green";
    nameLabel.style.borderBottom = "3px solid green";
    classLabel.style.borderBottom = "3px solid green";
    examLabel.style.borderBottom = "3px solid green";
    subjectLabel.style.borderBottom = "3px solid green";
    startBtn.style.display = "none";
    profile.style.borderColor = "#35006e"
    questionDiv.style.display = "block";
    numberSection.style.display = "block";

    let timeLeft = 5400;
    const timer = document.getElementById("timer");
    const intervalID = setInterval(updateClock, 1000);
    function updateClock() {
       timeLeft--;
       displayTimeLeft(timeLeft, timer);
        
        if (timeLeft === 0) {
           clearInterval(intervalID);
           submit();
        }
    }

    displayTimeLeft(timeLeft, timer);
};

document.getElementById('startBtn').addEventListener('click', start);

function createRipple(event) {
    let button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const ripple = document.createElement("span");
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - buttonRect.left - radius}px`;
    ripple.style.top = `${event.clientY - buttonRect.top - radius}px`;
    ripple.classList.add("ripple");

    button.appendChild(ripple);
}

let button = document.getElementById("nextBtn");
button.addEventListener("click", createRipple);

function createRipple1(event1) {
    let button1 = event1.currentTarget;
    const buttonRect1 = button1.getBoundingClientRect();
    const diameter1 = Math.max(button1.clientWidth, button1.clientHeight);
    const radius1 = diameter1 / 2;

    const ripple1 = document.createElement("span");
    ripple1.style.width = ripple1.style.height = `${diameter1}px`;
    ripple1.style.left = `${event1.clientX - buttonRect1.left - radius1}px`;
    ripple1.style.top = `${event1.clientY - buttonRect1.top - radius1}px`;
    ripple1.classList.add("ripple1");

    button1.appendChild(ripple1);
}

let button1 = document.getElementById("prevBtn");
button1.addEventListener("click", createRipple1);

function createRipple2(event2) {
    let button2 = event2.currentTarget;
    const buttonRect2 = button2.getBoundingClientRect();
    const diameter2 = Math.max(button2.clientWidth, button2.clientHeight);
    const radius2 = diameter2 / 2;

    const ripple2 = document.createElement("span");
    ripple2.style.width = ripple2.style.height = `${diameter2}px`;
    ripple2.style.left = `${event2.clientX - buttonRect2.left - radius2}px`;
    ripple2.style.top = `${event2.clientY - buttonRect2.top - radius2}px`;
    ripple2.classList.add("ripple2");

    button2.appendChild(ripple2);
}

let button2 = document.getElementById("submitBtn");
button2.addEventListener("click", createRipple2);

var questions = [
    {
        header: "",
        instructions: "",
        question: "",
        image: "",
        options: ["", "", "", ""],
        userAnswer: null,
        subject: ""
    }
];

function fetchQuestions() {
  fetch('/api/questions')
    .then(response => response.json())
    .then(data => {
      questions = data;
      renderQuestion();
    })
    .catch(error => console.error('Error fetching questions:', error));
}

document.addEventListener('DOMContentLoaded', fetchQuestions);

var currentQuestionIndex = 0;

function renderQuestion() {
    var questionContainer = document.getElementById('questionSection');
    var question = questions[currentQuestionIndex];
    
    questionContainer.innerHTML = '';

    var headerDiv = document.createElement('div');
    headerDiv.textContent = question.header;
    questionContainer.appendChild(headerDiv);

    var instructionDiv = document.createElement('div');
    instructionDiv.textContent = question.instructions;
    questionContainer.appendChild(instructionDiv);

    var imageDiv = document.createElement('img');
    imageDiv.src = question.image;
    imageDiv.style.width = "70%"
    questionContainer.appendChild(imageDiv);

    var questionDiv = document.createElement('div');
    questionDiv.textContent = question.question;
    questionContainer.appendChild(questionDiv);

    for (var i = 0; i < question.options.length; i++) {
        var optionDiv = document.createElement('div');
        var optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'option';
        optionInput.value = i;
        optionInput.id = 'option' + i;

        optionInput.addEventListener('change', function(event) {
            question.userAnswer = parseInt(event.target.value, 10);
        });

        if (i === question.userAnswer) {
            optionInput.checked = true;
        }

        var optionLabel = document.createElement('label');
        optionLabel.textContent = question.options[i];
        optionLabel.htmlFor = 'option' + i;

        optionDiv.appendChild(optionInput);
        optionDiv.appendChild(optionLabel);
        questionContainer.appendChild(optionDiv);
    }

    document.getElementById('prevBtn').disabled = (currentQuestionIndex === 0);

    document.getElementById('nextBtn').disabled = (currentQuestionIndex === questions.length - 1);

    var answeredQuestions = questions.filter(function(q) { return q.userAnswer !== null; }).length;
    document.getElementById('submitBtn').disabled = (answeredQuestions <= 50);

    renderNumberSection();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        var selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            questions[currentQuestionIndex].userAnswer = parseInt(selectedOption.value);
        }

        currentQuestionIndex++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        var selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            questions[currentQuestionIndex].userAnswer = parseInt(selectedOption.value);
        }

        currentQuestionIndex--;
        renderQuestion();
    }
}

function submit() {
    var inputFields = document.querySelectorAll('input');
    inputFields.forEach(function(input) {
        input.disabled = true;
    });

    var buttonFields = document.querySelectorAll('button');
    buttonFields.forEach(function(button) {
        button.disabled = true;
    });

    var examComplete = document.getElementById('notifier');
    var questionExamComplete = document.getElementById("questionContainer");
    var numberSectionComplete = document.getElementById("numberSection");
    var text = document.getElementById("notifier-text");
    var logOutBtn = document.createElement('button');
    logOutBtn.innerHTML = "Log Out";
    examComplete.appendChild(logOutBtn);


    examComplete.style.display = 'flex';
    examComplete.style.flexDirection = 'column';
    examComplete.style.width = '80%';
    questionExamComplete.style.display = 'none';
    numberSectionComplete.style.display = 'none';
    text.textContent = "Exam submitted successfully...";
    logOutBtn.style.marginTop = '100px';
    logOutBtn.style.border = '3px solid #a675a1';
    logOutBtn.style.color = '#a675a1';

    var userAnswers = questions.map(function(question, index) {
        return {
            questionIndex: index,
            userAnswer: question.userAnswer
        };
    });

    fetch('/api/exam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAnswers)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    logOutBtn.addEventListener('click', function () {
        window.location.href = '/DBCS_APP/sch_login/school.html';
    });
}

document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('prevBtn').addEventListener('click', prevQuestion);
document.getElementById('submitBtn').addEventListener('click', submit);

function renderNumberSection() {
    var numberSection = document.getElementById('numberSection');

    numberSection.innerHTML = '';

    for (var i = 0; i < questions.length; i++) {
        var button = document.createElement('button');

        button.textContent = i + 1;

        if (questions[i].userAnswer !== null) {
            button.style.backgroundColor = 'green';
        } else {
            button.style.backgroundColor = 'rgb(201, 138, 138)';
        }

        button.addEventListener('click', (function(i) {
            return function() {
                currentQuestionIndex = i;
                renderQuestion();
            };
        })(i));

        numberSection.appendChild(button);
    }
}

function selectAnswer(questionIndex, optionIndex) {
    questions[questionIndex].userAnswer = questions[questionIndex].options[optionIndex];
}

selectAnswer(questionIndex, optionIndex);

function displayTimeLeft(timeLeft, timer) {
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
        timer.textContent = "00:00:00";
    } else {
        let hours = Math.floor(timeLeft / 3600);
        let minutes = Math.floor((timeLeft % 3600) / 60);
        let seconds = timeLeft % 60;
        let formattedHours = hours < 10 ? "0" + hours : hours;
        let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        let formattedTime = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
        timer.textContent = formattedTime;
    }
}