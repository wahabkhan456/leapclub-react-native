import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Data from "../local/en.json"

export default function CheckjsonText() {


    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                {Data.map((text, textId) => {
                    return (
                        <View key={textId}>
                            <Text>{text.name}</Text>
                            <Text>{text.title}</Text>
                            <Text>{text.content}</Text>
                        </View>
                    )
                })}

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({


});