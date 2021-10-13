import React from 'react'
import { View, FlatList } from 'react-native'
import { styles } from './GeoStyle'
import SafeArea from '../../components/SafeArea'
import _styles from '../../_styles'
import SearchHeader from '../../components/SearchHeader'
import Location from 'components/Location'
import { GEO_PROVINCE } from 'dummy'

interface Props {
    goBack: () => void,
    onSelect: (i: any) => void,
    data: any[]
    loading: boolean
    title: string
    onSearch: (t: string) => void
}

const GeoSelectorScreen = ({ goBack, onSelect, onSearch, data }: Props) => {
    return (
        <View style={styles.container}>
            <SafeArea edges={"safe"} style={_styles.flx1}>
                <SearchHeader onChangeText={onSearch} goBack={() => goBack()} />
                <FlatList
                    style={styles.tab_container}
                    data={data}
                    keyExtractor={(item) => item.key.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ height: 50 }} />
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <Location
                                key={index}
                                item={item}
                                selected={false}
                                onClick={(item) => { onSelect(item), console.log('item :>> ', item); }}
                            />
                        )
                    }}>
                </FlatList>
            </SafeArea>
        </View >
    )
}

export default GeoSelectorScreen