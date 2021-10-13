import { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



GoogleSignin.configure({ forceCodeForRefreshToken: true, scopes: ['profile', 'email'] });


export async function googleLogin() {
    return new Promise<FirebaseAuthTypes.AuthCredential>((resolve, reject) => {
        googleSignOut().finally(async () => {
            try {
                await GoogleSignin.hasPlayServices();
                const user = await GoogleSignin.signIn()
                if (!user) {
                    throw new Error('User cancelled the login process');
                }
                const isSignedIn = await GoogleSignin.getTokens()
                const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, isSignedIn.accessToken);
                resolve(credential)
            } catch (e) {
                console.log(e);
                reject(e);
                throw new Error('User cancelled the login process');
            }
        })
    })

}

export async function googleSignOut() {
    try {
        await Promise.all([
            GoogleSignin.revokeAccess(),
            GoogleSignin.signOut()
        ])
        return Promise.resolve()
    } catch (error) {
        return Promise.resolve()
    }
}