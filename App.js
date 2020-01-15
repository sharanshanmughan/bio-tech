import {createAppContainer} from 'react-navigation';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import CameraPhase from './screens/CameraPhase';
import AnalysisPhase from './screens/AnalysisPhase';
const MainNavigator = createStackNavigator({
  CameraPhase: {screen:CameraPhase,
    navigationOptions:{
      header:null}
  },
  AnalysisPhase:{screen:AnalysisPhase,
    navigationOptions:{
      header:null
  }
  },
 
  
});
const App = createAppContainer(MainNavigator);
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
