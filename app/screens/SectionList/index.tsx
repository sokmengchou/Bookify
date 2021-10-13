//import liraries
import React, { Component } from 'react';
import SectionListScreen from './SectionListScreen';
import { inject, observer } from 'mobx-react';
import { ExploreStore } from '../../stores/explore.store';
import { NavigationV5Props } from 'routes/RouteFun';

// create a component
interface Props extends NavigationV5Props {
    explore: ExploreStore
}

@inject("explore")
@observer
class SectionListContainer extends Component<Props> {

    _onSeeAll = (sectionKey: string, title: string, type?: string) => {
        const { isBook } = this.props?.route?.params || {};
        if (isBook) {
            this.props.navigation.navigate("LIST_BOOK", { sectionKey: sectionKey, title: title, listingType: type })
        } else {
            this.props.navigation.navigate("LIST_AUDIO", { sectionKey: sectionKey, title: title, listingType: type })
        }
    }

    componentDidMount() {
        this.props.explore.fetchFullSection(this.props?.route?.params?.type)
    }

    render() {
        const { type } = this.props?.route?.params || {};
        const { fullSectionData, loadingFullSection } = this.props.explore
        return (
            <SectionListScreen
                loading={loadingFullSection}
                onSeeAll={(item, title, _type) => this._onSeeAll(item, title, type == "genre" ? "GENRE" : _type)}
                goBack={() => this.props.navigation.goBack()} title={this.props?.route?.params?.type.toUpperCase()} data={fullSectionData} />
        );
    }
}


//make this component available to the app
export default SectionListContainer;
