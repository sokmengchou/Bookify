import { action, observable } from "mobx";
import { authRef, batchRef, bookStoreRef, createId, storageRef, studentRef } from "../services/data.service";
import { Alert, Platform } from "react-native";
import { pageKey, pushToObject } from "../services/mapping.service";
import { IAccountModel } from "./model/account.model";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { googleSignOut } from "services/socialAuth.service";
import { ENUM_STATUS } from "./enum/auth.enum";
import ImagePicker from 'react-native-image-crop-picker';



const INVALID_PASSWORD = "The password is invalid or the user does not have a password."
const NO_USER = "There is no user record corresponding to this identifier. The user may have been deleted."

export class AuthStore {
    @observable progressing: boolean = false

    @observable loading: boolean = false
    @observable auth: any = null

    @observable user: FirebaseAuthTypes.User | null = null

    @observable account: IAccountModel | null = null

    @observable currentReadBookDetails: any = null
    @observable unsubscribeCheckAddedBook: any = null
    @observable unsubscribeCheckReadBook: any = null

    accountType: any = { key: 1, text: "students" }

    @action
    clearStore = () => {
        this.progressing = false
        this.loading = false
        this.user = null
        this.account = null
    }

    // create firebase auth with social login
    @action
    onSignInWithCredential(credential: FirebaseAuthTypes.AuthCredential, callback: (user: FirebaseAuthTypes.User | null) => void) {
        this.progressing = true;
        authRef().signInWithCredential(credential).then((user) => {
            this.user = user.user
            callback(user.user)
        }).catch((error) => {
            console.log('error :>> ', error);
            this.progressing = false;
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert("BOOKIFY", `already exist`);
            }
            if (error.code === 'auth/invalid-email') {
                Alert.alert("BOOKIFY", 'That email address is invalid!');
            }
            console.log("BOOKIFY", error)
            callback(null)
        });
    }

    @action
    checkProfile(user: FirebaseAuthTypes.User, callback: (account: IAccountModel | null) => void) {
        const { uid } = user
        studentRef().doc(uid).get().then((doc) => {
            if (doc.exists) {
                // return or callback profile
                this.account = pushToObject(doc)
                callback(pushToObject(doc) as IAccountModel)
            } else {
                this.account = null
                // return or callback null for go to create account screen
                callback(null)
            }
        })
    }

    @action
    async onReadBook(book: any, author: any, callback: () => void) {
        const batch = batchRef()
        const studentKey = this.auth.uid
        const studentProfile = studentRef().doc(studentKey)
        const readBookRef = studentProfile.collection("read_books").doc(book.key)
        const isReadBook = await readBookRef.get().then()
        const bookData = {
            bookRef: bookStoreRef().doc(book.key),
            key: book.key,
            type: book.audiobook ? "audiobook" : "book",
            page_key: pageKey(),
            read_date: pageKey(),
            last_read_at: new Date(),
            author: author
        };

        if (isReadBook.exists) {
            batch.update(readBookRef, bookData)
        } else {
            batch.set(readBookRef, bookData)
        }

        batch.update(studentProfile, { current_book: book });
        batch.commit().then(() => {
            callback()
        })
    }

    @action
    canActive() {
        // flag for working one time
        let _flag = ''
        // onAuthStateChanged for checking user is already login or not
        authRef().onAuthStateChanged(user => {
            this.user = user
            if (user) {
                if (_flag !== user.uid) {
                    this.checkProfile(user, () => { })
                }
            }
            _flag = user?.uid || ""
        })
    }

    @action
    createProfile(user: FirebaseAuthTypes.User, data: any, callback: (status: boolean) => void) {
        this.loading = true
        const { uid, email, photoURL } = user
        console.log('user :>> ', user);
        const { firstName, lastName, place, gender, birthDate } = data
        const account: IAccountModel = {
            key: uid,
            createBy: uid,
            createDate: new Date(),
            updateDate: new Date(),
            updateBy: uid,
            status: ENUM_STATUS.ACTIVE,
            lastName,
            firstName,
            email,
            gender,
            dateOfBirth: birthDate,
            province: place,
            photoUrl: photoURL,
            accountType: {
                key: 1,
                text: "students"
            }
        }
        studentRef().doc(uid).set(account).then(() => {
            this.account = account
            this.loading = false
            callback(true)
        }).catch(e => {
            console.log('e :>> ', e);
            this.loading = false
            callback(false)
        })
    }

    updateProfile(user: FirebaseAuthTypes.User, data: any, callback: (status: boolean) => void) {
        this.loading = true
        const { uid } = user
        const { firstName, lastName, place, gender, birthDate } = data
        const account: IAccountModel = {
            ...this.account as IAccountModel,
            updateDate: new Date(),
            updateBy: uid,
            lastName,
            firstName,
            gender,
            dateOfBirth: birthDate,
            province: place,
        }
        studentRef().doc(uid).update(account).then(() => {
            this.account = account
            this.loading = false
            callback(true)
        }).catch(e => {
            console.log('e :>> ', e);
            this.loading = false
            callback(false)
        })
    }

    @action
    signOut() {
        authRef().signOut().then(() => {
            googleSignOut()
            this.clearStore()
        })
    }

    @observable loadingChangeProfile: boolean = false
    @action
    async onChagePhoto() {
        if (!this.account) { return }
        ImagePicker.openPicker({
            mediaType: "photo",
            compressImageQuality: 0.5,
        }).then(async (image: any) => {
            this.loadingChangeProfile = true;
            const photo = await this.uploadProfileImage("image", image.path)
            studentRef().doc(this.account?.key).update({ photoUrl: photo }).then(() => {
                this.account = {
                    ...this.account as IAccountModel,
                    photoUrl: photo
                };
                this.loadingChangeProfile = false;
                Alert.alert("Update successfully", "Your Profile has been updated successfully")
            }).catch((error: any) => {
                this.loadingChangeProfile = false;
                console.log('error', error)
            })
        }).catch((error) => {
            this.loadingChangeProfile = false;
            if (error.code === "E_PICKER_CANCELLED") {
                return
            }
            const android = "To start, head to Settings > App and find Bookify > Tap on Bookify > Tap the toggle to customize the setting."
            const ios = "To start, head to Settings > Privacy > Photos > Bookify > Check on All Photos."
            Alert.alert("Permission Denied", `${Platform.OS === "ios" ? ios : android}`)
            console.log('error', error)
        });
    }

    @action
    async uploadProfileImage(type: string, path: string) {
        const key = createId()
        const storagePath = `${type}/${key}_${pageKey()}`
        const image = await storageRef()
            .ref(storagePath)
            .putFile(path)
        const url = await storageRef().ref(storagePath).getDownloadURL()
        return url
    }
}

export default new AuthStore();