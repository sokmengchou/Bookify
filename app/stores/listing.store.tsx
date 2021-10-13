import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { action } from "mobx"
import { batchRef, studentRef } from "services/data.service";
import { pageKeyMS } from "services/mapping.service";
import { IBookModel } from "./model/book.model";

export class ListingStore {
    @action
    onLikePost(book: IBookModel, user: FirebaseAuthTypes.User) {
        studentRef().doc(user.uid).collection('like_data').doc(book.key).set(book).catch(e => {
            console.log("like book failed", e)
        })
    }

    @action
    onUnLikePost(book: IBookModel, user: FirebaseAuthTypes.User) {
        studentRef().doc(user.uid).collection('like_data').doc(book.key).delete().catch(e => {
            console.log("unlike book failed", e)
        })
    }

    @action
    onAddToHistory(book: IBookModel, user: FirebaseAuthTypes.User) {
        studentRef().doc(user.uid).collection('history').doc(book.key).set({...book,page_key:pageKeyMS()}).catch(e => {
            console.log("add book to history failed", e)
        })
    }
}


export default new ListingStore();