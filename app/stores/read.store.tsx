import { action, observable } from "mobx";
import { authorRef, batchRef, bookStoreRef, incrementRef, organizationRef, studentRef } from "../services/data.service";
import { arrayKeys } from "../services/functions";
import { pageKey, pushToObject, toDateKey } from "../services/mapping.service";
import authStore from "./auth.store";
import { local_clearLastRead } from "../services/localStorage.services";


export class ReadStore {
    @observable selectedBook: any = null;

    @observable loadingGetBookData: boolean = false;
    @observable unsubscribeBookData: any = null;

    @observable startDate: any = null
    @observable stopTime: any = null

    @action startRecordTime() {
        this.startDate = new Date()
    }

    @action readDuration() {
        this.stopTime = new Date()
        const countDuration: any = Math.abs(this.stopTime - this.startDate)
        var seconds = (countDuration / 1000);
        return (seconds)
    }

    @action onSelectedBook(account: any, book: any, navigation: any) {
        this.selectedBook = book;
        const { authorKey } = book || {}
        if (!account) {
            navigation.navigate("LOGIN", { nextScreen: "BOOK_DETAIL" });
            return
        }
        navigation.navigate("BOOK_DETAIL");
        this.loadingGetBookData = true;
        this.unsubscribeBookData = studentRef().doc(account.key).collection("read_books").doc(book.key)
            .onSnapshot(async (docSnapshot) => {
                if (!docSnapshot.exists) return;
                const author = await authorRef().doc(authorKey).get()
                this.selectedBook = {
                    author: pushToObject(author),
                    ...this.selectedBook,
                    ...pushToObject(docSnapshot),
                };
                this.loadingGetBookData = false;
            });
    };

    @action
    async onReadBook(user: any, authKey: any, callback: () => void) {
        const { organizationKey, batchKey, licenceKey } = user;
        const { key, audiobook, name, bookFileDetail, audioFileDetail, authorKey, coverDownloadUrl, level, description, words, language, questions } = this.selectedBook;
        const batch = batchRef()
        const studentKey = authKey
        const studentProfile = studentRef().doc(studentKey)
        const readBookRef = studentProfile.collection("read_books").doc(key)
        const isReadBook = await readBookRef.get().then()
        const author = pushToObject(await authorRef().doc(authorKey).get());
        const bookData = {
            bookRef: bookStoreRef().doc(key),
            key: key,
            type: audiobook ? "audiobook" : "book",
            page_key: pageKey(),
            read_date: pageKey(),
            last_read_at: new Date(),
            author: {
                key: author.key,
                name: author.name,
            },
            level,
            words,
            questions
        };

        const statisticData = {
            total_audio_books: incrementRef(audiobook ? 1 : 0),
            total_books: incrementRef(!audiobook ? 1 : 0),
        };

        const currentBook = {
            key,
            name,
            bookFileDetail,
            audioFileDetail,
            authorKey,
            description,
            coverDownloadUrl,
            words,
            audiobook,
            page_key: pageKey(),
            language,
            level: {
                key: level.key,
                order: level.order,
                name: level.name,
            },
            author
        }


        if (isReadBook.exists) {
            batch.update(readBookRef, bookData)
        } else {
            if (licenceKey && batchKey && organizationKey) {
                const _organizationStatisticRef = organizationRef().doc(organizationKey).collection("students").doc(licenceKey);
                const _classStatisticRef = organizationRef().doc(organizationKey).collection("reading_batches").doc(batchKey).collection("students").doc(licenceKey);
                batch.update(_organizationStatisticRef, statisticData);
                batch.update(_classStatisticRef, statisticData);
            }
            const myBookRef = studentRef().doc(studentKey).collection("my_books").doc(key)
            const _studentStatisticRef = studentRef().doc(authKey);
            batch.update(_studentStatisticRef, statisticData);
            batch.set(readBookRef, bookData);
            batch.set(myBookRef, currentBook);
        };

        batch.update(studentProfile, { current_book: currentBook });
        batch.commit().then(() => {
            this.startRecordTime();
            callback()
        })
    }


