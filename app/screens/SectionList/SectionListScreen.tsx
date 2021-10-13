//import liraries
import ViewCard from 'components/ViewCard';
import React from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import SectionList from '../../components/SectionList';
import _styles from '../../_styles';

interface Props {
    data: any[]
    goBack: () => void
    title: string
    onSeeAll: (item: any, title: string, type?: string) => void
    loading: boolean
}

// create a component
const SectionListScreen = (props: Props) => {
    return (
        <ViewCard style={{ flex: 1 }}>
            <SafeAreaView />
            {
                props.loading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={"large"} />
                </View> :
                    <SectionList seeMore={() => null} onBack={() => props.goBack()} isFull onPress={(section) => props.onSeeAll(section.key, section.name)} data={props.data} title={props.title} />
            }
        </ViewCard>
    );
};
// define your styles
//make this component available to the app
export default SectionListScreen;
