import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from "react";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CardComponent from './card';

const uniqueElementsArray = [
    {
        type: "A",
        text: "A"
    },
    {
        type: "B",
        text: "B"
    },
    {
        type: "C",
        text: "C"
    },
    {
        type: "D",
        text: "D"
    },
    {
        type: "E",
        text: "E"
    },
    {
        type: "F",
        text: "F"
    },
    {
        type: "G",
        text: "G"
    },
    {
        type: "H",
        text: "H"
    }
];

function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}


export default function Game() {
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState(
        shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
    );
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [moves, setMoves] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const timeout = useRef(null);
    const [bestScore, setBestScore] = useState(0)

    const disable = () => {
        setShouldDisableAllCards(true);
    };
    const enable = () => {
        setShouldDisableAllCards(false);
    };
    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === uniqueElementsArray.length) {
            setShowModal(true);
            const highScore = Math.min(moves, bestScore);
            setBestScore(highScore);
            alert(`Congratulations You Win, your moves are ${moves}`)

        }
    };
    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].type === cards[second].type) {
            setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
            setOpenCards([]);
            setScore(
                score + 1
            )
            console.log(score)
            return;
        }
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };
    const handleCardClick = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            setMoves((moves) => moves + 1);
            disable();
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkCompletion();
    }, [clearedCards]);


    useEffect(() => {
        handleRestart()
    }, []);



    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };

    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    };

    const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setScore(0)
        setShouldDisableAllCards(false);
        // set a shuffled deck of cards
        setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
    };



    return (
        <View
            style={styles.app}
        >
            <View style={styles.centre}>
                <Text>Memory Game</Text>
                <Text>Lets test your brain !!</Text>

            </View>
            <View
                style={styles.container}
            >

                {cards.map((card, index) => {
                    return (
                        <CardComponent
                            key={index}
                            card={card}
                            index={index}
                            isDisabled={shouldDisableAllCards}
                            isInactive={checkIsInactive(card)}
                            isFlipped={checkIsFlipped(index)}
                            onPress={handleCardClick}
                        />
                    );
                })}


                <StatusBar style="auto" />
            </View>
            <View style={styles.centre}>
                <Text>Moves : {moves}</Text>
                <Text>Matches :{score}</Text>
                <TouchableOpacity onPress={handleRestart}>
                    <Text style={styles.btn}>Restart the game</Text>
                </TouchableOpacity>
            </View>






        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#6B0000',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        transform: [
            {
                perspective: 400
            }
        ]
    },
    app: {

        marginTop: 70,
        position: 'absolute',
        width: '100%',

    },
    centre: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        padding: 30

    },
    btn: {
        backgroundColor: 'orange',
        padding: 10
    }
});
