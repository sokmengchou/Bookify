import SafeArea from 'components/SafeArea';
import { fontGeorgiaBold } from 'functions/customFont';
import modules from 'modules';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

interface Props {
  goBack: () => void
  title: string
  rightIcon?: string
  onRight?: () => void
  language?: any;
  noBorder?: boolean
}

export default function ClassTabHeader(props: Props) {
  const { goBack, title, rightIcon, onRight, language, noBorder } = props
  return (
    <SafeArea edges="safeTop" style={[styles.container, noBorder && { borderBottomWidth: 0 }]}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={goBack}
            style={{ padding: modules.BODY_HORIZONTAL }}>
            <View style={styles.moreActivity}>
              <Icon name="chevron-left" style={styles.backIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={[styles.titleScreen, language === 'en' ? { ...fontGeorgiaBold } : null]}>{title}</Text>
        </View>
        {rightIcon && onRight ?
          <View>
            <TouchableOpacity
              onPress={onRight}
              style={{ padding: modules.BODY_HORIZONTAL }}>
              <View style={styles.moreActivity}>
                <Icon name={rightIcon} style={styles.backIcon} />
              </View>
            </TouchableOpacity>
          </View> :
          <View style={{ height: 58, width: 58 }} />
        }
      </View>
    </SafeArea>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58
  },
  container: {
    backgroundColor: modules.WHITE,
    borderBottomColor: modules.BORDER_COLOR,
    borderBottomWidth: 1,
  },
  titleScreen: {
    ...fontGeorgiaBold,
    fontSize: 20,
  },
  moreActivity: {
    backgroundColor: modules.TEXT,
    paddingHorizontal: modules.BODY_HORIZONTAL_12 / 3,
    paddingVertical: modules.BODY_HORIZONTAL_12 / 4,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
  },
  backIcon: {
    color: modules.WHITE,
    fontSize: modules.FONT_H4,
    marginLeft: -2,
  },
});
