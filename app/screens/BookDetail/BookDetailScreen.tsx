import _styles from '@styles';
import SafeArea from 'components/SafeArea'
import ViewCard from 'components/ViewCard';
import { fontMedium, fontGeorgiaBold } from 'functions/customFont';
import modules from 'modules'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { authorRef } from 'services/data.service';
import { pushToObject } from 'services/mapping.service';
import AutoScrolling from 'react-native-auto-scrolling';
import TouchableScale from 'components/TouchableScale';
interface Props {
    goBack: () => void
    onGoReadBook: (coverBook: any, author: any, index: number) => void

    book: any
    author: any
    loading: boolean
    progess: boolean
    fetchingBook: boolean
    readBook: any
    addedBook: any
    user: any
    onQuiz(): void
    downloadPercentage: number
    onSeeMoreDescription: () => void
    isSeeMoreDescription: boolean
    onFavorite: () => void
    onUnFavorite: () => void
    isFavorite: boolean
    onIndexAudioPress: (coverBook: any, author: any, index: number) => void
}

const BookDetailScreen = (props: Props) => {
    const { audioFileDetail, bookFileDetail, coverDownloadUrl, description, genres, length, name, shortDescription, words, authorKey } = props.book
    const coverBook = coverDownloadUrl.map((i: any) => i.downloadUrl)
    const [author, setAuthor] = useState(null) as any;
    const [numLines, setNumLines] = useState(0);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [textShown, setTextShown] = useState(false);
    useEffect(() => {
        props.book?.author ? setAuthor(props.book?.author) : authorRef().doc(authorKey).get().then(doc => {
            setAuthor(pushToObject(doc));
        });
        return () => {
            setAuthor(null)
        }
    }, [])

    const toggleTextShown = () => {
        setTextShown(!textShown);
    };

    useEffect(() => {
        setNumLines(textShown ? 0 : 3);
    }, [textShown]);

    const onTextLayout = useCallback(
        (e) => {
            if (e.nativeEvent.lines.length > 3 && !textShown) {
                setShowMoreButton(true);
                setNumLines(3);
            }
        },
        [textShown],
    );

    return (
        <View style={{ flex: 1, backgroundColor: modules.WHITE }}>
            <SafeArea edges={'safeTop'} />
            <View style={{ paddingVertical: modules.BODY_HORIZONTAL_12 }}>
                <TouchableOpacity
                    onPress={() => props.goBack()}
                    style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: modules.TEXT, justifyContent: "center", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_24 }}>
                    <Icon style={styles.backIcon} name={"chevron-left"} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <ViewCard style={{ marginTop: modules.BODY_HORIZONTAL_12 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: modules.BODY_HORIZONTAL_24, alignItems: "center" }}>
                        <View style={{ ..._styles.shadowSmall, width: modules.VIEW_PORT_WIDTH / 3, height: modules.VIEW_PORT_WIDTH / 2, backgroundColor: modules.BACKGROUND_NEW_COLOR, alignItems: "center", justifyContent: "center", borderRadius: modules.RADIUS, overflow: 'hidden' }}>
                            <FastImage resizeMode={'contain'} style={{ width: '100%', height: '100%' }} source={{ uri: coverBook ? coverBook[0] : 'https://www.i-shop.link/home/assets/images/no-image.png' }} />
                        </View>
                        <View style={{ padding: modules.BODY_HORIZONTAL_12 }}>
                            <AutoScrolling style={styles.scrolling1}>
                                <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H4 }}>{name}</Text>
                            </AutoScrolling>
                            <Text style={{ ...fontMedium, color: modules.SUB_TEXT, paddingVertical: modules.BODY_HORIZONTAL_12 }}>{author ? author.name : ""}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: modules.BODY_HORIZONTAL_12 / 2, backgroundColor: modules.BACKGROUND_NEW_COLOR, borderRadius: modules.RADIUS, marginVertical: modules.BODY_HORIZONTAL_12 / 2 }}>
                                    <Text style={{ color: modules.SUB_TEXT, ...fontMedium }}>{genres?.name.trim()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: modules.BODY_HORIZONTAL_12, borderBottomColor: modules.CARD_BORDER, borderBottomWidth: 1, paddingVertical: modules.BODY_HORIZONTAL_12 }}>

                        <TouchableOpacity activeOpacity={1} onPress={() => props.onGoReadBook(coverBook, author, 0)} style={{ ..._styles.shadowSmall, flexDirection: 'row', margin: modules.BODY_HORIZONTAL_12, padding: modules.BODY_HORIZONTAL_12 / 2, justifyContent: "center", alignItems: "center", backgroundColor: modules.TEXT, flex: 1, borderRadius: modules.RADIUS }}>
                            <Icon name={'headphones'} style={{ fontSize: modules.FONT_H3, color: modules.WHITE }} />
                            <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H5, color: modules.WHITE, textAlign: 'center', marginLeft: modules.BODY_HORIZONTAL_12 }}>Play</Text>
                        </TouchableOpacity>
                        {
                            props.isFavorite ?
                                <TouchableScale onPress={() => props.onUnFavorite()} style={{ ..._styles.shadowSmall, justifyContent: "center", alignItems: "center", backgroundColor: modules.WHITE, padding: modules.BODY_HORIZONTAL_12, marginVertical: modules.BODY_HORIZONTAL_12, borderRadius: modules.RADIUS }}>
                                    <FontAwesomeIcon name={'heart'} style={{ fontSize: modules.FONT_H3, color: modules.TEXT }} />
                                </TouchableScale>
                                :
                                <TouchableScale onPress={() => props.onFavorite()} style={{ ..._styles.shadowSmall, justifyContent: "center", alignItems: "center", backgroundColor: modules.WHITE, padding: modules.BODY_HORIZONTAL_12, marginVertical: modules.BODY_HORIZONTAL_12, borderRadius: modules.RADIUS }}>
                                    <Icon name={'heart'} style={{ fontSize: modules.FONT_H3, color: modules.TEXT }} />
                                </TouchableScale>
                        }
                    </View>

                    <ViewCard style={{ padding: modules.BODY_HORIZONTAL_24, borderBottomColor: modules.CARD_BORDER, borderBottomWidth: 1, }}>
                        <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H4 }}>Description</Text>

                        <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={{ ...fontMedium, color: modules.SUB_TEXT, paddingVertical: modules.BODY_HORIZONTAL_12 }}>{shortDescription}</Text>
                        {
                            showMoreButton ?
                                <TouchableOpacity onPress={() => toggleTextShown()}>
                                    {
                                        textShown ?
                                            <Text style={{ ...fontMedium, color: modules.ACTIVE }}>Show less</Text>
                                            :
                                            <Text style={{ ...fontMedium, color: modules.ACTIVE }}>Show More</Text>
                                    }
                                </TouchableOpacity>
                                :
                                null
                        }
                    </ViewCard>

                </ViewCard>
                <View style={{ paddingTop: modules.BODY_HORIZONTAL_12 }}>
                    {
                        audioFileDetail.map((item: any, index: any) =>
                            <TouchableScale key={index} onPress={() => props.onIndexAudioPress(coverBook, author, index)} style={{ padding: modules.BODY_HORIZONTAL_12, paddingHorizontal: modules.BODY_HORIZONTAL_24, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...fontMedium }}>{index + 1 + "." + " " + name + " " + item?.name}</Text>
                                <View style={{ flex: 1 }} />
                                <Icon style={{ fontSize: modules.FONT_H3 }} name={'play'} />
                            </TouchableScale>
                        )
                    }
                </View>
                <View style={{ ..._styles.fake }} />
            </ScrollView>

        </View >
    )
}

export default BookDetailScreen

const styles = StyleSheet.create({
    backIcon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H3
    },
    scrolling1: {
        width: 400
    },
})
