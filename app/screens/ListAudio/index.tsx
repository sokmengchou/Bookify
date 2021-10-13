//import liraries
import React, { Component } from 'react';
import ListAudioScreen from './ListAudioScreen';
import { inject, observer } from 'mobx-react';
import { BookStore } from '../../stores/book.store';
import { AuthStore } from '../../stores/auth.store';
import { ReadStore } from '../../stores/read.store';


interface Props {
    book: BookStore
    navigation: any
    auth: AuthStore
    route: any
    read: ReadStore
}

@inject("book", "auth", "read")
@observer
class ListAudioContainer extends Component<Props> {
    onEndReachedCalledDuringMomentum: any;

    constructor(props: Props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = false;
    }
    componentDidMount() {
        const { user, accountType } = this.props.auth
        const { sectionKey, listingType, fromProfile } = this.props.route.params;
        console.log(`user`, user)
        if (fromProfile) {
            const { fromProfileType } = this.props.route.params;
            if (user) {
                if (fromProfile) {
                    if (fromProfileType == "MY_AUDIO") {
                        this.props.book.fetchMyAudio(false, user.uid);
                        return
                    } else if (fromProfileType == "HISTORY") {
                        console.log('1 :>> ', 1);
                        this.props.book.fetchHistoryAudio(false, user.uid);
                        return
                    }
                }
            }
        } else {
            console.log(`sectionKey && !listingType`, sectionKey && !listingType)
            if (sectionKey && !listingType) {

                this.props.book.fetchListAudio(sectionKey, accountType, false, (success) => console.log(success));
            } else if (listingType == "GENRE") {
                this.props.book.fetchAudioBooksByGenre(sectionKey, accountType, false, success => console.log('success', success))
            }
            else {
                this.props.book.fetchAudioBookMainCollection(listingType, false, accountType, (success) => console.log('success', success))
            }
        }
    }

    _onBook = (book: any) => {
        const { user } = this.props.auth
        this.props.read.onSelectedBook(user, book, this.props.navigation)
    }

    componentWillUnmount() {

        const { unSubscribeFetchMyAudio, unsubscribeFetchHistoryAudio, unsubscribeFetchListAudio,
            unsubscribeFetchTopChartAudio, unsubscribeFetchFreeAudio, unsubscribeFetchAudioWeLove,
            unsubscribeFetchExploreAudio } = this.props.book;
        unSubscribeFetchMyAudio && unSubscribeFetchMyAudio()
        unsubscribeFetchHistoryAudio && unsubscribeFetchHistoryAudio()
        unsubscribeFetchListAudio && unsubscribeFetchListAudio()
        unsubscribeFetchTopChartAudio && unsubscribeFetchTopChartAudio()
        unsubscribeFetchAudioWeLove && unsubscribeFetchAudioWeLove()
        unsubscribeFetchFreeAudio && unsubscribeFetchFreeAudio()
        unsubscribeFetchExploreAudio && unsubscribeFetchExploreAudio()

        this.props.book.clearListBook()
    }

    _onFetchMore = () => {
        const { accountType, user } = this.props.auth
        const { sectionKey, listingType, fromProfileType } = this.props.route.params;
        if (user) {
            if (sectionKey && !listingType) {
                if (!this.onEndReachedCalledDuringMomentum) {
                    this.props.book.fetchMoreListAudioBook(sectionKey, accountType, () => {
                        this.onEndReachedCalledDuringMomentum = true;
                    });
                }
            }
            else if (fromProfileType == "MY_AUDIO") {
                if (!this.onEndReachedCalledDuringMomentum) {
                    this.props.book.fetchMoreMyAudio(user.uid, () => {
                        this.onEndReachedCalledDuringMomentum = true;
                    });
                }
            }
            else if (fromProfileType == "HISTORY") {
                if (!this.onEndReachedCalledDuringMomentum) {
                    this.props.book.fetchMoreHistoryAudio(user.uid, () => {
                        this.onEndReachedCalledDuringMomentum = true;
                    });
                }
            }
            else if (listingType == "GENRE") {
                if (!this.onEndReachedCalledDuringMomentum) {
                    this.props.book.fetchMoreAudioBookByGenre(sectionKey, accountType, () => {
                        this.onEndReachedCalledDuringMomentum = true;
                    });
                }
            }

            else {
                if (!this.onEndReachedCalledDuringMomentum) {
                    this.props.book.fetchMoreAudioBookMainCollection(listingType, accountType, () => {
                        this.onEndReachedCalledDuringMomentum = true;
                    });
                }
            }
        }
    }

    _onRefresh = () => {
        const { accountType, auth } = this.props.auth
        const { sectionKey, listingType, fromProfileType } = this.props.route.params;
        if (sectionKey && !listingType) {
            this.props.book.fetchListAudio(sectionKey, accountType, true, (success) => console.log(success));
        }
        else if (fromProfileType == "MY_AUDIO") {
            this.props.book.fetchMyAudio(true, auth.uid);
            return
        }
        else if (fromProfileType == "HISTORY") {
            this.props.book.fetchHistoryAudio(true, auth.uid);
        }
        else if (listingType == "GENRE") {
            this.props.book.fetchAudioBooksByGenre(sectionKey, accountType, true, (success: any) => console.log('success', success));
        }
        else {
            this.props.book.fetchAudioBookMainCollection(listingType, true, accountType, (success) => console.log(success));
        }
    }

    render() {
        const { sectionKey, fromProfile } = this.props.route.params;
        const { listBooks, loadingListBook, fetchMoreListBookLoading, refreshingListBook } = this.props.book
        return (
            <ListAudioScreen
                onRefresh={this._onRefresh}
                onFetchMore={this._onFetchMore}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                loadingFetchMore={fetchMoreListBookLoading}
                refreshing={refreshingListBook}

                fromProfile={fromProfile}
                sectionKey={sectionKey}
                goBack={() => this.props.navigation.goBack()}
                title={this.props.route.params.title}
                onBook={(book) => this._onBook(book)}
                loading={loadingListBook}
                books={listBooks.slice()} />
        );
    }
}


//make this component available to the app
export default ListAudioContainer;
