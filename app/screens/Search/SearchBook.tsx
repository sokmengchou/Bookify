import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import SearchBookScreen from './SearchBookScreen';
import { ExploreStore } from '../../stores/explore.store';
import { BookStore } from '../../stores/book.store';
import { AuthStore } from '../../stores/auth.store';
import { ReadStore } from '../../stores/read.store';

interface Props {
    navigation: any
    explore: ExploreStore
    book: BookStore
    auth: AuthStore
    read: ReadStore
    route: any
}

interface State {
    books: any[]
    searchText: string
}

@inject("book", "explore", "auth", "read")
@observer
export default class SearchBook extends Component<Props, State> {
    private timeoutRef: any
    constructor(props: Props) {
        super(props);
        this.state = {
            books: [],
            searchText: ""
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.props.explore.onClearSearchBook()
    }

    _onBook = (book: any) => {
        const { user } = this.props.auth
        this.props.read.onSelectedBook(user, book, this.props.navigation)
    }

    _onSearch = (text: string) => {
        const { accountType } = this.props.auth
        const { type } = this.props.route.params;
        if (type) {
            this.props.explore.onSearchBook(text, accountType, type);
        } else {
            this.props.explore.onSearchBook(text, accountType);
        }
    }

    onTextChange = (text: string) => {
        this.timeoutRef ? clearTimeout(this.timeoutRef) : null
        this.timeoutRef = setTimeout(() => {
            this._onSearch(text)
            this.setState({ searchText: text });
        }, 1000);
    }

    render() {
        const { searchingBook, bookBySearch, noSearchResult } = this.props.explore
        return (
            <SearchBookScreen
                text={this.state.searchText}
                isNoResult={noSearchResult}
                onTextChange={this.onTextChange}
                loading={searchingBook}
                onBook={(item) => this._onBook(item)}
                books={bookBySearch.slice()}
                goBack={() => this.props.navigation.goBack()}
            />
        )
    }
}