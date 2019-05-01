import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableHighlight, ImageBackground, Slider, Button, navigate, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from "react-navigation";
import { db } from './Menu';

const Item = ({ date, weight }) => (
    <View style={{ backgroundColor: '#ccc', marginVertical: 8 }}>
        <Text style={{ color: 'black' }}>Date: {date}</Text>
        <Text style={{ color: 'black' }}>Weight: {weight}</Text>
    </View>
)

class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: "row" }} >
                <Image
                    source={require('./picture/scale.png')}
                    style={{ width: 30, height: 30, marginLeft: 20, marginTop: 10 }}
                />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>Weight Report</Text>
                    <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>รายงานน้ำหนักของคุณ</Text>
                </View>


            </View>

        );
    }
}


export default class App extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#ffe968', //กำหนดสีของ title
        },
        headerTitle: <LogoTitle />,

    };

    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        db.transaction((txn) => {
            txn.executeSql(`
                SELECT * FROM WeightDiary
            `, [], (tx, res) => {
                    let items = []
                    for (let i = 0; i < res.rows.length; i++) {
                        items.push(res.rows.item(i))
                    }
                    this.setState({ items: items })
                })
        })
    }

    render() {

        return (
            <View style={{ flex: 1, flexDirection: "column", margin: 5, marginTop: 10, backgroundColor: "#f4f4f4", borderRadius: 10 }} >
                {
                    this.state.items.map((e, i) => (
                        <Item key={i} date={e.Date} weight={e.Weight} />
                    ))

                }
            </View>
        );
    }
}


