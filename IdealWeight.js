import React, { Component } from 'react';
import {
    Dimensions, Platform, StyleSheet, Text, View, Image, ImageBackground, Slider, Button, navigate, TouchableHighlight, Alert, CheckBox
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from "react-navigation";
import { SaveWeight, getToday } from './Menu';

const widthwindow = Dimensions.get('window').width;
class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: "row" }} >
                <Image
                    source={require('./picture/waist.png')}
                    style={{ width: 30, height: 30, marginLeft: 3, marginTop: 10 }}
                />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 8, color: 'black' }}>Ideal weight calculator</Text>
                    <Text style={{ fontSize: 13, marginLeft: 8, color: 'black' }}>คำนวณน้ำหนักที่เหมาะสมของคุณ</Text>
                </View>


            </View>

        );
    }
}

export default class App extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#D9A5AA', //กำหนดสีของ title
        },
        headerTitle: <LogoTitle />,

    };

    state = {
        Height: 0,
        IdealWeight: "",
        checkMale: false,
        checkFemale: false
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

    CheckBoxMale = () => {
        this.setState({
            checkMale: !this.state.checkMale,
        })
        if (this.state.checkFemale) {
            this.state.checkFemale = !this.state.checkFemale
        }
    }

    CheckBoxFemale = () => {
        this.setState({
            checkFemale: !this.state.checkFemale,

        })
        if (this.state.checkMale) {
            this.state.checkMale = !this.state.checkMale
        }

    }

    updateIdealWeight = () => {
        state = {
            Weight: 0,
            Height: 0,
            IdealWeight: "",
            checkMale: false,
            checkFemale: false
        }
        let { Height, Age, Weight } = this.state
        if (!Weight || Weight <= 0) {
            alert('Please input weight!!! ')
            return
        } else if (!Height || Height <= 0) {
            alert('Please input height!!!')
            return
        }

        if (this.state.checkMale) {
            this.setState({
                IdealWeight: Math.floor((this.state.Height - 100) * 0.9)
            })
        }
        if (this.state.checkFemale) {
            this.setState({
                IdealWeight: Math.floor((this.state.Height - 100) * 0.8)
            })

        }
        SaveWeight(getToday(), this.state.Weight)
    }


    render() {
        const state = this.state;
        return (
            <View style={{ flex: 1, flexDirection: "column", margin: 5, marginTop: 10, backgroundColor: "#f4f4f4", borderRadius: 10 }} >
                <View style={{ margin: 5, marginTop: 10, height: 30, width: widthwindow - 20, backgroundColor: "#D9A5AA", borderRadius: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 15, marginTop: 6, marginLeft: 20 }}>Gender :</Text>
                        <View style={{ flexDirection: "row", marginLeft: 15 }}>
                            <CheckBox value={this.state.checkMale} onChange={this.CheckBoxMale}
                            />
                            <Text style={{ marginLeft: 3, color: "black", fontSize: 15, marginTop: 6 }}>Male</Text>
                            <CheckBox value={this.state.checkFemale} onChange={this.CheckBoxFemale} style={{ marginLeft: 15 }}
                            />
                            <Text style={{ marginLeft: 3, color: "black", fontSize: 15, marginTop: 6 }}>Female</Text>
                        </View>
                    </View>
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


                <View style={{ alignItems: "center", marginTop: 10 }}>
                    <TouchableHighlight style={styles.button}
                        onPress={this.updateIdealWeight}
                    >
                        <Text style={styles.buttonText}>Calculate</Text>

                    </TouchableHighlight>
                </View >
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>ช่วงน้ำหนักที่เหมาะสมของคุณ คือ:</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: "skyblue" }}> {this.state.IdealWeight}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>Kg.</Text>
                    </View>

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
        backgroundColor: '#D9A5AA',
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