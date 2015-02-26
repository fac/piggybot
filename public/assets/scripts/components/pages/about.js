var AboutPage = React.createBackboneClass({
  name: "AboutPage",
  mixins: [NavigationMixin],

  onBlur: function(event) {
    var savingsPlan = this.getModel();

    e = $(event.target)
    val = e.val();
    if(e.hasClass('money')) {
      val = parseFloat(val);
      if(isNaN(val))
        e.val(savingsPlan.get(e.attr('name')).toFixed(2));
      else {
        val = Math.round(val * 100) / 100;
        e.val(val.toFixed(2));
      }
    }
    savingsPlan.set(e.attr('name'), val);
  },

  back: function() {
    app.router.navigate('welcome', {trigger: true});
  },

  next: function() {
    app.router.navigate('income', {trigger: true});
  },

  render: function() {
    var savingsPlan = this.getModel();

    return <section data-step="2" id="about">
      <h1>Tell me About Yourself</h1>
      <div id="about-target">
        <p>
          <label htmlFor="userName">What's Your Name?</label>
          <input id="userName" type="text" name="userName" onBlur={this.onBlur} defaultValue={savingsPlan.get('userName')} />
        </p>
        <p>
          <label htmlFor="targetName">What are you saving for?</label>
          <input id="targetName" type="text" name="targetName" onBlur={this.onBlur} defaultValue={savingsPlan.get('targetName')} />
        </p>
        <p>
          <label htmlFor="targetValue">How much does it cost?</label>
          <input id="targetValue" name="targetValue" className="money" onBlur={this.onBlur} defaultValue={savingsPlan.get('targetValue').toFixed(2)} />
        </p>
        <p className="note">
          <label htmlFor="openingBalance">How much have you saved already?</label>
          <input id="openingBalance" name="openingBalance" className="money" onBlur={this.onBlur} defaultValue={savingsPlan.get('openingBalance').toFixed(2)} /><br />
          Leave this as 0.00 if you're starting to save today
        </p>
      </div>
      <button role="step" onClick={this.back}>Back</button>
      <button role="step" onClick={this.next}>Next</button>
    </section>;
  }
});
