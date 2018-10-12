
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
  



export default class PatientsListScreen extends Component {
//  static navigationOptions = {
//    tab 
//  }
  constructor(props) {
    super(props)
    this.state = { isloading:true, patients:[]}
  }

  componentWillMount=()=>{
    url='http://192.168.43.252:3000/api/patients/forDoctor';
    axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg4OTc1OGIyYmRmMDE4MjRiZWUwN2YiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzU5OTkxMzN9.v_cvEfhoISuS2NjDZm4K9EYfX9Yfi6TGo1RAykyB5UI"}}).then((response)=>{
      console.log(response.data);
      this.setState({patients:response.data})
      this.setState({isloading:false})
    } )
  }

  showOnePatient = (x)=>{
    console.log(x)
    this.props.navigation.navigate('PatientsDetail', { patient: x });  
  }

  renderPatients= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    return (
      <FlatList
          data={this.state.patients}
          renderItem={({item}) => {
              return(
                <TouchableHighlight underlayColor="#f0ffff" onPress={() => this.showOnePatient(item)}>
                  <Card  >
                    <CardItem>
                      <Left>
                        <Thumbnail source= {require('./me.jpg')} />
                        <Body>
                          <Text>{item.userId.firstname} {item.userId.lastname}</Text>
                          <Text>{item.userId.phoneNumber}</Text>
                        </Body>
                      </Left>
                      
                      <Right>
                        <Body>
                          <Text>View </Text>
                          <Text>Profile</Text>
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
            <Icon name="menu"></Icon>
          </Left>
          <Body style={{flex:1}}>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Patients</Text>
          </Body>
          <Right style={{flex:1}}>
            <Icon name="person" ></Icon>
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
