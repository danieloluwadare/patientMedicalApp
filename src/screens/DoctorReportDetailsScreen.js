
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
  import {connect} from 'react-redux'
  



class DoctorReportDetailsScreen extends Component {
//  static navigationOptions = {
//    tab
//  }
  constructor(props) {
    super(props)
    this.state = { isloading:true, complaint:null, }
  }

  componentWillMount=()=>{
    console.log("from complaint patient")
    const{patient} = this.props.navigation.state.params
    console.log(patient)
    this.setState({complaint: patient});
    // console.log(this.state.complaint);
    // // console.log(patient.senderId)
    // this.fetchPatientByUserId(patient.senderId._id);
    this.updateReadBy(patient._id);     
    this.setState({isloading:false}) 
    
  }

  updateReadBy=(id)=>{
    url=`http://192.168.43.252:3000/api/consultations/updateReadby/${id}`; 
    axios.put(url,{topic: "topic",},{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
    .then((response)=>{
      console.log(response.data); 
      // this.setState({patient:response.data})
      this.setState({isloading:false})
    })
    .catch((error)=> { 
      console.log(error.response);
    })
    // this.setState({isloading:false})    
  }
  


  
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

    const {senderId,topic,message,symptoms,diagnosis,causes}=this.state.complaint;
    // const {temperature,bloodPressure,glucoseLevel}=this.state.patient;
    
    return (


      <View style={{flex:1}}>
      
        <View style={{flex:2,marginVertical:5, flexDirection:'column', justifyContent:"center", alignItems:'center'}} >
          <Thumbnail style={{width:180, height:180, borderRadius:90}} source= {require('./me.jpg')} />
          
        </View>


        <View style={{ flexDirection:'row',justifyContent:"space-around"}}>
          <TouchableHighlight underlayColor="#f0ffff" onPress={() => this.consultWithPatient()}>
            <Text style={{fontWeight:'bold', fontSize:16}} >Consult</Text>
          </TouchableHighlight>
          {/* <Text style={{fontWeight:'bold', fontSize:16}}>Message</Text> */}

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
                  {/* DADA DAniel OLu */}
                  {senderId.firstname} {senderId.lastname}
                </Text>
              </Body>
            </CardItem>
            
            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Topic</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {topic}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Symptoms</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {symptoms}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Diagnosis</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {diagnosis}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Causes</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {causes}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}}>Subject</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {message}
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
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Doctors Report Detail</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(DoctorReportDetailsScreen)


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
