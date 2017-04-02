import Firebase from '../firebase';

const response = {
    message: "",
    success: false
}

export default class ApiData {
    static saveUserGame(action) {
        let uid = action.uid;

        // If we did not receive the uid via props, get the uid from Firebase
        if (!uid) {
            uid = Firebase.auth().currentUser.uid;
        }
        
        const userData = action.currentGame;

        return new Promise(resolve => { 
            Firebase.database().ref(uid).update({
                currentGame: userData
            })
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

    static loadUserGame(action) {
        let uid = action.uid;

        // If we did not receive the uid via props, get the uid from Firebase
        if (!uid) {
            uid = Firebase.auth().currentUser.uid;
        }

        let userData;

        return new Promise(resolve => { 
            Firebase.database().ref(uid).on('value', snapshot => {
                response.success = true;
                response.message = snapshot.val();
                resolve(response);
            }, (error) => {
                response.message = error.message;
                resolve(response);
            });
        });
    }
}