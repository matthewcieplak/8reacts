var Mix = React.createClass({
  getInitialState: function() {
    return {};
  },
 
  componentDidMount: function() {
  //   $.get(this.props.source, function(result) {
  //     if (this.isMounted()) {
  //       this.setState({
  //         mix: result.mix
  //       });
  //     }
  //   }.bind(this));
  },

  render: function() {
    var mix = this.props.mix;
    var published_at = new Date(mix.published_at)
    debugger;
    return (
      <div class="mix-page">
        <img src={mix.cover_urls.cropped_imgix_url + '&w=640&h=640'} />
        <div class="mix-data">
          <h1>{mix.name}</h1>
          by <a href={"http://8tracks.com/" + mix.user.web_path}>{mix.user.login}</a>
          <div dangerouslySetInnerHTML={{__html: mix.description_html}} />
          <p>
            <strong>Tags </strong>
            { mix.tag_list_cache.split(', ').map(function(tag){
              return [<a href={'explore'+tag}>{tag}</a>, ' ']
            })}
            <br />
            <strong>Published </strong> 
            {published_at.getMonth} {published_at.getDate}, {published_at.getFullYear}
            <br />

          </p>
        </div>
      </div>
    );
  }
});