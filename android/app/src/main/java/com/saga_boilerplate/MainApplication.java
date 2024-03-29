package com.saga_boilerplate;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airlabsinc.RNAWSCognitoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.reactnative.camera.RNCameraPackage;
import com.devstepbcn.wifi.AndroidWifiPackage;
import com.skierkowski.WifiManager.*;
import com.tuanpm.RCTSmartconfig.RCTSmartconfigPackage; 

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAWSCognitoPackage(),
          new RNCameraPackage(),
          new AndroidWifiPackage(),
          new WifiManager(),
          new RCTSmartconfigPackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
