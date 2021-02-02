
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const registerUser = (res, rej, data) => {
    auth()
        .createUserWithEmailAndPassword(data.userInfo.Email, data.password)
        .then(user => {
            database()
                .ref(`/Users/${user.user.uid}/`)
                .set({...data.userInfo, uId: user.user.uid})
                .then(() => res());
        }
        )
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                rej('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                rej('That email address is invalid!');
            }

            if (error.code === 'auth/weak-password') {
                rej('Password must be atleast 6 characters long!');
            }
        })
}
const loginUser = (res, rej, data) => {
    auth()
        .signInWithEmailAndPassword(data.Email, data.Password)
        .then(() => res())
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                rej('No user found with this email!');
            }

            if (error.code === 'auth/invalid-email') {
                rej('That email address is invalid!');
            }

            if (error.code === 'auth/wrong-password') {
                rej('Password is incorrect!');
            }
        })
}

export { registerUser, loginUser }