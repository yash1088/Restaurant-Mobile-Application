import React, { Component } from 'react';
import { Text, View, Animated, Easing,ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';


function RenderItem(props) {
    
    const item = props.item;
    
    if (item != null) {
        return(
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={require('./images/uthappizza.png')}>
                <Text
                    style={{margin: 10}}>
                    {item.description}</Text>
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dishes: DISHES,
          promotions: PROMOTIONS,
          leaders: LEADERS
        };
        this.animatedValue = new Animated.Value(0);  
    }

    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount () {
        this.animate()
    }

    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 8,
            duration: 8000,
            easing: Easing.linear
          }
        ).start(() => this.animate())
    }


    render() {
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200 ]
        })
        return(
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                
                <View >
                    <RenderItem item={this.state.dishes.filter((dish) => dish.featured)[0]} />  
                </View>
                
                <View s>
                <RenderItem item={this.state.promotions.filter((promo) => promo.featured)[0]} />
                </View>
                
                <View>
                <RenderItem item={this.state.leaders.filter((leader) => leader.featured)[0]} />
                </View>
                
            
            </View>
            
        );
    }
}

export default Home;