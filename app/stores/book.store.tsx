import { action, observable } from 'mobx'
import { pushToArray } from '../services/mapping.service'
import { bookRef, bookFeatureRef, audioRef, studentRef, mainBookCollectionRef, mainAudioBookCollectionRef, bookStoreRef } from '../services/data.service'
import { Alert } from 'react-native'

export class BookStore {

    @observable quizCompleted: boolean = false
    @observable loadingQuiz: boolean = true
    @observable quiz: any

    @observable selectedBook: any = null

    @observable loadingFeature: boolean = true;
    @observable features: any[] = []

    @observable newBooks: any[] = []
    @observable loadingFetchNewBook: boolean = true

    @observable listBooks: any[] = []
    @observable numberOfReadBook: number = 0
    @observable loadingListBook: boolean = true

    @observable booksTopChart: any[] = []
    @observable loadingTopChart: boolean = true

    @observable loadingExploreBook: boolean = true
    @observable exploreBooks: any[] = []

    @observable loadingFree: boolean = true
    @observable freeBooks: any[] = []

    @observable unsubscribeFetchHistoryBook: any = null
    @observable unsubscribeFetchMyBook: any = null
    @observable unsubscribeFetchHistoryAudio: any = null
    @observable unSubscribeFetchMyAudio: any = null
    @observable unSubscribeFetchTopChartBookExplore: any = null
    @observable unsubscribeFetchExploreBookLimi: any = null
    @observable unsubscribeFetchfreeBookExplore: any = null
    @observable unSubscribefetchNewBookExplore: any = null
    @observable unsubscribeFetchListBook: any = null
    @observable unsubscribeFetchListAudio: any = null
    @observable unsubscribeFetchAudioWeLove: any = null
    @observable unsubscribeFetchTopChartBooks: any = null
    @observable unsubscribeFetchTopChartAudio: any = null
    @observable unsubscribeFetchExploreBooks: any = null
    @observable unsubscribeFetchExploreAudio: any = null
    @observable unsubscribeFetchNewTrendingBooks: any = null
    @observable unsubscribeFetchNewTrendingAudio: any = null
    @observable unsubscribeFetchFreeBooks: any = null
    @observable unsubscribeFetchFreeAudio: any = null
    @observable unsubscribeFetchNewBooks: any = null
    @observable unsubscribeFetchFeatures: any = null
    @observable unsubscribeFetchBooksByGenre: any = null


    @observable refreshingListBook: boolean = false
    @observable fetchMoreListBookLoading: boolean = false

    PAGE_SIZE: any = 16
    lastVisibleListBook: any = null;

