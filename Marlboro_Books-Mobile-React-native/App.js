/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';
import * as RNEP from "@estimote/react-native-proximity";
import BookList from './Booklist';
const ESTIMOTE_APP_ID = "hackyeah18-9k4";
const ESTIMOTE_APP_TOKEN = "27fbdd40ccf2727d6ec2dcb7ec16ce19";

const zone1 = new RNEP.ProximityZone(5, "hackyeah");
let napilbymSieZubrowki = false;
zone1.onEnterAction = context => {
  Alert.alert("Elo");
  napilbymSieZubrowki = true;
};
zone1.onExitAction = context => {
  Alert.alert("Elo2");
  napilbymSieZubrowki = false;
};
zone1.onChangeAction = contexts => {
  console.log("zone1 onChange", contexts);
};
RNEP.locationPermission.request().then(
  permission => {
    console.log(`location permission: ${permission}`);

    if (permission !== RNEP.locationPermission.DENIED) {
      const credentials = new RNEP.CloudCredentials(
        ESTIMOTE_APP_ID,
        ESTIMOTE_APP_TOKEN
      );

      const config = {
        notification: {
          title: "Exploration mode is on",
          text: "We'll notify you when you're next to something interesting.",
          channel: {
            id: "exploration-mode",
            name: "Exploration Mode"
          }
        }
      };

      RNEP.proximityObserver.initialize(credentials, config);
      RNEP.proximityObserver.startObservingZones([zone1]);
    }
  },
  error => {
    console.error("Error when trying to obtain location permission", error);
  }
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshCount: 0,
      powaznyKod:false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      Alert.alert(napilbymSieZubrowki.toString());
      this.setState(previousState => ({
        refreshCount: previousState.refreshCount + 1,
        powaznyKod: napilbymSieZubrowki
      }));
    }, 5000);
    
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.powaznyKod ? <BookList /> : <Text>Niestety nie ma zubrowki</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
