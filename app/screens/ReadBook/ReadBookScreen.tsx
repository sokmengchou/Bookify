import _styles from '@styles';
import SafeArea from 'components/SafeArea'
import { fontGeorgiaBold, fontMedium } from 'functions/customFont';
import modules from 'modules'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BlurView } from '@react-native-community/blur';
import ModalCenterAdjustment from 'components/modal/ModalCenterAdjustment';
import { Slider } from '@miblanchard/react-native-slider';
import ModalPlayList from 'components/modal/ModalPlayList';
import moment from 'moment';
import Video from 'react-native-video';


interface Props {
    goBack: () => void
    goCalmMode: () => void
    coverBook: []
    author: any
    bookTitle: string
    descriptionBook: string
    arrayAudio: any[]
    onVolumeChange: (e: any) => void
    onChangeVolumeDone: () => void

    currentTime: number
    onStartScroll: () => void
    paused: boolean
    seekBack: () => void
    goPause: () => void
    seekForward: () => void
    goPlay: () => void
    volume: number | undefined
    book: any
    duration: number
    onEndScroll: (value: number[]) => void
    onSetSpeed: (speedRequest: number) => void
    playingAudio: number
    onAudioInModalPress: (item: any, index: number) => void
    isVisibleModalDescription: boolean
    setIsVisibleModalDescription: (visible: boolean) => void
    isVisibleModalAudio: boolean
    setIsVisibleModalAudio: (visible: boolean) => void
    isCalmMode: boolean
    setCalmMode: (calm: boolean) => void
}

