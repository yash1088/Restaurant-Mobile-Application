import React, { Component } from 'react';
import { FlatList, View, Text, Alert,Card } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { DISHES } from '../shared/dishes';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';

class Favorites extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES[0],
            favorites: []
        };
    }

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {
        
            return (
                <Card
                featuredTitle={this.state.dishes.name}
                
                image={require('./images/uthappizza.png')}>
                    <Text
                    style={{margin: 10}}>
                    {this.state.dishes.description}</Text>
                
            </Card>
            );
        
        }
}


export default Favorites;