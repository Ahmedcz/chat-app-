import React , { useState } from 'react';
import SignIn from './components/SignIn';
import auth from './firebase';


function App() {

  const [ user, setUser ] = useState(null)

  auth.onAuthStateChanged((user) => {
   if(user) {
    setUser(user);
   } else {
    setUser(null);
   }

  });

  return (
   <div>{
    user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <button onClick={auth.signOut()}>Sign Out</button>
        </div>
    ) : (
     <signIn />
    )
   }
   </div>   
  );
}

export default App;
