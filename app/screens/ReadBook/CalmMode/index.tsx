import modules from 'modules';
import * as React from 'react';
import { NavigationV5Props } from 'routes/RouteFun';
import CalmModeScreen from './CalmModeScreen'
interface Props extends NavigationV5Props {
}

interface State {
}

export default class CalmModeContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <CalmModeScreen
                goBack={() => this.props.navigation.goBack()}
            />
        );
    }
}
