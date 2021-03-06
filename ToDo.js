import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            toDoValue: props.text
        }
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired
    }

    state = {
        isEditing: false,
        toDoValue: ""
    }

    render() {
        const { isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo, isCompleted } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this.__toggleToDo}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    {isEditing ?
                        <TextInput
                            style={[
                                styles.text,
                                styles.input,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this.__controllInput}
                            onBlur={this.__finishEditing}
                        />
                        : <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>{text}
                        </Text>
                    }
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
                        <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>X</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
            </View >
        );
    }

    __toggleToDo = () => {
        const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
        if (isCompleted) {
            uncompleteToDo(id);
        }
        else {
            completeToDo(id);
        }

    }

    __startEditing = () => {
        this.setState({
            isEditing: true
        })
    }

    __finishEditing = () => {
        const { toDoValue } = this.state;
        const { updateToDo, id } = this.props;
        updateToDo(id, toDoValue);
        this.setState({
            isEditing: false
        })
    }

    __controllInput = (text) => {
        this.setState({
            toDoValue: text
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
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 19,
    }
})