const convertSecondToMinute = (value: number) => {
    if (value >= 0)
        return (moment.utc(value * 1000).format('mm:ss'))
}
const ReadBookScreen = (props: Props) => {
    // const [modalAdjustment, setModalAdjustment] = React.useState(false)
    // const [modalPlayList, setModalPlayList] = React.useState(false)
    const [toggleSound, setToggleSound] = React.useState(false)
    const [toggleSpeed, setToggleSpeed] = React.useState(false)
    const [speed, setSpeed] = React.useState(1)
    const maximumVolume = 1.0
    const setSpeedAudio = (speed: number) => {
        setSpeed(speed)
        props.onSetSpeed(speed)
    }

    return (
        <View style={_styles.flx1}>
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: props.isCalmMode ? 1000 : -1 }}>
                <Video
                    source={require("../../../assets/video/productionID_5147455.mp4")}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"cover"}
                    rate={1.0}
                    ignoreSilentSwitch={"obey"}
                />
                <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <SafeArea edges={'safeTop'} />
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", paddingVertical: modules.BODY_HORIZONTAL_12 }}>

                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ width: 30, height: 30, borderRadius: 100, justifyContent: "center", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_24 }}>
                            {/* <Icon style={[styles.backIcon, { backgroundColor: 'transparent' }]} name={"chevron-left"} /> */}
                        </TouchableOpacity>

                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            onPress={() => {
                                props.setCalmMode(!props.isCalmMode)
                                props.goCalmMode()
                            }}
                            style={[styles.calmModeBtn, props.isCalmMode ? { backgroundColor: 'rgba(255,255,255,0.3)' } : {}]}
                        >
                            <Text style={{ ...fontMedium }}>Calm mode</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }} />

                    <View style={{ width: modules.VIEW_PORT_WIDTH, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: modules.BODY_HORIZONTAL_12, paddingTop: modules.BODY_HORIZONTAL_12 }}>
                            <Text style={{ ...fontMedium, color: modules.WHITE }}>{convertSecondToMinute(props.currentTime)}</Text>
                            <View style={{ flex: 1 }} />
                            <Text style={{ ...fontMedium, color: modules.WHITE }}>- {convertSecondToMinute(props.duration - props.currentTime)}</Text>
                        </View>
                        <Slider
                            onSlidingComplete={(value: any) => props.onEndScroll(value)}
                            onSlidingStart={() => props.onStartScroll()}
                            value={props.currentTime}
                            containerStyle={styles.slider_main}
                            maximumValue={Math.max(props.duration)}
                            minimumTrackTintColor={modules.WHITE}
                            maximumTrackTintColor={modules.TEXT}
                            thumbTintColor={modules.WHITE}
                            thumbStyle={{ width: 15, height: 15 }}
                            trackClickable
                            animationType={'timing'}

                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: modules.BODY_HORIZONTAL_24, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => props.seekBack()} style={{ padding: modules.BODY_HORIZONTAL_12 }}>
                                <MaterialCommunityIcons style={{ fontSize: modules.FONT_H2, color: modules.WHITE }} name={'rewind-5'} />
                            </TouchableOpacity>

                            {
                                !props.paused ?
                                    <TouchableOpacity onPress={() => props.goPause()} style={{ padding: modules.BODY_HORIZONTAL_12 }}>
                                        <Icon style={{ fontSize: modules.FONT_H2, color: modules.WHITE }} name={'pause'} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => props.goPlay()} style={{ padding: modules.BODY_HORIZONTAL_12 }}>
                                        <Icon style={{ fontSize: modules.FONT_H2, color: modules.WHITE }} name={'play'} />
                                    </TouchableOpacity>
                            }

                            <TouchableOpacity onPress={() => props.setCalmMode(!props.isCalmMode)} style={{ padding: modules.BODY_HORIZONTAL_12 / 2 }}>
                                <Icon style={{ fontSize: modules.FONT_H2, color: modules.WHITE }} name={'x-circle'} />
                            </TouchableOpacity>
                        </View>
                        <SafeArea edges={'safeBottom'} />
                    </View>
                </View>
            </View>
            <FastImage
                style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                source={{ uri: props.coverBook ? props.coverBook[0] : 'https://s26162.pcdn.co/wp-content/uploads/2018/12/71QvtjZxesL.jpg' }}
            >
                <View style={{ flex: 1, zIndex: 1 }}>
                    <SafeArea edges={'safeTop'} />

                    <View style={{ paddingVertical: modules.BODY_HORIZONTAL_12, flex: 1 }}>

                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>

                            <TouchableOpacity
                                onPress={() => props.goBack()}
                                style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: modules.TEXT, justifyContent: "center", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_24 }}>
                                <Icon style={styles.backIcon} name={"chevron-left"} />
                            </TouchableOpacity>

                            <View style={{ flex: 1 }} />
                            <TouchableOpacity
                                onPress={() => {
                                    props.setCalmMode(!props.isCalmMode)
                                    props.goCalmMode()
                                }}
                                style={[styles.calmModeBtn, props.isCalmMode ? { backgroundColor: 'rgba(255,255,255,0.3)' } : {}]}
                            >
                                <Text style={{ ...fontMedium }}>Calm mode</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: modules.VIEW_PORT_WIDTH / 1.5, height: modules.VIEW_PORT_WIDTH / 1.5, marginTop: modules.BODY_HORIZONTAL_24 }}>
                                <FastImage resizeMode={'contain'} source={{ uri: props.coverBook ? props.coverBook[0] : 'https://s26162.pcdn.co/wp-content/uploads/2018/12/71QvtjZxesL.jpg' }} style={{ width: '100%', height: '100%' }} />
                            </View>
                            <Text style={{ ...fontGeorgiaBold, fontSize: modules.FONT_H3, paddingTop: modules.BODY_HORIZONTAL_24 }}>{props.bookTitle ? props.bookTitle : "undefined"}</Text>
                            <Text style={{ ...fontMedium, color: modules.SUB_TEXT, paddingVertical: modules.BODY_HORIZONTAL_12 }}>{"By" + " " + props.author?.name}</Text>

                            <View style={{ flexDirection: 'row', alignItems: "center", marginTop: modules.BODY_HORIZONTAL_24 }}>
                                <TouchableOpacity onPress={() => props.seekBack()}>
                                    <MaterialCommunityIcons style={{ fontSize: modules.FONT_H2 }} name={'rewind-5'} />
                                </TouchableOpacity>

                                {
                                    !props.paused ?
                                        <TouchableOpacity onPress={() => props.goPause()} style={{ padding: modules.BODY_HORIZONTAL_24 * 1.4, borderRadius: 200, backgroundColor: modules.WHITE, ..._styles.shadowSmall, marginHorizontal: modules.BODY_HORIZONTAL_24 }}>
                                            <Icon style={{ fontSize: modules.FONT_H2 }} name={'pause'} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => props.goPlay()} style={{ padding: modules.BODY_HORIZONTAL_24 * 1.4, borderRadius: 200, backgroundColor: modules.WHITE, ..._styles.shadowSmall, marginHorizontal: modules.BODY_HORIZONTAL_24 }}>
                                            <Icon style={{ fontSize: modules.FONT_H2 }} name={'play'} />
                                        </TouchableOpacity>

                                }


                                <TouchableOpacity onPress={() => props.seekForward()}>
                                    <MaterialCommunityIcons style={{ fontSize: modules.FONT_H2 }} name={'fast-forward-10'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 1 }} />

                        <View style={{ width: modules.VIEW_PORT_WIDTH, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: modules.BODY_HORIZONTAL_12, paddingTop: modules.BODY_HORIZONTAL_12 }}>
                                <Text style={{ ...fontMedium, color: modules.SUB_TEXT }}>{convertSecondToMinute(props.currentTime)}</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{ ...fontMedium, color: modules.SUB_TEXT }}>- {convertSecondToMinute(props.duration - props.currentTime)}</Text>
                            </View>
                            <Slider
                                onSlidingComplete={(value: any) => props.onEndScroll(value)}
                                onSlidingStart={() => props.onStartScroll()}
                                value={props.currentTime}
                                containerStyle={styles.slider_main}
                                maximumValue={Math.max(props.duration)}
                                minimumTrackTintColor={modules.WHITE}
                                maximumTrackTintColor={modules.TEXT}
                                thumbTintColor={modules.WHITE}
                                thumbStyle={{ width: 15, height: 15 }}
                                trackClickable
                                animationType={'timing'}

                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: modules.BODY_HORIZONTAL_24, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => props.setIsVisibleModalDescription(!props.isVisibleModalDescription)} style={{ padding: modules.BODY_HORIZONTAL_12 / 2 }}>
                                    <MaterialCommunityIcons style={{ fontSize: modules.FONT_H2 }} name={'information-outline'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => props.setIsVisibleModalAudio(!props.isVisibleModalAudio)} style={{ padding: modules.BODY_HORIZONTAL_12 / 2 }}>
                                    <MaterialIconsIcon style={{ fontSize: modules.FONT_H2 }} name={'playlist-play'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setToggleSound(!toggleSound)} style={[toggleSound ? styles.buttonSound : styles.buttonSoundToggled]}>
                                    <Icon style={{ fontSize: modules.FONT_H2 }} name={'volume-2'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setToggleSpeed(!toggleSpeed)} style={[toggleSpeed ? styles.buttonSound : styles.buttonSoundToggled]}>
                                    <MaterialCommunityIcons style={{ fontSize: modules.FONT_H2 }} name={'play-speed'} />
                                </TouchableOpacity>
                            </View>

                            {
                                toggleSound ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: modules.BODY_HORIZONTAL_24 }}>
                                        <Slider
                                            // onSlidingComplete={(value) => this.onEndScroll(value)}
                                            // onSlidingStart={() => this.onStartScroll()}
                                            value={props.volume}
                                            containerStyle={styles.slider}
                                            maximumValue={maximumVolume}
                                            minimumTrackTintColor={modules.WHITE}
                                            maximumTrackTintColor={modules.TEXT}
                                            thumbTintColor={modules.WHITE}
                                            // thumbImage={props.bigVolumeIcon?.uri}
                                            thumbTouchSize={{ height: 1, width: 1 }}
                                            onValueChange={(e) => props.onVolumeChange(e)}
                                            onSlidingComplete={() => props.onChangeVolumeDone()}
                                        />
                                        <TouchableOpacity onPress={() => setToggleSound(false)} style={{ marginLeft: modules.BODY_HORIZONTAL_12 }}>
                                            <Icon style={{ fontSize: modules.FONT_H2 }} name={"x-circle"} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            }

                            {
                                toggleSpeed ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: modules.BODY_HORIZONTAL_24, paddingTop: modules.BODY_HORIZONTAL_12 }}>
                                        <TouchableOpacity onPress={() => setSpeedAudio(0.25)} style={speed === 0.25 ? styles.speedBoxActive : styles.speedBox}>
                                            <Text style={{ ...fontMedium }}>0.25x</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setSpeedAudio(0.50)} style={speed === 0.50 ? styles.speedBoxActive : styles.speedBox}>
                                            <Text style={{ ...fontMedium }}>0.5x</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setSpeedAudio(1)} style={speed === 1 ? styles.speedBoxActive : styles.speedBox}>
                                            <Text style={{ ...fontMedium }}>Normal</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setSpeedAudio(1.5)} style={speed === 1.5 ? styles.speedBoxActive : styles.speedBox}>
                                            <Text style={{ ...fontMedium }}>1.5x</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setSpeedAudio(2)} style={speed === 2 ? styles.speedBoxActive : styles.speedBox}>
                                            <Text style={{ ...fontMedium }}>2x</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            }
                            <SafeArea edges={'safeBottom'} />
                        </View>
                    </View>
                </View >
                <BlurView style={styles.absolute} blurType="light" blurAmount={30} />
                <ModalCenterAdjustment
                    onBackdropPress={() => props.setIsVisibleModalDescription(!props.isVisibleModalDescription)}
                    onPress={() => { }}
                    isVisible={props.isVisibleModalDescription}
                    onOpenModal={() => props.setIsVisibleModalDescription(false)}
                    description={props.descriptionBook}
                />
                <ModalPlayList
                    onBackdropPress={(type) => props.setIsVisibleModalAudio(type)}
                    onPress={(item: any, index: any) => props.onAudioInModalPress(item, index)}
                    isVisible={props.isVisibleModalAudio}
                    onOpenModal={(type) => props.setIsVisibleModalAudio(type)}
                    arrayAudio={props.arrayAudio}
                    bookName={props.bookTitle}
                    isPlayIndex={props.playingAudio}
                />

            </FastImage>
        </View>
    )
}

