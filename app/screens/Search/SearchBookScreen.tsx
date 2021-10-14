import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import ShadowView from 'react-native-simple-shadow-view';
import FastImage from 'react-native-fast-image';
import _styles from '../../_styles';
import modules from '../../modules';
import EmptyContent from '../../components/EmptyContent';
import { fontGeorgiaBold } from '../../../functions/customFont';
import lotties from '../../modules/lotties';

interface Props {
    goBack: () => void;
    books: any[];
    onBook: (book: any) => void
    loading: boolean
    onTextChange: (text: string) => void
    isNoResult: boolean
    text: string

}
const SearchBookScreen = (props: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_12, marginBottom: modules.BODY_HORIZONTAL_18, marginTop: modules.BODY_HORIZONTAL_12 }}>
                <TouchableOpacity
                    onPress={props.goBack}
                    style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: modules.TEXT, justifyContent: "center", alignItems: "center" }}>
                    <Icon style={styles.backIcon} name={"chevron-left"} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={[styles.backText]}>Back</Text>
            </View>
            <ScrollView style={styles.subContainer}>
                <View style={styles.searchBox}>

                    {
                        props.loading ? <ActivityIndicator /> :
                            <Icon style={styles.searchIcon} name={"search"} />
                    }

                    <TextInput
                        returnKeyType={"search"}
                        onChangeText={props.onTextChange}
                        placeholderTextColor={modules.SUB_TEXT}
                        placeholder={"Search"}
                        style={styles.searchInput} />
                </View>
                {
                    props.loading ? null : props.books.length > 0 ?
                        <View style={{ flex: 1 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                style={{ flex: 1, paddingTop: modules.BODY_HORIZONTAL }}
                                data={props.books}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ShadowView
                                            key={item.key}
                                            style={[_styles.shadowSmall, { marginBottom: modules.BODY_HORIZONTAL, marginLeft: modules.BODY_HORIZONTAL + 4 }]}>
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPress={() => props.onBook(item)}
                                                style={[item.audiobook === true && {
                                                    width: modules.VIEW_PORT_WIDTH / 5,
                                                    height: modules.VIEW_PORT_HEIGHT / 8,
                                                }, styles.book]}>
                                                <FastImage
                                                    source={{ uri: item.coverDownloadUrl[0].downloadUrl }} style={{ width: "100%", height: "100%" }} />
                                            </TouchableOpacity>
                                            <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                                            <View style={styles.bookButton}>
                                            </View>
                                        </ShadowView>
                                    )
                                }}
                            />
                        </View> : <EmptyContent
                            lottie={lotties.BOOKS}
                            note={props.text !== "" && props.books.length === 0 ? "No Result" : "Search your favorite audiobooks"}
                            title={props.text !== "" && props.books.length === 0 ? "There's no result for your search." : "Audiobooks"}
                        />
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchBookScreen;

const styles = StyleSheet.create({
    searchBox: {
        marginVertical: modules.BODY_HORIZONTAL,
        flexDirection: "row",
        paddingHorizontal: modules.BODY_HORIZONTAL,
        paddingVertical: modules.BODY_HORIZONTAL / 1.5,
        alignItems: "center",
        backgroundColor: modules.BACKGROUND_INPUT,
        borderRadius: modules.CARD_RADIUS,
        borderColor: modules.BORDER,
    },
    searchIcon: {
        fontSize: 18,
        color: modules.TEXT_NOTE,
    },
    searchInput: {
        flex: 1,
        fontSize: modules.FONT_H7,
        marginLeft: modules.BODY_HORIZONTAL - 5,
        color: modules.TEXT,
        padding: 0,
        margin: 0,
    },
    readPercentage: {
        color: modules.SUB_TEXT,
    },

    name: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H7,
        marginTop: modules.BODY_HORIZONTAL - 5,
        width: modules.VIEW_PORT_WIDTH / 2.5,
    },
    assignment: {
        color: modules.SUB_TEXT,
        fontSize: modules.FONT_H7 - 3,
    },
    bookIcon: {
        fontSize: modules.FONT_H5,
        color: modules.SUB_TEXT,
    },
    bookButton: {
        marginTop: 3,
        flexDirection: "row",
        alignItems: "center"
    },
    search: {
        paddingHorizontal: modules.BODY_HORIZONTAL,
        flexDirection: "row",
        alignItems: "center",
    },
    book: {
        width: modules.VIEW_PORT_WIDTH / 2.5,
        height: modules.VIEW_PORT_HEIGHT / 4,
        overflow: "hidden",
        backgroundColor: modules.WHITE,
        borderRadius: 4
    },
    browseText: {
        fontSize: modules.FONT_H7,
        marginLeft: modules.BODY_HORIZONTAL - 5
    },
    searchText: {
        fontSize: modules.FONT_H7,
        marginLeft: modules.BODY_HORIZONTAL
    },
    backIcon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H3
    },
    backText: {
        fontSize: modules.FONT_H6,
        marginLeft: modules.BODY_HORIZONTAL_12
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    subContainer: {
        flex: 1,
        paddingHorizontal: modules.BODY_HORIZONTAL / 1.5
    },
    container: {
        flex: 1,
        backgroundColor: modules.WHITE,
    },
    title: {
        marginTop: modules.BODY_HORIZONTAL,
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H5,
        paddingLeft: modules.BODY_HORIZONTAL
    },
    border: {
        height: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        width: modules.VIEW_PORT_WIDTH - 52,
        marginHorizontal: modules.BODY_HORIZONTAL,
        marginVertical: modules.BODY_HORIZONTAL - 5
    }
})
