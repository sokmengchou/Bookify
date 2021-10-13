export interface IBookModel {
    key: string;
    createDate: Date;
    createBy: string;
    updateDate: Date;
    updateBy: string;
    status: number;
    pageKey: number; // for order or sort

    title: string;
    author: string;
    description: string;
    coverFile: FileResponseType
    audioFileDetail: FileResponseType[]
    genres: IGenres[]
    genresKey: string[] // only key genres
    Section: ISection[]
    sectionKey: string[] // only key section
    releasedYear: number
    keywords: string[] // need function generate keywords ( ask seakmeng )
    // isFree: boolean
    // price: number
    //TODO: if have time do read read book
    bookFileDetail: FileResponseType | null;
    isAudioBook: boolean;

    isSlide: boolean
}

export type IGenres = {
    key: string;
    name: string;
    icon: string;
    description: string | null;
}


export type ISection = {
    key: string;
    name: string;
    icon: string;
    description: string | null;
}

export type FileResponseType = {
    type: string,
    name: string,
    filename?: string, // uploaded
    downloadUrl: string, // uploaded
    fileSize: number, // uploaded
    fileType: string, // uploaded
    key?: string, // uploaded
}