import * as React from 'react'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { ImageSizeType, TransformImage } from '../services/format.service'
import { StyleProp, View } from 'react-native'
import modules from '../modules'
import { Placeholder, ShineOverlay, PlaceholderLine } from 'rn-placeholder'

interface Props {
    size: ImageSizeType
    storagePath: string
    resizeMode?: FastImage.ResizeMode
    fallback?: boolean
    style?: StyleProp<ImageStyle>
}

function TransformFastImage(props: Props) {
    const [uri, setUri] = React.useState<string>('')

    React.useEffect(() => {
        const { size, storagePath } = props
        let _mounted: boolean = true
        TransformImage(storagePath, size).then(url => {
            if (_mounted) setUri(url)
        });
        return () => { _mounted = false }
    }, [])
    if (!uri) return (
        <View {...props}>
            <View style={{ backgroundColor: modules.BORDER_COLOR, flex: 1 }}>
                <Placeholder style={{ width: '100%', height: '100%' }} Animation={ShineOverlay}>
                    <PlaceholderLine style={{ width: '100%', height: '100%' }} noMargin />
                </Placeholder>
            </View>
        </View>
    )
    return (
        <FastImage
            {...props}
            source={{ uri: uri }}
        />
    )
}

export default React.memo(TransformFastImage)