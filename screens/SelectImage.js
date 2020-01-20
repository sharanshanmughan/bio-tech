import React, {Component} from 'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput} from 'react-native';
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
    }
    edit=()=>{ 
        var filepath=RNFS.ExternalStorageDirectoryPath + '/biotestsample/';
        
        //alert(this.state.url)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            this.setState({ url: image['path']})
            this.setState({show: true})
            this.setState({cameraView:false})
            //alert(JSON.stringify(image['path']));
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
            var currentTime=hours+'_'+min+'_'+sec;
            //RNFS.moveFile(image['path'],filepath+'image.jpg')
            var bodyFormData = new FormData();
                    bodyFormData.append('image',
                    {
                    uri:image['path'],
                    name:'userProfile.jpg',
                    type:'image/jpg'
                    });
                
                fetch(
                    'https://bioapplication.herokuapp.com/create/', 
                    {
                        method:'POST',
                        headers: {'Accept-Encoding':'gzip;q=1.0, compress;q=0.5'},
                        body:bodyFormData}
                ).then((res) => res.json())
                .then(resjson=>{
                    var param=resjson["value"]
                    var ids= resjson["id"]
                    //alert(id)
                    RNFS.moveFile(image['path'],filepath+param+'_'+currentTime+'.jpg')
                    this.setState({url:filepath+param+'_'+currentTime+'.jpg'})
                    this.setState({show: false})
                    this.setState({cameraView:true})
                    this.props.navigation.navigate('AnalysisPhase',{reading:param,ids:ids});
                }).catch(err=>{
                    this.setState({show: false})
                    this.setState({cameraView:true})
                    alert('analysis fails')
                })
                    });
    }
    render() {
        return (
            <View style={styles.container}>
            {this.state.show ? <UIActivityIndicator style={{display:'flex'}}  size={50} color='#000'/>:null}
             <Text style={{position:'absolute',top:10}}>ImagePicker</Text>

             {this.state.cameraView ?<Image source={{uri: this.state.url}} style={{width: '50%', height: "50%",left:10}} />:null}
            
            <TouchableOpacity onPress={this.edit}>
                <Image source={require('../images/imageup.png')} style={{width:40,height:40,}}></Image>
                </TouchableOpacity>
            </View>
        )}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },

});
export default SelectImage;