import React, {Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,ToolbarAndroid} from 'react-native';
//import ImageCrop from 'react-native-image-crop';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS  from 'react-native-fs'
import {BallIndicator,
    WaveIndicator,
    UIActivityIndicator,
    SkypeIndicator,
    PulseIndicator,
    BarIndicator,
    MaterialIndicator,
    DotIndicator,
    PacmanIndicator} from 'react-native-indicators'
class SelectImage extends Component {
    constructor(props) {
        super(props);
       //KeepAwake.activate();
        this.state = {
            url:this.props.navigation.state.params.uri,
            show:false,
            cameraView:true,
          };
          //alert(this.state.url)
    }
    edit=()=>{

        //alert(this.state.url)
        ImagePicker.openCropper({
            path: this.state.url,
            width: 300,
            height: 400
          }).then(image => {
            this.setState({ url: image['path']})
            
                    });
    }
    upload =()=>{

            this.setState({show: true})
            this.setState({cameraView:false})
            var filepath=RNFS.ExternalStorageDirectoryPath + '/biotestsample/';
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
            var currentTime=hours+'_'+min+'_'+sec;
            var bodyFormData = new FormData();
                    bodyFormData.append('image',
                    {
                    uri:this.state.url,
                    name:'userProfile.jpg',
                    type:'image/jpg'
                    });

                fetch(
                    'http://139.59.73.106/create/',
                    {
                        method:'POST',
                        headers: {'Accept-Encoding':'gzip;q=1.0, compress;q=0.5'},
                        body:bodyFormData}
                ).then((res) => res.json())
                .then(resjson=>{
                    var param=resjson["value"]
                    var ids= resjson["id"]
                    //alert(id)
                    RNFS.moveFile(this.state.url,filepath+param+'_'+currentTime+'.jpg').then(res => {
                        //alert('copy file')
                        this.setState({url:filepath+param+'_'+currentTime+'.jpg'})
                    })

                    this.setState({show: false})
                    this.setState({cameraView:true})
                    this.props.navigation.navigate('AnalysisPhase',{reading:param,ids:ids});
                }).catch(err=>{
                    this.setState({show: false})
                    this.setState({cameraView:true})
                    alert('analysis fails:'+err)
                    
                })
    }
    render() {
        return (
            <View style={styles.container}>

            <View style={{backgroundColor:'black',height:'10%',width:'100%',
            justifyContent:'center',alignItems:'center'
            }}>
                    <Text style={{color: 'white',fontWeight:'bold'}}>Image Editor</Text>
            </View>
            {this.state.show ? <UIActivityIndicator style={{display:'flex'}}  size={50} color='#000'/>:null}


             {this.state.cameraView ?
                    <View style={{height:'50%', width:'60%',top:'5%',
                    borderColor:'black',borderWidth:2,alignSelf:'center',borderRadius:15}}>
                        <Image source={{uri: this.state.url}} style={{resizeMode: 'cover',flex: 1,borderRadius:10}} />
                    </View>
            :null}
                    <View style={{flexDirection: 'row',top:'25%',left:'20%'}}>
                            <TouchableOpacity onPress={this.edit} style={{alignSelf:'flex-start'}}>
                                <Image source={require('../images/picture.png')} style={{width:48,height:48,}}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.upload} style={{left:50}}>
                                    <Image source={require('../images/upload.png')} style={{width:40,height:40,}}></Image>
                            </TouchableOpacity>
                    </View>
            </View>
        )}
}
const styles = StyleSheet.create({

    container: {
        flex: 1
    },

});
export default SelectImage;