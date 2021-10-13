import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationV5Props, switchRoute } from 'routes/RouteFun';
import { AuthStore } from 'stores/auth.store';

interface Props extends NavigationV5Props {
    auth: AuthStore
}

interface State {
}

@inject('auth')
@observer
export default class WelcomeContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
        // this constructor work initial 
        this.props.auth.canActive()
        this.props.navigation.reset(switchRoute("HOME_STACK"))
    }

    componentDidMount() { }

    render() {
        return (
            <></>
        );
    }
}
