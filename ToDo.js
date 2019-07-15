import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
    state = {
        isEditing: false,
        isCompleted: false
    }

    render() {
        const { isCompleted } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.__toggleToDo}>
                    <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                </TouchableOpacity>
                <Text style={styles.text}>Hello I'm a to do</Text>
            </View>
        );
    }

    __toggleToDo = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontWeight: '400',
        fontSize: 20,
        marginVertical: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: '#bbb'
    },
    uncompletedCircle: {
        borderColor: 'red',
    }
})