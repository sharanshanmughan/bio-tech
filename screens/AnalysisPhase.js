import React, {Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,BackHandler,TextInput} from 'react-native';
import Dialog from "react-native-dialog";
import {BallIndicator,
    WaveIndicator,
    UIActivityIndicator,
    SkypeIndicator,
    PulseIndicator,
    BarIndicator,
    MaterialIndicator,
    DotIndicator,
    PacmanIndicator} from 'react-native-indicators'


//import ImageCropper from 'react-native-advance-image-cropper';

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
        this.id = this.props.navigation.state.params.ids;
        //alert(this.id)
        var reading=value*18
        this.state={
            //Setting the value of the date time
            value:value,
            reading:reading,
            date: date + '/' + month + '/' + year , 
            time:hours + ':' + min,
            dialogShow:false,
            newValue:'',
            show:false,
            containerView:true
          };
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }
    
      componentWillUnmount() {
        this.backHandler.remove()
      }
    
      handleBackPress = async() => {
          //alert('back')
        this.props.navigation.navigate('CameraPhase')
      }
    closeDialogBox=()=>{
        this.setState({dialogShow:false});
       
    }
    openDialogBox=()=>{
        //alert(this.id)
        this.setState({dialogShow:true});
        this.setState({containerView: true})
    }
    backToCamera=()=>{
        this.props.navigation.navigate('CameraPhase')
    }
    saveValue = ()=>{
       
        this.setState({show: true})
        this.setState({containerView: false})
        const { newValue }  = this.state ;
        var bodyFormData = new FormData();
        bodyFormData.append('value',newValue
        );
        fetch(
            'https://bioapplication.herokuapp.com/'+this.id+'/change/', 
             {
                method:'POST',
                headers: {'Accept-Encoding':'gzip;q=1.0, compress;q=0.5'},
                body:bodyFormData}
          ).then((res) => res.json())
          .then(resjson=>{
            var param=resjson["value"]
            var ids= resjson["id"]
              //alert(param)
              this.setState({dialogShow:false});
              
          }).catch(err=>{
            this.setState({show: false})
            this.setState({cameraView:true})
            alert('analysis fails')
          })
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
                        {this.state.show ? <UIActivityIndicator style={{display:'flex'}}  size={50} color='#000'/>:null}
                            {this.state.containerView ? <View style={{}}>
                                <Text style={{alignSelf: 'center', fontSize:20}}>New Value</Text>
                                {/* <Dialog.Title>New Value:</Dialog.Title> */}
                                
                                <TextInput keyboardType='numeric' 
                                            onChangeText={newValue=>this.setState({newValue})}
                                            style={{
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
                                </View>:null} 
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

