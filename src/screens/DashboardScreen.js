
import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableHighlight,ActivityIndicator } from 'react-native';
import Url from './url';
import { 
  Container,
  Header, 
  Content, 
  Form,Button,Input,Label,Title, Thumbnail,
  Card, CardItem, Body,Icon, Right, Left
} from 'native-base';
import {connect} from 'react-redux'
import axios from 'react-native-axios';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';


class DashboardScreen extends Component {
//  static navigationOptions = {
//    tab 
//  }
  constructor(props) {
    super(props)
    this.state = { isloading:true, 
      currentPrep:null, 
      prescriptions:[], 
      countdowntime:10,
      noOfAd:0,
      noOfPd:0,
      noOfSd:0,
      noOfCo:0
    }
  }
 
  componentWillMount=()=>{
    this.nextSchedule()
    console.log(this.props.token) 
    axios.all([this.acquiredDrugs(), this.pendingDrug(),this.startedDrug(),this.consultation()])
    .then(axios.spread( (ad, pd, sd, co ) => {
      // Both requests are now complete
      console.log("from Dashboard")
      console.log(ad.data.length);
      this.setState({noOfAd:ad.data.length})
      this.setState({noOfPd:pd.data.length})

      this.setState({noOfSd:sd.data.length})
      this.setState({noOfCo:co.data.length})

      this.setState({isloading:false})
    }));
  }

  nextSchedule=()=>{
    url='http://192.168.43.252:3000/api/prescriptions/scheduledDrug'; 
    axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
    .then((response)=>{
      console.log(response.data); 
      this.setState({prescriptions:response.data})
      // this.setState({isloading:false})
      this.calculateCountDownValue();
    })
    .catch((error)=> { 
      console.log(error.response);
    })
  }
  
  calculateCountDownValue=()=>{
    prep =this.state.prescriptions[0];
    this.setState({currentPrep:prep})    
    let d = Date.now()
    let formatedDate= `${moment(d).hour()}:${moment(d).minute()}`  
    // console.log(formatedDate);
    // console.log(moment.duration(formatedDate).asSeconds());
    let dseconds=moment.duration(formatedDate).asSeconds(); 
    cdt = prep.startTimeOfDug - dseconds
    this.setState({countdowntime:cdt})
    
    
  }

  acquiredDrugs=()=>{
    url='http://192.168.43.252:3000/api/prescriptions/acquiredbypatient'; 
    return axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
  }

  pendingDrug=()=>{
    url='http://192.168.43.252:3000/api/prescriptions/notacquiredbypatient'; 
    return axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
  }

  startedDrug=()=>{
    url='http://192.168.43.252:3000/api/prescriptions/startedByPatient'; 
    return axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
  }

  consultation=()=>{
    url='http://192.168.43.252:3000/api/consultations/forPatient'; 
    return axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
  }

  
  // showOnePrescription = (x)=>{
  //   console.log(x)
  //   this.props.navigation.navigate('PrescriptionDetail', { patient: x });  
  // }

  renderD= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <Card>
            <CardItem>  
            <Body style={{flex:1}}>
              <Text style={{textAlign:'center', fontWeight:'bold'}}>Next Drug CountDown</Text>
            </Body>
            </CardItem>
            {/* <CardItem>  
              <CountDown
                until={(this.state.countdowntime===0) ? 10 : this.state.countdowntime}
                onFinish={() => alert('finished')}
                onPress={() => alert('hello')}
                size={30}
              /> this.props.navigation.navigate('Pud', { patient: this.state.prescriptions[0]})
            </CardItem> */}

            {
              (this.state.currentPrep) ? 
              (
                <CardItem>  
                  <CountDown
                    until={(this.state.countdowntime===0) ? 10 : this.state.countdowntime}
                    onFinish={() =>this.props.navigation.navigate('Pud', { prep: this.state.currentPrep})}
                    onPress={() => { console.log(this.state.currentPrep)
                      this.props.navigation.navigate('Pud', { prep: this.state.currentPrep})
                      }}
                    size={30}
                  />
                </CardItem>
              ):

              (
                <CardItem>  
                  <Text style={{fontWeight:'bold', fontSize:16}} >No schedule available</Text>
                </CardItem>  
              ) 

              
              
            }

            
          </Card>
        </View>
        
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}} >
          <Card>
            <View style={{width:150, height:150, alignItems:'center', justifyContent: 'space-around'}} >
              <CardItem><Text style={{fontSize:50, fontWeight:'bold'}}>{this.state.noOfAd}</Text></CardItem>
              <CardItem><Text style={{fontSize:10, fontWeight:'bold'}}>Acquired Drug</Text></CardItem>
            </View>
          </Card>
          
          <Card>
            <View style={{width:150, height:150, alignItems:'center', justifyContent: 'space-around'}} >
              <CardItem><Text style={{fontSize:50, fontWeight:'bold'}}>{this.state.noOfPd}</Text></CardItem>
              <CardItem><Text style={{fontSize:10, fontWeight:'bold'}}>Pending Drug</Text></CardItem>
            </View> 
          </Card>

        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}} >
          <Card>
            <View style={{width:150, height:150, alignItems:'center', justifyContent: 'space-around'}} >
              <CardItem><Text style={{fontSize:50, fontWeight:'bold'}}>{this.state.noOfSd}</Text></CardItem>
              <CardItem><Text style={{fontSize:10, fontWeight:'bold'}}>Started Drug</Text></CardItem>
            </View>
          </Card>
          
          <Card>
            <View style={{width:150, height:150, alignItems:'center', justifyContent: 'space-around'}} >
              <CardItem><Text style={{fontSize:50, fontWeight:'bold'}}>{this.state.noOfCo}</Text></CardItem>
              <CardItem><Text style={{fontSize:10, fontWeight:'bold'}}>Total Consultation</Text></CardItem>
            </View>
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
          <Button transparent onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
          </Left>
          <Body style={{flex:1}}>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Dashboard</Text>
          </Body>
          <Right style={{flex:1}}>
          <Button transparent onPress={() => {this.props.updateToken("");      
                                              this.props.navigation.navigate('Login');
          }}>
            <Icon name='power' />
          </Button>
          </Right>
        </Header>

        <Content>
          {this.renderD()}
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

export default connect(mapStateToProps,mapDispatchToProps)(DashboardScreen)


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