    @action saveStudentMovementAssignment(uid: string, licenceKey: string, organizationKey: string, batchKey: string, assignment: any, _duration: number, currentAudio: any, location: any, currentPage: number, totalPage: number, book?: any, callback?: (ss: boolean) => void) {
        const bookKey = this.selectedBook?.key || book.key
        if (!this.selectedBook) {
            this.selectedBook = book;
        }
        const studentKey_bookKey = `${uid}_${bookKey}`;
        const { audiobook, author, level, words, read_percentage, all_assignmentKeys, finished, completed_date, read_duration, completed_date_key, assignment_completed_date, assignmentKey, isPassedReading } = this.selectedBook || book;
        const { startDate, endDate } = assignment || {};
        const _assignmentKey = assignment?.key || null
        const currentDate = new Date();
        const batch = batchRef();

        const duration = _duration;
        const passDuration = words / (3.9 * 2) || 0
        const percentage = currentPage / totalPage;
        const readDuration = (read_duration || 0) + duration;
        const isPassReading = readDuration >= passDuration && (percentage >= 0.9 || finished)
        const isFinishedReading = finished ? false : percentage >= 0.9
        this.selectedBook = {
            ...this.selectedBook,
            read_percentage: read_percentage >= 1 ? 1 : percentage,
            audio: currentAudio
        };

        authStore.currentReadBookDetails = this.selectedBook;

        const readBookData = {
            started_read_date: currentDate,
            created_at: currentDate,
            created_atKey: toDateKey(currentDate),
            listening_duration: audiobook ? incrementRef(duration) : incrementRef(0),
            audio: audiobook ? currentAudio || null : null,
            key: bookKey,
            bookRef: bookStoreRef().doc(bookKey),
            author: {
                name: author.name,
                key: author.key,
                ref: authorRef().doc(author.key)
            },
            type: audiobook ? "audiobook" : "book",
            level: {
                name: level.name,
                key: level.key,
                order: level.order,
            },
            batchKey: batchKey,
            studentKey: uid,
            bookKey: bookKey,
            page_key: pageKey(),
            last_read_at: new Date(),
            location: location,
            read_duration: incrementRef(duration),
            words: words,

            read_percentage: read_percentage >= 1 ? 1 : percentage,
            completed_date: completed_date || isFinishedReading ? currentDate : null,
            completed_date_key: completed_date_key || isFinishedReading ? toDateKey(currentDate) : null,
            finished: finished || isFinishedReading || percentage >= 1,

            passDuration: passDuration,
            assignmentKey: assignment_completed_date ? assignmentKey : _assignmentKey,
            isPassedReading: isPassedReading || isPassReading,

            assignment_startDate: assignment_completed_date ? this.selectedBook.assignment_startDate : startDate ? startDate.toDate() : null,
            assignment_endDate: assignment_completed_date ? this.selectedBook.assignment_endDate : endDate ? endDate.toDate() : null,
            all_assignmentKeys: _assignmentKey ? arrayKeys(_assignmentKey, all_assignmentKeys || []) : all_assignmentKeys && all_assignmentKeys || []
        };


        const _studentRef = studentRef().doc(uid).collection("read_books").doc(bookKey);
        const _organizationRef = organizationRef().doc(organizationKey).collection("reading_audit").doc(studentKey_bookKey);
        const _classRef = organizationRef().doc(organizationKey).collection("reading_batches").doc(batchKey).collection("reading_audit").doc(studentKey_bookKey);

        batch.set(_studentRef, readBookData, { merge: true });
        batch.set(_organizationRef, readBookData, { merge: true });
        batch.set(_classRef, readBookData, { merge: true });

        ///STATISTIC
        const statisticData = {
            read_duration: incrementRef(duration),
            listen_duration: audiobook ? incrementRef(duration) : incrementRef(0),
            book_completed: !audiobook && isFinishedReading ? incrementRef(finished ? 0 : 1) : incrementRef(0),
            audiobook_completed: audiobook && isFinishedReading ? incrementRef(finished ? 0 : 1) : incrementRef(0),
            word_reads: isFinishedReading ? incrementRef(finished ? 0 : words) : incrementRef(0)
        };

        const _studentStatisticRef = studentRef().doc(uid);
        const _organizationStatisticRef = organizationRef().doc(organizationKey).collection("students").doc(licenceKey);
        const _classStatisticRef = organizationRef().doc(organizationKey).collection("reading_batches").doc(batchKey).collection("students").doc(licenceKey);
        batch.update(_studentStatisticRef, statisticData);
        batch.update(_organizationStatisticRef, statisticData);
        batch.update(_classStatisticRef, statisticData);
        batch.commit().then(() => {
            local_clearLastRead();
            callback && callback(true)
        }).catch(error => console.log('error', error));
    };

