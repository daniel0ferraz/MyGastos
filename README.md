## Libs

## Atualizar versão

mudar em package.json "version": "numberVersion"
npx react-native-version --never-amend

## Gerar versão

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

./gradlew assembleDebug