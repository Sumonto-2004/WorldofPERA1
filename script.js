// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentIndex = 0;
let wordKeys = [];

function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    createUserWithEmailAndPassword(auth, email, password)
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
    signInWithEmailAndPassword(auth, email, password)
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

function signOutUser() {
    signOut(auth).then(() => {
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
    addDoc(collection(db, 'users', userId, 'words'), {
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
    getDocs(collection(db, 'users', userId, 'words')).then((querySnapshot) => {
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
    getDoc(doc(db, 'users', userId, 'words', wordId)).then((docSnap) => {
        if (docSnap.exists()) {
            const wordData = docSnap.data();

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
    getDoc(doc(db, 'users', userId, 'words', wordId)).then((docSnap) => {
        if (docSnap.exists()) {
            const wordData = docSnap.data();
            document.getElementById('wordInput').value = wordData.word;
            document.getElementById('meaningInput').value = wordData.mean[_{{{CITATION{{{_1{](https://github.com/SeanCena123/test-project-viola/tree/66037dd59ce3ad042e431600ef674f0cc66797d8/public%2Fjs%2Fsignin.js)[_{{{CITATION{{{_2{](https://github.com/pauloperezdev/FirebaseAuth/tree/06d1e89132f59d989ec5d8cfe3c5c00e373147b1/index.php)[_{{{CITATION{{{_3{](https://github.com/timecircle/kingpang/tree/9adfd029bb0f2ec469afdaa76d24dc1eea4c48a2/resources%2Fviews%2Fcomponents%2Flayout%2Finc%2Fouter.blade.php)[_{{{CITATION{{{_4{](https://github.com/GreatGuyGin/22/tree/16d269201d591757a57aa77d0e6572df99c0f7fd/index.php)[_{{{CITATION{{{_5{](https://github.com/epic-developer/ExecAssist/tree/24d5b36ab5393d40221aac2abcd1d82a9aabc441/index.js)[_{{{CITATION{{{_6{](https://github.com/kunjalpatel2001/Shopping-Website/tree/ac0f5e511e0bf1e35375480da53d2cb221143033/storage%2Fframework%2Fviews%2F8477a979cdb80a78292d92a7ff454dec311b96f1.php)
