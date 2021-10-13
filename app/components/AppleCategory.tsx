//import liraries
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ViewCard from './ViewCard';
import FastImage from 'react-native-fast-image';
import ShadowView from 'react-native-simple-shadow-view';
import { fontGeorgiaBold, fontMedium } from '../../functions/customFont';
import modules from '../modules';
import _styles from '../_styles';
import MainButton from './MainButton';

interface Props {
    data: any[]
    onPress: (item: any) => void
    title: string
    subTitle: string
}

// create a component
const AppleCategory = (props: Props) => {
    return (
        <ViewCard>
            <Text style={styles.sectionTitle}>{props.title}</Text>
            <Text style={styles.sectionSubTitle}>{props.subTitle}</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={props.data}
                style={styles.exploreBookContainer}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => {
                    return (
                        <ShadowView style={_styles.shadow}>
                            <MainButton
                                onPress={() => props.onPress(item)}
                                component={
                                    <View
                                        style={styles.trainingButton}>
                                        <View style={styles.leftTraining}>
                                            <Text style={styles.trainingTitle}>{item.name}</Text>
                                            <Text style={styles.description}>{item.featureStatus}</Text>
                                        </View>
                                        <View style={styles.rightTraining}>
                                            <FastImage resizeMode={"contain"} style={{ width: 160, height: 130 }} source={{ uri: item.fileDetail.downloadUrl }} />
                                        </View>
                                    </View>
                                }
                            />
                        </ShadowView>
                    )
                }}
            />
        </ViewCard>
    );
};

// define your styles
const styles = StyleSheet.create({
    exploreBookContainer: {
        paddingVertical: modules.BODY_HORIZONTAL_24
    },
    sectionTitle: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H4,
        marginTop: modules.BODY_HORIZONTAL_18,
        marginLeft: modules.BODY_HORIZONTAL_24,

    },
    sectionSubTitle: {
        flex: 1,
        ...fontMedium,
        fontSize: modules.FONT,
        marginHorizontal: modules.BODY_HORIZONTAL_24,
        color: modules.TEXT_NOTE,
        marginTop: modules.BODY_HORIZONTAL_12 / 2

    },

    trainingHeaderTitle: {
        marginLeft: modules.BODY_HORIZONTAL_12,
        marginTop: modules.BODY_HORIZONTAL_12,
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H3,
        marginBottom: modules.BODY_HORIZONTAL_12,
    },
    description: {
        ...fontMedium,
        fontSize: modules.FONT_S
    },
    trainingTitle: {
        ...fontGeorgiaBold,
        fontSize: modules.FONT_H5,
        flex: 1,
    },
    trainingButton: {
        width: modules.VIEW_PORT_WIDTH - 80,
        height: 150,
        backgroundColor: modules.WHITE,
        marginHorizontal: modules.BODY_HORIZONTAL_24,
        borderRadius: modules.CARD_RADIUS,
        borderColor: modules.BORDER_COLOR,
        borderWidth: 0.5,
        flexDirection: "row",
        overflow: "hidden"
    },
    leftTraining: {
        width: modules.VIEW_PORT_WIDTH / 2.5,
        padding: modules.BODY_HORIZONTAL_18,
    },
    rightTraining: {
        flex: 1,
        alignItems: "flex-end",
        position: "absolute",
        bottom: -10,
        right: 0,
    },

});

//make this component available to the app
export default AppleCategory;
