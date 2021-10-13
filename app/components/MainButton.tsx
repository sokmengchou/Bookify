import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import TouchableScale from './TouchableScale';

interface Props {
    onPress:() => void
    component:any
    style?:any
    disabled?:boolean
}

const onPress = (ref: any, props: Props) => {
    ref.pulse(250).then((endState: any) => props.onPress());
}

const MainButton = (props:Props) => {
    var buttonRef:any = null
    return (
        <Animatable.View
        ref = {(ref) => buttonRef = ref}
        >
           <TouchableScale
           disabled = {props.disabled}
           style = {{...props.style}}
        //    activeOpacity = {1}
           onPress = {() => onPress(buttonRef,props)}
           >
            {props.component}
           </TouchableScale>
        </Animatable.View>
    )
}

export default MainButton