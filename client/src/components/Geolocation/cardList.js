
import React from 'react';

class CardList extends React.Component{
    render() {
      return (
        <div className="container">
          <ul className="list-group text-center">
            {
              Object.keys(this.props.objs).map(function(key) {
                return <li className="list-group-item list-group-item-info">{this.props.objs[key]}</li>
              }.bind(this))
            }
          </ul>
         </div>
       );
     }
   };

export default CardList;