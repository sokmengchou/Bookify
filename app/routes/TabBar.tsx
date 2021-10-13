import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { BottomTabBarProps, BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import modules from '../modules';
import { ifIphoneX } from 'react-native-iphone-x-helper'
// import BlurAndView from '../components/BlurAndView';
import RemixIcon from './../../functions/customIcon';


interface Props extends BottomTabBarProps<BottomTabBarOptions> {
  tabData: TabIconT
}

const tabIcon = {
  EXPLORE: {
    label: 'Home',
    icon: 'home',
  },
  PROFILE: {
    label: 'Profile',
    icon: 'account-circle-line'
  }
}


type keyTabIcon = keyof typeof tabIcon

type TabIconT = {
  [key in keyTabIcon]: {
    label: string;
    icon: string;
  };
};

export function TabBar({ state, descriptors, navigation, tabData }: Props) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      // blurType={'thinMaterialLight'}
      // blurAmount={10}
      // reducedTransparencyFallbackColor={"black"}
      style={styles.container}
      // androidBackground={"rgba(255,255,255,0.9)"}
    >
      <SafeAreaView edges={['bottom', 'left', 'right']}>
        <View style={styles.innerContainer}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = route.name as keyTabIcon;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            const color = isFocused ? modules.PRIMARY : modules.PRIMARY_TAB
            return (
              <Pressable
                key={`${tabData[label].label}-${index}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isFocused ? true : undefined }}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.btn}
              >
                <RemixIcon name={tabData[label].icon} size={22} color={color} style={styles.icon} />
                <Text style={[styles.text, { color: color }]}>
                  {" " + tabData[label].label + " "}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 2
  },
  text: {
    paddingTop: modules.SPACE / 2,
    fontSize: modules.FONT_P
  },
  container: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: modules.WHITE
  },
  innerContainer: {
    borderTopWidth: 1,
    borderTopColor: modules.BORDER_COLOR,
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    paddingTop: modules.BODY_HORIZONTAL_12,
    paddingBottom: ifIphoneX(0, modules.BODY_HORIZONTAL_12),
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});