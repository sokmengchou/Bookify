import SafeArea from 'components/SafeArea'
import { fontGeorgiaBold, fontMedium } from '../../../../functions/customFont';

import modules from 'modules'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import ViewCard from 'components/ViewCard';
import { TextField } from 'react-native-material-textfield';
import moment from 'moment';
import { toDateCalendar, toMidDate } from 'services/format.service';
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import _styles from '@styles';


interface Props {
    onPressDone: () => void
    onGoBack: () => void

    lastName: string
    onLastName: (text: string) => void
    firstName: string
    onFirstName: (text: string) => void
    dateOfBirth: any
    onDateBirthChange: any
    gender: any
    onGender: () => void
    place: any
    onPlace: () => void;
    photo: string
    onPhoto: () => void
}

const EditInformationScreen = (props: Props) => {
    const [Date, setDate] = React.useState(moment().add(-18, 'year').toDate());
    const [showDOBModal, setShowDOBModal] = useState(false)
    return (
        <View style={styles.mainContainer}>
            <SafeArea edges={'safeTop'} />
            <ViewCard style={styles.profileInfo}>

                <View style={{ flexDirection: 'row', padding: modules.BODY_HORIZONTAL_12 }}>
                    <TouchableOpacity onPress={() => props.onGoBack()}>
                        <Icon name={'chevron-left'} style={{ fontSize: modules.FONT_H2 }} />
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', ...fontGeorgiaBold, fontSize: modules.FONT_H4 }}>Edit Profile</Text>
                    <TouchableOpacity onPress={() => props.onPressDone()}>
                        <Text style={{ ...fontMedium, color: modules.ACTIVE, fontSize: modules.FONT_H5 }}>Done</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => props.onPhoto()}>
                    <FastImage source={{ uri: props?.photo ? props?.photo : "" }} style={styles.profilePicture} >
                        {/* 
                    {progress ?
                        <View style={styles.loading}>
                            <ActivityIndicator />
                        </View>
                        :
                        <TouchableOpacity style={{ padding: 80 }} onPress={() => setmodalProfile(!modalProfile)} disabled={progress}>
                        </TouchableOpacity>
                    } */}
                    </FastImage>
                    <View style={styles.cameraIcon}>
                        <TouchableOpacity onPress={() => { }}>
                            <MIcon name="camera" style={{ fontSize: 12 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </ViewCard>
            <ViewCard style={{ padding: modules.BODY_HORIZONTAL_24, flex: 1 }}>
                <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H4 }}>
                    Edit Personal Information
                </Text>

                <TextField
                    tintColor={modules.PRIMARY}
                    containerStyle={{}}
                    style={[styles.textField]}
                    value={props.lastName}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onChangeText={props.onLastName}
                    returnKeyType='next'
                    label={"Last Name"}
                />
                <TextField
                    tintColor={modules.PRIMARY}
                    containerStyle={{}}
                    style={[styles.textField]}
                    value={props.firstName}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onChangeText={props.onFirstName}
                    returnKeyType='next'
                    label={"First Name"}
                />
                <TouchableOpacity onPress={() => props.onGender()} style={[styles.input, { borderBottomColor: "#B9BABA", borderBottomWidth: 1, marginTop: modules.BODY_HORIZONTAL_12 }]}>
                    <Text style={[styles.label]}>Gender</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <Text style={[styles.textField, { color: modules.SUB_TEXT, flex: 1, textAlign: "right" }]}>Male</Text>
                        <Icon style={styles.arrowIcon} name={"chevron-right"} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowDOBModal(true)} style={[styles.input, { borderBottomColor: "#B9BABA", borderBottomWidth: 1 }]}>
                    <Text style={[styles.label,]}>Date of Birth</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <Text style={[styles.textField, { color: modules.SUB_TEXT, flex: 1, textAlign: "right", marginRight: modules.BODY_HORIZONTAL_12 / 2 }]}>
                            {props.dateOfBirth ? toMidDate((toDateCalendar(props.dateOfBirth))) : ""}</Text>
                        <View style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 100 }}>
                            <Icon style={{ color: modules.SUB_TITLE, fontSize: modules.FONT_H5 }} name={"calendar"} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onPlace()} style={[styles.input, { marginTop: modules.BODY_HORIZONTAL_18, borderBottomColor: "#B9BABA", borderBottomWidth: 1 }]}>
                    <Text style={[styles.label, { flex: 1 }]}>From</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <Text style={[styles.textField, { color: modules.SUB_TEXT, textAlign: "right" }]}>
                            {props.place}
                        </Text>
                        <Icon style={styles.arrowIcon} name={"chevron-right"} />
                    </View>
                </TouchableOpacity>

                {Platform.OS === "ios" ? (
                    <Modal
                        isVisible={showDOBModal}
                        style={styles.view}
                        onBackdropPress={() => setShowDOBModal(false)}>
                        <View style={styles.dateBox}>
                            <View style={styles.buttonBox}>
                                <View style={_styles.rows}>
                                    <TouchableOpacity onPress={() => setShowDOBModal(false)}>
                                        <Text style={{}}>Cancel</Text>
                                    </TouchableOpacity>
                                    <View style={_styles.flx1} />
                                    <TouchableOpacity onPress={() => { setShowDOBModal(false); props.onDateBirthChange(null, Date) }}>
                                        <Text style={{ color: modules.PRIMARY }}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <DateTimePicker
                                display={"spinner"}
                                value={
                                    Date
                                        ? Date
                                        : props.dateOfBirth
                                            ? toDateCalendar(props.dateOfBirth)
                                            : toDateCalendar("1987-05-05")
                                }
                                mode={"date"}
                                onChange={(e: any, date: any) => setDate(date)}
                            />
                        </View>
                    </Modal>
                ) : (
                    showDOBModal && (
                        <DateTimePicker
                            display={"spinner"}
                            value={
                                Date
                                    ? Date
                                    : props.dateOfBirth
                                        ? toDateCalendar(props.dateOfBirth)
                                        : toDateCalendar("1987-05-05")
                            }
                            mode={"date"}
                            onChange={(e: any, date: any) => {
                                setShowDOBModal(false);
                                props.onDateBirthChange(null, date);
                            }}
                        />
                    )
                )}
            </ViewCard>

        </View>
    )
}

