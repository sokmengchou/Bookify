//import liraries
import React, { Component } from 'react';
import { View } from 'react-native';
// import BookCard from './BookCard';
import { pushToObject } from '../services/mapping.service';
import AudioBookCard from './AudioBookCard';
import modules from '../modules';

interface Props {
    bookRef: any
    onBook: (book: any) => void
    height?: number
}

interface State {
    book: any
    isReady: boolean
}

// create a component
class AudioComponent extends Component<Props, State> {
    private unsubscribeBookRef: any
    constructor(props: Props) {
        super(props);
        this.state = {
            book: null,
            isReady: false
        };
    }

    componentDidMount() {
        this.unsubscribeBookRef = this.props.bookRef.get().then((doc: any) => {
            this.setState({ isReady: true, book: pushToObject(doc) })
        }).catch((error: any) => console.log(error))
    }

    componentWillUnmount() {
        this.unsubscribeBookRef = null
    }

    render() {

        const url = {
            uri: this.state.book ? this.state.book.coverDownloadUrl.length > 0 ?
                this.state.book.coverDownloadUrl[0].downloadUrl : "https://i.harperapps.com/covers/9780062951366/x510.jpg" :
                "https://i.harperapps.com/covers/9780062951366/x510.jpg"
        }

        return (
            <View style={{ marginRight: modules.BODY_HORIZONTAL_24 }}>
                {
                    this.state.isReady ?
                        <AudioBookCard
                            filename={this.state.book ? this.state.book.coverDownloadUrl.length > 0 ?
                                this.state.book.coverDownloadUrl[0].filename : "" : ""}
                            height={this.props.height ? this.props.height : 0}
                            title={this.state.book ? this.state.book.name : "Unknown"}
                            onBook={() => this.props.onBook(this.state.book)}
                            bookUrl={url} /> : null
                }
            </View>
        );
    }
}

//make this component available to the app
export default AudioComponent;
