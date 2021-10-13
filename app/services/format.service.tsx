import moment from 'moment';
import { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type ImageSizeType = '200' | '400' | '680' | '720' | '1024' | '1280' | '1920'

export function TransformImage(storagePath: string, size: ImageSizeType) {
	return new Promise<string>((resolve, reject) => {
		if (!storagePath) reject()
		const imgname = storagePath.split('/').pop()?.split('.').slice(0, -1).join('.')
		const path = storagePath.split('/').slice(0, -1).join('/')
		const ext = storagePath.split('.').pop();
		const name = imgname + '_' + `${size}x${size}` + '.' + ext
		const ref = firebase.storage().ref(`${path + "/thumbs/" + name}`)
		ref.getDownloadURL().then(url => {
			resolve(url)
		}).catch(e => reject(e))
	})
}

export function toMidDate(date: Date) {
	return moment(date || new Date()).format('MMM Do YYYY');
}

export function toDateCalendar(date: any) {
	return moment(date, 'YYYY-MM-DD').toDate();
}
