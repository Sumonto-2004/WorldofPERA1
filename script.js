// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtekNe0gbPQvOgMRV9jLdcrawomqhsdV0",
    authDomain: "worldofpera-99e25.firebaseapp.com",
    projectId: "worldofpera-99e25",
    storageBucket: "worldofpera-99e25.firebasestorage.app",
    messagingSenderId: "380134025599",
    appId: "1:380134025599:web:4fd3fb84d9f495ab71d24a",
    measurementId: "G-EPPFPECJZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

let currentIndex = 0;
let wordKeys = [];

async function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created!');
    } catch (error) {
        alert(error.message);
    }
}

async function signIn() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        document.querySelector('.auth-section').style.display = 'none';
        document.querySelector('.input-section').style.display = 'block';
        document.querySelector('.display-section').style.display = 'block';
        loadWords();
    } catch (error) {
        alert(error.message);
    }
}

async function signOutUser() {
    try {
        await signOut(auth);
        document.querySelector('.auth-section').style.display = 'block';
        document.querySelector('.input-section').style.display = 'none';
        document.querySelector('.display-section').style.display = 'none';
    } catch (error) {
        alert(error.message);
    }
}

async function addWord() {
    const word = document.getElementById('wordInput').value;
    const meaning = document.getElementById('meaningInput').value;
    const synonyms = document.getElementById('synonymsInput').value.split(',').map(s => s.trim());
    const antonyms = document.getElementById('antonymsInput').value.split(',').map(a => a.trim());

    const userId = auth.currentUser.uid;
    try {
        await addDoc(collection(db, 'users', userId, 'words'), {
            word: word,
            meaning: meaning,
            synonyms: synonyms,
            antonyms: antonyms
        });
        clearInputs();
        loadWords();
    } catch (error) {
        alert(error.message);
    }
}

async function loadWords() {
    const userId = auth.currentUser.uid;
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'words'));
    wordKeys = [];
    querySnapshot.forEach((doc) => {
        wordKeys.push(doc.id);
    });
    currentIndex = 0;
    displayWords();
}

async function displayWords() {
    const userId = auth.currentUser.uid;
    if (wordKeys.length === 0) return;
    const wordId = wordKeys[currentIndex];
    const docRef = doc(db, 'users', userId, 'words', wordId);
    const docSnap = await getDoc(docRef);
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
