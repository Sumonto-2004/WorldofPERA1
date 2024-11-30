let wordsData = {};
let currentIndex = 0;
let wordKeys = [];
let editIndex = -1;

function addWord() {
    const word = document.getElementById('wordInput').value;
    const meaning = document.getElementById('meaningInput').value;
    const synonyms = document.getElementById('synonymsInput').value.split(',').map(s => s.trim());
    const antonyms = document.getElementById('antonymsInput').value.split(',').map(a => a.trim());

    if (editIndex === -1) {
        wordsData[word] = { meaning, synonyms, antonyms };
    } else {
        const oldWord = wordKeys[editIndex];
        delete wordsData[oldWord];
        wordsData[word] = { meaning, synonyms, antonyms };
        editIndex = -1;
    }

    wordKeys = Object.keys(wordsData);

    clearInputs();
    displayWords();
}

function displayWords() {
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (wordKeys.length === 0) return;

    const word = wordKeys[currentIndex];
    if (!word) return;

    const wordData = wordsData[word];

    const wordElement = document.createElement('div');
    wordElement.classList.add('word-entry');

    const wordTitle = document.createElement('h2');
    wordTitle.textContent = word;
    wordElement.appendChild(wordTitle);

    const meaningPara = document.createElement('p');
    meaningPara.textContent = `Meaning: ${wordData.meaning}`;
    wordElement.appendChild(meaningPara);

    const synonymsTitle = document.createElement('h3');
    synonymsTitle.textContent = 'Synonyms:';
    wordElement.appendChild(synonymsTitle);

    const synonymsList = document.createElement('ul');
    synonymsList.classList.add('synonyms-list');
    wordData.synonyms.forEach(syn => {
        const listItem = document.createElement('li');
        listItem.textContent = syn;
        synonymsList.appendChild(listItem);
    });
    wordElement.appendChild(synonymsList);

    const antonymsTitle = document.createElement('h3');
    antonymsTitle.textContent = 'Antonyms:';
    wordElement.appendChild(antonymsTitle);

    const antonymsList = document.createElement('ul');
    antonymsList.classList.add('antonyms-list');
    wordData.antonyms.forEach(ant => {
        const listItem = document.createElement('li');
        listItem.textContent = ant;
        antonymsList.appendChild(listItem);
    });
    wordElement.appendChild(antonymsList);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editWord(currentIndex);
    wordElement.appendChild(editButton);

    results.appendChild(wordElement);
}

function nextWord() {
    currentIndex = (currentIndex + 1) % wordKeys.length;
    displayWords();
}

function editWord(index) {
    const word = wordKeys[index];
    const wordData = wordsData[word];

    document.getElementById('wordInput').value = word;
    document.getElementById('meaningInput').value = wordData.meaning;
    document.getElementById('synonymsInput').value = wordData.synonyms.join(', ');
    document.getElementById('antonymsInput').value = wordData.antonyms.join(', ');

    editIndex = index;
    scrollToTop();
}

function clearInputs() {
    document.getElementById('wordInput').value = '';
    document.getElementById('meaningInput').value = '';
    document.getElementById('synonymsInput').value = '';
    document.getElementById('antonymsInput').value = '';
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

window.onload = displayWords;
