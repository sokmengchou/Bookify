import { AudioStore } from "stores/audio.store";
import { AuthStore } from "stores/auth.store";
import { BookStore } from "stores/book.store";
import { ExploreStore } from "stores/explore.store";
import { ListingStore } from "stores/listing.store";
import { PlayerControlStore } from "stores/playerControl.store";
import { ReadStore } from "stores/read.store";

function config() {
	return {
		auth: new AuthStore(),
		audio: new AudioStore(),
		explore: new ExploreStore(),
		book: new BookStore(),
		read: new ReadStore(),
		playerControl: new PlayerControlStore(),
		listing: new ListingStore()
	};
}
export default config
