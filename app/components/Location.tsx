import { fontMedium } from 'functions/customFont';
import modules from 'modules';
import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export interface AppProps {
    item: any,
    onClick: (item: any) => void;
    selected: boolean;
}

export default ({ onClick, item, selected }: AppProps) => {
    return (
        <TouchableOpacity onPress={() => onClick(item)} style={styles.verticalBlock}>
            <Icon name={'ios-location-sharp'} style={styles.locationIcon} />
            <View style={styles.locationNameAndTick}>
                <Text style={{ flex: 1, ...fontMedium }}>{item.NameKh}</Text>
                <TouchableOpacity onPress={() => onClick(item)}>
                    {selected ? <Icon style={[styles.iconTick, { color: modules.BLUE }]} name={"checkmark-circle-sharp"} /> :
                        <Icon style={styles.iconTick} name={"ellipse-outline"} />}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    verticalBlock: {
        flexDirection: 'row',
        paddingLeft: modules.PADDING,
        alignItems: 'center'
    },
    locationIcon: {
        fontSize: modules.FONT_H4,
        marginRight: modules.PADDING / 2
    },
    locationNameAndTick: {
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: modules.BACKGROUND_NEW_COLOR,
        borderBottomWidth: 1,
        paddingVertical: modules.PADDING,
        paddingRight: modules.PADDING
    },
    iconTick: {
        fontSize: modules.FONT_H3,
        color: modules.SUB_TITLE
    }
});
