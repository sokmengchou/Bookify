//import liraries
import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import modules from '../../modules';
import _styles from '../../_styles';
import Icon from 'react-native-vector-icons/Feather';
import { fontGeorgiaBold, fontMedium, FontGSansBold } from '../../../functions/customFont';
import EmptyContent from '../../components/EmptyContent';
import LoadingActivity from '../../components/LoadingActivity';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import BookComponentUseRef from '../../components/BookComponentUseRef';
import { DUMMY_BOOK_SLIDE } from 'dummy';



interface Props {
    // books: any[]
    // onBook: (book: any) => void
    // loading: boolean
    // title: string
    goBack: () => void
    // sectionKey: string
    // fromProfile: boolean
    // loadingFetchMore: boolean
    // refreshing: boolean
    // onMomentumScrollBegin: () => void;
    // onRefresh: () => void
    // onFetchMore: () => void
    // showOnlyAudio: () => void
    // showOnlyAudioBook: boolean
    // fromProfileType: string
    onBookPress: () => void

}
// create a component
const ListBookScreen = (props: Props) => {
    const loading = false
    const _renderFooter = () => {
        const loadingFetchMore = false
        return <View>
            <View style={_styles.fake} />
            {loadingFetchMore ? <View style={_styles.fake}>
                <ActivityIndicator />
            </View> : null}
            <View style={_styles.fake} />
            <View style={_styles.fake} />
        </View>
    }

    return (
        <View style={{ backgroundColor: modules.WHITE, flex: 1, paddingTop: modules.BODY_HORIZONTAL_12 }}>
            <SafeAreaView style={{ backgroundColor: modules.WHITE }} />
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_12, marginBottom: modules.BODY_HORIZONTAL_18, marginTop: modules.BODY_HORIZONTAL_12 }}>
                <TouchableOpacity
                    onPress={() => props.goBack()}
                    style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: modules.TEXT, justifyContent: "center", alignItems: "center" }}>
                    <Icon style={styles.backIcon} name={"chevron-left"} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                {/* {
                    props.fromProfileType === "LEVEL" ? */}
                <TouchableOpacity
                    // disabled={props.loading || props.loadingFetchMore}
                    onPress={() => { }}
                    style={styles.filter}>
                    <Text style={styles.filterText}>Show Only Free Audiobook</Text>
                    <MIcon name={"check-box"} style={[styles.filterIcon, { color: modules.LINK }]} />
                </TouchableOpacity>
                {/* : null
                } */}
            </View>
            <View style={{ flex: 1 }}>
                <View style={{
                    borderBottomWidth: 1, borderBottomColor: modules.BORDER_COLOR,
                    paddingBottom: modules.BODY_HORIZONTAL_18,
                    marginHorizontal: modules.BODY_HORIZONTAL_18
                }}>
                    <Text numberOfLines={2} style={[styles.bookHeaderTitle]}>Title</Text>
                </View>
                {
                    loading ? <LoadingActivity /> : DUMMY_BOOK_SLIDE.length === 0 ? <EmptyContent /> :
                        <FlatList
                            updateCellsBatchingPeriod={100}
                            initialNumToRender={10}
                            style={{ flex: 1 }}
                            // refreshing={props.refreshing}
                            // onRefresh={props.onRefresh}
                            onEndReachedThreshold={0.5}
                            // onEndReached={props.onFetchMore}
                            // onMomentumScrollBegin={props.onMomentumScrollBegin}
                            ListFooterComponent={() => _renderFooter()}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={DUMMY_BOOK_SLIDE}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <BookComponentUseRef
                                        onPress={() => props.onBookPress()}
                                        data={item} />
                                )
                            }}
                        />
                }
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({

    filterText: {
        ...FontGSansBold,
        fontSize: modules.FONT_P
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: modules.BODY_HORIZONTAL_18,
    },
    filterIcon: {
        fontSize: modules.FONT_H3,
        color: modules.SUB_TEXT,
        marginLeft: modules.BODY_HORIZONTAL_12 / 2,
    },

    filter: {
        marginRight: modules.BODY_HORIZONTAL_12,
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
        paddingVertical: modules.BODY_HORIZONTAL_12,
        borderRadius: modules.RADIUS_BUTTON,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: modules.BACKGROUND_INPUT,
        marginVertical: modules.BODY_HORIZONTAL_12,
        justifyContent: "center"
    },
    containerLoading: {
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap",
        alignSelf: "center",
    },
    backText: {
        ...fontMedium,
        marginLeft: modules.BODY_HORIZONTAL_12,
        fontSize: modules.FONT_H5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    bookHeaderTitle: {
        marginLeft: modules.BODY_HORIZONTAL_12,
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H3,
    },
    backIcon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H3
    },
});

//make this component available to the app
export default ListBookScreen;
