class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrls: []
    }
  }

  displayPhotos() {
    var photoLinks = []
    var eventId = this.props.featuredEvent.id;
    $.get(`/events/${eventId}/photos`, function(data) {
      data.forEach(function(el) {
        photoLinks.push(el.url);
      });
      this.setState({
        photoUrls: photoLinks
      });
    }.bind(this));
  }

  uploadFile(e) {
    e.preventDefault();
    var eventId = this.props.featuredEvent.id;
    var formData = new FormData();
    var files = $('input[type=file]')[0].files[0];
    formData.append('imageFile', files);
    $.ajax({
      url: `/events/${eventId}/photos`,
      type: 'POST',
      data: formData,
      processData: false, // tells jQuery not to process data
      contentType: false, // tells jQuery not to set contentType
      success: () => {
        this.displayPhotos();
      }
    });
  }
  render() {
    this.displayPhotos();
    return (
      <div>Photos Tab Stuff Here
        <form method="post" encType="multipart/form-data" id="uploadForm">
          <input type="file" id="imageUpload" accept="image/*" multiple /><br/>
          <input type="submit" value="submit" onClick={(e) => this.uploadFile(e)}/>
        </form>
        {this.state.photoUrls.map(link => <img src={link} />)}
      </div>
    );
  }
}