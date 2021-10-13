import modules from "modules";
import { StyleSheet } from "react-native";
import { fontGeorgiaBold, fontMedium } from 'functions/customFont';

export const styles = StyleSheet.create({
    icon: {
        fontSize: modules.FONT_H5,
        marginLeft: modules.BODY_HORIZONTAL_12 / 3
    },
    exploreText: {
        ...fontMedium,
        fontSize: modules.FONT_H7
    },
    exploreMore: {
        marginTop: modules.BODY_HORIZONTAL_18,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: modules.BODY_HORIZONTAL_12 / 2,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        marginLeft: modules.BODY_HORIZONTAL_24,
        marginBottom: modules.BODY_HORIZONTAL_24,
        flexDirection: "row"
    },
    viewBox: {
        flexDirection: 'row',
        overflow: 'scroll',
        paddingVertical: modules.BODY_HORIZONTAL_ACTION,
        // paddingHorizontal: modules.BODY_HORIZONTAL
    },
    listBook: {
        flex: 1,
        marginTop: modules.BODY_HORIZONTAL_18,
    },
    bookTitle: {
        marginLeft: modules.BODY_HORIZONTAL,
        marginTop: modules.BODY_HORIZONTAL_12,
        fontSize: modules.FONT_P,
        flex: 1
    },

    sectionTitle: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H4,
        marginTop: modules.BODY_HORIZONTAL * 2,
        marginLeft: modules.BODY_HORIZONTAL_24
    },
    sectionSubTitle: {
        ...fontMedium,
        fontSize: modules.FONT,
        marginLeft: modules.BODY_HORIZONTAL_24,
        color: modules.TEXT_NOTE,
        marginTop: modules.BODY_HORIZONTAL_12 / 2
    },
    searchIcon: {
        fontSize: modules.FONT_H2,
    },
    headerTitle: {
        paddingLeft: modules.BODY_HORIZONTAL,
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H2 - 2,
        color: modules.TEXT,
        flex: 1
    },
    searchText: {
        fontSize: modules.FONT_H6,
        marginLeft: modules.BODY_HORIZONTAL / 2
    },
    search: {
        marginHorizontal: modules.BODY_HORIZONTAL,
        alignItems: "center"
    },
});
