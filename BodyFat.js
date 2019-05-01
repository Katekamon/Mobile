import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image, ImageBackground, Slider, Button, navigate, TouchableHighlight, Alert, Picker, CheckBox, ScrollView
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from "react-navigation";
import { SaveWeight, getToday } from './Menu';

//var db = SQLite.openDatabase({ name: 'myDB.db' });

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }} >
        <Image
          source={require('./picture/fat.png')}
          style={{ width: 30, height: 30, marginLeft: 3, marginTop: 10 }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5, color: 'black' }}>Body Fat Calculator</Text>
          <Text style={{ fontSize: 13, marginLeft: 5, color: 'black' }}>คำนวณปริมาณไขมันในร่างกาย</Text>
        </View>


      </View>

    );
  }
}

export default class App extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#9cf6e2', //กำหนดสีของ title
    },
    headerTitle: <LogoTitle />,

  };

  state = {
    Weight: 0,
    Wrist: 0,
    Waistline: 0,
    Hips: 0,
    Brachium: 0,
    BodyFat: "",
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
  updateWristSize = (WristSize) => {
    this.setState({
      WristSize: WristSize
    })
  }
  updateWaistSize = (WaistSize) => {
    this.setState({
      WaistSize: WaistSize
    })
  }

  updateHipsSize = (HipsSize) => {
    this.setState({
      HipsSize: HipsSize
    })
  }
  updateForearmSize = (ForearmSize) => {
    this.setState({
      ForearmSize: ForearmSize
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

  updateBodyFat = () => {
    state = {
      Weight: 0,
      Wrist: 0,
      Waistline: 0,
      Hips: 0,
      Brachium: 0,
      BodyFat: "",
      department: '',
      checkMale: false,
      checkFemale: false
    }
    let { Weight, Wrist, Waistline, Hips, Brachium, Age } = this.state
    if (!Weight || Weight <= 0) {
      alert('Please input weight!!! ')
      return
    } else if (!Wrist || Wrist <= 0) {
      alert('Please input wrist!!!')
      return
    } else if (!Waistline || Waistline <= 0) {
      alert('Please input waight!!! ')
      return
    } else if (!Hips || Hips <= 0) {
      alert('Please input hips!!! ')
      return
    } else if (!Brachium || Brachium <= 0) {
      alert('Please input forearm size!!! ')
      return
    }
    // if (this.State.checkMale) {
    // BodyFatboy = Math.floor((this.state.Weight * 2.20462262) - (((this.state.Weight * 2.20462262) * 1.082) + 94.42) - (this.state.WaistSize * 4.15))
    //BodyFatlady: Math.floor(((((this.state.Weight*2.20462262)-((this.state.Weight*2.20462262*0.732)+8.987)+((this.state.WristSize*0.39)/3.140)-(this.state.WaistSize*0.157)-(this.state.HipsSize*0.39*0.249)+(this.state.ForearmSize*0.39*0.434)))*100)/(this.state.Weight*2.20462262))
    //} else if (this.setState.checkFemale) {
    // BodyFatlady = Math.floor(((((this.state.Weight * 2.20462262) - ((this.state.Weight * 2.20462262 * 0.732) + 8.987) + ((this.state.WristSize * 0.39) / 3.140) - (this.state.WaistSize * 0.157) - (this.state.HipsSize * 0.39 * 0.249) + (this.state.ForearmSize * 0.39 * 0.434))) * 100) / (this.state.Weight * 2.20462262))
    // }
    if (this.state.checkMale) {
      this.setState({
        BodyFat: Math.floor((((this.state.Weight * 2.20462262) - (((this.state.Weight * 2.20462262 * 1.082) + 94.42) - (this.state.WaistSize * 4.15))) * 100) / (this.state.Weight * 2.20462262))
      })
    }
    if (this.state.checkFemale) {
      this.setState({
        BodyFat: Math.floor(((((this.state.Weight * 2.20462262) - ((this.state.Weight * 2.20462262 * 0.732) + 8.987) + (this.state.WristSize / 3.140) - (this.state.WaistSize * 0.157) - (this.state.HipsSize * 0.249) + (this.state.ForearmSize * 0.434))) * 100) / (this.state.Weight * 2.20462262))
      })

    }



    SaveWeight(getToday(), this.state.Weight)
  }
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ผู้หญิง(% Fat)', 'ผู้ชาย(% Fat)', 'ลำดับ', 'คำอธิบาย'],
      tableData: [
        ['10-13%', '2-5%', 'Essential Fat', 'มีไขมันค่อนข้างน้อย เท่าที่จำเป็น'],
        ['14-20%', '6-13%', 'Athletes', 'มีไขมันพอประมาณ(กลุ่มนักกีฬา'],
        ['21-24%', '14-17%', 'Fitness', 'มีไขมันพอประมาณ(กลุ่มคนออกกำลังกายเป็นประจำ'],
        ['25-31%', '18-25%', 'acceptable', 'มีไขมันพอประมาณ อยู่เกณฑณ์พอดี (กลุ่มคนทั่วไป)'],
        ['32%+', '25%+', 'Obese', 'มีไขมันมากเกินไป ควรลดปริมาณไขมัน']
      ]
    }
  }

  // componentDidMount() {

  //   db.transaction((tx) => {

  //     tx.executeSql('CREATE TABLE IF NOT EXISTS Weight(Date datetime,Weight int(3))',
  //       [], (tx, result) => {
  //         console.log('create table result : ', result)
  //       }, (e) => {
  //         console.log('error create table: ', e)
  //       })

  //     // tx.executeSql("INSERT INTO user(first_name, last_name,email,phone) VALUES ()",
  //     // [], (tx, result) => {
  //     //   console.log('result save : ', result)
  //     // })

  //     tx.executeSql("SELECT * FROM user", [], (tx, result) => {
  //       console.log('result select : ', result)
  //       var len = result.rows.length
  //       if (len === 0) { // ต้องลงทะเบียน
  //         this.props.navigation.navigate('Signup')
  //       } else { // ไปหน้าโปรไฟล์
  //         this.props.navigation.navigate('Home')
  //       }
  //     })
  //   })
  // }


  render() {
    const state = this.state;


    return (

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, flexDirection: "column", margin: 5, marginTop: 10, backgroundColor: "#f4f4f4", borderRadius: 10 }} >
          <View style={{ margin: 5, marginTop: 10, height: 30, backgroundColor: "#9cf6e2", borderRadius: 10 }}>
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

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Wrist Size: </Text>
            <View style={{ flexDirection: "column" }}>
              <TextInput style={{}}
                onChangeText={this.updateWristSize}
              >
              </TextInput>
              <View style={{ height: 1, width: 50, backgroundColor: "black" }} />
            </View>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>In. </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Waist Size: </Text>
            <View style={{ flexDirection: "column" }}>
              <TextInput style={{}}
                onChangeText={this.updateWaistSize}
              >
              </TextInput>
              <View style={{ height: 1, width: 50, backgroundColor: "black" }} />
            </View>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>In. </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Hips Size : </Text>
            <View style={{ flexDirection: "column" }}>
              <TextInput style={{}}
                onChangeText={this.updateHipsSize}
              >
              </TextInput>
              <View style={{ height: 1, width: 50, backgroundColor: "black" }} />
            </View>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>In. </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>Forearm Size (female only) : </Text>
            <View style={{ flexDirection: "column" }}>
              <TextInput style={{}}
                onChangeText={this.updateForearmSize}
              >
              </TextInput>
              <View style={{ height: 1, width: 50, backgroundColor: "black" }} />
            </View>
            <Text style={{ marginTop: 20, fontSize: 15, color: "black" }}>In. </Text>
          </View>




          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20, color: "black" }}>
            <TouchableHighlight style={styles.button}
              onPress={this.updateBodyFat}
            >
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableHighlight>
          </View >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "skyblue" }}>ปริมาณไขมันในร่างกายคุณคือ:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 30, fontWeight: "bold", color: "skyblue" }}> {this.state.BodyFat}%</Text>
            </View>

          </View>

          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
              <Rows data={state.tableData} textStyle={styles.text} />
            </Table>
          </View>



        </View>
      </ScrollView>



    );
  }

}
const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    width: 130,
    alignItems: 'center',
    backgroundColor: '#9cf6e2',
    borderRadius: 5,
    borderWidth: 1,

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

