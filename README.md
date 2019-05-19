# ONPP


### Install React Native CLI
```
npm i -g react-native
```

### Run with debug server
```
react-native run-android
```

### Build process
```
cd ./android
chmod 755 ./gradlew
./gradlew assembleRelease

```

When build process finish, you can find APK file in `./android/app/build/outputs/apk/release/`