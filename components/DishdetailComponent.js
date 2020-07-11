import React, { Component }from 'react';
import { Card,Icon,Rating,Input } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import * as Animatable from 'react-native-animatable';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';


function RenderDish(props) {

    const dish = props.dish;
    //handleViewRef = ref => this.view = ref;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        //onPanResponderGrant: () => {this.view.rubberBand(500).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                
                {...panResponder.panHandlers}>
                    <Card
            featuredTitle={dish.name}
            image={require('./images/uthappizza.png')}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={{flexDirection:'row'}}>
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        
                    />
                </View>
                
            </Card>
                </Animatable.View>
                
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.Rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
        <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
        </Animatable.View>
    );
}


class DishDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Rating:0,
            dishes: DISHES,
            author: '',
            comment: '',
            favorites: []
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
    markFavorite(dishId) {
       this.setState({favorites: this.state.favorites.concat(dishId)});
        //this.props.postFavorite(dishId);
    }
    handleComments(dishId) {
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.Rating, this.state.comment, this.state.author);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]}
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    />
                    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
            <Card title='Comments'>
                <Text>Imagine all the eatables, living in conFusion!</Text>
                <Text></Text>
                <Text>Sends anyone to heaven, I wish I could get my mother-in-law to eat it!</Text> 
                <Text></Text>
                <Text>Eat it, just eat it!</Text>
                <Text></Text>
                <Text>Ultimate, Reaching for the stars!</Text>
                <Text></Text>
            </Card>
            </Animatable.View>

                                                       
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 28
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});


export default DishDetailComponent;