    @action saveStudentMovement(uid: string, licenceKey: string, organizationKey: string, batchKey: string, _duration: number, currentAudio: any, location: any, currentPage: number, totalPage: number, book?: any, callback?: (ss: boolean) => void) {
        const bookKey = this.selectedBook?.key || book.key
        if (!this.selectedBook) {
            this.selectedBook = book;
        }
        const studentKey_bookKey = `${uid}_${bookKey}`;
        const { audiobook, author, level, words, read_percentage, finished, completed_date, read_duration, completed_date_key, isPassedReading } = this.selectedBook || book;
        const currentDate = new Date();
        const batch = batchRef();

        const duration = _duration;
        const passDuration = words / (3.9 * 2) || 0
        const percentage = currentPage / totalPage;
        const readDuration = (read_duration || 0) + duration;
        const isPassReading = readDuration >= passDuration && (percentage >= 0.9 || finished)
        const isFinishedReading = finished ? false : percentage >= 0.9

        this.selectedBook = {
            ...this.selectedBook,
            read_percentage: read_percentage >= 1 ? 1 : percentage,
            audio: currentAudio
        };

        authStore.currentReadBookDetails = this.selectedBook;


        const readBookData = {
            started_read_date: currentDate,
            created_at: currentDate,
            created_atKey: toDateKey(currentDate),
            listening_duration: audiobook ? incrementRef(duration) : incrementRef(0),
            audio: audiobook ? currentAudio : null,
            key: bookKey,
            bookRef: bookStoreRef().doc(bookKey),
            author: {
                name: author.name,
                key: author.key,
                ref: authorRef().doc(author.key)
            },
            type: audiobook ? "audiobook" : "book",
            level: {
                name: level.name,
                key: level.key,
                order: level.order,
            },
            batchKey: batchKey,
            studentKey: uid,
            bookKey: bookKey,
            page_key: pageKey(),
            last_read_at: new Date(),
            location: location,
            read_duration: incrementRef(duration),
            words: words,

            read_percentage: read_percentage >= 1 ? 1 : percentage,
            completed_date: completed_date || isFinishedReading ? currentDate : null,
            completed_date_key: completed_date_key || isFinishedReading ? toDateKey(currentDate) : null,
            finished: finished || isFinishedReading || percentage >= 1,

            passDuration: passDuration,
            isPassedReading: isPassedReading || isPassReading,
        };


        const _studentRef = studentRef().doc(uid).collection("read_books").doc(bookKey);
        const _organizationRef = organizationRef().doc(organizationKey).collection("reading_audit").doc(studentKey_bookKey);
        const _classRef = organizationRef().doc(organizationKey).collection("reading_batches").doc(batchKey).collection("reading_audit").doc(studentKey_bookKey);

        batch.set(_studentRef, readBookData, { merge: true });
        batch.set(_organizationRef, readBookData, { merge: true });
        batch.set(_classRef, readBookData, { merge: true });

        ///STATISTIC
        const statisticData = {
            read_duration: incrementRef(duration),
            listen_duration: audiobook ? incrementRef(duration) : incrementRef(0),
            book_completed: !audiobook && isFinishedReading ? incrementRef(finished ? 0 : 1) : incrementRef(0),
            audiobook_completed: audiobook && isFinishedReading ? incrementRef(finished ? 0 : 1) : incrementRef(0),
            word_reads: isFinishedReading ? incrementRef(finished ? 0 : words) : incrementRef(0)
        };

        const _studentStatisticRef = studentRef().doc(uid);
        const _organizationStatisticRef = organizationRef().doc(organizationKey).collection("students").doc(licenceKey);
        const _classStatisticRef = organizationRef().doc(organizationKey).collection("reading_batches").doc(batchKey).collection("students").doc(licenceKey);
        batch.update(_studentStatisticRef, statisticData);
        batch.update(_organizationStatisticRef, statisticData);
        batch.update(_classStatisticRef, statisticData);
        batch.commit().then(() => {
            local_clearLastRead();
            callback && callback(true)
        }).catch(error => console.log('error', error));
    };

