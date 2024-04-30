import React, { useRef } from "react";
import { auth, provider } from '../firebase';
import firebase from "../firebase";


function SignIn() {
  const phoneNumberInputRef = useRef(null);

  const signInWithGoogle = () => {

   auth.signInWithPopup(provider)
     .then((result) => {
        const user = result.user;
        console.log("You signed in with Google:", user);
     })
     .catch((error) => {
        
        const errorMessage = error.message;
        console.log("Sign-in Error:", errorMessage);
     });

  };

  const signInWithPhoneNumber = () => {
   const phoneNumber = phoneNumberInputRef.current.value;
   const appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");

   auth.signInWithPhoneNumber(phoneNumber, appVerifier)
     .then((confirmationResult) => {
        const verificationId = confirmationResult.verificationId;
        console.log("Verification code sent:", verificationId);

        // Prompt user to enter verification code
        const verificationCode = prompt('Enter verification code:');
        return confirmationResult.confirm(verificationCode);
     })
     .then((userCredential) => {
         // Signed in successfully
         const user = userCredential.user;
         console.log("User signed in:", user);
     })
     .catch((error) => {
        // Handle sign-in errors
      
        const errorMessage = error.message;
        console.error("Sign-in error:", errorMessage);
     });

  };

return (
    <div>
        <label htmlFor="phoneNumber">Enter Your Phone Number: </label>
        <input type="number" id="phoneNumber" ref={phoneNumberInputRef}/>
        <button onClick={signInWithPhoneNumber}>Sign In with Phone Number</button>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
)

}

export default SignIn;

