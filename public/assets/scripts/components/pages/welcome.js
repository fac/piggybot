var WelcomePage = React.createClass({
  name: "WelcomePage",
  mixins: [NavigationMixin],

  start: function() {
    app.router.navigate('about', {trigger: true});
  },

  render: function() {
    return <section data-step="1" id="welcome">
      <h1>Hi there! I’m PiggyBot</h1>
      <p>Are you saving up for something special? I can tell you how long it will take.</p>
      <p>All I need is a few facts about you! Let's go!</p>
      <button role="step" onClick={this.start}>Start</button>
    </section>;
  }
});
