import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import ViewCard from './ViewCard'
import ShadowView from 'react-native-simple-shadow-view'
import modules from '../modules'
import _styles from '../_styles'
import { fontGeorgiaBold, fontMedium } from '../../functions/customFont'
import AudioBookCard from './AudioBookCard'
import AudioComponent from './AudioComponent'
import Icon from 'react-native-vector-icons/Feather'

interface Props {
    title: string,
    subTitle: string,
    books: any[]
    loading: boolean
    onPress: (book: any) => void
    useRef?: boolean
    onSeeAll: () => void
}

const AudioListHorizontal = (props: Props) => {
    return (
        <ViewCard style={{ paddingTop: modules.BODY_HORIZONTAL_12 }}>
            <Text style={styles.sectionTitle}>{props.title}</Text>
            <Text style={styles.sectionSubTitle}>{props.subTitle}</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.viewBox} contentContainerStyle={{ paddingHorizontal: modules.BODY_HORIZONTAL_24 }}>
                {props.books.map((book, index) => {
                    const url = {
                        uri: book.coverDownloadUrl ? book.coverDownloadUrl.length > 0 ? book.coverDownloadUrl[0].downloadUrl : "https://i.harperapps.com/covers/9780062951366/x510.jpg" : "https://i.harperapps.com/covers/9780062951366/x510.jpg"
                    }
                    return (
                        <ShadowView
                            key={book.key}>
                            {
                                props.useRef ?
                                    <AudioComponent
                                        height={100}
                                        onBook={(item) => (props.onPress(item))}
                                        bookRef={book.bookRef} />
                                    :
                                    <View style={{ marginRight: modules.BODY_HORIZONTAL_24 }}>
                                        <AudioBookCard
                                            filename={book.coverDownloadUrl.length > 0 ? book.coverDownloadUrl[0].filename : ""}
                                            title={book.name}
                                            onBook={() => props.onPress(book)}
                                            key={index} height={200} bookUrl={url} />
                                    </View>

                            }
                        </ShadowView>
                    )
                })
                }
            </ScrollView>
            <View style={{ flex: 1, borderTopWidth: 0.5, borderColor: modules.SUB_TITLE, marginHorizontal: modules.BODY_HORIZONTAL_24 }}></View>
            <TouchableOpacity
                onPress={() => props.onSeeAll()}
                style={[
                    styles.exploreMore,
                    {
                        marginRight: modules.BODY_HORIZONTAL_12,
                    },
                ]}>
                <Text style={[styles.exploreText]}>See All</Text>
                <Icon style={styles.icon} name={"chevron-right"} />
            </TouchableOpacity>
        </ViewCard>
    )
}

export default AudioListHorizontal;

const styles = StyleSheet.create({
    icon: {
        fontSize: modules.FONT_H5,
        marginLeft: modules.BODY_HORIZONTAL_12 / 3,
        marginTop: 3,
    },
    exploreText: {
        ...fontMedium,
        fontSize: modules.FONT_H7,
    },
    exploreMore: {
        marginTop: modules.BODY_HORIZONTAL_12,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: modules.BODY_HORIZONTAL_12 / 2,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        marginLeft: modules.BODY_HORIZONTAL_24 / 2,
        marginBottom: modules.BODY_HORIZONTAL_24,
        flexDirection: "row"
    },
    browseHeaderTitle: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H4,
    },
    sectionTitle: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H4,
        marginTop: modules.BODY_HORIZONTAL_18,
        marginLeft: modules.BODY_HORIZONTAL_24,

    },
    sectionSubTitle: {
        ...fontMedium,
        fontSize: modules.FONT,
        marginLeft: modules.BODY_HORIZONTAL_24,
        color: modules.TEXT_NOTE,
        marginTop: modules.BODY_HORIZONTAL_12 / 2

    },
    viewBox: {
        flexDirection: 'row',
        overflow: 'scroll',
        paddingVertical: modules.BODY_HORIZONTAL_ACTION,
        paddingTop: modules.BODY_HORIZONTAL_ACTION / 1.5,
        // paddingHorizontal: modules.BODY_HORIZONTAL
    },
})
