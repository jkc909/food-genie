import React, { Component } from 'react';

class WeekdayContainer extends Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        return(
            <div className="weekday-container">
                <div className="weekday-grid-container" >
                    WEEKDAY
                </div>
            </div>
        )
    };
};
export default WeekdayContainer;