export default EditInformationScreen

const Profile = modules.VIEW_PORT_WIDTH / 2.5

const styles = StyleSheet.create({
    profilePicture: {
        width: Profile,
        height: Profile,
        borderRadius: Profile / 2,
        marginTop: -(Profile / 50),
        backgroundColor: modules.ACTIVE,
        borderWidth: 5,
        borderColor: modules.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraIcon: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: modules.BORDER_COLOR,
        marginLeft: Profile - 50,
        marginTop: -50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: modules.WHITE
    },
    mainContainer: {
        flex: 1,
        backgroundColor: modules.WHITE
    },
    profileInfo: {
        backgroundColor: modules.WHITE,
        alignItems: 'center',
        paddingHorizontal: modules.BODY_HORIZONTAL,
        paddingBottom: modules.BODY_HORIZONTAL_12 * 3
    },
    textField: {
        fontSize: modules.FONT_H6,
        ...fontMedium,
        flex: 1
    },
    label: {
        fontSize: modules.FONT_H6,
        ...fontMedium,
        color: modules.TEXT
    },
    arrowIcon: {
        color: modules.SUB_TITLE,
        fontSize: modules.FONT_H4,
        marginTop: 3
    },
    input: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: modules.BODY_HORIZONTAL_12,
    },
    view: {
        justifyContent: "flex-end",
        margin: 0,
    },
    dateBox: {
        backgroundColor: modules.WHITE,
    },
    buttonBox: {
        paddingVertical: modules.BODY_HORIZONTAL - 3,
        paddingHorizontal: modules.BODY_HORIZONTAL_ACTION,
        borderBottomColor: modules.BORDER_COLOR,
        borderBottomWidth: 1,
    },
})
