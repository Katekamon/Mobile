import React, { Component } from 'react';
import {
    Dimensions, Platform, StyleSheet, Text, View, Image, ImageBackground, Slider, Button, navigate, TouchableHighlight, Alert, Picker, CheckBox
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from "react-navigation";
import { SaveWeight, getToday } from './Menu';


const widthwindow = Dimensions.get('window').width;
class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }} >
                <Image
                    source={require('./picture/efficiency.png')}
                    style={{ width: 30, height: 30, marginLeft: 3, marginTop: 10 }}
                />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 8, color: 'black' }}>BMR Calculator</Text>
                    <Text style={{ fontSize: 13, marginLeft: 8, color: 'black' }}>คำนวนอัตราการเผาผลาญพลังงาน</Text>
                </View>


            </View>

        );
    }
}

export default class App extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#56def2', //กำหนดสีของ title
        },
        headerTitle: <LogoTitle />,

    };

    state = {
        Weight: 0,
        Height: 0,
        DailyCalorie: "",
        department: '',
        checkMale: false,
        checkFemale: false
    }

    updateAge = (Age) => {
        this.setState({
            Age: Age
        })
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

    updateDepartment = (department) => {
        this.setState({ department: department })
    }

    CheckBoxMale = () => {
        this.setState({
            checkMale: !this.state.checkMale
        })
        if (this.state.checkFemale) {
            this.state.checkFemale = !this.state.checkFemale
        }
    }

    CheckBoxFemale = () => {
        this.setState({
            checkFemale: !this.state.checkFemale
        })
        if (this.state.checkMale) {
            this.state.checkMale = !this.state.checkMale
        }

    }

    updateBMR = () => {
        state = {
            Weight: 0,
            Height: 0,
            DailyCalorie: "",
            department: '',
            checkMale: false,
            checkFemale: false
        }
        let { Weight, Height, Age } = this.state

        if (!Weight || Weight <= 0) {
            alert('Please input weight!!! ')
            return
        } else if (!Height || Height <= 0) {
            alert('Please input height!!!')
            return
        }

        if (this.state.checkMale) {
            this.setState({
                BMR: Math.floor(66 + (13.7 * this.state.Weight) + (5 * this.state.Height) - (6.8 * this.state.Age))
            })
        }
        if (this.state.checkFemale) {
            this.setState({
                BMR: Math.floor(665 + (9.6 * this.state.Weight) + (1.8 * this.state.Height) - (4.7 * this.state.Age))
            })

        }
        SaveWeight(getToday(), this.state.Weight)
    }


    render() {
        const state = this.state;

        return (

            <View style={{ flex: 1, flexDirection: "column", margin: 5, marginTop: 10, backgroundColor: "#f4f4f4", borderRadius: 10 }} >
                <View style={{ margin: 5, marginTop: 10, height: 30, width: widthwindow - 20, backgroundColor: "#56def2", borderRadius: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
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



                <View style={{ marginLeft: 20, flexDirection: "row", marginTop: 15 }}>
                    <Text style={{ color: "black", fontSize: 15 }}>Age</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Slider
                            style={{ width: 200 }}
                            onValueChange={this.updateAge}
                            step={1}
                            maximumValue={100}
                        />
                        <Text style={{ fontSize: 15, color: 'red', }}>{this.state.Age} Year</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Height: </Text>
                    <View style={{ flexDirection: "column" }}>
                        <TextInput style={{}}
                            onChangeText={this.updateHeight}
                        >
                        </TextInput>
                        <View style={{ height: 1, width: 50, backgroundColor: "black" }} />
                    </View>
                    <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Cm. </Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "center" }}>
                    <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Weight: </Text>
                    <View style={{ flexDirection: "column" }}>
                        <TextInput style={{}}
                            onChangeText={this.updateWeight}
                        >
                        </TextInput>
                        <View style={{ height: 1, width: 50, backgroundColor: "black" }} />
                    </View>
                    <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Kg. </Text>
                </View>

                <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                    <TouchableHighlight style={styles.button}
                        onPress={this.updateBMR}
                    >
                        <Text style={styles.buttonText}>Calculate</Text>
                    </TouchableHighlight>
                </View >
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>ปริมาณการเผาผลาญพลังงาน  คือ:</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: "skyblue" }}> {this.state.BMR}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>  แคลลอรี่/วัน</Text>
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
        backgroundColor: '#56def2',
        borderRadius: 5,
        borderWidth: 1,
        color: "black"


    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    Dropdraw: {

    },
    container: { flex: 1, padding: 16, paddingTop: 30 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }


});
