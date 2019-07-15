import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
    state = {
        isEditing: false,
        isCompleted: false
    }

    render() {
        const { isEditing, isCompleted } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this.__toggleToDo}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>Hello I'm a to do</Text>
                </View>

                {isEditing ?
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this.__finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>V</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this.__startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>E</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>X</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
            </View >
        );
    }

    __toggleToDo = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    }

    __startEditing = () => {
        this.setState({
            isEditing: true
        })
    }

    __finishEditing = () => {
        this.setState({
            isEditing: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    completedText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: '#353839'
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 2,
        justifyContent: 'space-between'
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    }
})