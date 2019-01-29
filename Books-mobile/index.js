/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import {Alert} from 'react-native';

AppRegistry.registerComponent(appName, () => App);
