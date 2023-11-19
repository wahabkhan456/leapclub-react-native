import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function CardComponent({ onPress, card, index, isInactive, isFlipped, isDisabled }) {
    let a = false
    const handleClick = () => {
        a = true;
        console.log("running....k"
            , card, isInactive, isDisabled, isFlipped, a
        )
        !isFlipped && !isDisabled && onPress(index);
        alert(card.text)
    };


    return (
        <ScrollView>
            <TouchableOpacity

                style={[styles.card, index
                    &&
                    isInactive ? styles.isInactive : '']
                    // ,isFlipped?styles.isFlipped:''
                }
                onPress={handleClick}>
                <View>
                    <View
                        style={[styles.cardFace, index && a ? styles.isFlipped : '']}
                    >
                        <Text>Guess</Text>
                    </View>
                    <View
                        style={
                            styles.cardFace,
                            styles.cardBackFace
                        }
                    >
                        <Text>
                            {card.text}

                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    card: {

        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#FF002B',
        color: 'white',
        borderRadius: 4,
        width: 80,
        height: 40,
        margin: 5,
        padding: 10,
        position: 'relative',

    },
    cardFace: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center'
    },
    cardBackFace: {
        // transform: [{
        //     rotateY:'180deg'
        // }],
        opacity: 0
    },
    isFlipped: {
        // transform: [{
        //     rotateY:'180deg'
        // }],

    },
    isInactive: {
        // opacity: 0,
        display: 'none'
    },
    active: {
        opacity: 1
    }

});