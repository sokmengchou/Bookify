import { action, observable } from 'mobx'
import { pushToArray } from '../services/mapping.service'
import { audioFeatureRef, audioRef, mainAudioBookCollectionRef } from '../services/data.service';
export class AudioStore {

    @observable loadingFeature: boolean = true;
    @observable features: any[] = []

    @observable audioTopChart: any[] = []
    @observable loadingTopChart: boolean = true

    @observable loadingFetchNewAudio: boolean = true
    @observable newAudios: any[] = []

    @observable loadingExploreAudio: boolean = true
    @observable exploreAudios: any[] = []

    @observable loadingFree: boolean = true
    @observable freeAudios: any[] = []

    @action fetchFeatures() {
        this.loadingFeature = true;
        let unsubscribe = audioFeatureRef().onSnapshot((docs) => {
            this.features = pushToArray(docs)
            this.loadingFeature = false;
        })
    }


    @action fetchTopChartAudioExplore(accountType: string) {
        let unsubscribe = mainAudioBookCollectionRef("app_top_charts", accountType).onSnapshot((docs) => {
            this.loadingTopChart = false;
            const limit = 3
            const arrayBook = (pushToArray(docs))
            this.audioTopChart = arrayBook.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / limit)
                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []
                }
                resultArray[chunkIndex].push(item)
                return resultArray
            }, [])
        })
    }

    @action fetchNewAudioExplore(accountType: any) {
        let unsubscribe = mainAudioBookCollectionRef("app_new_and_trending", accountType).limit(6).orderBy("page_key", 'desc').onSnapshot((docs) => {
            this.loadingFetchNewAudio = false
            this.newAudios = pushToArray(docs)
        })
    }



    @action fetchExploreAudioLimit(accountType: string) {
        let unsubscribe = audioRef(accountType).limit(4).orderBy("page_key", "desc").onSnapshot((docs) => {
            this.loadingExploreAudio = false;
            this.exploreAudios = pushToArray(docs);
        })
    }

    @action fetchfreeBookExplore(accountType: string) {
        // console.log('accountType :>> ', accountType);
        let unsubscribe = mainAudioBookCollectionRef("app_special_offers_and_free", accountType).limit(6).orderBy("page_key", "desc").onSnapshot((docs) => {
            // console.log(`docs`, docs)
            this.loadingFree = false
            this.freeAudios = pushToArray(docs)
        })
    }
}

export default new AudioStore();