    @action fetchHistoryBook(isRefreshing: boolean, uid: string) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        const ref = studentRef().doc(uid).collection("read_books").where("type", "==", "book");
        ref.orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books);
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1]
            } else {
                this.lastVisibleListBook = null
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
        })
    }

    @action fetchMoreHistoryBook(uid: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        const ref = studentRef().doc(uid).collection("read_books").where("type", "==", "book");
        ref.orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }


    @action fetchMoreMyBook(uid: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        const ref = studentRef().doc(uid).collection("my_books").where("audiobook", "==", false);
        ref.orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }



    @action fetchMyBook(isRefreshing: boolean, uid: string) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        console.log('studentRef().doc(uid).collection("my_books")', studentRef().doc(uid).collection("my_books"))
        const ref = studentRef().doc(uid).collection("my_books").where("audiobook", "==", false);
        ref.orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books);
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1]
            } else {
                this.lastVisibleListBook = null
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
        })
    }

    @action fetchHistoryAudio(isRefreshing: boolean, uid: string) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        const ref = studentRef().doc(uid).collection("history").where("audiobook", "==", true);
        ref.orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            console.log(`book`, books)
            this.listBooks = pushToArray(books);
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1]
            } else {
                this.lastVisibleListBook = null
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
        })
    }

    @action fetchAmountOfReadBook(isRefreshing: boolean, uid: string) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        const ref = studentRef().doc(uid).collection("history").where("audiobook", "==", true);
        ref.orderBy("page_key", "desc").get().then((books) => {

            this.numberOfReadBook = books._docs.length || 0

            this.loadingListBook = false;
            this.refreshingListBook = false;
        })
    }

    @action fetchMyAudio(isRefreshing: boolean, uid: string) {
        console.log('uid :>> ', uid);
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        const ref = studentRef().doc(uid).collection("like_data").where("audiobook", "==", true);
        ref.orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books);
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1]
            } else {
                this.lastVisibleListBook = null
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
        })
    }

    @action fetchMoreHistoryAudio(uid: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        const ref = studentRef().doc(uid).collection("read_books").where("type", "==", "audiobook");
        ref.orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }

    @action fetchMoreMyAudio(uid: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        const ref = studentRef().doc(uid).collection("my_books").where("audiobook", "==", true);
        ref.orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }






    @action fetchTopChartBookExplore(accountType: string) {
        this.unSubscribeFetchTopChartBookExplore && this.unSubscribeFetchTopChartBookExplore();
        this.unSubscribeFetchTopChartBookExplore = mainBookCollectionRef("app_top_charts", accountType).onSnapshot((docs) => {
            this.loadingTopChart = false;
            const limit = 3
            const arrayBook = (pushToArray(docs))
            this.booksTopChart = arrayBook.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / limit)
                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []
                }
                resultArray[chunkIndex].push(item)
                return resultArray
            }, [])
        })
    }

    @action fetchExploreBookLimit(accountType: string) {
        this.unsubscribeFetchExploreBookLimi && this.unsubscribeFetchExploreBookLimi();
        this.unsubscribeFetchExploreBookLimi = bookRef(accountType).limit(4).orderBy("page_key", "desc").onSnapshot((docs) => {
            this.loadingExploreBook = false;
            this.exploreBooks = pushToArray(docs);
        })
    }

    @action fetchfreeBookExplore(accountType: string) {
        this.unsubscribeFetchfreeBookExplore && this.unsubscribeFetchfreeBookExplore();
        this.unsubscribeFetchfreeBookExplore = mainBookCollectionRef("app_special_offers_and_free", accountType).limit(6).orderBy("page_key", "desc").onSnapshot((docs) => {
            this.loadingFree = false
            this.freeBooks = pushToArray(docs)
        })
    }


    @action fetchNewBookExplore(accountType: string) {
        this.unSubscribefetchNewBookExplore && this.unSubscribefetchNewBookExplore();
        this.unSubscribefetchNewBookExplore = mainBookCollectionRef("app_new_and_trending", accountType).limit(6).orderBy("page_key", "desc").onSnapshot((docs) => {
            this.loadingFetchNewBook = false
            this.newBooks = pushToArray(docs)
        })
    }


    @action fetchListBook(sectionKey: string, accountType: any, isRefreshing: boolean, callback: (success: boolean) => void) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        bookRef(accountType).where("sectionKey", "array-contains", sectionKey).orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books)
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false);
        }).catch(error => {
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false)
            console.log('error fetchListBook or fetchRefreshListBook', error);
        })
    }

    @action fetchBookByLevel(sectionKey: string, onlyAudio: boolean, isRefreshing: boolean, callback: (success: boolean) => void) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }

        const ref = onlyAudio ? bookStoreRef().where("audiobook", "==", true) : bookStoreRef()
        ref.where("level.key", "==", sectionKey).orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books)
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false);
        }).catch(error => {
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false)
            console.log('error fetchListBook or fetchRefreshListBook', error);
        })
    }



    @action fetchMoreListBook(sectionKey: string, accountType: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        bookRef(accountType).where("sectionKey", "array-contains", sectionKey).orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }

    @action fetchMoreBookByLevel(sectionKey: string, onlyAudio: boolean, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        const ref = onlyAudio ? bookStoreRef().where("audiobook", "==", true) : bookStoreRef()
        ref.where("level.key", "==", sectionKey).orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }

    @action fetchListAudio(sectionKey: string, accountType: string, isRefreshing: boolean, callback: (success: boolean) => void) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        audioRef(accountType).where("sectionKey", "array-contains", sectionKey).orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books)
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false);
        }).catch(error => {
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false)
            console.log('error fetchListBook or fetchRefreshListBook', error);
        })
    }


    @action fetchMoreListAudioBook(sectionKey: string, accountType: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        audioRef(accountType).where("sectionKey", "array-contains", sectionKey).orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }


    @action fetchBookMainCollection(collectionName: string, isRefreshing: Boolean, accountType: string, callback: (success: boolean) => void) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        mainBookCollectionRef(collectionName, accountType).orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books)
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false);
        }).catch(error => {
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false)
            console.log('error fetchBookMainCollection or fetchRefreshListBook', error);
        })
    }

    @action fetchMoreBookMainCollection(collectionName: string, accountType: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        mainBookCollectionRef(collectionName, accountType).orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }

    @action fetchAudioBookMainCollection(collectionName: string, isRefreshing: Boolean, accountType: string, callback: (success: boolean) => void) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        mainAudioBookCollectionRef(collectionName, accountType).orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books)
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false);
        }).catch(error => {
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false)
            console.log('error fetchAudioBookMainCollection or fetchRefreshListBook', error);
        })
    }

    @action fetchMoreAudioBookMainCollection(collectionName: string, accountType: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        mainAudioBookCollectionRef(collectionName, accountType).orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("fetchMoreAudioBookMainCollection Error", error);
            callback(false)
        })
    }

    @action fetchBooksByGenre(genreKey: string, accountType: string, isRefreshing: boolean, callback: (success: boolean) => void) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        bookRef(accountType).where("genresKey", "==", genreKey).orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books)
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false);
        }).catch(error => {
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false)
            console.log('error fetchBooksByGenre or fetchRefreshListBook', error);
        })
    }

    @action fetchMoreListBookByGenre(genreKey: string, accountType: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        bookRef(accountType).where("genresKey", "==", genreKey).orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }

    @action fetchAudioBooksByGenre(genreKey: string, accountType: string, isRefreshing: boolean, callback: (success: boolean) => void) {
        this.loadingListBook = isRefreshing ? false : true;
        this.refreshingListBook = isRefreshing ? true : false;
        if (!isRefreshing) {
            this.listBooks = [];
        }
        audioRef(accountType).where("genresKey", "==", genreKey).orderBy("page_key", "desc").limit(this.PAGE_SIZE).get().then((books) => {
            this.listBooks = pushToArray(books)
            console.log(books.size)
            if (books.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[books.size - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false);
        }).catch(error => {
            this.loadingListBook = false;
            this.refreshingListBook = false;
            callback(false)
            console.log('error fetchAudioBooksByGenre or fetchRefreshListBook', error);
        })
    }

    @action fetchMoreAudioBookByGenre(genreKey: string, accountType: string, callback: (success: boolean) => void) {
        if (!this.lastVisibleListBook || this.fetchMoreListBookLoading || this.refreshingListBook || this.loadingListBook) return;
        const { page_key } = this.lastVisibleListBook;
        this.fetchMoreListBookLoading = true;
        audioRef(accountType).where("genresKey", "==", genreKey).orderBy("page_key", "desc").startAfter(page_key).limit(this.PAGE_SIZE).get().then(snapshot => {
            this.listBooks = this.listBooks.concat(pushToArray(snapshot));
            if (snapshot.size >= this.PAGE_SIZE) {
                this.lastVisibleListBook = this.listBooks[this.listBooks.length - 1];
            }
            else {
                this.lastVisibleListBook = null;
            }
            this.fetchMoreListBookLoading = false;
            callback(true)
        }).catch(error => {
            Alert.alert("Error", error);
            callback(false)
        })
    }


    @action clearListBook() {
        this.listBooks = [];
    }

    @action fetchNewBooks(accountType: string) {
        this.loadingFetchNewBook = true;
        this.unsubscribeFetchNewBooks && this.unsubscribeFetchNewBooks();
        this.unsubscribeFetchNewBooks = bookRef(accountType).orderBy("page_key", "desc").onSnapshot((books) => {
            this.newBooks = pushToArray(books);
            this.loadingFetchNewBook = false;
        })
    }

    @action
    fetchBookQuiz(selectedBook: any, callback: (activity: any) => void) {
        this.loadingQuiz = true
        const { readingBookRef } = selectedBook
        readingBookRef.collection('reading_exercises').limit(1).get().then((docs: any) => {
            const quiz = pushToArray(docs)[0]
            this.quiz = quiz
            const { questions } = this.quiz
            callback(questions)
            this.loadingQuiz = false
        }).catch((err: any) => {
            console.log(err);
            callback(null)
            this.loadingQuiz = false;
        });
    }



    @action fetchSelectedBookAuthor(authorRef: any, completion: (doc: any) => void) {
        authorRef.get().then((doc: any) => {
            completion(doc.data());
        });
    }


    @action
    onBookSelected(book: any, navigation: any) {
        this.selectedBook = book;
        navigation.navigate("BOOK_DETAIL")
    }

    @action
    onQuiz(book: any, navigation: any) {
        this.selectedBook = book;
        navigation.navigate("QUIZ")
    }

    @action fetchFeatures() {
        this.loadingFeature = true;
        this.unsubscribeFetchFeatures && this.unsubscribeFetchFeatures();
        this.unsubscribeFetchFeatures = bookFeatureRef().onSnapshot((docs) => {
            this.features = pushToArray(docs)
            this.loadingFeature = false;
        })
    }
}

export default new BookStore();