import { observable } from "mobx";

export class PlayerControlStore {
    @observable book: any = null;
    @observable track: any = null;
    @observable soundPointer: any = null;

    // load(book: any, trackIndex: number) {
    //     const track = zget(book, ['tracks', trackIndex]);
    //     if (!book || !track || !track.link) {
    //         return;
    //     }

    //     if (this.soundPointer) {
    //         if (this.soundPointer._filename === track.link) {
    //             this.togglePlay();
    //             return;
    //         } else {
    //             this.unloadAudio();
    //         }
    //     }

    //     track.index = trackIndex;
    //     this.book = book;
    //     this.track = track;

    //     dispatch('LOAD_AUDIO', {
    //         book,
    //         track,
    //     });
    //     this.soundPointer = new Sound(track.link, '', this.onLoadAudio.bind(this));
    // },

    // getCurrentTime() {
    //     return new Promise(resolve => {
    //         if (!this.soundPointer) {
    //             resolve(0);
    //         }
    //         this.soundPointer.getCurrentTime(seconds =>
    //             resolve(parseInt(seconds, 10)),
    //         );
    //     });
    // },

    // playAudio() {
    //     if (!this.soundPointer) {
    //         return;
    //     }
    //     dispatch('PLAY_AUDIO', {
    //         duration: parseInt(this.soundPointer.getDuration(), 10),
    //     });
    //     this.soundPointer.play(this.onPlayEnd.bind(this));
    // },

    // pauseAudio() {
    //     if (!this.soundPointer) {
    //         return;
    //     }
    //     dispatch('PAUSE_AUDIO');
    //     this.soundPointer.pause();
    // },

    // onPlayEnd(success) {
    //     if (success) {
    //         dispatch('PLAY_AUDIO_ENDED');
    //         const nextTrackIndex = this.track.index + 1;
    //         const nextTrack = zget(this.book, ['tracks', nextTrackIndex]);
    //         if (nextTrack && nextTrack.link) {
    //             this.load(this.book, nextTrackIndex);
    //         }
    //     }
    // },

    // onLoadAudio(error) {
    //     if (error) {
    //         dispatch('LOAD_AUDIO_ERROR');
    //         return;
    //     }
    //     this.playAudio();
    // },

    // togglePlay() {
    //     if (!this.soundPointer) {
    //         return;
    //     }
    //     if (this.soundPointer._playing) {
    //         this.pauseAudio();
    //     } else {
    //         this.playAudio();
    //     }
    // },

    // stop() {
    //     if (!this.soundPointer) {
    //         return;
    //     }
    //     this.soundPointer.stop();
    // },

    // unloadAudio() {
    //     dispatch('UNLOAD_AUDIO');
    //     if (this.soundPointer) {
    //         this.soundPointer.stop();
    //         this.soundPointer.release();
    //         this.soundPointer.reset();
    //         this.soundPointer = null;
    //     }
    // },
}