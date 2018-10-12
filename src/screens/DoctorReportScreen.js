
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


class DoctorReportScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { isloading:true, consultations:[]}
  }
 
  componentWillMount=()=>{
    console.log(this.props.token) 
    url='http://192.168.43.252:3000/api/consultations/forPatient'; 
    axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
    .then((response)=>{
      console.log(response.data); 
      this.setState({consultations:response.data})
      this.setState({isloading:false})
    })
    .catch((error)=> { 
      console.log(error.response);
    })
    // console.log("yre")
  }

  showOneComplaints = (x)=>{
    // console.log(x)
    this.props.navigation.navigate('DoctorReportDetails', { patient: x });  
  }

  renderPatients= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    return (
      <FlatList
          data={this.state.consultations}
          renderItem={({item}) => {
              return(
                <TouchableHighlight underlayColor="#f0ffff" onPress={() => this.showOneComplaints(item)}>
                  <Card  >
                  <CardItem>
                  <Left>
                   
                    <Body>
                      <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Name:</Text>
                        <Text>DR {item.senderId.firstname} {item.senderId.lastname} </Text>
                      </Text>

                      <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Topic:</Text>
                        <Text>{item.topic}</Text>
                      </Text>

                    </Body>
                  </Left>
                  
                  <Right>
                    <Body>
                    <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Already Read:</Text>
                        <Text>{(item.readByReceiver) ? 'Yes' : 'No'}</Text>
                      </Text>

                      {/* <Text>
                        <Text style={{fontWeight:'bold', fontSize:15}}>Quantity:</Text>
                        <Text>{item.quantity}</Text>
                      </Text> */}

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
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Doctors Report</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(DoctorReportScreen)


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
