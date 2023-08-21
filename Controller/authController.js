const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { collection, getDocs, addDoc, where, query } = require("@firebase/firestore");
const { initApp, firestore } = require("./controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = getAuth(initApp);

const signin = async (req, res) => {
  const { email, password } = req.body;
  let hashedPassword = "";
  try {
    const gotCollection = collection(firestore, "users");
    const result = query(gotCollection, where("email", "==", `${email}`));
    const querySnapshot = await getDocs(result);
    querySnapshot.forEach((doc) => {
      hashedPassword = doc.data().password;
    });

    await signInWithEmailAndPassword(auth, email, hashedPassword);
    const success = await bcrypt.compare(password, hashedPassword);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.status(200).json({ email: email, token });
    } else {
      res.status(400).json({ detail: "Login Failed" });
    }
  } catch (error) {
    res.status(400).json({error: "Check your credentials"});
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      hashedPassword
    );
    const user = userCredential.user;
    const gotCollection = collection(firestore, "users");
    await addDoc(gotCollection, {
      email: user.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email }, "your-secret-key", { expiresIn: "2h" });
    res.status(200).json({ email: email, token: token });
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      res.status(200).json({ error: "This email is already in use" });
    } else {
      res.status(500).json("Some error Occured!");
    }
  }
};

module.exports = { signin, signup };
