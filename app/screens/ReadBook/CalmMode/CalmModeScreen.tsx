import SafeArea from 'components/SafeArea'
import { fontMedium } from 'functions/customFont'
import modules from 'modules'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Video from "react-native-video";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Slider } from '@miblanchard/react-native-slider';


interface Props {
    goBack: () => void
}

const CalmModeScreen = (props: Props) => {
    return (
        <View style={{ flex: 1 }}>

            <Video
                source={require("../../../../assets/video/productionID_5147455.mp4")}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />

            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <SafeArea edges={'safeTop'} />
                <TouchableOpacity
                    onPress={() => props.goBack()}
                    style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: modules.TEXT, justifyContent: "center", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_24 }}>
                    <Icon style={styles.backIcon} name={"chevron-left"} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />

                <View style={{ width: modules.VIEW_PORT_WIDTH, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...fontMedium, color: modules.WHITE }}>Nineteen Eighty Four</Text>
                        <Text style={{ ...fontMedium, color: modules.WHITE, marginTop: modules.BODY_HORIZONTAL_18 / 2 }}>09:90</Text>
                    </View>
                    <Slider
                        containerStyle={styles.slider_main}
                        minimumTrackTintColor={modules.PRIMARY}
                        maximumTrackTintColor="#e4e4e6"
                        thumbTintColor={modules.TEXT}

                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: modules.BODY_HORIZONTAL_24, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { }} style={styles.buttonSoundToggled}>
                            <MaterialCommunityIcons style={{ fontSize: modules.FONT_H2, color: modules.WHITE }} name={'rewind-5'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }} style={styles.buttonSoundToggled}>
                            <Icon style={{ fontSize: modules.FONT_H2, color: modules.WHITE }} name={'pause'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }} style={[styles.buttonSoundToggled]}>
                            <MaterialCommunityIcons style={{ fontSize: modules.FONT_H2, color: modules.WHITE }} name={'fast-forward-10'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <SafeArea edges={'safeBottom'} />
            </View>
        </View>
    )
}

export default CalmModeScreen
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    backIcon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H3
    },
    backgroundVideo: {
        height: height,
        alignItems: "stretch",
    },
    buttonSoundToggled: {
        backgroundColor: 'transparent', borderRadius: 200, padding: modules.BODY_HORIZONTAL_12 / 2
    },
    slider_main: {
        marginHorizontal: modules.BODY_HORIZONTAL_24
    },
})
