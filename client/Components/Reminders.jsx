//Child component within the Event Planning component
//Allows users to send a reminder for purposes of event planning
class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      msg: '',
      when: '',
      reminders: []
    };
    this.handleWhenChange = this.handleWhenChange.bind(this);
    this.handleMsgChange = this.handleMsgChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleReminderSubmit = this.handleReminderSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchReminders();
  }

  fetchReminders() {
    //The event name is passed along to the server via query parameters 
    //so that we can display reminders associated with a specific event.
    var eventId = this.props.featuredEvent.id;
    var successHandler = function(data) {
      this.setState({reminders: data});
    };
    $.ajax({
      method: 'GET',
      url: `/events/${eventId}/reminders`,
      success: successHandler.bind(this)
    });
  }

  handlePhoneNumberChange(event) {
    this.setState({phoneNumber: event.target.value});
  }
  handleMsgChange(event) {
    this.setState({msg: event.target.value});
  }
  handleWhenChange(event) {
    this.setState({when: event.target.value});
  }

  handleReminderSubmit(event) {
    //The event name is passed along to the server via query parameters 
    //so that we can submit reminders associated with a specific event.
    var successHandler = function() {
      $('#msg').text('reminder successfully posted');
    };
    var eventId = this.props.featuredEvent.id;
    $.ajax({
      method: 'POST',
      url: `/events/${eventId}/reminders`,
      contentType: 'application/json',
      data: JSON.stringify(this.state),
      success: successHandler.bind(this)
    });
    event.preventDefault();
  } 

  render() {
    return (
      <div>
        <h2>Reminder</h2>
        <form onSubmit={this.handleReminderSubmit}>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" 
              value={this.state.phoneNumber}
              onChange={this.handlePhoneNumberChange}/>
          </label>
          <label>
            When:
            <input type="datetime-local" name="when" 
              value={this.state.when}
              onChange={this.handleWhenChange}/>
          </label>
          <label>
            Msg:
            <input type="text" name="msg" 
              value={this.state.msg}
              onChange={this.handleMsgChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div id='msg'></div>
        <table>
          <caption>ReminderList</caption>
          <thead>
            <tr>
              <th>PhoneNumber</th>
              <th>When</th>
              <th>Msg</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reminders.map( (reminder, index) => 
              <tr key={index}>
                <th>{reminder.phoneNumber}</th>
                <th>{reminder.when}</th>
                <th>{reminder.msg}</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

window.Reminders = Reminders;