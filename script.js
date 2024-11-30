// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtekNe0gbPQvOgMRV9jLdcrawomqhsdV0",
    authDomain: "worldofpera-99e25.firebaseapp.com",
    projectId: "worldofpera-99e25",
    storageBucket: "worldofpera-99e25.firebasestorage.app",
    messagingSenderId: "380134025599",
    appId: "1:380134025599:web:9d7d5ce898ab1c9671d24a",
    measurementId: "G-72T1D22VKN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let currentIndex = 0;
let wordKeys = [];

function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Account created!');
        })
        .catch((error) => {
            alert(error.message);
        });
}

function signIn() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.querySelector('.auth-section').style.display = 'none';
            document.querySelector('.input-section').style.display = 'block';
            document.querySelector('.display-section').style.display = 'block';
            loadWords();
        })
        .catch((error) => {
            alert(error.message);
        });
}

function signOut() {
    auth.signOut().then(() => {
        document.querySelector('.auth-section').style.display = 'block';
        document.querySelector('.input-section').style.display = 'none';
        document.querySelector('.display-section').style.display = 'none';
    });
}

function addWord() {
    const word = document.getElementById('wordInput').value;
    const meaning = document.getElementById('meaningInput').value;
    const synonyms = document.getElementById('synonymsInput').value.split(',').map(s => s.trim());
    const antonyms = document.getElementById('antonymsInput').value.split(',').map(a => a.trim());

    const userId = auth.currentUser.uid;
    db.collection('users').doc(userId).collection('words').add({
        word: word,
        meaning: meaning,
        synonyms: synonyms,
        antonyms: antonyms
    }).then(() => {
        clearInputs();
        loadWords();
    }).catch((error) => {
        alert(error.message);
    });
}

function loadWords() {
    const userId = auth.currentUser.uid;
    db.collection('users').doc(userId).collection('words').get()
        .then((querySnapshot) => {
            wordKeys = [];
            querySnapshot.forEach((doc) => {
                wordKeys.push(doc.id);
            });
            currentIndex = 0;
            displayWords();
        });
}

function displayWords() {
    const userId = auth.currentUser.uid;
    if (wordKeys.length === 0) return;
    const wordId = wordKeys[currentIndex];
    db.collection('users').doc(userId).collection('words').doc(wordId).get().then((doc) => {
        if (doc.exists) {
            const wordData = doc.data();

            const results = document.getElementById('results');
            results.innerHTML = '';

            const wordElement = document.createElement('div');
            wordElement.classList.add('word-entry');

            const wordTitle = document.createElement('h2');
            wordTitle.textContent = wordData.word;
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
    });
}

function nextWord() {
    currentIndex = (currentIndex + 1) % wordKeys.length;
    displayWords();
}

function editWord(index) {
    const wordId = wordKeys[index];
    const userId = auth.currentUser.uid;
    db.collection('users').doc(userId).collection('words').doc(wordId).get().then((doc) => {
        if (doc.exists) {
            const wordData = doc.data();
            document.getElementById('wordInput').value = wordData.word;
            document.getElementById('meaningInput').value = wordData.meaning;
            document.getElementById('synonymsInput').value = wordData.synonyms.join(', ');
            document.getElementById('antonymsInput').value = wordData.antonyms.join(', ');
        }
    });
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

window.onload = loadWords;
