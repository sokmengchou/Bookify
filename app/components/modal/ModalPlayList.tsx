import _styles from '@styles'
import { fontMedium, fontGeorgiaBold } from 'functions/customFont';
import modules from 'modules'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
    onBackdropPress: (type: boolean) => void
    onPress: (item: any, index: any) => void
    isVisible: boolean
    onOpenModal(type: boolean): void
    arrayAudio: any[]
    bookName: string
    isPlayIndex: number
}

const ModalPlayList = (props: Props) => {
    const [isPlayingIndex, setIspPayingIndex] = useState(props.isPlayIndex)
    useEffect(() => {
        setIspPayingIndex(props.isPlayIndex)
        return () => {
        }
    }, [props.isPlayIndex])
    return (
        <Modal
            onBackdropPress={() => props.onBackdropPress(false)}
            onSwipeComplete={() => props.onOpenModal(false)}
            style={[styles.modal]}
            isVisible={props.isVisible}
            backdropColor={'transparent'}
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            animationOutTiming={300}
            animationInTiming={300}
        >
            <View style={[styles.containModal, _styles.cardShadow]}>
                <View style={{ width: 50, height: 5, backgroundColor: modules.TEXT, marginBottom: modules.BODY_HORIZONTAL_24, borderRadius: 5, alignSelf: 'center' }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ ...fontGeorgiaBold, paddingBottom: modules.BODY_HORIZONTAL_12 }}>PlayList</Text>
                    {
                        props.arrayAudio?.map((item: any, index: any) =>
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    props.onPress(item, index)
                                    setIspPayingIndex(index)
                                }}
                                style={[styles.columnContainer, isPlayingIndex === index ? { backgroundColor: modules.TEXT } : {}]}
                            >
                                <Text style={[styles.fileName, isPlayingIndex === index ? { color: modules.WHITE } : {}]}>{index + 1 + "." + " " + props.bookName + " " + item?.name}</Text>
                                <View style={{ flex: 1 }} />
                                <Icon style={[styles.icon, isPlayingIndex === index ? { color: modules.WHITE } : {}]} name={'play'} />
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
                <View style={{ ..._styles.fake }} />
            </View>
        </Modal>
    )
}

export default ModalPlayList

const styles = StyleSheet.create({
    fileName: {
        ...fontMedium
    },
    icon: {
        fontSize: modules.FONT_H3
    },
    modal: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        margin: 0,
    },
    containModal: {
        height: modules.VIEW_PORT_HEIGHT / 2,
        borderRadius: modules.CARD_RADIUS,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        padding: modules.BODY_HORIZONTAL_24
    },
    columnContainer: {
        padding: modules.BODY_HORIZONTAL_12,
        paddingHorizontal: modules.BODY_HORIZONTAL_24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: modules.RADIUS
    }
})
