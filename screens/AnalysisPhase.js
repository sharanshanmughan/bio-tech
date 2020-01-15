import React, {Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput} from 'react-native';
import Dialog from "react-native-dialog";

class AnalysisPhase extends Component {
    constructor(props) {
        super(props);
        //KeepAwake.activate();
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var value = parseInt(this.props.navigation.state.params.reading, 10)
        var reading=value*18
        this.state={
            //Setting the value of the date time
            value:value,
            reading:reading,
            date: date + '/' + month + '/' + year , 
            time:hours + ':' + min,
            dialogShow:false
          };
    }
    closeDialogBox=()=>{
        this.setState({dialogShow:false});
    }
    openDialogBox=()=>{
        
        this.setState({dialogShow:true});
    }
    backToCamera=()=>{
        this.props.navigation.navigate('CameraPhase')
    }
    saveValue = ()=>{
        this.setState({dialogShow:false});
    }
    render() {
        return (
                <View style={styles.container}>
                        <Text style={{
                            fontSize:100,
                            alignSelf: 'center',
                            marginTop:"20%"
                            }}>
                            {this.state.reading}/{this.state.value}
                        </Text>
                        <Text style={{
                            fontSize:20,
                            left:'20%',
                            marginTop:0
                            }}>
                        Time : 
                        </Text>
                        <Text style={{
                            fontSize:30,
                            alignSelf: 'center',
                            marginTop:10
                            }}>
                        {this.state.time}
                        </Text>
                        <Text style={{
                            fontSize:20,
                            left:'20%',
                            marginTop:0
                            }}>
                        Date : 
                        </Text>
                        <Text style={{
                            fontSize:30,
                            alignSelf: 'center',
                            marginTop:10
                        }}>
                        {this.state.date}
                        </Text>
                        <View style={{flexDirection: 'row',left:'14%',marginTop:30}}>
                        <TouchableOpacity onPress={this.backToCamera}>
                            <Image source={require('../images/checkmark.png')} style={{width:60,height:60,}}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{left:80}} onPress={this.openDialogBox}>
                            <Image source={require('../images/cross.png')} style={{width:60,height:60}} ></Image>
                            </TouchableOpacity>
                        </View>
                        <Dialog.Container visible={this.state.dialogShow} >
                            <View style={{}}>
                                <Text style={{alignSelf: 'center', fontSize:20}}>New Value</Text>
                                {/* <Dialog.Title>New Value:</Dialog.Title> */}
                                
                                <TextInput keyboardType='numeric' style={{
                                                borderColor: 'black',
                                                top:10,
                                                fontSize: 18,
                                                borderWidth:1,
                                                borderRadius:50,
                                                paddingLeft:30}}/>
                                <View style={{flexDirection: 'row',marginTop:30}}>
                                <TouchableOpacity style={{left:60}} onPress={this.saveValue}>
                                    <Image source={require('../images/checkmark.png')} style={{width:40,height:40,}}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{left:120}} onPress={this.closeDialogBox}>
                                    <Image source={require('../images/cross.png')} style={{width:40,height:40}}></Image>
                                </TouchableOpacity>
                        </View>     
                                {/* <Dialog.Button label="Cancel" />
                                <Dialog.Button label="Delete" /> */}
                                </View>
                        </Dialog.Container>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      
     
    },
    
});
export default AnalysisPhase;

