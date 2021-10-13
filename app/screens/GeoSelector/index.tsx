import { NavigationProp } from '@react-navigation/core'
import React, { Component } from 'react'
import GeoSelectorScreen from './GeoSelectorScreen'
import { createFilter } from 'react-native-search-filter'
import EnvironmentStore from 'services/environment.store'
import { GEO_PROVINCE } from 'dummy'

interface Props {
    navigation: NavigationProp<any>
    route: any
    env: EnvironmentStore
}

interface State {
    loading: boolean
    data: any[]
    filterData: any[]
    searchText: string

}
const KEYS_TO_FILTERS = ['name', 'en_name', "code", "key", "id", "en_short_name", "khmer_name"];

export default class GeoSelectorContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            filterData: [],
            loading: true,
            searchText: ""
        }
    }

    componentDidMount() {
        this.setState({ data: GEO_PROVINCE })
    }

    _onSelectedGeo = (item: any) => {
        const { callback }: any = this.props.route?.params || {}
        callback(item);
        this.props.navigation.goBack()
    }

    filterItems = (text: string) => {
        this.setState({ searchText: text })
        const filteredItems = this.state.data.filter((m: any) => m.name?.includes(text) || m.en_name?.includes(text))
        this.setState({ filterData: filteredItems })
    }

    render() {
        const { title } = this.props.route?.params || {}
        const filtered = this.state.data ? this.state.data.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS)) : null

        return (
            <GeoSelectorScreen
                onSearch={this.filterItems}
                title={title}
                loading={this.state.loading}
                data={this.state.searchText ? filtered || [] : this.state.data}
                onSelect={this._onSelectedGeo}
                goBack={() => this.props.navigation.goBack()}
            />
        )
    }
}
