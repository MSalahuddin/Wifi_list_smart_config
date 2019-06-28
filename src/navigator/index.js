// @flow
import React from "react";

import {
  TouchableOpacity,
  Image,
  View,
  BackHandler,
  Keyboard,
  Animated,
  Easing,
  BackAndroid
} from "react-native";
import { connect } from "react-redux";

import {
  Stack,
  Scene,
  Router,
  Actions,
  ActionConst,
  Route,
  Schema,
  Drawer
} from "react-native-router-flux";
import QRScannerScreen from "../containers/QRScanner";
import WifiListScreen from "../containers/WifiList";
import { Colors, Metrics, Images } from "../theme";
import styles from "./styles";

const navigator = Actions.create(
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}
  >
    <Scene
      tintColor="white"
      hideNavBar
      title={""}
      key="WifiListScreen"
      component={WifiListScreen}
    />
    <Scene
      tintColor="white"
      hideNavBar
      title={""}
      key="QRScannerScreen"
      component={QRScannerScreen}
    />
  </Stack>
);

export default () => <AppNavigator navigator={navigator} />;

const AppNavigator = connect()(Router);
