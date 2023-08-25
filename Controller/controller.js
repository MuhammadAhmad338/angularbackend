const { collection, getDocs, addDoc, getFirestore, updateDoc, doc, deleteDoc, setDoc } = require("@firebase/firestore");
const { initializeApp } =  require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLzHOrH2OM_LwFqNNVoSiV9pWp1WBHlSM",
  authDomain: "angular-cloudfirestore.firebaseapp.com",
  projectId: "angular-cloudfirestore",
  storageBucket: "angular-cloudfirestore.appspot.com",
  messagingSenderId: "834001982715",
  appId: "1:834001982715:web:d802bb17d3ce5768dc0c5e",
  measurementId: "G-F485ETV4CP"
};

// Initialize Firebase
const initApp = initializeApp(firebaseConfig);
const firestore = getFirestore(initApp);

const getCities = async (req, res) => {
    try {
        const gotCollection = collection(firestore, "cities");
        const dataSnapshot = await getDocs(gotCollection);
        const cities = dataSnapshot.docs.map(doc => doc.data());
        res.status(200).json(cities);
    } catch(error) {
        res.status(500).json('Error Adding Document!');
    }
}

const addCities = async (req, res) => {
    const data = req.body;
    try {
      const gotCollection = collection(firestore, "cities");
      await addDoc(gotCollection, data);
      res.status(201).json("Document Added Successfully");
    } catch(error) {
        res.status(500).json('Error Adding Document!');
    }
}

const updateCities = async (req, res) => {
    const { id , data } = req.body;
    try {
        const gotCollection = collection(firestore, 'cities');
        const docRef = doc(gotCollection, id);
        await setDoc(docRef, data);
        res.status(200).json("Document Updated Successfully!");
    } catch(error) {
        res.status(500).json("Some error occured!");
    }
}

const deleteCities = async (req, res) => {
    const data = req.body;
    try {
       const gotCollection = collection(firestore, 'cities');
       const docRef = doc(gotCollection, data.id);
       await deleteDoc(docRef);
       res.status(200).json("Document Deleted Successfully!");
    } catch(error) {
        res.status(500).json("Error Deleting Cities!");
    }
}

module.exports = { getCities, addCities, updateCities, deleteCities, initApp, firestore };