import { createStackNavigator,createAppContainer } from 'react-navigation';
import BMI from './BMI';
import Menu from './Menu';
import IdealWeight from './IdealWeight';
import DailyCalorie from './DailyCalorie';
import BodyFat from './BodyFat';
import BMR from './BMR';
import WeightReport from './WeightReport';

//สร้าง Navigator เป็น routing เชื่อมต่อหน้าอื่น
const AppNavigator = createStackNavigator({
  
  Menu: { screen: Menu },
  BodyFat: {screen: BodyFat },
  BMR: {screen: BMR },
  BMI: { screen: BMI },
  IdealWeight: { screen: IdealWeight },
  DailyCalorie: { screen: DailyCalorie },
  WeightReport: { screen: WeightReport},
  
});

export default createAppContainer(AppNavigator);