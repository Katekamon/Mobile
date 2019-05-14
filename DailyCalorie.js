import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, ImageBackground, Slider, Button, navigate, TouchableHighlight, Alert, Picker, CheckBox
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from "react-navigation";
import { SaveWeight, getToday } from './Menu';



class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }} >
                <Image
                    source={require('./picture/dish.png')}
                    style={{ width: 30, height: 30, marginLeft: 3, marginTop: 10 }}
                />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>Daily Calorie Calculator</Text>
                    <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวณแคลอรี่เหมาะสมต่อวัน</Text>
                </View>


            </View>

        );
    }
}

export default class App extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#f0ae78', //กำหนดสีของ title
        },
        headerTitle: <LogoTitle />,

    };

    state = {
        Weight: 0,
        Height: 0,
        DailyCalorie: "",
        department: '',
        checkMale: true,
        checkFemale: false,
        choosenLabel: "word1",
        choosenindex: "0",
        choosen: "",
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

    Calculate = () => {
        state = {
            Weight: 0,
            Height: 0,
            DailyCalorie: "",
            department: '',
            checkMale: true,
            checkFemale: false,
            choosenLabel: "word1",
            choosenindex: "0",
            choosen: "",
        }
        let { choosenLabel, checkMale, checkFemale, DailyCalorie, Weight, Height, Age } = this.state
        if (!Weight || Weight <= 0) {
            alert('Please input weight!!! ')
            return
        } else if (!Height || Height <= 0) {
            alert('Please input height!!!')
            return
        }
        if (checkMale === true) {
            if (choosenLabel === 'word1') {
                this.setState({
                    DailyCalorie: Math.floor((66 + (13.7 * this.state.Weight) + (5 * this.state.Height) - (6.8 * this.state.Age)) * 1.2)
                })

            } else if (choosenLabel === 'word2') {
                this.setState({
                    DailyCalorie: Math.floor((66 + (13.7 * this.state.Weight) + (5 * this.state.Height) - (6.8 * this.state.Age)) * 1.375)
                })
            } else if (choosenLabel === 'word3') {
                this.setState({
                    DailyCalorie: Math.floor((66 + (13.7 * this.state.Weight) + (5 * this.state.Height) - (6.8 * this.state.Age)) * 1.55)
                })
            } else if (choosenLabel === 'word4') {
                this.setState({
                    DailyCalorie: Math.floor((66 + (13.7 * this.state.Weight) + (5 * this.state.Height) - (6.8 * this.state.Age)) * 1.725)
                })

            } else if (choosenLabel === 'word5') {
                this.setState({
                    DailyCalorie: Math.floor((66 + (13.7 * this.state.Weight) + (5 * this.state.Height) - (6.8 * this.state.Age)) * 1.9)
                })

            }
        } else
            if (checkFemale === true) {
                if (choosenLabel === 'word1') {
                    this.setState({
                        DailyCalorie: Math.floor((665 + (9.6 * this.state.Weight) + (1.8 * this.state.Height) - (4.7 * this.state.Age)) * 1.2)
                    })
                } else if (choosenLabel === 'word2') {
                    this.setState({
                        DailyCalorie: Math.floor((665 + (9.6 * this.state.Weight) + (1.8 * this.state.Height) - (4.7 * this.state.Age)) * 1.375)
                    })
                } else if (choosenLabel === 'word3') {
                    this.setState({
                        DailyCalorie: Math.floor((665 + (9.6 * this.state.Weight) + (1.8 * this.state.Height) - (4.7 * this.state.Age)) * 1.55)
                    })

                } else if (choosenLabel === 'word4') {
                    this.setState({
                        DailyCalorie: Math.floor((665 + (9.6 * this.state.Weight) + (1.8 * this.state.Height) - (4.7 * this.state.Age)) * 1.725)
                    })
                } else if (choosenLabel === 'word5') {
                    this.setState({
                        DailyCalorie: Math.floor((665 + (9.6 * this.state.Weight) + (1.8 * this.state.Height) - (4.7 * this.state.Age)) * 1.9)
                    })
                }
            }
        SaveWeight(getToday(), this.state.Weight)

    }

    UpdateValue = (itemValue, itemIndex) => {
        this.setState({
            choosenLabel: itemValue,
            choosenindex: itemIndex
        }, () => {
            console.log('choosenLabel: ', this.state.choosenLabel)
            console.log('choosenLabel: ', this.state.choosenindex)
        })
        console.log('itemValue: ', itemValue)
        console.log('itemIndex :', itemIndex)
    }


    /*updateDailyCalorieL1 = () => {
        if (this.state.checkMale) {
            this.setState({
                DailyCalorieL1: Math.floor((66 +(13.7*this.state.Weight)+(5*this.state.Height)-(6.8*this.state.Age))*1.2)
            })
          }
          if (this.state.checkFemale) {
            this.setState({
                DailyCalorieL1: Math.floor(665 +(9.6*this.state.Weight)+(1.8*this.state.Height)-(4.7*this.state.Age))
            })
          }
        }
    }

    updateDailyCalorieL2 = (exerciseL2) => {
        this.setState({
            exerciseL2: exerciseL2
        })
    }

    updateDailyCalorieL3 = (exerciseL3) => {
        this.setState({
            exerciseL3: exerciseL3
        })
    }

    updateDailyCalorieL4 = (exerciseL4) => {
        this.setState({
            exerciseL4: exerciseL4
        })
    }

    updateDailyCalorieL5 = (exerciseL5) => {
        this.setState({
            exerciseL5: exerciseL5
        })
    }
*/


    render() {

        return (
            <View style={{ flex: 1, flexDirection: "column", margin: 5, marginTop: 10, backgroundColor: "#f4f4f4", borderRadius: 10 }} >
                <View style={{ flex: 1, margin: 5, marginTop: 10, backgroundColor: "#f0ae78", borderRadius: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 15, marginTop: 6, marginLeft: 20 }}>Gender :</Text>
                        <View style={{ flexDirection: "row", marginLeft: 15 }}>
                            <CheckBox
                                value={this.state.checkMale} onChange={this.CheckBoxMale}
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

                <Text style={{ color: "black", fontSize: 15, marginLeft: 15, marginBottom: 4, fontWeight: "bold" }}>กิจกรรม</Text>

                <View style={{ justifyContent: "center", height: 30, width: 280, marginLeft: 15, borderWidth: 0.8, color: 'black', borderRadius: 3, backgroundColor: "#fcf9f9" }}>
                    <Picker selectedValue={this.state.choosenLabel}
                        onValueChange={
                            this.UpdateValue
                        }>
                        <Picker.Item label="ออกกำลังกายน้อยกว่า 1 ครั้ง/สัปดาห์" value="word1" />
                        <Picker.Item label="ออกกำลังกาย 1-3 ครั้ง/สัปดาห์" value="word2" />
                        <Picker.Item label="ออกกำลังกาย 3-5 ครั้ง/สัปดาห์" value="word3" />
                        <Picker.Item label="ออกกำลังกาย 6-7 ครั้ง/สัปดาห์" value="word4" />
                        <Picker.Item label="ออกกำลังกายมากกว่า 7 ครั้ง/สัปดาห์" value="word5" />

                    </Picker>


                </View>

                <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20, color: "black" }}>
                    <TouchableHighlight style={styles.button}
                        onPress={this.Calculate}
                    >
                        <Text style={styles.buttonText}>Calculate</Text>
                    </TouchableHighlight>
                </View >

                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>คำนวณแคลอรี่เหมาะสมต่อวัน คือ:</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", color: "skyblue" }}> {this.state.DailyCalorie}</Text>

                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>  แคลลอรี่/วัน</Text>
                    </View>
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
        backgroundColor: '#f0ae78',
        borderRadius: 5,
        borderWidth: 1,
        //color: "black"
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    Dropdraw: {

    }

});