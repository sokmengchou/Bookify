// import firebase from 'react-native-firebase'

import { firebase } from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage'

const db = firebase.firestore();
export function batchRef() {
    return (
        db.batch()
    )
}

export function geoDataRef(collectionName: string, requiredField: string | null, requireKey: string | null): any {
    let ref: any = db.collection(collectionName)
    if (requiredField && requireKey) {
        ref = ref.where(requiredField, "==", requireKey)
    }
    return (ref)
}

export function createId() {
    const id = db.collection('invoices').doc().id;
    return id;
}

export function incrementRef(amount: number) {
    return (firebase.firestore.FieldValue.increment(amount))
}

export function storageRef() {
    return storage()
}

export function sysRef() {
    return db.collection('sys_apps').doc('reading_app')
}

export function authRef() {
    return (firebase.auth())
}

export function studentRef() {
    return (db.collection("students"))
}

export function levelRef() {
    return (db.collection("reading_level"))
}


export function homeSlideRef() {
    return db.collection("app_slides").orderBy("updated_at").limit(5)
}

export function bookFeatureRef() {
    return (db.collection("app_slides").where("sourceReading", "==", false))
}

export function audioFeatureRef() {
    return (db.collection("app_slides").where("sourceReading", "==", true))
}



export function bookRef(accountType: any) {
    if (accountType && accountType.key >= 1) {
        return (db.collection("book_store_books")
            .where("audiobook", "==", false))
    } else {
        return (
            db.collection("book_store_books")
                .where("audiobook", "==", false)
                .where("priceOption.key", "==", 2)
                .where("copyright", "==", false)
        )
    }
}


export function audioRef(accountType: any) {
    if (accountType && accountType.key >= 1) {
        return (db.collection("book_store_books")
            .where("audiobook", "==", true))
    } else {
        return (
            db.collection("book_store_books")
                .where("audiobook", "==", true)
                .where("priceOption.key", "==", 2)
                .where("copyright", "==", false))
    }
}

export function allBookRef(accountType: any) {
    if (accountType && accountType.key >= 1) {
        return (db.collection("book_store_books"))
    } else {
        return (
            db.collection("book_store_books")
                .where("priceOption.key", "==", 2)
                .where("copyright", "==", false))
    }
}

export function bookStoreRef() {
    return (
        db.collection("book_store_books")
    )
}


export function mainBookCollectionRef(collectionName: string, accountType: any) {
    if (accountType && accountType.key >= 1) {
        return (db.collection(collectionName)
            .where("isBook", "==", true))
    } else {
        return (db.collection(collectionName)
            .where("isBook", "==", true)
            .where("priceOption.key", "==", 2)
            .where("copyright", "==", false)
        )
    }
}


export function mainAudioBookCollectionRef(collectionName: string, accountType: any) {
    if (accountType && accountType.key >= 1) {
        return (db.collection(collectionName)
            .where("isBook", "==", false))
    } else {
        return (db.collection(collectionName)
            .where("isBook", "==", false)
            .where("priceOption.key", "==", 2)
            .where("copyright", "==", false)
        )
    }
}


export function audioWeLoveRef() {
    return (db.collection("books_we_love")
        .where("isBook", "==", false))
}


export function sectionRef() {
    return (db.collection("book_store_sections").orderBy("name"))
}

export function genresRef() {
    return (db.collection("book_store_genres").orderBy("name"))
}

export function authorRef() {
    return (db.collection("book_store_authors"))
}

export function categoryRef() {
    return (db.collection("app_categories").orderBy("name"))
}
export function organizationRef() {
    return (db.collection("organizations"))
}

export function readingBatchRef() {
    return (db.collection("reading_batches"))
}

export function readingBatchRequest() {
    return (db.collection("reading_batch_requests"))
}
