import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { MapView, Constants, Location, Permissions } from 'expo';
export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      previousId: 1,
      location: {
        coords: {
          latitude: 50.0205514,
          longitude: 21.9813152
        },
      }
    };

    this.renderMapView = this.renderMapView.bind(this);
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hi! I am Arthur, your friend in fighting administration!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Rzeszow Bot',
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/POL_Rzesz%C3%B3w_COA.svg/2000px-POL_Rzesz%C3%B3w_COA.svg.png",
          },
        },
      ],
    });
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      previousId: messages[0]._id
    }));
    this.sendToChatbootAPI(messages[0].text);
  }
  stage = 999;
  sendToChatbootAPI(text) {
    let title, description, contact, proposed_gain;
    if(text.includes('fine')) {
      fetch('http://858e44e5.ngrok.io/question?problem=fine')
      .then(res => res.json())
      .then(data => {
        let splittedText = data.solution.split('\n');
        splittedText.forEach(message => {
          this.addToChatbootMessages(message);
        });
      })
    } else if (text.includes('nearest')) {
      let splittedText = text.split(' ');
      let object = splittedText.slice(2);
      object = object.join(" ");
      console.log(object);
      fetch(`http://858e44e5.ngrok.io/find?object=${object}&lat=${this.state.location.coords.latitude}&long=${this.state.location.coords.longitude}`)
      .then(res => res.json())
      .then(data => {
        this.addToChatbootMessages(`This is closest object to you: ${data.name}`);
        this.addToChatbootMessages("You can get there easily with public transport. That's how:");
        this.addToChatbootMessages(`You start from ${data.bus.StartStation.name}`)
        this.addToChatbootMessages(`and you go with bus 10 towards ${data.bus.EndStation.name}.`);
        this.addMapToChatbootMessages(parseInt(data.bus.EndStation.Langtitude), parseInt(data.bus.EndStation.Longitude));
      })
    } else if (text.includes('Call:')) {
      let splitedText = text.split(':')[1]
      fetch(`http://858e44e5.ngrok.io/call?text=${splitedText}`, {
        method: 'POST'
      })
      .then(res => {
        setTimeout(() => {
          fetch(`http://858e44e5.ngrok.io/resp`)
          .then(res => {
            return res.json()
          })
          .then(res => {
            this.addToChatbootMessages(res.text)
          })
        }, 40000)
      })
    } else if (text.includes("I want to give task")) {
      stage = 0;
      this.addToChatbootMessages("Write title of your task");
    } else if(stage !== 'undefined'){
      if (stage == 0) {
      title = text;
      stage = 1;
      this.addToChatbootMessages("Write description of your task!");
    } else if (stage == 1) {
      description = text;
      stage = 2;
      this.addToChatbootMessages("Write your contact number");
    } else if (stage == 2) {
      contact = text;
      stage = 3;
      this.addToChatbootMessages("Write how much you are going to pay such person: ");
    } else if (stage == 3) {
      proposed_gain = text;
      stage = 4;
      fetch(`http://858e44e5.ngrok.io/task?title=${title}&description=${description}&contact=${contact}&proposed_gain=${proposed_gain}`,{
        method: 'POST'
      })
      .then(res => {
        this.addToChatbootMessages("Task added!");
        title = null;
        description = null;
        contact = null;
        proposed_gain = null;
      })
      .catch(err => {
        this.addToChatbootMessages("Error while adding task!");
        title = null;
        description = null;
        contact = null;
        proposed_gain = null;
      })
    }
    }
    /* if(text.includes('Where is')) {
      let splitedText = text.split(" ");
      console.log(splitedText);
      let object = splitedText[2]
      let sendData = {
        object
      };
      console.log(sendData)
      fetch(`http://858e44e5.ngrok.io/find?object=${object}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log('json: ', res);
        this.addToChatbootMessages(`Najblizszy objekt do ciebie z tym tagiem to: ${res.name}`);
        this.addMapToChatbootMessages(res.lat, res.long)
      })
      .catch(ex => {
        console.log('err: ', ex);
      })
    }  else if(text.includes("nearby") | text.includes("obok")) {
      fetch(`http://858e44e5.ngrok.io/nearby?lat=${location.coords.latitude}&long=${location.coords.longitude}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
          text = 'Te rzeczy sa najblizej ciebie: ';
          json = json.nearby_objects;
          json.forEach(element => {
            text += element.name
          });
          this.addToChatbootMessages(text);
      })
      */
    
  }

  addToChatbootMessages(text) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, {
        _id: previousState.previousId + 1,
        text,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Rzeszow Bot',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/POL_Rzesz%C3%B3w_COA.svg/2000px-POL_Rzesz%C3%B3w_COA.svg.png',
        },
      }),
      previousId: previousState.previousId + 1
    }));
  };

  renderMapView = (props) => {
    console.log("Hi!");
    if (props.currentMessage.location) {
      console.log("Hi");
      return (
        <View style={props.containerStyle}>
          <MapView
            style={[styles.mapView]}
            initialRegion={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Marker
                  coordinate={{
                  latitude: props.currentMessage.location.latitude,
                  longitude: props.currentMessage.location.longitude
                  }}
                />
          </MapView>
        </View>
      );
    } else if(props.currentMessage.list){

    } else {
      return null;
    }
  };

  addMapToChatbootMessages(lat, lng) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, {
        _id: previousState.previousId + 1,
        text: '',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Rzeszow Bot',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/POL_Rzesz%C3%B3w_COA.svg/2000px-POL_Rzesz%C3%B3w_COA.svg.png',
        },
        location: {
          latitude: lat,
          longitude: lng
        }
      }),
      previousId: previousState.previousId + 1
    }));
  }

  render() {
    return (
      <GiftedChat
        messages = {this.state.messages}
        onSend = {messages => this.onSend(messages)}
        renderCustomView={this.renderMapView}
        user = {{
          _id: 1
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    width: 400,
    height: 400,
    borderRadius: 13,
    margin: 3,
  },
});
