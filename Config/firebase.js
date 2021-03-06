
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const registerUser = (res, rej, data) => {
    auth()
        .createUserWithEmailAndPassword(data.userInfo.Email, data.password)
        .then(user => {
            database()
                .ref(`/Users/${user.user.uid}/`)
                .set({ ...data.userInfo, uId: user.user.uid })
                .then(() => {
                    if (data.userInfo.Donor) {
                        database()
                            .ref(`/Donors/${user.user.uid}/`)
                            .set({ uId: user.user.uid })
                            .then(() => res())
                            .catch(() => rej())
                    }
                    else res()
                });
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

const signOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

const getUserInfo = (res, rej, uid) => {
    database()
        .ref(`/Users/${uid}/`)
        .once("value")
        .then(data => res(data.val()))
        .catch(error => rej(error))
}

const updateUserInfo = (res, rej, data) => {
    database()
        .ref(`/Users/${data.uId}/`)
        .set({ ...data })
        .then(() => {
            if (data.Donor) {
                database()
                    .ref(`/Donors/${data.uId}/`)
                    .set({ uId: data.uId })
                    .then(() => res())
                    .catch(() => rej())
            }
            else {
                database()
                    .ref(`/Donors/${data.uId}/`)
                    .remove()
                    .then(() => res())
                    .catch(() => rej())
            }
        })
        .catch(() => rej())
}

const getAllDonors = (res, rej) => {
    database()
        .ref(`/Donors/`)
        .once("value")
        .then(data => res(data.val()))
        .catch(error => rej(error))
}

export { registerUser, loginUser, signOut, getUserInfo, updateUserInfo, getAllDonors }