import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, ImageBackground, Slider, Button, navigate, TouchableHighlight, Alert
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from "react-navigation";
import { SaveWeight, getToday } from './Menu';


class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: "row" }} >
                <Image
                    source={require('./picture/title.png')}
                    style={{ width: 30, height: 30, marginLeft: 20, marginTop: 10 }}
                />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>BMI Calculator</Text>
                    <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวณหาดัชนีมวลกายของคุณ</Text>
                </View>


            </View>

        );
    }
}

//<Text style={{ fontSize: 15, color: 'black', }}>ดัชนีมวลกายของคุณ คือ{BMI}</Text>

export default class App extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#daa8f0', //กำหนดสีของ title
        },
        headerTitle: <LogoTitle />,

    };

    state = {
        Weight: 0,
        Height: 0,
        BMI: ""
    }

    updateWeight = (Weight) => {
        this.setState({
            Weight: Weight
        })
    }
    updateHeight = (Height) => {
        this.setState({
            Height: Height
        })
    }

    updateBMI = () => {
        state = {
            Weight: 0,
            Height: 0,
            BMI: ""
        }
        let { Weight, Height } = this.state
        if (!Weight || Weight <= 0) {
            alert('Please input weight!!! ')
            return
        } else if (!Height || Height <= 0) {
            alert('Please input height!!!')
            return
        }
        this.setState({
            BMI: Math.floor(this.state.Weight / ((this.state.Height / 100) * (this.state.Height / 100)))
        })
        SaveWeight(getToday(), this.state.Weight)
    }


    render() {
        const state = this.state;
        return (
            <View style={{ flex: 1, flexDirection: "column", margin: 5, marginTop: 10, backgroundColor: "#f4f4f4", borderRadius: 10 }} >
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold", color: "black" }}>Height: </Text>
                    <View style={{ flexDirection: "column" }}>
                        <TextInput style={{}}
                            onChangeText={this.updateHeight}
                        >
                        </TextInput>
                        <View style={{ height: 1, width: 50, backgroundColor: "gray" }} />
                    </View>
                    <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold", color: "black" }}>Cm. </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold", color: "black" }}>Weight: </Text>
                    <View style={{ flexDirection: "column" }}>
                        <TextInput style={{}}
                            onChangeText={this.updateWeight}
                        >
                        </TextInput>
                        <View style={{ height: 1, width: 50, backgroundColor: "black" }} />
                    </View>
                    <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold", color: "black" }}>Kg. </Text>
                </View>


                <View style={{ alignItems: "center", marginTop: 10 }}>
                    <TouchableHighlight style={styles.button}
                        onPress={this.updateBMI}
                    >
                        <Text style={styles.buttonText}>Calculate</Text>

                    </TouchableHighlight>
                </View >
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>ดัชนีมวลกายของคุณ คือ:</Text>
                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "skyblue" }}> {this.state.BMI}</Text>
                </View>

                <View style={styles.container}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={styles.text} />
                    </Table>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        marginBottom: 30,
        width: 130,
        alignItems: 'center',
        backgroundColor: '#daa8f0',
        borderRadius: 5

    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    container: { flex: 1, padding: 16, paddingTop: 30 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }

});

