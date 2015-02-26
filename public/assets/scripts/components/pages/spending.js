var SpendingPage = React.createBackboneClass({
  name: "SpendingPage",

  back: function() {
    app.router.navigate('income', {trigger: true});
  },

  next: function() {
    app.router.navigate('results', {trigger: true});
  },

  render: function() {
    var savingsPlan = this.getModel();

    return <section data-step="4" id="spending">
      <h1>Money You Spend</h1>
      <div id="spending-target">
        <Transactions collection={savingsPlan.get('spending')} />
      </div>
      <button role="step" onClick={this.back}>Back</button>
      <button role="step" onClick={this.next}>Next</button>
    </section>;
  }
});
