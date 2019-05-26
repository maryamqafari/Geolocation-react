import React from 'react';

class CardForm  extends React.Component{
        createobj(e) {
          e.preventDefault();
          //get the obj object name from the form
          var obj = this.refs.objName.value;
          //if we have a value
          //call the addobj method of the App component
          //to change the state of the obj list by adding an new item
          if(typeof obj === 'string' && obj.length > 0) {
            this.props.addobj(obj);
            //reset the form
            this.refs.objForm.reset();
          }
         }
         render() {
          return(
            <form className="form-inline" ref="objForm" onSubmit={this.createobj}>
            <div className="form-group">
              <label for="objItem">
                obj Name
                <input type="text" id="objItem" placeholder="e.x.lemmon" ref="objName" className="form-control" />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Add obj</button>
           </form>
          )
         }
        }

export default CardForm;
  