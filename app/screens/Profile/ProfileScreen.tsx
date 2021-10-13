import SafeArea from 'components/SafeArea'
import ViewCard from 'components/ViewCard'
import { fontMedium } from 'functions/customFont'
import { fontGeorgiaBold } from 'functions/customFont'
import modules from 'modules'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

interface Props {
    onPressEdit: () => void
    onLogOut: () => void
    account: any
    onFavorite: () => void
    onHistory: () => void
    numberOfReadBook: number
}

const ProfileScreen = (props: Props) => {
    const { firstName, lastName, photoUrl, email } = props?.account || {}
    return (
        <View style={{ flex: 1, backgroundColor: modules.WHITE }}>
            <SafeArea edges={'safeTop'} />
            <ViewCard>


                <View style={{ flexDirection: 'row', padding: modules.BODY_HORIZONTAL_12 }}>
                    <View>
                        <Icon name={'chevron-left'} style={{ fontSize: modules.FONT_H2, color: 'transparent' }} />
                    </View>
                    <Text style={{ flex: 1, textAlign: 'center', ...fontGeorgiaBold, fontSize: modules.FONT_H4 }}>Profile</Text>
                    <TouchableOpacity onPress={() => props.onPressEdit()}>
                        <Icon name={'edit'} style={{ fontSize: modules.FONT_H2 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: modules.VIEW_PORT_WIDTH / 3, height: modules.VIEW_PORT_WIDTH / 3, borderRadius: 200, overflow: 'hidden', marginTop: modules.BODY_HORIZONTAL_12 }}>
                        <FastImage source={{ uri: photoUrl ? photoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fZ_ebLrIR7-37WMGcyj_RO-0TTcZGtUKtg&usqp=CAU' }} style={{ width: '100%', height: '100%', borderRadius: 200, overflow: 'hidden' }} />
                    </View>
                    <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H3, marginTop: modules.BODY_HORIZONTAL_12 }}>{lastName && firstName ? lastName + " " + firstName : ""}</Text>
                    <Text style={{ ...fontMedium, fontSize: modules.FONT_H6, marginTop: modules.BODY_HORIZONTAL_12 / 2, color: modules.SUB_TEXT }}>{email ? email : ""}</Text>

                    <View style={{ flexDirection: 'row', paddingVertical: modules.BODY_HORIZONTAL_24 }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H6 }}>+12</Text>
                            <Text style={{ ...fontMedium, fontSize: modules.FONT_H6 - 2, marginTop: modules.BODY_HORIZONTAL_12 / 2, color: modules.SUB_TEXT }}>New Book</Text>
                        </View>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H6 }}>{props.numberOfReadBook}</Text>
                            <Text style={{ ...fontMedium, fontSize: modules.FONT_H6 - 2, marginTop: modules.BODY_HORIZONTAL_12 / 2, color: modules.SUB_TEXT }}>Read</Text>
                        </View>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H6 }}>0</Text>
                            <Text style={{ ...fontMedium, fontSize: modules.FONT_H6 - 2, marginTop: modules.BODY_HORIZONTAL_12 / 2, color: modules.SUB_TEXT }}>Completed</Text>
                        </View>
                    </View>
                </View>
            </ViewCard>

            <View style={{ flex: 1 }}>
                <ViewCard style={{ flex: 1, paddingHorizontal: modules.BODY_HORIZONTAL_24, paddingVertical: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12 / 2 }}>
                    <TouchableOpacity onPress={() => props.onFavorite()} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: modules.BODY_HORIZONTAL_12 }}>
                        <View style={{ backgroundColor: modules.BORDER_LIGHT_COLOR, padding: modules.BODY_HORIZONTAL_12, borderRadius: 20 }}>
                            <FontAwesomeIcon style={{ fontSize: modules.FONT_H2 }} name={'heart'} />
                        </View>
                        <Text style={{ ...fontGeorgiaBold, flex: 1, paddingLeft: modules.BODY_HORIZONTAL_12 }}>Favorite</Text>
                        <View>
                            <Icon style={{ fontSize: modules.FONT_H2 }} name={'chevron-right'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onHistory()} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: modules.BODY_HORIZONTAL_12, borderBottomColor: modules.BORDER_COLOR, borderBottomWidth: 2 }}>
                        <View style={{ backgroundColor: modules.BORDER_LIGHT_COLOR, padding: modules.BODY_HORIZONTAL_12, borderRadius: 20 }}>
                            <FontAwesomeIcon style={{ fontSize: modules.FONT_H2 }} name={'book'} />
                        </View>
                        <Text style={{ ...fontGeorgiaBold, flex: 1, paddingLeft: modules.BODY_HORIZONTAL_12 }}>History</Text>
                        <View>
                            <Icon style={{ fontSize: modules.FONT_H2 }} name={'chevron-right'} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.onLogOut()} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: modules.BODY_HORIZONTAL_12 }}>
                        <View style={{ backgroundColor: modules.BORDER_LIGHT_COLOR, padding: modules.BODY_HORIZONTAL_12, borderRadius: 20 }}>
                            <FontAwesomeIcon style={{ fontSize: modules.FONT_H2 }} name={'sign-out'} />
                        </View>
                        <Text style={{ ...fontGeorgiaBold, flex: 1, paddingLeft: modules.BODY_HORIZONTAL_12 }}>Logout</Text>
                        <View>
                            <Icon style={{ fontSize: modules.FONT_H2 }} name={'chevron-right'} />
                        </View>
                    </TouchableOpacity>

                </ViewCard>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
