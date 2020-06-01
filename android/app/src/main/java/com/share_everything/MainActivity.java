package com.share_everything;

import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "share_everything";
  }

  @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
           
            @Override
            protected Bundle getLaunchOptions() {

                
                 Intent intent = MainActivity.this.getIntent();
                 Bundle bundle = new Bundle();
                 String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);

                 if (sharedText != null) {
                     bundle.putString("incomingText", sharedText);
                 } else{
                     bundle.putString("incomingText", "");
                 }
                
                 return bundle;
            }

            @Override
            protected void onResume() {
                Context context = this.getContext();
              ReactRootView mReactRootView = new ReactRootView(context);
              Intent intent = MainActivity.this.getIntent();
              Bundle bundle = new Bundle(); //mReactRootView.getAppProperties();
              String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);

              if (sharedText != null) {
                bundle.putString("incomingText", sharedText);
              } else{
                bundle.putString("incomingText", "");
              }
              
              mReactRootView.setAppProperties(bundle);
            }

            @Override
            protected void onPause() {}
        };
    }
}
