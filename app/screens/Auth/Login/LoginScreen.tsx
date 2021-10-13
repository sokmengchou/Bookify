import SafeArea from 'components/SafeArea'
import { fontMedium,fontGeorgiaBold } from 'functions/customFont'
import modules from 'modules'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import lotties from 'modules/lotties'

interface Props {
    goBack: () => void
    onPress: () => void
}

const LoginScreen = (props: Props) => {
    return (
        <View style={{ flex: 1, backgroundColor: modules.WHITE }}>
            <SafeArea edges={'safeTop'} />
            <TouchableOpacity
                onPress={() => props.goBack()}
                style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: modules.TEXT, justifyContent: "center", alignItems: "center", marginLeft: modules.BODY_HORIZONTAL_24 }}>
                <Icon style={styles.backIcon} name={"chevron-left"} />
            </TouchableOpacity>
            <Swiper
                style={styles.wrapper}
                loop={true}
                paginationStyle={{ paddingHorizontal: modules.BODY_HORIZONTAL_24 }}
                dotStyle={{ flex: 1 }}
                activeDotStyle={{ flex: 1, backgroundColor: modules.ACTIVE }}
            >
                <View style={styles.slide1}>
                    <FastImage source={modules.LOGO_NO_TEXT} style={{ width: modules.VIEW_PORT_WIDTH / 2, height: modules.VIEW_PORT_WIDTH / 2 }} />
                    <Text style={styles.text}>BOOKIFY</Text>
                    <Text style={styles.sub_text}>Audiobooks are for people who hate reading and for those of us who love listening</Text>
                </View>
                <View style={styles.slide2}>
                    <View style={{ width: modules.VIEW_PORT_WIDTH / 2, height: modules.VIEW_PORT_WIDTH / 2 }}>
                        <LottieView style={{ width: '100%' }} source={lotties.BOOK_ANIMATION} autoPlay loop />
                    </View>
                    <Text style={styles.text}>The Book Store</Text>
                    <Text style={styles.sub_text}>Discover the best audiobooks to listen right now including trending titles, bookseller recommendations, new releases and more</Text>

                </View>
                <View style={styles.slide3}>
                    <View style={{ width: modules.VIEW_PORT_WIDTH / 2, height: modules.VIEW_PORT_WIDTH / 2 }}>
                        <LottieView style={{ width:'100%' }} source={lotties.FILTER_ANIMATION} autoPlay loop />
                    </View>
                    <Text style={styles.text}>Simple & Easy</Text>
                    <Text style={styles.sub_text}>With Bookify, we provide you a punch of feature to make your listening experience better</Text>

                </View>
            </Swiper>
            <View>
                <TouchableOpacity onPress={() => props.onPress()} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: modules.ACTIVE, marginHorizontal: modules.BODY_HORIZONTAL_24, borderRadius: modules.RADIUS * 2, paddingVertical: modules.BODY_HORIZONTAL_12 }}>
                    <FastImage source={modules.GOOGLE_LOGO} style={{ width: modules.VIEW_PORT_WIDTH / 10, height: modules.VIEW_PORT_WIDTH / 10 }} />
                    <Text style={{ ...fontGeorgiaBold, color: modules.WHITE, marginLeft: modules.BODY_HORIZONTAL_12 }}>
                        Sign In With Google
                    </Text>
                </TouchableOpacity>
            </View>
            <SafeArea edges={'safeTop'} />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: modules.BODY_HORIZONTAL_12
        // backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#92BBD9'
    },
    text: {
        color: modules.TEXT,
        fontSize: 30,
        ...fontGeorgiaBold
    },
    sub_text: {
        color: modules.SUB_TEXT,
        fontSize: modules.FONT_H4,
        marginTop: modules.BODY_HORIZONTAL_24,
        ...fontMedium,
        textAlign: 'center'
    },
    backIcon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H3
    },
})
