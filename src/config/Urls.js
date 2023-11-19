import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from '../components/game';
import CheckjsonText from '../components/CheckJsonText';

export default function Urls() {
    return (
        // <Game />
        <CheckjsonText />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
