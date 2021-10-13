import config from "./config.store";
import App from "./setup.store";

function boot() {
	const stores = config();
	return App(stores);
}
export default boot

