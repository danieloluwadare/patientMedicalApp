
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
  



export default class PatientsDetailScreen extends Component {
//  static navigationOptions = {
//    tab
//  }
  constructor(props) {
    super(props)
    this.state = { isloading:true, prescriptions:null}
  }

  componentWillMount=()=>{
    const{patient} = this.props.navigation.state.params
    this.setState({prescriptions:patient});
    this.setState({isloading:false})
    
  }

  // showDrugDetails = (x)=>{
  //   console.log(x)
  //   this.props.navigation.navigate('DrugDetails', { drug: x });
    
  // }

  startDrug = (x)=>{
    this.setState({isloading:true})
    
    url=`http://192.168.43.252:3000/api/prescriptions/updateStarted/${x}`;
    axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg5ZTJkZjZhMDcyZDIzZDQwOGFhYzMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzYxOTExNDB9.NeDQuIfKewFU1HMCNhuv2q-wBpEgQHW_99IHvzDCRzc"}})
    .then((response)=>{
      console.log(response.data);
      this.setState({prescriptions:response.data})
      this.setState({isloading:false})
      // this.props.navigation.navigate('PrescribeDrug', {patient:this.state.patient});
      Alert.alert(
        'Mobile App',
        'Started Presciption successful',
        [
          {text: 'OK', onPress: () => {this.props.navigation.navigate('AcquiredDrug');}},
        ],
        { cancelable: false } 
       )
    } )
    
  }

  

  renderPatient= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    const {_id,acquiredStatus,quantity,drugId,patientId,dosageId}=this.state.prescriptions    
    return (


      <View style={{flex:1}}>
      
        <View style={{flex:2,marginVertical:5, flexDirection:'column', justifyContent:"center", alignItems:'center'}} >
          <Thumbnail style={{width:180, height:180, borderRadius:90}} source= {require('./me.jpg')} />
          
        </View>


        <View>

        {
          acquiredStatus  ?
            (
              
              <Button full primary style={{ paddingBottom: 4, marginTop:15,marginHorizontal:15,borderRadius:15 }}       onPress={() => this.startDrug(_id)}>
                <Text>Start Drug </Text>
              </Button>
            ) :

            (
              /* <TouchableHighlight underlayColor="#f0ffff" >
                <Text style={{fontWeight:'bold', fontSize:16}} >Purchase Drug</Text>
              </TouchableHighlight> */
              <Text style={{fontWeight:'bold', fontSize:16}} >Purchase Drug</Text>

            ) 

          }

          
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
              <Text style={{fontWeight:'bold', fontSize:15}}>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {patientId.userId.phoneNumber}
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
