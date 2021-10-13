import { Provider } from 'mobx-react';
import * as React from 'react';
import { ActivityIndicator, LogBox, StatusBar } from 'react-native';
// Lazy load component
const Routes = React.lazy(() => import("routes"))

export interface Props { }

export interface State {
	ready: boolean;
}

LogBox.ignoreLogs(['Warning: componentWill']);
function App(stores: any) {
	return class App extends React.Component<Props, any> {
		constructor(props: Props) {
			super(props);
			this.state = {
				ready: true
			}
		}

		componentDidMount() {
			StatusBar.setBarStyle('dark-content')
		}

		render() {
			const { ready } = this.state
			if (!ready) { return <ActivityIndicator /> }
			return (
				<Provider {...stores}>
					<React.Suspense fallback={true}>
						<Routes />
					</React.Suspense>
				</Provider>
			);
		}
	}
}

export default App
