import React from 'react';
import CardList from './cardList';

class  Locations extends React.Component{

 
  constructor(props) {
   // alert(JSON.stringify(props.locations))
    super(props);
    this.state = {
      objs : props.locations
    }
  } 

      render() {
        return (
          <div className="component-wrapper">
            <CardList objs={this.state.objs} />
          </div>
        );
       }
      }
export default Locations;
     
  
