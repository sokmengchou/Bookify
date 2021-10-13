import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import modules from '../modules'
import { fontGSans, FontGSansBold, fontGeorgiaBold, fontMedium } from '../../functions/customFont'
import _styles from '../_styles'
import FastImage from 'react-native-fast-image'
import TouchableScale from './TouchableScale'

interface Props {
    data: any[]
    onPress: (section: any) => void
    title: string
    seeMore?: any
}


const SectionList = (props: Props) => {

    const renderSectionButton = (index: number, item: any, length: number) => {
        return (
            <TouchableScale
                key={item.key}
                onPress={() => props.onPress(item)}
                style={[styles.sectionButton]}>
                {
                    item.file ? <FastImage resizeMode={"contain"} source={{ uri: item.file.downloadUrl }} style={{ width: 30, height: 30, alignSelf: "center" }} /> : item.icon ?
                        <MIcon name={item.icon.replace("_", "-")} style={styles.sectionButtonIcon} />
                        : <MIcon name={("turned-in")} style={styles.sectionButtonIcon} />
                }
                <Text numberOfLines={1} style={styles.sectionButtonText}>{item.name}</Text>
                <Icon name={"chevron-right"} style={styles.sectionArrowIcon} />
            </TouchableScale>
        )
    }
    const length = props.data.length
    return (
        <View style={[styles.browseHeaeer]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.browseHeaderTitle}>{props.title}</Text>
            </View>
            {
                props.data.map((item, index) => {
                    return (renderSectionButton(index, item, length))
                })
            }
            {props.seeMore ? <TouchableOpacity
                onPress={() => props.seeMore()}
                style={[styles.sectionButton, { borderBottomWidth: 0 }]}>
                <MIcon name={("format-list-bulleted")} style={styles.sectionButtonIcon} />
                <Text numberOfLines={1} style={[styles.sectionButtonText, { ...fontGeorgiaBold }]}>{"See more"}</Text>
                <Icon name={"chevron-right"} style={styles.sectionArrowIcon} />
            </TouchableOpacity> : null}
        </View>
    )
}

export default SectionList;

const styles = StyleSheet.create({
    browseHeaeer: {
        paddingTop: modules.BODY_HORIZONTAL_24,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
    },
    browseHeaderTitle: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H4,
        marginLeft: modules.BODY_HORIZONTAL_12
    },
    sectionButton: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: modules.BODY_HORIZONTAL,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        borderBottomWidth: 1,
        borderColor: modules.BORDER_COLOR
    },
    sectionButtonIcon: {
        fontSize: modules.FONT_H3,
        color: modules.TEXT,
        width: 30,
    },
    sectionArrowIcon: {
        fontSize: modules.FONT_H4,
        color: modules.SUB_TEXT
    },
    sectionButtonText: {
        ...fontMedium,
        marginLeft: modules.BODY_HORIZONTAL_18,
        fontSize: modules.FONT_H7,
        flex: 1
    },
    sectionContainer: {
        padding: modules.BODY_HORIZONTAL_12,
    },
    sectionTitle: {
        ...fontMedium,
        fontSize: modules.FONT_H5,
        marginTop: modules.BODY_HORIZONTAL_18,
        marginLeft: modules.BODY_HORIZONTAL
    },
    sectionSubTitle: {
        ...fontMedium,
        fontSize: modules.FONT_H6,
        marginLeft: modules.BODY_HORIZONTAL,
        color: modules.SUB_TEXT
    },

})
