import { inject, observer } from 'mobx-react';
import * as React from 'react'
import { Component } from 'react'
import { NavigationV5Props } from 'routes/RouteFun';
import { AudioStore } from 'stores/audio.store';
import { AuthStore } from 'stores/auth.store';
import { ExploreStore } from 'stores/explore.store';
import { ReadStore } from 'stores/read.store';
import HomeScreen from './HomeScreen'

interface Props extends NavigationV5Props {
  auth: AuthStore
  audio: AudioStore
  explore: ExploreStore
  read: ReadStore

}
interface State { }

@inject('auth', 'audio', 'explore', 'read')
@observer
export default class HomeContainer extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const { accountType } = this.props.auth
    this.props.audio.fetchFeatures();
    this.props.audio.fetchTopChartAudioExplore(accountType);
    this.props.audio.fetchNewAudioExplore(accountType)
    this.props.audio.fetchExploreAudioLimit(accountType)
    this.props.audio.fetchfreeBookExplore(accountType)
    this.props.explore.fetchCategory()
    this.props.explore.fetchSection()
    this.props.explore.fetchGenre()
  }

  // _onBook = () => {
  //   const { account, user } = this.props.auth
  //   // user check for user already login or not
  //   if (user) {
  //     // account check for user already create profile or not
  //     if (!account) {
  //       //navigation to create account
  //       //nextScreen for navigation after create account
  //       this.props.navigation.navigate('FILL_UP_INFO', { nextScreen: "BOOK_DETAIL", bookId: "" })
  //     } else {
  //       this.props.navigation.navigate('BOOK_DETAIL', { bookId: "" })

  //     }
  //   } else {
  //     this.props.navigation.navigate('LOGIN', { nextScreen: "BOOK_DETAIL", bookId: "" })
  //   }
  // }

  _onSeeAll = (sectionKey: string, title: string, type?: string) => {
    // console.log(`sectionKey, title, type`, sectionKey, title, type)
    this.props.navigation.navigate("LIST_AUDIO", { sectionKey: sectionKey, title: title, listingType: type })
  }

  _onBook = (book: any) => {
    const { user } = this.props.auth
    this.props.read.onSelectedBook(user, book, this.props.navigation)
  }

  _onSeeMoreSection = (type: string) => {
    this.props.navigation.navigate("SECTION", { type: type, isBook: false })
  }

  render() {
    // const { features } = this.props.audio;
    const { loadingFetchNewAudio, newAudios, features, loadingFeature, audioTopChart, loadingTopChart, loadingExploreAudio, exploreAudios, freeAudios, loadingFree } = this.props.audio;
    const { sectionsData, loadingSection, genreData, loadingGenre, categories, loadingCategory } = this.props.explore
    // const { user, account } = this.props.auth
    // console.log(`account`, user)
    return (
      <HomeScreen
        features={features}
        // seeAll={() => this.props.navigation.navigate('LIST_BOOK')}
        onSeeAll={(item, title, type) => this._onSeeAll(item, title, type)}
        // onBookPress={() => this._onBook()}
        freeAudios={freeAudios}
        onBook={(book) => this._onBook(book)}
        newAudios={newAudios}
        categories={categories}
        audiosTopChart={audioTopChart}
        onSeeMoreSection={this._onSeeMoreSection}
        sectionsData={sectionsData}
        genresData={genreData}
        onSearch={() => this.props.navigation.navigate("SEARCH", { type: "audio" })}

        loadingCategories={loadingCategory}
        loadingFree={loadingFree}
        loadingGenre={loadingGenre}
        loadingSection={loadingSection}
        loadingExploreAudio={loadingExploreAudio}
        loadingTopChart={loadingTopChart}
        loadingFeature={loadingFeature}
        loadingNewAudio={loadingFetchNewAudio}
      />
    )

  }
}
