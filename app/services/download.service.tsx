import RNFetchBlob from "rn-fetch-blob";

const { fs } = RNFetchBlob

const Dirs = RNFetchBlob.fs.dirs


export const bookDirectory = "booksDownloaded"
export const audioDirectory = "audiosDownloaded"

export const BOOK_PATH = `${Dirs.DocumentDir}/${bookDirectory}`
export const AUDIO_PATH = `${Dirs.DocumentDir}/${audioDirectory}`



const PATH_BOOK = (fileName: string) => {
    const extension = splitExtension(fileName)
    return (`${Dirs.DocumentDir}/${bookDirectory}/${removeSpecialStrAdd_(removeSpace(fileName))}${extension}`)
}

const PATH_AUDIO = (fileName: string,key:string) => {
    const extension = splitExtension(fileName)
    return (`${RNFetchBlob.fs.dirs.DocumentDir}/${audioDirectory}/${key}${removeSpecialStrAdd_(removeSpace(fileName))}${extension}`)
}

export function checkBookFileExist(filename: string, callback: (path: string) => void) {
    const filePath = PATH_BOOK(filename)
    RNFetchBlob.fs.exists(filePath).then(exist => {
        callback(exist ? filePath : "")
    })
}

export function checkAudioFileExist(filename: string, key:string ,callback: (path: string) => void) {
    const filePath = PATH_AUDIO(filename,key)
    RNFetchBlob.fs.exists(filePath).then(exist => {
        callback(exist ? filePath : "")
    });
}

export function splitExtension(fileName: string) {
    if (!fileName) return '';
    const fileExtension = `${fileName}`.split('.');
    return `.${fileExtension[fileExtension.length - 1]}`;
}

export function removeSpecialStrAdd_(str: string) {
    if (!str) return ''
    return str.replace(/[^a-zA-Z0-9]/g, '-')
}

export function removeSpace(str: string) {
    if (!str) return ''
    return str.replace(/\s+/g, '-');
}

export async function checkExistTempFile(filePath: string) {
    const tmpPath = `${filePath}.download`
    return fs.exists(tmpPath).then(async ext => {
        if (ext) {
            return fs.stat(tmpPath);
        }
        return Promise.resolve({ size: 0 })
    })
}

export function downloadAudio(
    downloadUrl: string,
    filename: string,
    key:string,
    progressTask?: (received: number, total: number) => void,
    doneTask?: (path: string) => void,
) {
    const filePath = PATH_AUDIO(filename,key)
    const tmpPath = `${filePath}.download`
    return RNFetchBlob.fs.exists(filePath).then((exists) => {
        if (exists) {
            progressTask ? progressTask(100, 100) : null
            doneTask ? doneTask(filePath) : null
            return
        }
        checkExistTempFile(filePath).then(stat => {
            RNFetchBlob.config({
                IOSBackgroundTask: true, // required for both upload
                path: tmpPath,
                fileCache: true
            }).fetch('GET', downloadUrl, {
                Range: `bytes=${stat.size}-`
            }).progress((received, total) => {
                progressTask ? progressTask(received, total) : null
            }).then(file => {
                if (file) {
                    fs.appendFile(filePath, file.path(), 'uri').then(() => {
                        fs.unlink(tmpPath).then(() => {
                            doneTask ? doneTask(filePath) : null
                        })
                    })
                }
            })
        })
    })
}

export function downloadBook(
    downloadUrl: string,
    filename: string,
    progressTask?: (received: number, total: number) => void,
    doneTask?: (path: string) => void,
) {
    const filePath = PATH_BOOK(filename)
    const tmpPath = `${filePath}.download`
    return RNFetchBlob.fs.exists(filePath).then((exists) => {
        if (exists) {
            progressTask ? progressTask(100, 100) : null
            doneTask ? doneTask(filePath) : null
            return
        }
        checkExistTempFile(filePath).then(stat => {
            RNFetchBlob.config({
                IOSBackgroundTask: true, // required for both upload
                path: tmpPath,
                fileCache: true
            }).fetch('GET', downloadUrl, {
                Range: `bytes=${stat.size}-`
            }).progress((received, total) => {
                progressTask ? progressTask(received, total) : null
            }).then(file => {
                if (file) {
                    fs.appendFile(filePath, file.path(), 'uri').then(() => {
                        fs.unlink(tmpPath).then(() => {
                            doneTask ? doneTask(filePath) : null
                        })
                    })
                }
            })
        })
    })
}

export async function removeBookFile(filename: string, callback: (success: boolean) => void) {
    RNFetchBlob.fs.unlink(PATH_BOOK(filename))
        .then(() => callback(true))
        .catch((err) => { console.log("error removeBook", err), callback(false) })
}

export async function removeAudioFile(filename: string,key:string, callback: (success: boolean) => void) {
    RNFetchBlob.fs.unlink(PATH_AUDIO(filename,key))
        .then(() => callback(true))
        .catch((err) => { console.log("error removeAudioFile", err), callback(false) })
}