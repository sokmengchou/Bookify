import _styles from '@styles'
import { fontMedium, fontGeorgiaBold } from 'functions/customFont';
import modules from 'modules'
import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Modal from 'react-native-modal';

interface Props {
    onBackdropPress: () => void
    onPress: (item: any) => void
    isVisible: boolean
    onOpenModal(type: boolean): void
    description: string
}

const ModalCenterAdjustment = (props: Props) => {
    return (
        <Modal
            onBackdropPress={() => props.onOpenModal(false)}
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
                <ScrollView>
                    <Text style={{ ...fontGeorgiaBold }}>Description</Text>
                    <Text style={{ ...fontMedium, paddingTop: modules.BODY_HORIZONTAL_12 }}>{props.description ? props.description : ''}</Text>
                </ScrollView>
                <View style={{ ..._styles.fake }} />
            </View>
        </Modal>
    )
}

export default ModalCenterAdjustment

const styles = StyleSheet.create({
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
})
