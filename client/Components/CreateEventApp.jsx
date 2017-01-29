//Parent App within createEvent.html
//Allows users to create new events
class CreateEventApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      when: '',
      where: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleDateChange(event) {
    this.setState({when: event.target.value});
  }
  handleLocChange(event) {
    this.setState({where: event.target.value});
  }

  handleEventSubmit(event) {
    //sends a post request with the event data to the server, which will enter the event into
    //the eventTable
    event.preventDefault();
    var successHandler = function() {
      $('#msg').text('event successfully posted');
    };
    $.ajax({
      method: 'POST',
      url: '/events',
      contentType: 'application/json',
      data: JSON.stringify(this.state),
      success: successHandler.bind(this)
    });
  } 
  render() {
    return (
      <div>
        <Nav />
        <div className="featureBody" id="createEvent">
          <form onSubmit={this.handleEventSubmit}>
            <p><label>
              Name:  
              <input type="text" name="name" 
                value={this.state.name}
                onChange={this.handleNameChange}/>
            </label></p>
            <p><label>
              Date:
              <input type="datetime-local" name="date" 
                value={this.state.when}
                onChange={this.handleDateChange}/>
            </label></p>
            <p><label>
              Location: 
              <input type="text" name="location" 
                value={this.state.where}
                onChange={this.handleLocChange}/>
            </label></p>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div id='msg'></div>
      </div>
    );
  }
}

window.CreateEventApp = CreateEventApp;