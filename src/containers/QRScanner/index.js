import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";
import QRCodeScanner from "react-native-qrcode-scanner";
import wifi from "react-native-android-wifi";
// import WifiManager from "react-native-wifi-manager";
import Smartconfig from "react-native-smartconfig";
const { width, height } = Dimensions.get("window");

class QRScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wifiPassword: "",
      isQRScan: false
    };
  }

  qrScanner = data => {
    const wifiData = this.props.wifiData;
    let ssid = wifiData.SSID;
    const { wifiPassword } = this.state;
    // console.log(data.data, "aaaaaaaaaaaaa");
    Smartconfig.start({
      type: "esptouch", //or airkiss, now doesn't not effect
      ssid: ssid,
      bssid: data.data, //"" if not need to filter (don't use null)
      password: wifiPassword,
      timeout: 5000 //now doesn't not effect
    })
      .then(function(results) {
        console.log(results);
      })
      .catch(function(error) {
        console.log(error, "errrrrrrrrr");
      });
    // let qrData = JSON.parse(data.data);
    // console.log(qrData, "dataaa");
  };

  qrCodeScanner = () => {
    return (
      <View
        style={{
          width: width,
          height: height * 0.9
        }}
      >
        <View
          style={{
            width: width * 0.8,
            height: height * 0.67,
            backgroundColor: "white",
            marginLeft: width * 0.1,
            marginTop: height * 0.1,
            borderRadius: 5
          }}
        >
          <QRCodeScanner
            cameraStyle={{
              width: width * 0.7,
              marginLeft: width * 0.05
            }}
            onRead={data => this.qrScanner(data)}
          />
        </View>
      </View>
    );
  };

  connectToDevice = (ssid, wifiPassword) => {
    console.log(ssid);
    console.log(typeof ssid);
    console.log(wifiPassword);
  };

  connectWifi = () => {
    const wifiData = this.props.wifiData;
    let ssid = wifiData.SSID;
    const { wifiPassword } = this.state;
    wifi.findAndConnect(ssid, wifiPassword, found => {
      if (found) {
        // this.connectToDevice(ssid, wifiPassword);
        this.setState({ isQRScan: true });
        // wifi.connectToHiddenNetwork(ssid, wifiPassword, networkAdded => {
        //   console.log(networkAdded, "networkadded");
        // });

        console.log(found, "found");
        console.log("wifi is in range");
      } else {
        console.log("wifi is not in range");
      }
    });
  };

  renderBody = () => {
    const wifiData = this.props.wifiData;
    //console.log(wifiData,'data')
    return (
      <View
        style={{
          width: width,
          height: height * 0.9,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "white"
            //marginVertical: Metrics.ratio(20)
          }}
        >
          SSID: {wifiData.SSID}
        </Text>
        <TextInput
          placeholder="Enter Wifi Password"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          value={this.state.wifiPassword}
          onChangeText={text => {
            this.setState({ wifiPassword: text });
          }}
          style={{
            width: width * 0.8,
            height: height * 0.09,
            borderRadius: Metrics.ratio(5),
            borderWidth: Metrics.ratio(1),
            borderColor: Colors.darkStaleBlue,
            color: "white",
            fontSize: 18,
            marginVertical: Metrics.ratio(20),
            paddingHorizontal: Metrics.ratio(10)
          }}
        />
        <TouchableOpacity
          style={{
            width: width * 0.8,
            height: height * 0.09,
            borderRadius: Metrics.ratio(5),
            backgroundColor: Colors.darkStaleBlue,
            justifyContent: "center",
            alignItems: "center",
            elevation: 4
          }}
          onPress={() => this.connectWifi()}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Scan QR Code </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: Colors.primary
        }}
      >
        {this.state.isQRScan ? this.qrCodeScanner() : this.renderBody()}
      </View>
    );
  }
}
export default QRScannerScreen;
