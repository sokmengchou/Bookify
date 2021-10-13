import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
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
    isFull?: boolean
    onBack?: any
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

    return (
        <View style={[styles.browseHeaeer, props.isFull && { flex: 1, paddingTop: modules.BODY_HORIZONTAL_12 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {
                    props.isFull ?
                        <TouchableOpacity style={{ padding: modules.BODY_HORIZONTAL_12 }} onPress={() => props.onBack()}>
                            <Icon style={{ fontSize: modules.FONT_H3, color: modules.SUB_TEXT }} name={"chevron-left"} />
                        </TouchableOpacity> : null
                }
                <Text style={styles.browseHeaderTitle}>{props.title}</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                    if (props.isFull || !props.seeMore) {
                        return (
                            <View style={_styles.fake} />
                        )
                    } else {
                        return (
                            <TouchableOpacity
                                onPress={() => props.seeMore()}
                                style={[styles.sectionButton, { borderBottomWidth: 0 }]}>
                                <MIcon name={("format-list-bulleted")} style={styles.sectionButtonIcon} />
                                <Text numberOfLines={1} style={[styles.sectionButtonText, { ...fontGeorgiaBold }]}>{"See more"}</Text>
                                <Icon name={"chevron-right"} style={styles.sectionArrowIcon} />
                            </TouchableOpacity>
                        )
                    }
                }}
                keyExtractor={item => item.key}
                // ListHeaderComponent={() => <Text style={styles.subBrowseHeaderTitle}>Book Section</Text>}
                style={styles.sectionContainer}
                data={props.data}
                renderItem={({ item, index }) => {
                    const length = props.data.length
                    return (renderSectionButton(index, item, length))
                }}
            />
        </View>
    )
}

export default SectionList;

const styles = StyleSheet.create({
    browseHeaeer: {
        paddingTop: modules.BODY_HORIZONTAL * 2,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
    },
    browseHeaderTitle: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H4,
    },
    sectionButton: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: modules.BODY_HORIZONTAL,
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
