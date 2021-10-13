import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import ShadowView from 'react-native-simple-shadow-view'
import Carousel from 'react-native-snap-carousel'
import modules from '../modules'
import { fontGeorgiaBold, fontSemiBold } from '../../functions/customFont'
import MainButton from './MainButton'
import FastImage from 'react-native-fast-image'
import TransformFastImage from './TransformFastImage'

interface Props {
    items: any[]
    onPress: (item: any) => void
}

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const Slide = (props: Props) => {

    const renderItem = (item: any, color?: string) => {
        return (
            <View key={item.key}>
                <Text style={[styles.typeText, color ? { color: color } : null]}>{item.featureStatus}</Text>
                <Text
                    numberOfLines={2}
                    style={[styles.titleText, color ? { color: color } : null]}>{item.name}</Text>
                <MainButton
                    onPress={() => props.onPress(item)}
                    component={
                        <View
                            style={{ paddingTop: modules.BODY_HORIZONTAL }}>
                            <ShadowView style={{
                                borderRadius: modules.RADIUS,
                                shadowColor: 'rgba(0,0,0,.5)',
                                shadowOffset: {
                                    width: 0,
                                    height: 8
                                },
                                shadowRadius: 6,
                                shadowOpacity: 0.8,
                                elevation: 8,
                            }}>
                                <FastImage
                                    source={{ uri: item.fileDetail.downloadUrl }}
                                    style={{
                                        borderRadius: modules.RADIUS,
                                        height: modules.VIEW_PORT_WIDTH / 1.8,
                                        width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL_ACTION * 2
                                    }} />
                            </ShadowView>
                        </View>
                    }
                />
            </View>
        )
    }


    return (
        <Carousel
            contentContainerCustomStyle={{ paddingVertical: modules.BODY_HORIZONTAL_24 }}
            data={props.items}
            renderItem={({ item }) => renderItem(item)}
            sliderWidth={SCREEN_WIDTH}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            itemWidth={SCREEN_WIDTH - modules.BODY_HORIZONTAL_ACTION * 1.5}
        />
    )
}

export default Slide;

const styles = StyleSheet.create({
    typeText: {
        color: modules.DARKBLUE,
        textTransform: 'uppercase',
        fontSize: modules.FONT_P,
        marginBottom: modules.BODY_HORIZONTAL_12 / 2,
        ...fontGeorgiaBold,
        marginTop: modules.BODY_HORIZONTAL_12,
    },
    titleText: {
        fontSize: modules.FONT_H3,
        ...fontGeorgiaBold,
        marginRight: modules.BODY_HORIZONTAL_12,
        flex: 1,
        height: modules.BODY_HORIZONTAL_24 * 2.3,
        color: modules.TEXT,
    },
})
