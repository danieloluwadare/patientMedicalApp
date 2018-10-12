
import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableHighlight,ActivityIndicator } from 'react-native';
import Url from './url';
import { 
  Container,
  Header, 
  Content, 
  Form,Button,Input,Label,Title, Thumbnail,
  Card, CardItem, Body,Icon,Right,Left
  } from 'native-base';
  import axios from 'react-native-axios'
  



export default class ComplaintsDetailScreen extends Component {
//  static navigationOptions = {
//    tab
//  }
  constructor(props) {
    super(props)
    this.state = { isloading:true, patient:null}
  }

  componentWillMount=()=>{
    const{patient} = this.props.navigation.state.params
    this.setState({patient:patient});
    this.setState({isloading:false})
    
  }

  // showDrugDetails = (x)=>{
  //   console.log(x)
  //   this.props.navigation.navigate('DrugDetails', { drug: x });
    
  // }

  prescribeDrug = ()=>{
    
    this.props.navigation.navigate('PrescribeDrug', {patient:this.state.patient});

  }

  consultWithPatient=()=>{
    this.props.navigation.navigate('Consultation', {patient:this.state.patient});
  }

  renderPatient= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    const {height,weight,bloodGroup,genotype,rhesusFactor,allergies,temperature,bloodPressure,glucoseLevel,userId,pharmacyId}=this.state.patient    
    return (


      <View style={{flex:1}}>
      
        <View style={{flex:2,marginVertical:5, flexDirection:'column', justifyContent:"center", alignItems:'center'}} >
          <Thumbnail style={{width:180, height:180, borderRadius:90}} source= {require('./me.jpg')} />
          
        </View>


        <View style={{ flexDirection:'row',justifyContent:"space-around"}}>
          {/* <TouchableHighlight underlayColor="#f0ffff" onPress={() => this.consultWithPatient()}>
            <Text style={{fontWeight:'bold', fontSize:16}} >Consult</Text>
          </TouchableHighlight> */}
          <Text style={{fontWeight:'bold', fontSize:16}}>Message</Text>

          {/* <TouchableHighlight underlayColor="#f0ffff" onPress={() => this.prescribeDrug()}>
            <Text style={{fontWeight:'bold', fontSize:16}} >Precsibe</Text>
          </TouchableHighlight> */}
        </View>
        
        <View >
          <Card>
            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}} >Name</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={{fontStyle:'italic'}} >
                  DADA DAniel OLu
                  {/* {userId.firstname} {userId.lastname} */}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text>Allergies</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  cough
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Topic</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                Headache and Cough
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Subject</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                So I prepared this visual guide with all of the important props, including some playgrounds where you can play around with them. I hope that it will help you during the learning process or just as a cheat sheet when you will want to refresh your memory.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </View>
      </View>
      
    )
        
  }

  render() { 
    return (
      <Container>
        <Header>
          <Left style={{flex:1}}>
            <Icon name="menu"></Icon>
          </Left>
          <Body style={{flex:1}}>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Patients Details</Text>
          </Body>
          <Right style={{flex:1}}>
            <Icon name="person" ></Icon>
          </Right>
        </Header>
        <Content>
          {this.renderPatient()}
        </Content>

        
      
    </Container>
    );
  }
}

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
