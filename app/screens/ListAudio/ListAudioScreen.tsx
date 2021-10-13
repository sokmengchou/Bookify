//import liraries
import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import modules from '../../modules';
import _styles from '../../_styles';
import Icon from 'react-native-vector-icons/Feather';
import { fontGeorgiaBold, fontMedium } from '../../../functions/customFont';
import EmptyContent from '../../components/EmptyContent';
import LoadingActivity from '../../components/LoadingActivity';
import BookComponentUseRef from '../../components/BookComponentUseRef';
import SafeArea from '../../components/SafeArea';


interface Props {
    books: any[]
    onBook: (book: any) => void
    loading: boolean
    title: string
    goBack: any
    sectionKey: string
    fromProfile: boolean
    loadingFetchMore: boolean
    refreshing: boolean
    onMomentumScrollBegin: () => void;
    onRefresh: () => void
    onFetchMore: () => void

}
// create a component
const ListBookScreen = (props: Props) => {

    const _renderFooter = () => {
        const { loadingFetchMore } = props
        return <View>
            <View style={_styles.fake} />
            {loadingFetchMore ? <View style={_styles.fake}>
                <ActivityIndicator />
            </View> : null}
            <View style={_styles.fake} />
            <View style={_styles.fake} />
        </View>
    }
    console.log(`props.books`, props.books)
    return (
        <View style={{ backgroundColor: modules.WHITE, flex: 1, paddingTop: modules.BODY_HORIZONTAL_12 }}>
            <SafeArea edges={"safeTop"} style={{ backgroundColor: modules.WHITE }} />
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_12, marginBottom: modules.BODY_HORIZONTAL_18, marginTop: modules.BODY_HORIZONTAL_12 }}>
                <TouchableOpacity
                    onPress={props.goBack}
                    style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: modules.TEXT, justifyContent: "center", alignItems: "center" }}>
                    <Icon style={styles.backIcon} name={"chevron-left"} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={[styles.backText]}>Back</Text>
            </View>

            <View style={{ flex: 1 }}>
                <View style={{
                    borderBottomWidth: 1, borderBottomColor: modules.BORDER_COLOR,
                    paddingBottom: modules.BODY_HORIZONTAL_18,
                    marginHorizontal: modules.BODY_HORIZONTAL_18,
                }}>
                    <Text numberOfLines={2} style={[styles.bookHeaderTitle]}>{props.title}</Text>
                </View>
                {
                    props.loading ?
                        <LoadingActivity />
                        : props.books.length === 0
                            ? <EmptyContent />
                            :
                            <FlatList
                                style={{ flex: 1 }}
                                ListEmptyComponent={() => null}
                                refreshing={props.refreshing}
                                onRefresh={props.onRefresh}
                                onEndReachedThreshold={0.5}
                                onEndReached={props.onFetchMore}
                                onMomentumScrollBegin={props.onMomentumScrollBegin}
                                ListFooterComponent={() => _renderFooter()}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                data={props.books}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <BookComponentUseRef
                                            onPress={(book: any) => props.onBook(book)}
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
