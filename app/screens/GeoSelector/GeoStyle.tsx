import { StyleSheet } from "react-native";
import { SFProTextHeavy } from "../../../customs/customFont";
import modules from "../../modules";

export const styles = StyleSheet.create({
    header: {
        backgroundColor: modules.WHITE,
        padding: modules.BODY_HORIZONTAL_12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // borderBottomColor:modules.BORDER_LIGHT_COLOR,
        // borderBottomWidth:1
    },
    closeIcon: {
        fontSize: modules.FONT_H1,
        color: modules.TEXT
    },
    screenTitle: {
        fontSize: modules.FONT_H5,
        ...SFProTextHeavy
    },
    container: {
        flex: 1,
        backgroundColor: modules.WHITE
    },
    searchContainer: {
        // marginTop:modules.BODY_HORIZONTAL_12,
        paddingHorizontal: modules.BODY_HORIZONTAL,
        marginHorizontal: modules.PADDING,
        paddingVertical: modules.BODY_HORIZONTAL / 2,
        backgroundColor: modules.BACKGROUND_NEW_COLOR,
        borderRadius: modules.RADIUS * 2,
        flexDirection: 'row'
    },

    tab_container: {
        width: modules.VIEW_PORT_WIDTH,
    },
    applyButton: {
        backgroundColor: modules.BLUE,
        padding:modules.PADDING/2,
        borderRadius:modules.RADIUS*2,
        marginHorizontal:modules.PADDING
    }
})