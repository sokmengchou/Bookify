import * as React from 'react'
import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity } from 'react-native'
import _styles from '@styles'
import { styles } from './HomeStyle'
import modules from 'modules'
import Icon from 'react-native-vector-icons/Feather';
import ViewCard from '../../components/ViewCard';
import Slide from '../../components/MainSlide';
import AudioListHorizontal from 'components/AudioListHorizontal'
import AppleCategory from 'components/AppleCategory'
import Carousel from 'react-native-snap-carousel';
import Section from 'components/Section'
import FastImage from 'react-native-fast-image'
import TopAudioComponent from 'components/TopAudioComponent'
import TouchableScale from 'components/TouchableScale'


export interface Props {
  onSeeAll: (item: any, title: string, type?: string) => void
  features: any[]
  freeAudios: any[]
  onBook: (book: any) => void
  newAudios: any[]
  categories: any[]
  audiosTopChart: any[]
  onSeeMoreSection: (type: string) => void
  sectionsData: any[]
  genresData: any[]
  onSearch: () => void

  loadingNewAudio: boolean,
  loadingFeature: boolean
  loadingTopChart: boolean
  loadingExploreAudio: boolean
  loadingSection: boolean
  loadingGenre: boolean
  loadingFree: boolean
  loadingCategories: boolean
}

export default function HomeScreen(props: Props): React.ReactElement {
  const SCREEN_WIDTH = Dimensions.get('window').width
  // console.log('categories :>> ', props.categories);

  const renderTopAudios = (item: any) => {
    return (
      <View>
        {item.map((book: any, index: number) => {
          return (
            <TopAudioComponent key={book.key} onBook={(b) => props.onBook(b)} index={index} book={book} />
          )
        })}
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: modules.WHITE, paddingTop: Platform.OS === "ios" ? modules.BODY_HORIZONTAL_24 * 2 : 0 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: modules.BODY_HORIZONTAL_12 }}>
          <View style={{ width: modules.VIEW_PORT_WIDTH / 2.5, height: modules.VIEW_PORT_HEIGHT / 20 }}>
            <FastImage style={{ width: '100%', height: '100%' }} source={modules.LOGO_TEXT} />
          </View>
          <View style={{ flex: 1 }} />
          <TouchableScale
            onPress={() => props.onSearch()}
            style={styles.search}>
            <Icon style={[styles.searchIcon, { color: modules.TEXT }]} name={"search"} />
          </TouchableScale>
        </View>

        {
          props.loadingFeature ? null :
            <ViewCard style={{ paddingBottom: modules.BODY_HORIZONTAL_12 }}>
              <Slide onPress={(item) => { props.onSeeAll(item.sectionKey, item.name, "") }} items={props.features} />
            </ViewCard>
        }

        {
          props.loadingTopChart || props.audiosTopChart && props.audiosTopChart.length === 0 ? null :
            <ViewCard>
              <Text style={styles.sectionTitle}>Top Chart</Text>
              <Text style={[styles.sectionSubTitle]}>
                Recently added audiobooks that made the top chart
              </Text>
              <Carousel
                contentContainerCustomStyle={{
                  paddingVertical: modules.BODY_HORIZONTAL_ACTION / 1.5,
                }}
                activeSlideAlignment={'start'}
                slideStyle={{ paddingLeft: modules.BODY_HORIZONTAL_ACTION }}
                data={props.audiosTopChart}
                renderItem={({ item }) => renderTopAudios(item)}
                sliderWidth={SCREEN_WIDTH}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                itemWidth={SCREEN_WIDTH - modules.BODY_HORIZONTAL_ACTION * 2}
              />
              <View style={{ flex: 1, borderTopWidth: 0.5, borderColor: modules.TEXT_NOTE, marginHorizontal: modules.BODY_HORIZONTAL_18 }}></View>
              <TouchableOpacity
                onPress={() => props.onSeeAll("", "Top Chart", "app_top_charts")}
                style={[
                  styles.exploreMore,
                  {
                    marginRight: modules.BODY_HORIZONTAL_12,
                  },
                ]}>
                <Text style={[styles.exploreText]}>See All</Text>
                <Icon style={styles.icon} name={"chevron-right"} />
              </TouchableOpacity>
            </ViewCard>
        }

        {
          props.loadingFree || props.freeAudios && props.freeAudios.length === 0 ? null :
            <AudioListHorizontal
              onSeeAll={() => props.onSeeAll("", "Special Offer & Free", "app_special_offers_and_free")}
              useRef={true}
              loading={props.loadingFree}
              subTitle={'5000 audio books fore free to everyone'}
              title={'Special Offer & Free'}
              books={props.freeAudios}
              onPress={(book) => props.onBook(book)}
            />
        }

        {
          props.loadingCategories || props.categories.length === 0 ? null :
            <AppleCategory
              title={"More Audios to Explore"}
              subTitle={"Newly released and remarkable audiobook"}
              onPress={(item) => props.onSeeAll(item.sectionKey, item.name)}
              data={props.categories.filter((doc) => doc.sourceReading)}
            />
        }

        {
          props.loadingNewAudio || props.newAudios && props.newAudios.length === 0 ? null :
            <AudioListHorizontal
              onSeeAll={() => props.onSeeAll("", "New & Trending", "app_new_and_trending")}
              useRef={true}
              loading={props.loadingNewAudio}
              subTitle={'Newly released audiobooks that people love'}
              title={'New & Trending'}
              books={props.newAudios}
              onPress={(book) => props.onBook(book)}
            />
        }

        {
          props.loadingSection && props.sectionsData.length === 0 ? null :
            <Section
              seeMore={() => props.onSeeMoreSection("section")}
              onPress={(section) => props.onSeeAll(section.key, section.name)}
              title={"Sections"}
              data={props.sectionsData}
            />
        }

        {
          props.loadingGenre && props.genresData.length === 0 ? null :
            <Section
              seeMore={() => props.onSeeMoreSection("genre")}
              onPress={(section) => props.onSeeAll(section.key, section.name, "GENRE")}
              title={"Genres"}
              data={props.genresData}
            />
        }

        <View style={_styles.fake} />
        <View style={_styles.fake} />
      </ScrollView>
    </View>

  )
}

