
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
  import axios from 'react-native-axios'
  

export default class PrescribeDrugScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isloading:true,
      patient:null,
      drugs:[],
      dosages:[],

      patientId:null,
      formdrug:null,
      formdosage:null,
      doctorsNote:null,
      quantity:null,
      timesTobeTaken:null}
  }

  componentWillMount=()=>{
    const{patient} = this.props.navigation.state.params
    this.setState({patient:patient});
    this.setState({patientId:patient._id})

    axios.all([this.getDosage(), this.getDrugs()])
    .then(axios.spread( (dosage, drugs)=> {
      
      this.setState({drugs:drugs.data})
      this.setState({formdrug:drugs.data[0]})

      this.setState({dosages:dosage.data})
      this.setState({formdosage:dosage.data[0]})

      this.setState({isloading:false})

      console.log(this.state);
      // console.log(drugs);
      // Both requests are now complete
    }));
        
  }

  getDosage=()=>{
    url='http://192.168.43.252:3000/api/dosages';
    return axios.get(url,
      {headers: { 'Content-Type': 'application/json',"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg4OTc1OGIyYmRmMDE4MjRiZWUwN2YiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzU5OTkxMzN9.v_cvEfhoISuS2NjDZm4K9EYfX9Yfi6TGo1RAykyB5UI"}})
  }

  getDrugs=()=>{
    url='http://192.168.43.252:3000/api/drugs';
    return axios.get(url,
      {headers: { 'Content-Type': 'application/json',"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg4OTc1OGIyYmRmMDE4MjRiZWUwN2YiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzU5OTkxMzN9.v_cvEfhoISuS2NjDZm4K9EYfX9Yfi6TGo1RAykyB5UI"}})
  }

  submit=()=>{
    this.setState({isloading:true})
    options={headers: { 'Content-Type': 'application/json',"x-auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg4OTc1OGIyYmRmMDE4MjRiZWUwN2YiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MzYxNDQ0NTV9.NMierSAT885Y0kDZmP9ACnOd21gmRMrbYqGZd3bcwrk"}}
    let url='http://192.168.43.252:3000/api/prescriptions';
    const {formdrug,formdosage,patientId,quantity,doctorsNote,timesTobeTaken,patient}=this.state;
    axios.post(url, {
      drugId: formdrug._id,
      patientId: patientId,
      pharmacyId:patient.pharmacyId._id,
      dosageId:formdosage._id,
      quantity:quantity,
      doctorsNote:doctorsNote,
      noOfTimesTobeTaken:timesTobeTaken
    },options).
    then((response) => {
      console.log(response.data)
      this.setState({isloading:false})
      Alert.alert(
        'Mobile App',
        'Drug Presciption successful',
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
  
  setDate(newDate) {
    console.log(newDate);
    this.setState({ chosenDate: newDate });    
    // let day = (new Date(newDate).getDate())
    // let month = (new Date(newDate).getMonth())
    // let year = (new Date(newDate).getFullYear())
    // let date = new Date(newDate).
    // console.log(`${day}/${month + 1}/${year}`)
    // this.setState({ chosenDate: new Date(newDate) });
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
          <Card  >
            <CardItem>
              <Left>
                <Thumbnail source= {require('./me.jpg')} />
                <Body>
                  <Text>{this.state.patient.userId.firstname} {this.state.formdosage.abbreviation} </Text>
                  <Text>{this.state.patient.userId.lastname} {this.state.formdrug.name}</Text>
                </Body>
              </Left>
              
              <Right>
                <Body style={{marginTop:10}} >
                  <Text>Allergies </Text>
                  <Text>{this.state.patient.allergies}</Text>
                </Body>
              </Right>
            </CardItem>
          </Card>

          <Form style={{marginTop:5}} >
            <Textarea rowSpan={3} bordered placeholder="Doctors Note" 
            onChangeText={(text) => this.setState({doctorsNote:text})} value={this.state.doctorsNote} />
          </Form>

          <Form style={{marginTop:5}} >
          <Label style={{fontWeight:'bold',fontSize:17, paddingLeft:7}}>{this.state.formdrug.name}</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.formdrug._id}
                onValueChange={(x)=>this.selectDrug(x)}
              > 
              <Picker.Item label="select drug"/>
                {this.renderDrugs()}
              </Picker>
            </Item>
          </Form>

          <Form style={{marginTop:5}} > 
            <Label style={{fontWeight:'bold',fontSize:17, paddingLeft:7}} >{this.state.formdosage.abbreviation}</Label>
              <Item picker>
                <Picker 
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />} 
                  style={{width: 50}}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.formdosage.abbreviation}
                  onValueChange={(v)=>this.setState({formdosage:v})}
                >
                <Picker.Item label="select Dose "/>
                  {this.renderDosage()}

                </Picker>
              </Item>
          </Form>

          <Form style={{marginTop:5}}>
            <Input onChangeText={(text) => this.setState({quantity:text})} value={this.state.quantity} placeholder="Quantity" keyboardType="numeric" />
          </Form>

          <Form style={{marginTop:5}}>
            <Input onChangeText={(text) => this.setState({timesTobeTaken:text})} value={this.state.timesTobeTaken} placeholder="No of times To be Taken" keyboardType="numeric" />
          </Form>

          <Button full primary style={{ paddingBottom: 4, marginTop:15, }} onPress={()=>this.submit("chk") }>
            <Text> Prescribe  </Text>
          </Button>

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
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Prescribe Drugs</Text>
          </Body>
          <Right style={{flex:1}}>
            <Icon name="person" ></Icon>
          </Right>
        </Header>
     
        <Content>   
          {this.renderPage()}
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
