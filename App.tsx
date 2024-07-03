/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  Platform,
  PlatformColor,
  Appearance,
} from 'react-native';
import {
  OkHiLocationManager,
  OkHiUser,
  initialize as initializeOkHi,
} from 'react-native-okhi';

const USER: OkHiUser = {
  phone: '+254700000000',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'janedoe@okhi.co',
};

const logError = (error: any) => {
  console.log(`${error.code}, ${error.message}`);
};

const useOkHi = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initializeOkHi({
      credentials: {
        branchId: '', // your branch ID
        clientKey: '', // your client key
      },
      context: {
        mode: 'prod',
      },
      notification: {
        title: 'Address verification in progress',
        text: 'Tap here to view your verification status.',
        channelId: 'okhi',
        channelName: 'OkHi Channel',
        channelDescription: 'OkHi verification alerts',
      },
    })
      .then(() => setInitialized(true))
      .catch(logError);
  }, []);

  return {initialized};
};

const App = () => {
  const {initialized} = useOkHi();
  const [launch, setLaunch] = useState(false);
  const [locationId, setLocationId] = useState('');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {locationId ? (
        <Text
          style={{
            color: Appearance.getColorScheme() === 'dark' ? 'white' : 'black',
            fontSize: 32,
          }}>{`successfully started verification for: ${locationId}`}</Text>
      ) : (
        <Button title="Verify Address" onPress={() => setLaunch(true)} />
      )}
      <OkHiLocationManager
        launch={launch && initialized}
        user={USER}
        onCloseRequest={() => setLaunch(false)}
        onError={error => {
          logError(error);
          setLaunch(false);
        }}
        onSuccess={async response => {
          try {
            setLocationId(await response.startVerification());
          } catch (error) {
            logError(error);
          } finally {
            setLaunch(false);
          }
        }}
      />
    </View>
  );
};

export default App;
