import AsyncStorage from "@react-native-community/async-storage";
import { LOCAL_STORAGE } from "../dummy/localStorage";
import { bookRef, bookStoreRef } from "./data.service";

interface ILocalBook {
    currentPage: any
    totalPage:any
    book: any
    location: any
    duration:any
    audio:any
}

export function local_getLastRead(callback: (data: ILocalBook) => void) {
    AsyncStorage.getItem(LOCAL_STORAGE.LAST_READ_BOOK).then(doc => doc && callback(JSON.parse(doc)))
}

export function local_setLastRead(book: any, audio: any ,currentPage: number, totalPage:number ,location: any, duration: number,) {
    const data: ILocalBook = {
        currentPage,
        totalPage,
        book: book,
        location: location,
        duration:duration,
        audio:audio
    };
    const stringData = JSON.stringify(data);
    AsyncStorage.setItem(LOCAL_STORAGE.LAST_READ_BOOK, stringData);
}

export function local_clearLastRead(){
    AsyncStorage.removeItem(LOCAL_STORAGE.LAST_READ_BOOK)
}