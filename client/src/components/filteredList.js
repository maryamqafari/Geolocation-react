import React, { Component } from 'react';

class FilteredList extends Component {
	
	filterList(event) {
		var updatedList = this.state.initialItems;
		updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
	}
	constructor(props) {
		super(props);
		this.state = {
			initialItems: this.props.getBookings(),
			items: []
		};
	}
	
	componentWillMount() {
		this.setState({items: this.state.initialItems})
	}
	
	render() {
		var listLength = this.state.items.length;
		return(
			<div className="list-box">
				<h2 className="count">{this.state.items.length}
					{listLength > 1 || listLength === 0 ?
					" results" : 
					" result"}
				</h2>
				<input type="text" placeholder="Search" onChange={this.filterList.bind(this)}/>
				<List items={this.state.items} />
			</div>
		);
	}	
}

class List extends Component {
	render() {
    return (
      <ul>
      {this.props.items.map(function(item) {
				return <li key={item}>{item}</li>
			})}
      </ul>
    );  
  }
}

export default FilteredList;