export default ReadBookScreen

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    backIcon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H3
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: `${modules.PRIMARY}10`,
        zIndex: 0
    },
    slider: {
        flex: 1

    },
    slider_main: {
        // flex: 1,
        borderRadius: 0,
        marginHorizontal: modules.BODY_HORIZONTAL_12
        // backgroundColor: modules.BLUE

    },
    thumb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: modules.TEXT,
    },
    buttonSound: {
        backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 200, padding: modules.BODY_HORIZONTAL_12 / 2
    },
    buttonSoundToggled: {
        backgroundColor: 'transparent', borderRadius: 200, padding: modules.BODY_HORIZONTAL_12 / 2
    },
    speedBox: {
        padding: modules.BODY_HORIZONTAL_12 / 2, borderRadius: modules.RADIUS
    },
    speedBoxActive: {
        backgroundColor: 'rgba(255,255,255,0.3)', padding: modules.BODY_HORIZONTAL_12 / 2, borderRadius: modules.RADIUS
    },
    calmModeBtn: {
        marginRight: modules.BODY_HORIZONTAL_24,
        padding: modules.BODY_HORIZONTAL_12 / 2,
        borderRadius: modules.RADIUS
    },
    backgroundVideo: {
        height: height,
        alignItems: "stretch",
    },
})
