//import liraries
import React, { Component } from 'react';
import ListBookScreen from './ListBookScreen';
import { inject, observer } from 'mobx-react';
import { BookStore } from '../../stores/book.store';
import { AuthStore } from '../../stores/auth.store';
import { ReadStore } from '../../stores/read.store';
import { NavigationV5Props } from 'routes/RouteFun';


interface Props extends NavigationV5Props {
    // book: BookStore
    // navigation: any
    // auth: AuthStore
    // route: any
    // read: ReadStore
}

interface State {
    // onlyAudioBook: boolean
}

// @inject("book", "auth", "read")
// @observer
class ListBookContainer extends Component<Props, State> {
    // onEndReachedCalledDuringMomentum: any;

    constructor(props: Props) {
        super(props);
        // this.onEndReachedCalledDuringMomentum = false;
        this.state = {
            // onlyAudioBook: false
        }
    }

    // componentDidMount() {
    //     const { accountType, auth } = this.props.auth

    //     const { sectionKey, listingType, fromProfile } = this.props.route.params;
    //     if (fromProfile) {
    //         const { fromProfileType } = this.props.route.params;
    //         if (fromProfileType == "HISTORY") {
    //             this.props.book.fetchHistoryBook(false, auth.uid);
    //             return
    //         }

    //         if (fromProfileType == "MY_BOOK") {
    //             this.props.book.fetchMyBook(false, auth.uid);
    //             return
    //         }

    //         if (fromProfileType == "LEVEL") {
    //             this.props.book.fetchBookByLevel(sectionKey, this.state.onlyAudioBook, false, (success) => console.log(success));
    //             return
    //         }
    //     } else {
    //         if (sectionKey && !listingType) {
    //             this.props.book.fetchListBook(sectionKey, accountType, false, (success) => console.log(success));
    //         }
    //         else if (listingType == "GENRE") {
    //             this.props.book.fetchBooksByGenre(sectionKey, accountType, false, success => console.log('success', success))
    //         }
    //         else {
    //             this.props.book.fetchBookMainCollection(listingType, false, accountType, (success) => console.log(success))
    //         }
    //     }
    // }

    // _onBook = (book: any) => {
    //     const { user } = this.props.auth
    //     this.props.read.onSelectedBook(user, book, this.props.navigation)
    // }

    // componentWillUnmount() {
    //     const { unsubscribeFetchMyBook, unsubscribeFetchHistoryBook, unsubscribeFetchListBook,
    //         unsubscribeFetchTopChartBooks, unsubscribeFetchFreeBooks,
    //         unsubscribeFetchExploreBooks } = this.props.book;
    //     unsubscribeFetchMyBook && unsubscribeFetchMyBook()
    //     unsubscribeFetchHistoryBook && unsubscribeFetchHistoryBook()
    //     unsubscribeFetchTopChartBooks && unsubscribeFetchTopChartBooks()
    //     unsubscribeFetchFreeBooks && unsubscribeFetchFreeBooks()
    //     unsubscribeFetchExploreBooks && unsubscribeFetchExploreBooks()
    //     this.props.book.clearListBook()
    // }

    // _onFetchMore = () => {
    //     const { accountType, auth } = this.props.auth
    //     const { sectionKey, listingType, fromProfileType } = this.props.route.params;
    //     if (fromProfileType === "LEVEL") {
    //         if (!this.onEndReachedCalledDuringMomentum) {
    //             this.props.book.fetchMoreBookByLevel(sectionKey, this.state.onlyAudioBook, (success: any) => {
    //                 this.onEndReachedCalledDuringMomentum = true;
    //             });
    //         }
    //     }
    //     else if (fromProfileType == "MY_BOOK") {
    //         if (!this.onEndReachedCalledDuringMomentum) {
    //             this.props.book.fetchMoreMyBook(auth.uid, () => {
    //                 this.onEndReachedCalledDuringMomentum = true;
    //             });
    //         }
    //     }
    //     if (fromProfileType == "HISTORY") {
    //         if (!this.onEndReachedCalledDuringMomentum) {
    //             this.props.book.fetchMoreHistoryBook(auth.uid, () => {
    //                 this.onEndReachedCalledDuringMomentum = true;
    //             });
    //         }
    //     }

    //     else if (sectionKey && !listingType) {
    //         if (!this.onEndReachedCalledDuringMomentum) {
    //             this.props.book.fetchMoreListBook(sectionKey, accountType, (success: any) => {
    //                 this.onEndReachedCalledDuringMomentum = true;
    //             });
    //         }
    //     }
    //     else if (listingType == "GENRE") {
    //         if (!this.onEndReachedCalledDuringMomentum) {
    //             this.props.book.fetchMoreListBookByGenre(sectionKey, accountType, (success: any) => {
    //                 this.onEndReachedCalledDuringMomentum = true;
    //             });
    //         }
    //     }
    //     else {
    //         if (!this.onEndReachedCalledDuringMomentum) {
    //             this.props.book.fetchMoreBookMainCollection(listingType, accountType, (success: any) => {
    //                 this.onEndReachedCalledDuringMomentum = true;
    //             });
    //         }
    //     }
    // }

    // _onRefresh = () => {
    //     const { accountType, auth } = this.props.auth
    //     const { sectionKey, listingType, fromProfileType } = this.props.route.params;
    //     if (fromProfileType == "LEVEL") {
    //         this.props.book.fetchBookByLevel(sectionKey, this.state.onlyAudioBook, true, (success) => console.log(success));
    //     }
    //     else if (fromProfileType == "MY_BOOK") {
    //         this.props.book.fetchMyBook(true, auth.uid);
    //     }
    //     else if (fromProfileType == "HISTORY") {
    //         this.props.book.fetchHistoryBook(true, auth.uid);
    //     }
    //     else if (sectionKey && !listingType) {
    //         this.props.book.fetchListBook(sectionKey, accountType, true, (success) => console.log(success));
    //     }
    //     else if (listingType == "GENRE") {
    //         this.props.book.fetchBooksByGenre(sectionKey, accountType, true, (success: any) => console.log('success', success));
    //     }
    //     else {
    //         this.props.book.fetchBookMainCollection(listingType, true, accountType, (success) => console.log(success));
    //     }
    // }

    // onShowOnlyAudioBook() {
    //     const { sectionKey } = this.props.route.params;
    //     this.setState({ onlyAudioBook: !this.state.onlyAudioBook }, () => {
    //         this.props.book.fetchBookByLevel(sectionKey, this.state.onlyAudioBook, false, (success) => console.log(success));
    //     })
    // }


    render() {
        // const { sectionKey, fromProfile, fromProfileType } = this.props.route.params;
        // const { listBooks, loadingListBook, fetchMoreListBookLoading, refreshingListBook } = this.props.book
        // return null
        return (
            <ListBookScreen
                // fromProfileType={fromProfileType}
                // showOnlyAudioBook={this.state.onlyAudioBook}
                // showOnlyAudio={() => this.onShowOnlyAudioBook()}
                // onRefresh={() => null}
                // onFetchMore={this._onFetchMore}
                // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                // loadingFetchMore={fetchMoreListBookLoading}
                // refreshing={refreshingListBook}
                // fromProfile={fromProfile}
                // sectionKey={sectionKey}
                goBack={() => this.props.navigation.goBack()}
                // title={this.props.route.params.title}
                // onBook={(book) => this._onBook(book)}
                // loading={loadingListBook}
                // books={listBooks.slice()} 
                onBookPress={() => this.props.navigation.navigate('BOOK_DETAIL')}
            />
        );
    }
}


//make this component available to the app
export default ListBookContainer;
