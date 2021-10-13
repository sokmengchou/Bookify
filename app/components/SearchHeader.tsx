import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { fontGeorgiaBold, fontMedium } from '../../functions/customFont'
import modules from '../modules'
import FIcon from 'react-native-vector-icons/Feather'

interface Props {
    goBack: () => void
    onRightIcon?: any
    rightIcon?: string
    placeholder?: string
    onChangeText: (t: string) => void

}
export default function SearchHeader(props: Props) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: modules.BODY_HORIZONTAL_12, paddingVertical: modules.BODY_HORIZONTAL_12, backgroundColor: modules.WHITE }}>
            <TouchableOpacity onPress={() => props.goBack()}>
                <FIcon style={[styles.searchIcon, { fontSize: modules.FONT_H2, marginRight: 3 }]} name={"chevron-left"} />
            </TouchableOpacity>
            <View style={styles.searchComponent}>
                <FIcon style={styles.searchIcon} name={"search"} />
                <TextInput
                    onChangeText={props.onChangeText}
                    style={styles.searchBox} placeholderTextColor={modules.SUB_TEXT} placeholder={props.placeholder || "ស្វែងរក"} />
            </View>
            {
                props.onRightIcon ?
                    <TouchableOpacity style={styles.rightButton} onPress={() => props.onRightIcon()}>
                        <FIcon style={[styles.searchIcon, { fontSize: modules.FONT_H3 }]} name={props.rightIcon || ""} />
                    </TouchableOpacity>
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    rightButton: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: modules.BACKGROUND_NEW_COLOR,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: modules.BODY_HORIZONTAL_12 / 2
    },
    searchIcon: {
        color: modules.TEXT,
        fontSize: modules.FONT_H4
    },
    searchBox: {
        ...fontMedium,
        flex: 1,
        paddingLeft: modules.BODY_HORIZONTAL_12,
        margin: 0,
        padding: 0,
    },
    searchComponent: {
        paddingHorizontal: modules.BODY_HORIZONTAL,
        paddingVertical: modules.BODY_HORIZONTAL_12 / 1.5,
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: modules.BACKGROUND_NEW_COLOR,
        borderRadius: modules.RADIUS_BUTTON,
        flex: 1
    },
    title: {
        fontSize: modules.FONT_H1 - 2,
        ...fontGeorgiaBold,
        marginLeft: modules.BODY_HORIZONTAL,
    },
    container: {
        flex: 1,
        backgroundColor: modules.WHITE
    },

})
