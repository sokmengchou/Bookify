//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _styles from '../_styles';
import modules from '../modules';
import { fontGeorgiaBold } from '../../functions/customFont';
import { pushToObject } from '../services/mapping.service';
import AudioBookCard from './AudioBookCard';
import MainButton from './MainButton';


interface Props {
    book: any
    index: number
    onBook: (book: any) => void
}

interface State {
    book: any,
    isReady: boolean
    author: any
}
// create a component
class TopAudioComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            book: null,
            isReady: false,
            author: null
        }
    }

    componentDidMount() {
        if (this.props.book) {
            this.props.book.bookRef.get().then((book: any) => {
                const _book = book.data()
                const { authorRef } = _book;
                authorRef.get().then((doc: any) => {
                    this.setState({ author: pushToObject(doc), book: pushToObject(book), isReady: true })
                });
            })
        }
    }

    componentWillUnmount() {
        this.setState({ book: null, author: null })
    }

    render() {
        const { book, onBook } = this.props;
        const { isReady } = this.state;
        const url = {
            uri: isReady ? book.coverDownloadUrl ? book.coverDownloadUrl[0].downloadUrl : this.state.book.coverDownloadUrl[0].downloadUrl : null,
        }
        return (
            <View>
                {
                    !isReady ? null :
                        <MainButton
                            onPress={() => onBook(this.state.book ? this.state.book : this.props.book)}
                            component={
                                <View
                                    style={[
                                        _styles.rows,
                                        this.props.index !== 2
                                            ? {
                                                // borderBottomWidth: 1,
                                                // borderBottomColor: '#9aa0a655',
                                                marginTop: 12 / 2,
                                            }
                                            : { marginTop: 12 / 2 },
                                        { paddingRight: modules.BODY_HORIZONTAL_24 * 3 },
                                    ]}>
                                    <View>
                                        <AudioBookCard
                                        filename = {isReady && book.coverDownloadUrl ? book.coverDownloadUrl[0].filename : this.state.book.coverDownloadUrl[0].filename  }
                                         bookUrl={url} />
                                    </View>
                                    <View style={{ marginLeft: modules.BODY_HORIZONTAL_12 }}>
                                        <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT, paddingHorizontal: modules.BODY_HORIZONTAL_12, marginBottom: modules.BODY_HORIZONTAL / 2, }}>
                                            {this.state.book.name}
                                        </Text>
                                        <Text
                                            style={{
                                                color: modules.TEXT_NOTE,
                                                fontSize: modules.FONT_P,
                                                flex: 1,
                                                paddingHorizontal: modules.BODY_HORIZONTAL_12,
                                            }}>
                                            {this.state.book ? this.state.book.level.name : 'Unknown'}
                                        </Text>
                                    </View>
                                </View>
                            }
                        />
                }
            </View>

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default TopAudioComponent;
