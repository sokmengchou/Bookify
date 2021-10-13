import { observable, action } from "mobx";
import { pushToArray } from "../services/mapping.service";
import { bookRef, sectionRef, genresRef, allBookRef, audioRef, categoryRef, mainBookCollectionRef, mainAudioBookCollectionRef } from '../services/data.service'
import { homeSlideRef } from "../services/data.service";

export class ExploreStore {
    @observable homeSlides: any[] = []
    @observable loadingHomeSlide: boolean = true

    @observable newAudios: any[] = []
    @observable loadingNewAudio: boolean = true

    @observable newBooks: any[] = []
    @observable loadingNewBook: boolean = true

    @observable loadingBookTopChart: boolean = true
    @observable bookTopCharts: any[] = []

    @observable loadingAudioTopChart: boolean = true
    @observable audioTopCharts: any[] = []

    @observable loadingExploreBook: boolean = true;
    @observable exploreBooks: any[] = []

    @observable bookBySearch: any[] = []
    @observable searchingBook: boolean = false
    @observable noSearchResult: boolean = false

    @observable sectionsData: any[] = []
    @observable loadingSection: boolean = true

    @observable loadingGenre: boolean = true
    @observable genreData: any[] = []

    @observable loadingCategory: boolean = true
    @observable categories: any[] = []

    @observable loadingExploreAudio: boolean = true
    @observable exploreAudios: any[] = []

    @observable loadingFullSection: boolean = true
    @observable fullSectionData: any[] = []

    @observable loadingFreeAudio: boolean = true
    @observable freeAudios: any[] = []

    @observable loadingFreeBook: boolean = true
    @observable freeBooks: any[] = []

    @observable unsubscribeFetchHomeSlide: any = null
    @observable unsubscribeFetchFreeBook: any = null
    @observable unsubscribeFetchFreeAudio: any = null
    @observable unsubscribeFetchTopChartBook: any = null
    @observable unsubscribeFetchTopChartAudio: any = null
    @observable unsubscribeFetchNewBook: any = null
    @observable unsubscribeFetchNewAudio: any = null
    @observable unsubscribeFetchExploreBook: any = null
    @observable unsubscribeFetchExploreAudio: any = null



    @action fetchfreeAudioBookExplore(accountType: string) {
        this.unsubscribeFetchFreeAudio = mainAudioBookCollectionRef("app_special_offers_and_free", accountType).limit(6).orderBy("page_key", 'desc').onSnapshot((docs) => {
            this.loadingFreeAudio = false
            this.freeAudios = pushToArray(docs)
        })
    }

    @action fetchfreeBookExplore(accountType: string) {
        this.unsubscribeFetchFreeBook = mainBookCollectionRef("app_special_offers_and_free", accountType).limit(6).orderBy("page_key", 'desc').onSnapshot((docs) => {
            this.loadingFreeBook = false
            this.freeBooks = pushToArray(docs)
        })
    }

    @action fetchHomeSlide() {
        this.unsubscribeFetchHomeSlide = homeSlideRef().onSnapshot((docs) => {
            this.homeSlides = pushToArray(docs);
            this.loadingHomeSlide = false;
        });
    }


    @action fetchTopChartBookExplore(accountType: string) {
        this.unsubscribeFetchTopChartBook = mainBookCollectionRef("app_top_charts", accountType).onSnapshot((docs) => {
            this.loadingBookTopChart = false;
            const limit = 3
            const arrayBook = (pushToArray(docs))
            this.bookTopCharts = arrayBook.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / limit)
                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []
                }
                resultArray[chunkIndex].push(item)
                return resultArray
            }, [])
        });
    }

    @action fetchTopChartAudioExplore(accountType: string) {
        this.unsubscribeFetchTopChartAudio = mainAudioBookCollectionRef("app_top_charts", accountType).onSnapshot((docs) => {
            this.loadingAudioTopChart = false;
            const limit = 3
            const arrayBook = (pushToArray(docs))
            this.audioTopCharts = arrayBook.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / limit)
                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []
                }
                resultArray[chunkIndex].push(item)
                return resultArray
            }, [])
        });
    }

    @action onSearchBook(text: string, accountType: string, type?: string) {
        var ref: any = allBookRef
        if (type === "book") {
            ref = bookRef
        }
        if (type === "audio") {
            ref = audioRef
        }
        if (text != "") {
            this.searchingBook = true;
            ref(accountType).where("keyword", ">=", text.toLocaleUpperCase()).limit(15).get().then((books: any) => {
                this.bookBySearch = pushToArray(books);
                this.searchingBook = false;
                if (this.bookBySearch.length == 0) {
                    this.noSearchResult = true
                } else {
                    this.noSearchResult = false
                }
                this.noSearchResult = false;
            }).catch((error: any) => {
                console.log('error', error)
                this.searchingBook = false
            });
        } else {
            this.bookBySearch = [];
        }
    }

    @action onClearSearchBook() {
        this.bookBySearch = []
    }

    @action fetchNewBookExplore(accountType: string) {
        this.unsubscribeFetchNewBook = mainBookCollectionRef("app_new_and_trending", accountType).limit(6).orderBy("page_key", 'desc').onSnapshot((docs) => {
            this.loadingNewBook = false
            this.newBooks = pushToArray(docs)
        });
    }

    @action fetchNewAudioExplore(accountType: string) {
        this.loadingNewAudio = true;
        this.unsubscribeFetchNewAudio = mainAudioBookCollectionRef("app_new_and_trending", accountType).limit(6).orderBy("page_key", 'desc').onSnapshot((docs) => {
            this.loadingNewAudio = false
            this.newAudios = pushToArray(docs)
        })
    }

    @action fetchExploreBookLimit(accountType: string) {
        this.unsubscribeFetchExploreBook = bookRef(accountType).limit(4).orderBy("page_key", 'desc').onSnapshot((docs) => {
            this.loadingExploreBook = false;
            this.exploreBooks = pushToArray(docs);
        })
    }


    @action fetchExploreAudioLimit(accountType: string) {
        this.unsubscribeFetchExploreAudio = audioRef(accountType).limit(4).orderBy("page_key", 'desc').onSnapshot((docs) => {
            this.loadingExploreAudio = false;
            this.exploreAudios = pushToArray(docs);
        })
    }

    @action fetchFullSection(type: string) {
        this.loadingFullSection = true;
        const ref = type === "genre" ? genresRef() : sectionRef()
        ref.get().then((docs) => {
            this.fullSectionData = pushToArray(docs);
            this.loadingFullSection = false;
        }).catch((error) => {
            this.loadingFullSection = false;
            console.log("error fetchFullSection", error)
        })
    }

    @action fetchSection() {
        this.loadingSection = true;
        sectionRef().limit(5).onSnapshot((docs) => {
            this.sectionsData = pushToArray(docs);
            // console.log('this.sectionsData :>> ', this.sectionsData);
            this.loadingSection = false;
        })
    }

    @action fetchCategory() {
        this.loadingSection = true;
        categoryRef().onSnapshot((docs) => {
            // console.log('docs :>> ', docs);
            this.categories = pushToArray(docs);
            this.loadingCategory = false;
        })
    }

    @action fetchGenre() {
        this.loadingGenre = true;
        genresRef().limit(5).onSnapshot((docs) => {
            this.genreData = pushToArray(docs);
            this.loadingGenre = false;
        })
    }
}

export default new ExploreStore();