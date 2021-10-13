import * as React from 'react';
import { NavigationV5Props } from 'routes/RouteFun';
import HistoryScreen from './HistoryScreen';

export interface Props extends NavigationV5Props {
}

export interface State {
}

export default class HistoryContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (
            <HistoryScreen />
        );
    }
}
