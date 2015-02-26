var IncomePage = React.createBackboneClass({
  name: "IncomePage",
  mixins: [NavigationMixin],

  back: function() {
    app.router.navigate('about', {trigger: true});
  },

  next: function() {
    app.router.navigate('spending', {trigger: true});
  },

  render: function() {
    var savingsPlan = this.getModel();

    return <section data-step="3" id="income">
      <h1>Money You Get</h1>
      <h2>Every Week</h2>
      <div id="income-target">
        <Transactions collection={savingsPlan.get('income')} />
      </div>

      <h2>Special Occasions</h2>
      <div id="bonus-target">
        <Transactions collection={savingsPlan.get('bonuses')} />
      </div>
      <button role="step" onClick={this.back}>Back</button>
      <button role="step" onClick={this.next}>Next</button>
    </section>;
  }
});
