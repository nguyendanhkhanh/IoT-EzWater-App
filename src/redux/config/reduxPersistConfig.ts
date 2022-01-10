import AsyncStorage from "@react-native-community/async-storage";

const ReduxPersist = {
    active: true,
    reducerVersion: '0.5',
    storeConfig: {
      key: 'primary',
      storage: AsyncStorage,
      whitelist: ['auth', 'device', 'listDevices'],
    },
  };
  
  export default ReduxPersist;