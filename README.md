# App

[fastlane](https://docs.fastlane.tools/getting-started/ios/setup/)

# Run

### Andriod emulator

`npx react-native run-andriod`

### IOS emulator

`npx react-native run-ios`

## File Structure

[APP]
| .gitlab-ci
|-- android
|--fastlane
|--> Appfile (json_key_file & package_name)
|--> Fastfile (upload_internal & upload_to_play_store)
|-- ios
|--fastlane
|--> Appfile (app_identifier & apple_id)
|--> Fastfile (Upload .ipa to TestFlight)
