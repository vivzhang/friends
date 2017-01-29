//Parent App within homepage.html
//Allows users to view events, create and view event planning details

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: null,
      page: 'homepage',
      featuredEvent: null
    };
    this.handleEntryClick = this.handleEntryClick.bind(this);
  }
  componentDidMount() {
    //sends a get request to the server to populate the eventList array in this component's state,
    //which gets passed as a prop into the Eventlist component
    var successHandler = function(data) {
      this.setState({eventList: data});
    };
    $.ajax({
      method: 'GET',
      url: '/events',
      success: successHandler.bind(this)
    });
  }

  handleEntryClick(event) {
    this.setState({
      page: 'eventDetails',
      featuredEvent: event
    });
  }

  render() {
    var view;
    //view logic: if an event has been clicked on, then the page should view 
    //the eventDetails page--the EventPlanning component. Otherwise, show the 
    //homepage--the EventList component.
    if (this.state.page === 'homepage') {
      view = 
        (<div>
          <EventList
            eventData={this.state.eventList}
            handleEntryClick={this.handleEntryClick}
          />;
        </div>);
    } else if (this.state.page === 'eventDetails') {
      view = <EventPlanning featuredEvent={this.state.featuredEvent}/>;
    }

    return (
      <div>
        <Nav />
        {view}
      </div>
    );
  }
}


window.App = App;