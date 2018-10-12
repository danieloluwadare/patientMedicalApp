import { createStackNavigator, createDrawerNavigator} from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import AboutScreen from '../screens/AboutScreen';
import DrugsScreen from '../screens/DrugsScreen';
import DrugsDetailScreen from '../screens/DrugsDetailScreen';
import PatientsListScreen from '../screens/PatientsListScreen';
import PrescriptionDetailScreen from '../screens/PrescriptionDetailScreen'
import PrescribeDrugScreen from '../screens/PrescribeDrugScreen'
import ConsultationScreen from '../screens/ConsultationScreen';
import ComplaintsDetailScreen from '../screens/ComplaintsDetailScreen';
import PendingDrugScreen from '../screens/PendingDrugScreen'; 
// AcquiredDrugScreen DashboardScreen startedDrugScreen
import AcquiredDrugScreen from '../screens/AcquiredDrugScreen'; 
import DashboardScreen from '../screens/DashboardScreen'; 
import startedDrugScreen from '../screens/startedDrugScreen'; 
import PudScreen from '../screens/PudScreen';
import SddScreen from '../screens/SddScreen'; 
import DoctorReportScreen from '../screens/DoctorReportScreen'; 
import DoctorReportDetailsScreen from '../screens/DoctorReportDetailsScreen'; 


const Drawer = createDrawerNavigator(
  {
    // Drugs : { screen: DrugsScreen },
    // About : { screen: AboutScreen },
    Dashboard:{screen:DashboardScreen},    
    PendingDrug:{screen:PendingDrugScreen},    
    AcquiredDrug:{screen:AcquiredDrugScreen},
    startedDrug:{screen:startedDrugScreen},  
    Consultation:{screen:ConsultationScreen},
    DoctorReport:{screen:DoctorReportScreen},  
  },
  {
    // contentComponent: PendingDrug,
    drawerWidth: 300
  }
); 

// const Router = createStackNavigator(
  // {
  //   main: {
  //     screen: Drawer
  //   }
//   },
//   {
//     initialRouteName: 'main',
//     headerMode: 'none',
//     mode: 'card'
//   }
// );

const Router = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    DrugDetails:{screen:DrugsDetailScreen},
    PatientsList:{screen:PatientsListScreen},
    PrescriptionDetail:{screen:PrescriptionDetailScreen},
    PrescribeDrug:{screen:PrescribeDrugScreen},
    ComplaintsDetail:{screen:ComplaintsDetailScreen},  
    Pud:{screen:PudScreen}, 
    Sdd:{screen:SddScreen}, 
    DoctorReportDetails:{screen:DoctorReportDetailsScreen}, 
    
    main:{screen:Drawer}
  },

  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'card'
  }
);


export default Router;
