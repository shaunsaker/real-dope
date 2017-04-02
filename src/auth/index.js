import Firebase from '../firebase';

const response = {
    message: "",
    success: false
}

export default class Auth {
    static signUpUser(values) {   
        return new Promise(resolve => {
            Firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                .then(() => {
                    response.success = true;
                    resolve(response);
                })
                .catch(error => {
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static signInUser(values) {
        return new Promise(resolve => {
            Firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                    response.success = true;
                    resolve(response);
                })
                .catch(error => {
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static signOutUser(values) {
        return new Promise(resolve => {
            Firebase.auth().signOut()
                .then(() => {
                    response.success = true;
                    resolve(response);
                })
                .catch(error => {
                    response.message = error.message;
                    resolve(response);
                });
        });
    }

    static userAuth(action) {
        return new Promise(resolve => {
            Firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    response.success = true;
                    response.message = user;
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
}