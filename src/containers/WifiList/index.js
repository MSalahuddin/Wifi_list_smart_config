import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  PermissionsAndroid
} from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";
import { Actions } from "react-native-router-flux";
import wifi from "react-native-android-wifi";

const { width, height } = Dimensions.get("window");

class WifiListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wifiArray: []
    };
  }

  componentWillMount() {
    this.getPermission();
  }
  getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Wifi networks",
          message: "We need your permission in order to find wifi networks"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log("Thank you for your permission! :)");
        this.loadWifi();
      } else {
        console.log(
          "You will not able to retrieve wifi available networks list"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  loadWifi = () => {
    wifi.loadWifiList(
      wifiStringList => {
        var wifiArray = JSON.parse(wifiStringList);
        // if (wifiArray.length === 0) {
        //   wifi.reScanAndLoadWifiList(
        //     wifiStringList => {
        //       //var wifiArray = JSON.parse(wifiStringList);
        //       console.log("Detected wifi networks - ", wifiArray);
        //     },
        //     error => {
        //       console.log(error);
        //     }
        //   );
        // }
        this.setState({ wifiArray });
        console.log(wifiArray, "wifiArray");
      },
      error => {
        console.log(error);
      }
    );
  };

  toggleScreen = el => {
    Actions.QRScannerScreen({ wifiData: el });
  };
  render() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: Colors.primary
        }}
      >
        <ScrollView>
          {this.state.wifiArray.map(el => {
            return (
              <TouchableOpacity
                style={{
                  width: width * 0.95,
                  height: height * 0.08,
                  borderRadius: Metrics.ratio(5),
                  borderWidth: Metrics.ratio(1),
                  borderColor: Colors.darkStaleBlue,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Metrics.ratio(10),
                  marginBottom: Metrics.ratio(10),
                  marginHorizontal: width * 0.025
                }}
                onPress={() => this.toggleScreen(el)}
              >
                <Text style={{ fontSize: 18, color: "white" }}>{el.SSID}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
export default WifiListScreen;
