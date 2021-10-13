import { action } from "mobx"
import { Alert } from "react-native"
import { geoDataRef } from "./data.service"
import { pushToArray } from "./mapping.service"


class EnvironmentStore {
    @action fetchGeoData(
        collectionName: string | null,
        requiredField: string | null,
        requireKey: string | null,
        callback: (data: any[]) => void,
    ) {
        geoDataRef(collectionName || '', requiredField, requireKey)
            .orderBy('id')
            .get()
            .then((docs: any) => {
                callback(pushToArray(docs))
            })
            .catch((error: any) => {
                console.log(`error`, error.message)
                Alert.alert('Error', error.message)
            })
    }
}

export default EnvironmentStore
