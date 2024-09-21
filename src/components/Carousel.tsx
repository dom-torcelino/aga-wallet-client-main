import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {BORDERRADIUS, COLORS} from '../constants/theme';

interface CarouselItem {
  id: string;
  image: number;
}

const Carousel: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;

  const carouselData: CarouselItem[] = [
    {
      id: '01',
      // image: require('../../assets/images/carousel-image1.jpg'),
      image: require('../../assets/images/game_banner1.png'),
    },
    {
      id: '02',
      // image: require('../../assets/images/carousel-image2.jpg'),
      image: require('../../assets/images/game_banner2.png'),
    },
    {
      id: '03',
      // image: require('../../assets/images/carousel-image3.jpg'),
      image: require('../../assets/images/game_banner3.png'),
    },
    {
      id: '04',
      // image: require('../../assets/images/carousel-image4.jpg'),
      image: require('../../assets/images/game_banner4.png'),
    },
    {
      id: '05',
      image: require('../../assets/images/carousel-image5.jpg'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % carouselData.length;
      setCurrentIndex(nextIndex);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const renderItem: FlatListProps<CarouselItem>['renderItem'] = ({item}) => (
    <View style={styles.container}>
      <Image source={item.image} style={styles.imageStyle} />
    </View>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carouselData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        keyExtractor={item => item.id}
        ref={flatListRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>{`${currentIndex + 1} / ${
          carouselData.length
        }`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDERRADIUS.radius_15,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
    // marginVertical: 10,
    // backgroundColor: 'red',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    right: '3%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    // borderRadius: 20,
  },
  paginationText: {
    color: COLORS.primaryWhite,
  },
  imageStyle: {
    height: 200,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
  },
});

export default Carousel;
