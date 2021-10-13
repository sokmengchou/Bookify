import { inject, observer } from 'mobx-react';
import React, { Component } from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import { ReadStore } from 'stores/read.store';
import ReadBookScreen from './ReadBookScreen'
import { checkAudioFileExist, downloadAudio } from 'services/download.service';
import Sound from 'react-native-sound'
import moment from 'moment';
import { is } from '@babel/types';

interface Props extends NavigationV5Props {
    read: ReadStore
}

interface State {
    coverBook: []
    author: any
    currentTime: number
    paused: boolean
    playingAudio: number
    volume: number | undefined
    loading: boolean
    loadingPlaying: boolean
    audios: []
    duration: number | undefined
    speed: number | undefined
    isVisibleModalDescription: boolean
    isVisibleModalAudio: boolean
    isCalmMode: boolean
}

@inject('read')
@observer


export default class ReadBookContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            coverBook: [],
            author: {},
            currentTime: 0,
            paused: true,
            playingAudio: 0,
            volume: 1,
            loading: false,
            loadingPlaying: false,
            audios: [],
            duration: 0,
            speed: 1,
            isVisibleModalDescription: false,
            isVisibleModalAudio: false,
            isCalmMode: false
        }
    }
    private tickInterval: any;
    private recordListenTime: any;
    private SoundPlayer: Sound | null = null;


    componentDidMount() {
        const { selectedBook } = this.props?.read
        this.setState({ audios: selectedBook?.audioFileDetail })
        const { coverBook, author } = this.props.route.params || {};
        this.setState({ coverBook: coverBook, author: author })

        const currentTime = selectedBook.audio?.time || 0
        const playingAudio: any = this.props?.route?.params?.playingAudio || 0
        // console.log(`playingAudio`, playingAudio)
        this.setState({ playingAudio: playingAudio })
        this.nextAudio(this.state.playingAudio, currentTime)
        const speed = this.SoundPlayer?.getSpeed();
        const volume = this.state.volume;

        this.setState({ speed: speed, volume: volume })
    }

    componentWillUnmount() {
        clearInterval(this.tickInterval)
        clearInterval(this.recordListenTime)
        this.SoundPlayer && this.SoundPlayer.stop()
        this.SoundPlayer = null;
    }



    _onVolumeChange = (e: any) => {
        const convertToNumber = e[0]
        this.setState({ volume: convertToNumber })
        this.SoundPlayer?.setVolume(convertToNumber)
    }

    _onChangeVolumeDone = () => {
    }

    tick() {
        if (!this.SoundPlayer) { return }
        this.SoundPlayer.getCurrentTime((seconds: any) => {
            if (this.tickInterval) {
                this.setState({
                    currentTime: seconds,
                }, () => {
                    // this.props.onRecord(this.state.playingAudio, this.state.currentTime);
                });
            }
        });
    }

    pause() {
        // this.props.onRecord(this.state.playingAudio, this.state.currentTime);
        this.tickInterval = setInterval(() => { this.tick(); }, 100);
        this.SoundPlayer?.pause((success: any) => {
            this.setState({ paused: true }, () => {
                if (success) {
                    if (this.tickInterval) {
                        clearInterval(this.tickInterval);
                        clearInterval(this.recordListenTime);
                        this.tickInterval = null;
                    }
                } else {
                    if (this.tickInterval) {
                        clearInterval(this.tickInterval);
                        clearInterval(this.recordListenTime);
                        this.tickInterval = null;
                    }
                }
            })
        })
    }

    async nextAudio(playingAudio?: number, currentTime?: number) {
        if (this.state.loadingPlaying) { return }
        this.setState({ loadingPlaying: true }, () => {
            const audio: any = this.state?.audios[playingAudio || this.state?.playingAudio]
            const url = audio?.downloadUrl
            const filename = audio?.filename
            const key = audio?.key
            checkAudioFileExist(filename, key, (existedPath => {
                // _unmount = true
                if (!existedPath) {
                    downloadAudio(url, filename, key, ((received, total) => { }), filePath => this.start(filePath, currentTime || 0))
                } else {
                    this.start(existedPath, currentTime || 0)
                }
            }));
        })
    }

    start = (localUrl: string, currentTime: number) => {
        // this.props.onRecord(this.state.playingAudio, this.state.currentTime);
        this.SoundPlayer = new Sound(`${localUrl}`, "", (error: any) => {
            if (error) {
                console.log('localUrl', localUrl)
                console.log('failed to load the sound', error);
                return;
            }
            const duration = this.SoundPlayer?.getDuration();
            this.SoundPlayer?.setCurrentTime(currentTime)
            this.SoundPlayer?.setSpeed(this.state.speed || 1)
            this.setState({ loading: false, loadingPlaying: false });
            this.setState({ duration: duration }, () => this.play());
        });
    }

    play = () => {
        // this.props.onRecord(this.state.playingAudio, this.state.currentTime);
        this.setState({ paused: false }, () => {
            this.tickInterval = setInterval(() => { this.tick(); }, 100);
            this.SoundPlayer?.play((success: any) => {
                if (success) {
                    if (this.state.playingAudio + 1 === this.state.audios.length) {
                        clearInterval(this.tickInterval);
                        clearInterval(this.recordListenTime);
                        this.setState({ paused: true }, () => this.finishedListen());
                        this.tickInterval = null;
                        return
                    }
                    if (this.tickInterval) {
                        clearInterval(this.tickInterval);
                        clearInterval(this.recordListenTime);
                        this.setState({ playingAudio: this.state.playingAudio + 1 }, () => this.nextAudio());
                        this.tickInterval = null;
                        return
                    }
                } else {
                    if (this.tickInterval) {
                        clearInterval(this.tickInterval);
                        clearInterval(this.recordListenTime);
                        this.tickInterval = null;
                    }
                    console.log('error');
                }
            })
        });
    }

    async finishedListen() {
        const audio: any = this.state.audios[this.state.playingAudio]
        const url = audio.downloadUrl
        const filename = audio.filename
        const key = audio.key
        checkAudioFileExist(filename, key, (existedPath => {
            if (!existedPath) {
                downloadAudio(url, filename, key, ((received, total) => { }), filePath => this.continue(filePath))
            } else {
                this.continue(existedPath)
            }
        }));
    }

    continue = (localUrl: string) => {
        // this.props.onRecord(this.state.playingAudio, this.state.currentTime);
        this.SoundPlayer = new Sound(`${localUrl}`, "", (error: any) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            const duration = this.SoundPlayer?.getDuration();
            this.setState({ loading: false });
            this.setState({ duration: duration });
        });
    }

    onEndScroll(value: number[]) {
        const valueConverted = value[0]
        // console.log(`valueConverted`, valueConverted)
        this.SoundPlayer?.setCurrentTime(valueConverted);
        this.play();
    }

    _onStartScroll = () => {
        this.pause();
    }

    _onSeekBack = () => {
        this.SoundPlayer?.getCurrentTime((response) => {
            this.SoundPlayer?.setCurrentTime(response - 5);
        })

    }

    _onSeekForward = () => {
        this.SoundPlayer?.getCurrentTime((response) => {
            this.SoundPlayer?.setCurrentTime(response + 10);
        })
    }

    _onSetSpeed = (speedRequest: number) => {
        this.setState({ speed: speedRequest })
        switch (speedRequest) {
            case 0.25:
                // console.log('0.5');
                this.SoundPlayer?.setSpeed(0.25)
                break;
            case 0.5:
                // console.log('0.75');
                this.SoundPlayer?.setSpeed(0.5)
                break;
            case 1:
                // console.log('1');
                this.SoundPlayer?.setSpeed(1)
                break;
            case 1.5:
                // console.log('1.25');
                this.SoundPlayer?.setSpeed(1.5)
                break;
            case 2:
                // console.log('1.5');
                this.SoundPlayer?.setSpeed(2)
                break;
        }
        // this.SoundPlayer?.setSpeed(speedRequest || 1)
    }

    _onAudioInModalPress = (item: any, index: number) => {
        clearInterval(this.tickInterval)
        clearInterval(this.recordListenTime)
        this.SoundPlayer && this.SoundPlayer.stop()
        this.SoundPlayer = null;
        this.setState({ isVisibleModalAudio: false })
        this.nextAudio(index, 0)
    }

    _goCalmMode = () => {


    }

    render() {
        const { selectedBook } = this.props?.read
        const { name, shortDescription, audioFileDetail } = selectedBook || {}
        // console.log(`playingAudio`, this.state.playingAudio)
        return (
            <ReadBookScreen
                book={selectedBook}
                goBack={() => this.props.navigation.goBack()}
                goCalmMode={() => this._goCalmMode()}
                coverBook={this.state.coverBook}
                author={this.state.author}
                bookTitle={name}
                descriptionBook={shortDescription}
                arrayAudio={audioFileDetail}
                onVolumeChange={(e) => { this._onVolumeChange(e) }}
                onChangeVolumeDone={() => this._onChangeVolumeDone()}
                currentTime={this.state.currentTime}
                onStartScroll={() => this._onStartScroll()}
                paused={this.state.paused}
                seekBack={() => this._onSeekBack()}
                goPause={() => this.pause()}
                seekForward={() => this._onSeekForward()}
                goPlay={() => this.play()}
                volume={this.state.volume}
                duration={this.state.duration || 0}
                onEndScroll={(value) => this.onEndScroll(value)}
                onSetSpeed={(speedRequest) => this._onSetSpeed(speedRequest)}
                playingAudio={this.state.playingAudio}
                onAudioInModalPress={(item, index) => this._onAudioInModalPress(item, index)}
                isVisibleModalDescription={this.state.isVisibleModalDescription}
                setIsVisibleModalDescription={(visible: boolean) => this.setState({ isVisibleModalDescription: visible })}
                isVisibleModalAudio={this.state.isVisibleModalAudio}
                setIsVisibleModalAudio={(visible: boolean) => this.setState({ isVisibleModalAudio: visible })}
                isCalmMode={this.state.isCalmMode}
                setCalmMode={(calm: boolean) => this.setState({ isCalmMode: calm })}
            />
        )
    }
}
