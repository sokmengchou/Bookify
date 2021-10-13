import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationV5Props } from 'routes/RouteFun';
import FavoriteScreen from './FavoriteScreen';

export interface Props extends NavigationV5Props {
}

export interface State {
}

export default class FavoriteContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <FavoriteScreen />
        );
    }
}
