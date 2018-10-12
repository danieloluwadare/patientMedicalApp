
import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableHighlight,ActivityIndicator,Alert } from 'react-native';
import Url from './url';
import { 
  Container,
  Header, 
  Content,Item,Thumbnail, 
  Form,Button,Input,Label,Title,Textarea,Picker,DatePicker,
  Card, CardItem, Body,Icon,Right,Left
  } from 'native-base';
import axios from 'react-native-axios';
import {connect} from 'react-redux';
  

class ConsultationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isloading:true,

      patient:null,
      userId:null,
      message:"hunger dey",
      temperature:"43",
      bloodPressure:"667",
      glucoseLevel:"35",
      topic:"headache",
      symptoms:null,
      diagnosis:null,
      causes:null,

      }
  }

  componentWillMount=()=>{
    // const{patient} = this.props.navigation.state.params
    // this.setState({patient:patient});
    // this.setState({userId:patient.userId._id})

    this.setState({isloading:false})
    
  }


  submit=()=>{
    this.setState({isloading:true})
    options={headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}}
    let url='http://192.168.43.252:3000/api/consultations/consultDoctor';
    const {topic, message, userId, symptoms, diagnosis, causes, temperature, bloodPressure, glucoseLevel}=this.state;
    axios.post(url, {
      topic: topic,
      message: message,
      // receiverId:userId,
      temperature:temperature,
      bloodPressure:bloodPressure,
      glucoseLevel:glucoseLevel,
      symptoms:symptoms,
      diagnosis:diagnosis,
      causes:causes,

    },options).
    then((response) => {
      console.log(response.data)
      this.setState({isloading:false})
      Alert.alert(
        'Mobile App',
        'Consultation Sent successful',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false } 
       )    
    }).
    catch((error)=>{console.log(error.response.data)})
  }

  selectDrug=(x)=>{
    this.setState({formdrug:x})
    console.log(this.state.formdrug);
  }

  // selectDosage=(x)=>{
  //   this.setState({formdosage:x})   
  //   console.log(this.state.formdosage);
    
  // }
  
  renderDrugs=()=>{
    return this.state.drugs.map(drug=> <Picker.Item key={drug._id} label={drug.name} value={drug} />)
  }

  renderDosage=()=>{
    return this.state.dosages.map(d=> <Picker.Item key={d._id} label={d.abbreviation} value={d} />)
  }
  
  
  renderPage=()=>{
    if(this.state.isloading){
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={{flex:1}}>
          {/* <Card  >
            <CardItem>
              <Left>
                <Thumbnail source= {require('./me.jpg')} />
                <Body>
                  <Text>{this.state.patient.userId.firstname}  </Text>
                  <Text>{this.state.patient.userId.lastname} </Text>
                </Body>
              </Left>
              
              <Right>
                <Body style={{marginTop:10}} >
                  <Text>Allergies </Text>
                  <Text>{this.state.patient.allergies}</Text>
                </Body>
              </Right>
            </CardItem>
          </Card> */}
          
          <Item rounded style={{marginHorizontal:10, marginVertical:5}}>
            <Input onChangeText={(text) => this.setState({topic:text})} value={this.state.topic} placeholder='Topic'/>
          </Item>
          
          <Item rounded style={{marginHorizontal:10, marginVertical:5}}>
            <Input onChangeText={(text) => this.setState({temperature:text})} value={this.state.temperature} placeholder='temperature'/>
          </Item>

          <Item rounded style={{marginHorizontal:10, marginVertical:5}}>
            <Input onChangeText={(text) => this.setState({bloodPressure:text})} value={this.state.bloodPressure} placeholder='Blood pressure'/>
          </Item>

          <Item rounded style={{marginHorizontal:10, marginVertical:5}}>
            <Input onChangeText={(text) => this.setState({glucoseLevel:text})} value={this.state.glucoseLevel} placeholder='Glucose Level'/>
          </Item>

          <Textarea style={{borderRadius:20,borderColor:'gray', marginHorizontal:5, marginVertical:5}} rowSpan={5} bordered placeholder="Patient complaint" 
          onChangeText={(text) => this.setState({message:text})} value={this.state.message} />
        
          
          {/* <Form style={{marginTop:5}}>
            <Input onChangeText={(text) => this.setState({quantity:text})} value={this.state.quantity} placeholder="Quantity" keyboardType="numeric" />
          </Form>

          <Form style={{marginTop:5}}>
            <Input onChangeText={(text) => this.setState({timesTobeTaken:text})} value={this.state.timesTobeTaken} placeholder="No of times To be Taken" keyboardType="numeric" />
          </Form> */}

          <Button full primary style={{ paddingBottom: 4, marginTop:15,marginHorizontal:15,borderRadius:15 }} onPress={()=>this.submit() }>
            <Text> Send  </Text>
          </Button>

      </View>
    )
  }

  render() { 
    return (
      <Container>
        <Header>
          <Left style={{flex:1}}>
          <Button transparent onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
          </Left>
          <Body style={{flex:1}}>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Consult Doctor</Text>
          </Body>
          <Right style={{flex:1}}>
          <Button transparent onPress={() => {this.props.updateToken("");this.props.navigation.navigate('Login');
        }}>
          <Icon name='power' />
        </Button>
          </Right>
        </Header>
     
        <Content>   
          {this.renderPage()}
        </Content>
        
      
    </Container>
    );
  }
}

mapStateToProps = (state)=>{
  return{
    token:state.token
  }
}

mapDispatchToProps=(dispatch)=>{
  return{
    updateToken:(token)=>dispatch({type:'UPDATE_TOKEN', token})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ConsultationScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
