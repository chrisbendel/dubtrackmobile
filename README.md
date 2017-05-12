# dubtrackmobile

## Install node/react-native cli first
```brew install node```  
```brew install watchman```  
```npm install -g react-native-cli```  

## Installing the project
```git clone https://github.com/chrissbendel/dubtrackmobile```  
```cd dubtrackmobile```  
```npm install```  
```react-native unlink react-native-vector-icons```  
```react-native link react-native-vector-icons```  
```react-native upgrade``` - Select yes for all options to update xcode's build settings  

#####Finally  
```react-native run-ios```

## If bug with duplicate module declaration name - check here for reference on how to fix
https://github.com/aksonov/react-native-router-flux/issues/1803#issuecomment-296186543
