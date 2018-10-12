
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
  
import axios from 'react-native-axios';
import {connect} from 'react-redux'


class startedDrugScreen extends Component {
//  static navigationOptions = {
//    tab 
//  }
  constructor(props) {
    super(props)
    this.state = { isloading:true, prescriptions:[]}
  }
 
  componentWillMount=()=>{
    console.log(this.props.token) 
    url='http://192.168.43.252:3000/api/prescriptions/startedByPatient'; 
    axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
    .then((response)=>{
      console.log(response.data); 
      this.setState({prescriptions:response.data})
      this.setState({isloading:false})
    })
    .catch((error)=> { 
      console.log(error.response);
    })
    console.log("yre")
  }

  showOnePrescription = (x)=>{
    console.log(x)
    this.props.navigation.navigate('Sdd', { patient: x });  
  }

  renderPatients= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    return (
      <FlatList
          data={this.state.prescriptions}
          renderItem={({item}) => {
              return(
                <TouchableHighlight underlayColor="#f0ffff" onPress={() => this.showOnePrescription(item)}>
                  <Card  >
                  <CardItem>
                  <Left>
                   
                    <Body>
                      <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Name:</Text>
                        <Text>{item.drugId.name}</Text>
                      </Text>

                      <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Daily Frequency:</Text>
                        <Text>{item.noOfTimesTobeTaken}</Text>
                      </Text>

                    </Body>
                  </Left>
                  
                  <Right>
                    <Body>
                    <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Started Drug Status:</Text>
                        <Text>{(item.startedDrug) ? 'True' : 'false'}</Text>
                      </Text>

                      <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Quantity:</Text>
                        <Text>{item.quantity}</Text>
                      </Text>

                    </Body>
                  </Right>

                </CardItem>
                  </Card>
                </TouchableHighlight>
              )
            }
          } 
          keyExtractor={(item, index) => index.toString()}
        />
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
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Prescriptions in Progress</Text>
          </Body>
          <Right style={{flex:1}}>
          <Button transparent onPress={() => {this.props.updateToken("");this.props.navigation.navigate('Login');
        }}>
          <Icon name='power' />
        </Button>
          </Right>
        </Header>

        <Content>
          <View style={{flex:1}}>
             {this.renderPatients()}
          </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(startedDrugScreen)


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
