import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Platform, navigate, ImageBackground } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var sqlite = require('react-native-sqlite-storage');
export var db = sqlite.openDatabase({ name: 'myDB.db', createFromLocation: 'myDB.db' })


class LogoTitle extends React.Component {
  render() {
    return (

      <View style={{ flexDirection: "row" }} >
        <Image
          source={require('./picture/doctor.png')}
          style={{ width: 30, height: 30, marginLeft: 20 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>MENU</Text>
      </View>

    );
  }
}

export const getToday = () => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 // 0-11
  let yyyy = today.getFullYear()
  let result = dd + '/' + mm + '/' + yyyy
  return result
}

const getAllData = () => {
  db.transaction((txn) => {
    txn.executeSql(`
      SELECT * FROM WeightDiary
    `, [], (tx, res) => {
        console.log('len is : ', res.rows.length)
        for (let i = 0; i < res.rows.length; i++) {
          console.log('data' + i + ': ', res.rows.item(i))
        }
      })
  })
}

export const SaveWeight = (date, weight) => {
  db.transaction((txn) => {
    txn.executeSql(`
    SELECT * FROM WeightDiary WHERE (Date = '${date}')
    `, [], (tx, res) => {
        console.log('res select is : ', res)
        if (res.rows.length > 0) { // exists go update
          txn.executeSql(`
        UPDATE WeightDiary SET Weight = '${weight}'
        WHERE Date = '${date}'
        `, [], (tx, res) => {
              console.log('res update is : ', res)
              getAllData()
            })
        } else { // not exists go insert
          txn.executeSql(`
        INSERT INTO WeightDiary (Date, Weight)
        VALUES ('${date}', '${weight}')
        `, [], (tx, res) => {
              console.log('res insert is : ', res)
              getAllData()
            })
        }
      })
  })
}

export default class App extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#259ed8', //กำหนดสีของ title
    },
    headerTitle: <LogoTitle />,

  };

  constructor(props) {
    super(props);
    db.transaction((txn) => {
      txn.executeSql(`
        CREATE TABLE IF NOT EXISTS WeightDiary (
          Date string NOT NULL,
          Weight float,
          PRIMARY KEY (Date)
        )
      `, [], (tx, res) => {
          console.log('res create is : ', res)
        })
    })
  }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, flexDirection: "column", margin: 2, backgroundColor: "#c7c5c7" }}>
          <TouchableHighlight style={{ backgroundColor: "#9cf6e2", borderRadius: 5, marginTop: 10, marginLeft: 5, marginRight: 5 }}
            onPress={() =>
              this.props.navigation.navigate('BodyFat')
            }
          >
            <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row" }}>
              <Image
                source={require('./picture/fat.png')}
                style={{ width: 30, height: 30, marginLeft: 20, marginRight: 20 }}
              />
              <View style={{ flexDirection: "column", marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>Body Fat Calculator</Text>
                <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวณปริมาณไขมันในร่างกาย</Text>
              </View>

            </View >
          </TouchableHighlight>

          <TouchableHighlight style={{ backgroundColor: "#56def2", borderRadius: 5, marginTop: 10, marginLeft: 5, marginRight: 5 }}
            onPress={() =>
              this.props.navigation.navigate('BMR')
            }
          >
            <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row" }}>
              <Image
                source={require('./picture/efficiency.png')}
                style={{ width: 30, height: 30, marginLeft: 20, marginRight: 20 }}
              />
              <View style={{ flex: 1, flexDirection: "column", marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>BMR Calculator</Text>
                <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวนอัตราการเผาผลาญพลังงาน</Text>
              </View>

            </View >
          </TouchableHighlight>


          <TouchableHighlight style={{ backgroundColor: "#e28bf2", borderRadius: 5, marginTop: 10, marginLeft: 5, marginRight: 5 }}
            onPress={() =>
              this.props.navigation.navigate('BMI')
            }
          >
            <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row" }}>
              <Image
                source={require('./picture/title.png')}
                style={{ width: 30, height: 30, marginLeft: 20, marginRight: 20 }}
              />
              <View style={{ flex: 1, flexDirection: "column", marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>BMI Calculator</Text>
                <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวณหาดัชนีมวลกายของคุณ</Text>
              </View>

            </View >
          </TouchableHighlight>


          <TouchableHighlight style={{ backgroundColor: "#D9A5AA", borderRadius: 5, marginTop: 10, marginLeft: 5, marginRight: 5 }}
            onPress={() =>
              this.props.navigation.navigate('IdealWeight')
            }
          >
            <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row" }}>
              <Image
                source={require('./picture/waist.png')}
                style={{ width: 30, height: 30, marginLeft: 20, marginRight: 20 }}
              />
              <View style={{ flex: 1, flexDirection: "column", marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>Ideal weight calculator</Text>
                <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวณน้ำหนักที่เหมาะสมของคุณ</Text>
              </View>

            </View >
          </TouchableHighlight>


          <TouchableHighlight style={{ backgroundColor: "#f0ae78", borderRadius: 5, marginTop: 10, marginLeft: 5, marginRight: 5 }}
            onPress={() =>
              this.props.navigation.navigate('DailyCalorie')
            }
          >
            <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row" }}>
              <Image
                source={require('./picture/dish.png')}
                style={{ width: 30, height: 30, marginLeft: 20, marginRight: 20 }}
              />
              <View style={{ flex: 1, flexDirection: "column", marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>Daily Calorie Calculator</Text>
                <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวณแคลอรี่เหมาะสมต่อวัน</Text>
              </View>

            </View >
          </TouchableHighlight>

          <TouchableHighlight style={{ backgroundColor: "#ffe968", borderRadius: 5, marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5 }}
            onPress={() =>
              this.props.navigation.navigate('WeightReport')
            }
          >
            <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row" }}>
              <Image
                source={require('./picture/scale.png')}
                style={{ width: 30, height: 30, marginLeft: 20, marginRight: 20 }}
              />
              <View style={{ flex: 1, flexDirection: "column", marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>Weight Report</Text>
                <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>รายงานน้ำหนัก</Text>

              </View>

            </View >
          </TouchableHighlight>

        </View>
      </ScrollView>
    );

  }

}

const styles = StyleSheet.create({

  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  }

});





