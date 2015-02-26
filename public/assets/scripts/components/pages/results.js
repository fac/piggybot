var ResultsPage = React.createBackboneClass({
  name: "ResultsPage",

  getInitialState: function() {
    return {
      emailSuccess: false,
      emailFail: false,
      sendButtonDisabled: false
    };
  },

  startAgain: function() {
    localStorage.clear();
    window.location.href = "/";
  },

  emailChanged: function(e) {
    this.getModel().set('userEmail', e.target.value);
  },

  sendEmail: function(event) {
    var spendingPlan = this.getModel();
    this.setState({sendButtonDisabled: true});

    $.ajax({
      url: '/email',
      data: {
        item: spendingPlan.get('targetName'),
        name: spendingPlan.get('userName'),
        email: spendingPlan.get('userEmail'),
        weeks: spendingPlan.resultsData().weeks,
        sleeps: spendingPlan.resultsData().sleeps,
        chart: Highcharts.charts[0].getSVG()
      },
      dataType: 'json',
      type: 'post',
      success: this.emailSuccess,
      error: this.emailFail
    });
    event.preventDefault();
  },

  emailSuccess: function() {
    this.setState({emailSuccess: true, emailFail: false, sendButtonDisabled: false});
    window.scrollTo(0,0);
  },

  emailFail: function() {
    this.setState({emailSuccess: false, emailFail: true, sendButtonDisabled: false});
    window.scrollTo(0,0);
  },

  tryAgain: function() {
    this.setState({emailSuccess: false, emailFail: false, sendButtonDisabled: false});
  },

  render: function() {
    var spendingPlan = this.getModel();
    var data = spendingPlan.resultsData();

    var results;
    if(data.negativeCashflow) {
      results = <div>
        <p>Oh no. It looks like you’re spending more money than your saving. At this rate you’ll literally never be able to save up for that {data.targetName}.</p>
        <p>Why not <a href="http://vzaar.com/videos/1517779">take a look at our helpful video on saving money</a>, which will help you get back on track.</p>
        <button role="step" onClick={this.startAgain}>Start Again</button>
      </div>
    } else {
      results = <div>
        <p>{data.userName}, it will take you <strong>{data.weeks} weeks</strong> to save up for your new {data.targetName}. That means you'll have enough money to buy it on <strong>{data.targetDate.toString("dd MMM yyyy")}</strong>.</p>
        <p>That's only {data.sleeps} sleeps!</p>
        <Chart data={data} />
        <p>Good luck!</p>
        <p>You could get the {data.targetName} sooner if you make more money, or spend less. <a href="/#income" role="step">Go back to step three</a> and try putting in some different numbers.</p>
        <p>Not sure how to get the {data.targetName} sooner?  <a href="http://vzaar.com/videos/1517779">Have a look here for some ideas</a>!</p>
        <p>
          <label htmlFor="userEmail">Email this to yourself</label>
          <input id="userEmail" type="email" placeholder="your email address" name="userEmail" onChange={this.emailChanged} value={data.userEmail} />
          <button role="email" disabled={this.state.sendButtonDisabled} onClick={this.sendEmail}>Send Email</button>
          or
          <button role="step" onClick={this.startAgain}>Start Again</button>
        </p>
      </div>;
    }

    var classes = React.addons.classSet({
      "email_sent": this.state.emailSuccess || this.state.emailFail,
      "success": this.state.emailSuccess,
      "fail": this.state.emailFail
    });

    return <section data-step="5" id="results">
      <div id="results-target" className={classes}>
        <div className="unsent">
          <h1>The Results are in!</h1>
          {results}
        </div>
        <div className="sent success">
          <p>Check your email {data.userName}!</p>
          <p>I've sent your saving results through to you, so you can keep checking back to make sure your saving is on target.</p>
          <button role="step" onClick={this.startAgain}>Start Again</button>
        </div>
        <div className="sent fail">
          <p>Oops - I couldn't send you your email.</p>
          <button role="retry" onClick={this.tryAgain}>Try Again</button>
        </div>
      </div>
    </section>;
  }
});
