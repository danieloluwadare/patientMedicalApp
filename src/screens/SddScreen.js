
import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableHighlight,ActivityIndicator,Alert} from 'react-native';
import Url from './url';
import { 
  Container,
  Header, 
  Content, 
  Form,Button,Input,Label,Title, Thumbnail,
  Card, CardItem, Body,Icon,Right,Left
  } from 'native-base';
  import axios from 'react-native-axios'
  



export default class SddScreen extends Component {

  constructor(props) {
    super(props)
    this.state = { isloading:true, prescriptions:null}
  }

  componentWillMount=()=>{
    const{patient} = this.props.navigation.state.params
    this.setState({prescriptions:patient});
    this.setState({isloading:false});
    // this.updateDalyFrequency();
    
  }

  

  // showDrugDetails = (x)=>{
  //   console.log(x)
  //   this.props.navigation.navigate('DrugDetails', { drug: x });
    
  // }

  
  renderPatient= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    const {_id,acquiredStatus,doctorsNote,quantity,drugId,patientId,dosageId}=this.state.prescriptions    
    return (


      <View style={{flex:1}}>
      
        <View style={{flex:2,marginVertical:5, flexDirection:'column', justifyContent:"center", alignItems:'center'}} >
          <Thumbnail style={{width:180, height:180, borderRadius:90}} source= {require('./me.jpg')} />
          
        </View>


        <View style={{ flexDirection:'row',justifyContent:'center'}}>

        {/* {
          acquiredStatus  ?
            (
              <TouchableHighlight underlayColor="#f0ffff" onPress={() => this.startDrug(_id)}>
                <Text style={{fontWeight:'bold', fontSize:16}} >Start Drug</Text>
              </TouchableHighlight>
            ) :

            (
              <TouchableHighlight underlayColor="#f0ffff" >
                <Text style={{fontWeight:'bold', fontSize:16}} >Purchase Drug</Text>
              </TouchableHighlight> 
              <Text style={{fontWeight:'bold', fontSize:16}} >Purchase Drug</Text>

            ) 

          } */}

          
        </View>
        
        <View >
          <Card>
            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}} >Name</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={{fontStyle:'italic'}} >
                  {patientId.userId.firstname} {patientId.userId.lastname}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Doctors Note</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {doctorsNote}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Drug Name</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {drugId.name}
                </Text>
              </Body>
            </CardItem>            

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>quantity</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {quantity}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Dosage Abbreviatiom</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {dosageId.abbreviation}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Dosage Meaning</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {dosageId.meaning}
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
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Prescription Details</Text>
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
