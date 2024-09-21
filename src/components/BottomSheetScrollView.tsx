import {Dimensions, StyleSheet, View, TextInput, Text} from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedScrollHandler,
  AnimatedScrollViewProps,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import BackDrop from './BackDrop';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTFAMILY, FONTSIZE} from '../constants/theme';
import {useTheme} from '../utils/ThemeContext';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface Props extends AnimatedScrollViewProps {
  snapTo: string;
  // backgroundColor: string;
  backDropColor: string;
}

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const BottomSheetScrollView = forwardRef<BottomSheetMethods, Props>(
  ({snapTo, children, backDropColor, ...rest}: Props, ref) => {
    const { t } = useTranslation();
    const inset = useSafeAreaInsets();
    const {height} = Dimensions.get('screen');
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const closeHeight = height;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const {theme} = useTheme();

    const handleSearch = (query: React.SetStateAction<string>) => {
      setSearchQuery(query);
    };

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(openHeight);
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(closeHeight);
    }, [closeHeight, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag: event => {
        scrollBegin.value = event.contentOffset.y;
      },
      onScroll: event => {
        scrollY.value = event.contentOffset.y;
      },
    });

    const panScroll = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else if (event.translationY > 0 && scrollY.value === 0) {
          runOnJS(setEnableScroll)(false);
          topAnimation.value = withSpring(
            Math.max(
              context.value + event.translationY - scrollBegin.value,
              openHeight,
            ),
            {
              damping: 100,
              stiffness: 400,
            },
          );
        }
      })
      .onEnd(() => {
        runOnJS(setEnableScroll)(true);
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const scrollViewGesture = Gesture.Native();

    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          backDropColor={backDropColor}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              {
                backgroundColor: theme.primaryBGColor,
                paddingBottom: inset.bottom,
              },
            ]}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <View style={styles.searchBoxContainer}>
                <Text style={[styles.textStyles, {color: theme.textColor}]}>
                  {t("wallet:myWalletDetails")}
                </Text>
                {/* <TextInput
                  placeholder={t("wallet:searchTokenName")}
                  style={[
                    styles.searchBox,
                    {
                      backgroundColor: theme.primaryBGColor,
                      color: theme.textColor,
                      borderColor: theme.strokeColor,
                    },
                  ]}
                  clearButtonMode="always"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={searchQuery}
                  onChangeText={query => handleSearch(query)}
                  placeholderTextColor={COLORS.strokeColor}
                /> */}
              </View>
            </View>
            <GestureDetector
              gesture={Gesture.Simultaneous(scrollViewGesture, panScroll)}>
              <Animated.ScrollView
                {...rest}
                scrollEnabled={enableScroll}
                bounces={false}
                scrollEventThrottle={16}
                onScroll={onScroll}>
                {children}
              </Animated.ScrollView>
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

export default BottomSheetScrollView;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 60,
    height: 4,
    backgroundColor: 'grey',
    borderRadius: 20,
  },
  searchBoxContainer: {
    marginTop: 20,
    color: 'white',
    width: '90%',
  },
  searchBox: {
    paddingHorizontal: 20,
    // backgroundColor: COLORS.primaryBGColor,
    borderWidth: 1,
    borderColor: COLORS.strokeColor,
    borderRadius: 12,
    fontSize: FONTSIZE.size_16,
    color: 'white',
  },
  textStyles: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    paddingBottom: 10,
  },
});
