import React, {Component} from 'react';
import {View,TouchableOpacity,StyleSheet,Image,PermissionsAndroid} from 'react-native';
import { RNCamera } from 'react-native-camera';
import KeepAwake from 'react-native-keep-awake';
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

class CameraPhase extends Component {
    constructor(props) {
        super(props);
        KeepAwake.activate();
        this.state = {
            isTorchOn: false,
            isFlashOn:false,
            show:false,
            cameraView:true,
            url:''
          };
    }
    requestExternalStoragePermission () {
        try {
          const granted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'want to access your storage ' 
            },
          );
          return granted;
        } catch (err) {
          console.error('Failed to request permission ', err);
          return null;
        }
      };
    _handlePress() {
        // const { isFlashOn } = this.state;
        // //Torch.switchState(!isTorchOn);
        // this.setState({ isFlashOn: !isFlashOn });
        
        
      }
    takePicture = async()=>{
        // var hours = new Date().getHours(); //Current Hours
        // var min = new Date().getMinutes(); //Current Minutes
        // var sec = new Date().getSeconds(); //Current Seconds
        // var currentTime=hours+'_'+min+'_'+sec;
        const options = {
            base64: true,
            width:225,
            height:400
        };
        this.requestExternalStoragePermission();
        var filepath=RNFS.ExternalStorageDirectoryPath + '/biotestsample/';
        RNFS.mkdir(filepath)
       .then(res => {
            //alert('created')
       })
        const data = await this.camera.takePictureAsync(options); 
        let url =data.uri
        //this.setState({url: url})
        this.props.navigation.navigate('SelectImage',{uri:url})
        alert(data.uri)
        //this.setState({cameraView:false})
       // this.setState({show:true})
      //   var bodyFormData = new FormData();
      //   bodyFormData.append('image',
      //   {
      //     uri:data.uri,
      //     name:'userProfile.jpg',
      //     type:'image/jpg'
      //   });
      
      // fetch(
      //   'https://bioapplication.herokuapp.com/create/', 
      //    {
      //       method:'POST',
      //       headers: {'Accept-Encoding':'gzip;q=1.0, compress;q=0.5'},
      //       body:bodyFormData}
      // ).then((res) => res.json())
      // .then(resjson=>{
      //   var param=resjson["value"]
      //   var ids= resjson["id"]
      //     //alert(id)
      //     RNFS.moveFile(data.uri,filepath+param+'_'+currentTime+'.jpg')
      //     this.setState({url:filepath+param+'_'+currentTime+'.jpg'})
      //     this.setState({show: false})
      //     this.setState({cameraView:true})
      //     //this.props.navigation.navigate('AnalysisPhase',{reading:param,ids:ids});
      // }).catch(err=>{
      //   this.setState({show: false})
      //   this.setState({cameraView:true})
      //   alert('analysis fails')
      // })
    }
    render() {
        return (
                <View style={styles.container}>
                    
                    {this.state.cameraView ?<RNCamera
                                flashMode={this.state.isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={{
                                    flex: 1,
                                    width: '100%',
                                }}
                        >
                        <View style={styles.position}>

                                <TouchableOpacity onPress={this._handlePress.bind(this)}>
                                <Image
                                style={styles.flashView}
                                source={require('../images/electric.png')}
                                />

                                </TouchableOpacity>
                        </View>
                        <View style={{alignSelf: 'center',bottom:10,position:'absolute'}}>
                  <TouchableOpacity onPress={this.takePicture}>
                  <Image source={require('../images/button.png')} style={styles.buttonView}/> 
                  </TouchableOpacity>
              </View>
              
        </RNCamera>:null}
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
    },
    buttonView:{
        width:55,
        height:55,
        right:10
      },
      flashView:{
        width:50,
        height:50,
        marginTop:'10%',
        left:10
      },
});
export default CameraPhase;

