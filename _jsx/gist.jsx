var UserGist = React.createClass({
  getInitialState: function() {
    return { mix : {} }; 
  },

  componentDidMount: function() {
    debugger;
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (

      <div>
        <h1>{this.state.username}</h1>
        {this.state.username}'s last gist is&nbsp;
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

