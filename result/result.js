function phoneDisplay() {
    const dashboard = document.getElementById('dashboard');
    const resultContainer = document.querySelector('.resultContainer');

    dashboard.style.display = 'none';
    resultContainer.style.display = 'block';
}

document.getElementById('svgElement').addEventListener('click', phoneDisplay);

var results = [];

function fetchResults() {
  fetch('/api/get-results')
    .then(response => response.json())
    .then(data => {
      results = data;
      renderResults();
    })
    .catch(error => console.error('Error fetching results:', error));
}

document.addEventListener('DOMContentLoaded', fetchResults);

function renderResults() {
    var resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; 

    results.forEach(function(result, index) {
        var resultDiv = document.createElement('div');
        resultDiv.className = 'result-preview';
        resultDiv.dataset.index = index;
        resultDiv.dataset.filepath = result.filePath;

        var classDiv = document.createElement('div');
        classDiv.textContent = result.class;
        classDiv.style.marginTop = '5px';
        classDiv.style.fontSize = '13px';
        classDiv.style.width = '100%';
        classDiv.style.textAlign = 'right';

        var headerDiv = document.createElement('div');
        headerDiv.textContent = result.header;
        headerDiv.style.marginTop = '20px';
        headerDiv.style.width = '100%'
        headerDiv.style.fontSize = '90%';
        headerDiv.style.textAlign = 'left';
        headerDiv.style.color = '#5c3d5c';

        var lineDiv = document.createElement('hr');
        lineDiv.style.width = '100%';
        lineDiv.style.height = '5px';
        lineDiv.style.color = 'green';

        resultDiv.appendChild(classDiv);
        resultDiv.appendChild(headerDiv);
        resultDiv.appendChild(lineDiv);

        resultsContainer.appendChild(resultDiv);

        resultDiv.addEventListener('click', function() {
            showResult(this.dataset.index);
        });
    });
}

function showResult(index) {
    var resultPage = document.getElementById('resultPage');
    var result = results[index];

    var pdfViewer = '<object type="application/pdf" data="' + result.dataset.filepath + '" width="100%" height="100%"></object>';

    resultPage.innerHTML = pdfViewer;
    resultPage.style.display = 'block';

    var closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.onclick = function() {
        resultPage.style.display = 'none';
    };
    resultPage.appendChild(closeButton);
}