    @action saveMovement(uid: string, _duration: number, currentAudio: any, location: any, currentPage: number, totalPage: number, book?: any, callback?: (ss: boolean) => void) {
        const bookKey = this.selectedBook?.key || book.key
        if (!this.selectedBook) {
            this.selectedBook = book;
        }
        const { audiobook, author, level, words, read_percentage, finished, completed_date, read_duration, completed_date_key, isPassedReading } = this.selectedBook || book;
        const currentDate = new Date();
        const batch = batchRef();

        const duration = _duration;
        const passDuration = words / (3.9 * 2) || 0
        const percentage = currentPage / totalPage;
        const readDuration = (read_duration || 0) + duration;
        const isPassReading = readDuration >= passDuration && (percentage >= 0.9 || finished)
        const isFinishedReading = finished ? false : percentage >= 0.9

        this.selectedBook = {
            ...this.selectedBook,
            read_percentage: read_percentage >= 1 ? 1 : percentage,
            audio: currentAudio
        };

        authStore.currentReadBookDetails = this.selectedBook;

        const readBookData = {
            started_read_date: currentDate,
            created_at: currentDate,
            created_atKey: toDateKey(currentDate),
            listening_duration: audiobook ? incrementRef(duration) : incrementRef(0),
            audio: audiobook ? currentAudio : null,
            key: bookKey,
            bookRef: bookStoreRef().doc(bookKey),
            author: {
                name: author.name,
                key: author.key,
                ref: authorRef().doc(author.key)
            },
            type: audiobook ? "audiobook" : "book",
            level: {
                name: level.name,
                key: level.key,
                order: level.order,
            },
            studentKey: uid,
            bookKey: bookKey,
            page_key: pageKey(),
            last_read_at: new Date(),
            location: location,
            read_duration: incrementRef(duration),
            words: words,

            read_percentage: read_percentage >= 1 ? 1 : percentage,
            completed_date: completed_date || isFinishedReading ? currentDate : null,
            completed_date_key: completed_date_key || isFinishedReading ? toDateKey(currentDate) : null,
            finished: finished || isFinishedReading || percentage >= 1,

            passDuration: passDuration,
            isPassedReading: isPassedReading || isPassReading,
        };

        const _studentRef = studentRef().doc(uid).collection("read_books").doc(bookKey);

        batch.set(_studentRef, readBookData, { merge: true });

        ///STATISTIC
        const statisticData = {
            read_duration: incrementRef(duration),
            listen_duration: audiobook ? incrementRef(duration) : incrementRef(0),
            book_completed: !audiobook && isFinishedReading ? incrementRef(finished ? 0 : 1) : incrementRef(0),
            audiobook_completed: audiobook && isFinishedReading ? incrementRef(finished ? 0 : 1) : incrementRef(0),
            word_reads: isFinishedReading ? incrementRef(finished ? 0 : words) : incrementRef(0)
        };

        const _studentStatisticRef = studentRef().doc(uid);

        batch.update(_studentStatisticRef, statisticData);
        batch.commit().then(() => {
            local_clearLastRead();
            callback && callback(true)
        }).catch(error => console.log('error', error));
    };

};

export default new ReadStore();
