/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS } from '../constants/theme';
import BackButtonIcon from '../../assets/SVG/BackButtonIcon';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';


type GameViewRouteProp = RouteProp<RootStackParamList, 'GameView'>;

const GameView: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<GameViewRouteProp>();
    const { game } = route.params;

    return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
            <BackButtonIcon size={30} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsCenter}>
            <Text style={styles.gameTitle}>{game.name}</Text>
            <Image source={{uri: game.image }}  style={styles.gameImage} />
            
        </View>

        <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>Play Now</Text>
        </TouchableOpacity>
        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBGColor,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemsCenter: {
        alignItems: 'center',
    },
    backButtonContainer: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
        backgroundColor: COLORS.secondaryBGColor,
        padding: 6,
    },
    backButton: {
        marginRight: 2,
    },
    gameImage: {
        width: '100%',
        height: 250,
        borderRadius: BORDERRADIUS.radius_15,
        marginBottom: 20,
    },
    gameTitle: {
        color: COLORS.primaryWhite,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    playButton: {
        backgroundColor: COLORS.primaryColor,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: BORDERRADIUS.radius_25,
        
    },
    playButtonText: {
        color: COLORS.primaryWhite,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default GameView;
