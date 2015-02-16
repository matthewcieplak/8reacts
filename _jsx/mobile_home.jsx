/** @jsx React.DOM */

var MobileHome = React.createClass({
  getInitialState: function() {
    return {
      featured: [],
      hot: [],
      popular: [],
      tag_cloud: {}
    }
  },
 
  // componentDidMount: function() {
  //   $.get(this.props.source, function(result) {
  //     if (this.isMounted()) {
  //       this.setState({
  //         featured : result.featured,
  //         hot      : result.hot,
  //         popular  : result.popular,
  //         tag_cloud : result.tag_cloud
  //       }); 
  //     }
  //   }.bind(this));
  // },

  render: function() {
    return (
      <div>
        <table id="thumbs-table" width="100%" cellSpacing="20">
          <tr>
            <td width="33%"><MixThumbScroller mixes={this.props.featured} name="featured" /></td>
            <td width="33%"><MixThumbScroller mixes={this.props.hot} name="hot" /></td>
            <td width="33%"><MixThumbScroller mixes={this.props.popular} name="popular" /></td>
          </tr>
        </table>
        <h4>Tags</h4>
        <div>
          <TagCloud tags={this.props.tag_cloud} />
        </div>
      </div> 
    );
  }

});

var MixThumbScroller = React.createClass({
  getInitialState: function(){
    return { visibleMix : 0 }
  },

  render: function() {
    var mixes = [];
    var first = true;
    var i = 0;
    var visibleMix = this.state.visibleMix
    this.props.mixes.forEach(function(mix){
      mixes.push(
        <a href={'http://8tracks.com' + mix.web_path} onclick={loadMix} key={mix.id} className={'mix-thumb ' + (i == visibleMix ? 'visible' : '')}>
          <img src={mix.cover_urls.sq133} width="100%" alt={mix.name}/>
        </a>
      );
      i += 1;
      first = false;
    })

    return (
      <div className="thumb-scroller">
        <h4 className="thumb-title">{this.props.name.charAt(0).toUpperCase() + this.props.name.substring(1)}</h4>
        <div className="thumb-link">
          {mixes}
        </div>
        <div className="aspect-ratio"></div>
      </div>
    )
  },

  componentDidMount : function() {
    this.interval = setInterval(this.animateMixes, (Math.random(0.1) + 1) * 3000)
  },

  componentWillUnmount : function(){
    clearInterval(this.interval)
  },

  animateMixes : function(){
    var i = this.state.visibleMix + 1;
    if (i >= this.props.mixes.length) {
      i = 0;
    }
    this.setState( { visibleMix : i });
  }
});


var TagCloud = React.createClass({
  render: function() {
    var tags = this.props.tags;
    if (tags.length > 0) {
      return tags.map(function(tag) {
        return [<a class="tag" href={'explore/'+tag}>{tag}</a>, ' ']
      })
    } else {
      return <div></div>
    }
  }
})

$.get('data/home_data.json', function(result) {
  React.render(
    React.createElement(MobileHome, result.home_data),
    document.getElementById('content')
  );
}.bind(this));

$('body').on('click', 'a', function(event) {
  var route_regex = /no_routes/;
  var route;
  if (event.currentTarget.rel.match(/external/)) {
    return true;
  } else if (route = event.currentTarget.href.match(route_regex) && route.length > 0) {
    //do route-specific function
  } else {
    loadMix(event.currentTarget.href + '.json?api_key=test');
  }
  return false;
});

loadMix = function(url){
  $.get(url, function(result) {
    //this.unMountComponent();
    React.render(
      React.createElement(Mix, { mix : result.mix }),
      document.getElementById('content')
    );
  });
  return false;
}