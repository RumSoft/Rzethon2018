import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, ScrollView} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation'
export default class BookList extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            text: '',
            details: false
        };
    }

    componentDidMount() {
        fetch('https://e36548e1.ngrok.io/actions/book')
        .then(res => res.json())
        .then(data => {
            this.setState({ data: data.data })
        })
    }
    codeFixed(id){
        fetch(`https://e36548e1.ngrok.io/reading/ebook/${id}`)
        .then(res => res.text())
        .then(data => {
            this.setState({
                text: data.split(":")[2].split('"')[1],
                details: true
            });
        })
    }
    render() {
        return (
            <ScrollView style ={{flex: 1}}>
            {this.state.details ?  
            
            <Text>{this.state.text}</Text>
            
            :   this.state.data.length > 0 ?
                this.state.data.map((l, i) => (
                    <ListItem
                    key={i}
                    title={l.title}
                    subtitle={l.author}
                    onPress = {() => this.codeFixed(l._id)}
                    />
                )) 
            : null}
            </ScrollView>
        )
    }
};