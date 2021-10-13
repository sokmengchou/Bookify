import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import { studentRef } from 'services/data.service'
import { checkAudioFileExist, checkBookFileExist, downloadAudio, downloadBook, removeAudioFile } from 'services/download.service'
import { AuthStore } from 'stores/auth.store'
import { BookStore } from 'stores/book.store'
import { ListingStore } from 'stores/listing.store'
import { ReadStore } from 'stores/read.store'
import BookDetailScreen from './BookDetailScreen'

interface Props extends NavigationV5Props {
    auth: AuthStore
    read: ReadStore
    book: BookStore
    listing: ListingStore
}

interface State {
    loading: boolean
    fetchingBook: boolean
    author: any
    readBookDetails: any
    addedBook: any
    downloadPercentage: number
    isSeeMoreDescription: boolean
    isFavorite: boolean
}

@inject("auth", "read", "book", "listing")
@observer
export default class BookDetailContainer extends Component<Props, State> {
    private unsubscribeLikeBook: Function | null = null
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            fetchingBook: false,
            author: null,
            readBookDetails: null,
            addedBook: null,
            downloadPercentage: 0,
            isSeeMoreDescription: false,
            isFavorite: false
        };
    }

    async componentDidMount() {
        const { selectedBook } = this.props.read;
        const { user } = this.props?.auth
        if (user) {
            this.unsubscribeLikeBook = studentRef().doc(user?.uid).collection('like_data').doc(selectedBook.key).onSnapshot((doc) => {
                this.setState({ isFavorite: doc.exists })
            })
        }
    }

    componentWillUnmount() {
        const { unsubscribeCheckAddedBook, unsubscribeCheckReadBook } = this.props.auth
        unsubscribeCheckAddedBook && this.props.auth.unsubscribeCheckAddedBook()
        unsubscribeCheckReadBook && this.props.auth.unsubscribeCheckReadBook()
        if (this.unsubscribeLikeBook) this.unsubscribeLikeBook()
    }

    async downloadAudios(
        files: any[],
        onFinished: () => void,
    ) {
        for (const doc of files) {
            var downloadedAudios: any[] = []
            await checkAudioFileExist(doc.filename, doc.key, (existedPath => {
                if (!existedPath) {
                    downloadAudio(doc.downloadUrl, doc.filename, doc.key, ((received, total) => { }), filePath => {
                        downloadedAudios.push(filePath)
                    })
                } else {

                }
            }));
            onFinished()
        }
    }

    async removeAudios(
        files: any[],
        onFinished: () => void,
    ) {
        for (const doc of files) {
            await removeAudioFile(doc.downloadUrl, doc.key, () => null);
        }
        onFinished()
    }

    _onRead = () => {
        if (this.state.fetchingBook) { return }
        const { selectedBook } = this.props.read
        const { bookFileDetail, authorRef } = selectedBook
        const { downloadUrl, filename, key } = bookFileDetail
        const fileName = key + filename;

        this.setState({ fetchingBook: true });
        const { name } = this.state.author
        const author = {
            key: this.state.author.key,
            name: name,
            ref: authorRef
        };
        this.props.auth.onReadBook(selectedBook, author, async () => {
            checkBookFileExist(fileName, existedPath => {
                if (!existedPath) {
                    downloadBook(downloadUrl, fileName,
                        (received, total) => {
                            const downloadPercentage = (received / total) * 100
                            this.setState({ downloadPercentage: downloadPercentage });
                        },
                        filePath => {
                            this.setState({ downloadPercentage: 100 })
                            this.goToReading(filePath)
                        });
                } else {
                    this.setState({ downloadPercentage: 100 })
                    this.goToReading(existedPath);
                }
            });
        });
    }



    goToReading = (bookPath: string) => {
        const { selectedBook } = this.props.book;
        const { bookFileDetail, words, level, questions } = selectedBook
        const { filename: fileName, key } = bookFileDetail
        const hasQuiz = questions && questions.length > 0 ? true : false
        let audio = selectedBook && selectedBook.audioFileDetail && selectedBook.audioFileDetail.length > 0 ? selectedBook.audioFileDetail : [];

        const bookLevel = {
            key: level.key,
            name: level.name,
            order: level.order
        };

        if (audio.length > 0) {
            this.downloadAudios(audio, () => {
                this.setState({ fetchingBook: false })
                if (bookFileDetail.fileType === "application/epub+zip") {
                    this.props.navigation.navigate('READ_BOOK_EPUB', { book: { hasQuiz: hasQuiz, level: bookLevel, selectedBookKey: selectedBook.key, words, isAudio: true, fileName, key, downloadUrl: bookPath, audioFileDetail: !selectedBook.audioBookFileDetail ? selectedBook.audioFileDetail.length > 0 ? selectedBook.audioFileDetail : [] : [] } })
                } else {
                    this.props.navigation.navigate('READ_BOOK_PDF', { book: { hasQuiz: hasQuiz, level: bookLevel, selectedBookKey: selectedBook.key, words, isAudio: true, fileName, key, downloadUrl: bookPath, audioFileDetail: !selectedBook.audioBookFileDetail ? selectedBook.audioFileDetail.length > 0 ? selectedBook.audioFileDetail : [] : [] } })
                }
            });
        } else {
            this.setState({ fetchingBook: false })
            if (bookFileDetail.fileType === "application/epub+zip") {
                this.props.navigation.navigate('READ_BOOK_EPUB', { book: { hasQuiz: hasQuiz, level: bookLevel, selectedBookKey: selectedBook.key, words, fileName, key, downloadUrl: bookPath, audioFileDetail: !selectedBook.audioBookFileDetail ? selectedBook.audioFileDetail.length > 0 ? selectedBook.audioFileDetail : [] : [] } })
            } else {
                this.props.navigation.navigate('READ_BOOK_PDF', { book: { hasQuiz: hasQuiz, level: bookLevel, selectedBookKey: selectedBook.key, words, fileName, key, downloadUrl: bookPath, audioFileDetail: !selectedBook.audioBookFileDetail ? selectedBook.audioFileDetail.length > 0 ? selectedBook.audioFileDetail : [] : [] } })
            }
        }
    }

    // _onRemoveBook() {
    //     const { selectedBook } = this.props.read;
    //     const { bookFileDetail } = selectedBook
    //     const { filename, key } = bookFileDetail
    //     this.setState({ downloadPercentage: 0 })
    //     let audio: any[] = selectedBook && selectedBook.audioFileDetail && selectedBook.audioFileDetail.length > 0 ? selectedBook.audioFileDetail : [];
    //     if (audio.length > 0) {
    //         this.removeAudios(audio, () => {
    //             const fileName = key + filename
    //             removeBookFile(fileName, () => this.props.auth.onRemoveBook(selectedBook))
    //         });
    //     } else {
    //         const fileName = key + filename
    //         removeBookFile(fileName, () => this.props.auth.onRemoveBook(selectedBook))
    //     }
    // }

    _onQuiz = () => {
        this.props.navigation.navigate('QUIZ')
    }

    _onSeeMoreDescription = () => {
        const seeMore = this.state.isSeeMoreDescription
        this.setState({ isSeeMoreDescription: !seeMore })

    }

    _onFavorite = () => {
        const { selectedBook } = this.props.read
        const { user } = this.props.auth
        if (user) {
            this.props.listing?.onLikePost(selectedBook, user)
        }
    }

    _onUnFavorite = () => {
        const { selectedBook } = this.props.read
        const { user } = this.props.auth
        if (user) {
            this.props.listing?.onUnLikePost(selectedBook, user)
        }
    }

    _onGoReadBook = (coverBook: any, author: any, index: number) => {
        const { selectedBook } = this.props.read
        const { user } = this.props.auth
        this.props.navigation.navigate('READ_BOOK', { coverBook, author, index })
        if (user) {
            this.props.listing?.onAddToHistory(selectedBook, user)
        }

    }

    _onIndexAudioPress = (coverBook: any, author: any, index: number) => {
        const { selectedBook } = this.props.read
        const { user } = this.props.auth
        this.props.navigation.navigate('READ_BOOK', { coverBook, author, playingAudio: index })
        if (user) {
            this.props.listing?.onAddToHistory(selectedBook, user)
        }
    }

    // _onSubmitBookToAssignment = () => {
    //     const { selectedBook } = this.props.read;
    //     this.props.auth.submitStudentAssignment(selectedBook);
    // }

    render() {
        const { selectedBook } = this.props.read;
        const { user } = this.props.auth
        return (
            <BookDetailScreen
                goBack={() => this.props.navigation.goBack()}
                onGoReadBook={(coverBook, author, index) => this._onGoReadBook(coverBook, author, index)}
                downloadPercentage={this.state.downloadPercentage}
                onQuiz={this._onQuiz}
                user={user}
                addedBook={this.state.addedBook}
                readBook={this.state.readBookDetails}
                fetchingBook={this.state.fetchingBook}
                progess={false}
                loading={this.state.loading}
                author={this.state.author}
                book={selectedBook}
                onSeeMoreDescription={() => this._onSeeMoreDescription()}
                isSeeMoreDescription={this.state.isSeeMoreDescription}
                isFavorite={this.state.isFavorite}
                onIndexAudioPress={(coverBook, author, index) => this._onIndexAudioPress(coverBook, author, index)}
                onFavorite={() => this._onFavorite()}
                onUnFavorite={() => this._onUnFavorite()}
            />
        )
    }
}
