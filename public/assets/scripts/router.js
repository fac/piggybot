var PiggyRouter = Backbone.Router.extend({

  routes: {
    '': 'welcome',
    'welcome': 'welcome',
    'about': 'about',
    'income': 'income',
    'spending': 'spending',
    'results': 'results',
    'not_found': 'not_found'
  },

  welcome: function() {
    React.render(<WelcomePage />, this.getForm());
    this.scrollToTop();
  },

  about: function() {
    React.render(<AboutPage model={app.savingsPlan} />, this.getForm());
    this.scrollToTop();
    this.chompPiggyChomp();
  },

  income: function() {;
    React.render(<IncomePage model={app.savingsPlan} />, this.getForm());
    this.scrollToTop();
    this.chompPiggyChomp();
  },

  spending: function() {
    React.render(<SpendingPage model={app.savingsPlan} />, this.getForm());
    this.scrollToTop();
    this.chompPiggyChomp();
  },

  results: function() {
    React.render(<ResultsPage model={app.savingsPlan} />, this.getForm());
    this.scrollToTop();
    this.chompPiggyChomp();
  },

  not_found: function() {
    $('#double-oink')[0].play();
    React.render(<NotFoundPage />, this.getForm());
    this.scrollToTop();
    this.chompPiggyChomp();
  },

  getForm: function() {
    return document.getElementById('form');
  },

  scrollToTop: function() {
    window.scrollTo(0,0);
  },

  chompPiggyChomp: function() {
    $('#oink')[0].play();
    $('#teeth').addClass('chomp');
    setTimeout(this.stopPiggyStop, 2000);
  },

  stopPiggyStop: function() {
    $('#teeth').removeClass('chomp');
  }

});

React.render(<Background />, $('#background')[0]);

var app = {
  router: new PiggyRouter(),
  savingsPlan: new Piggybot.Models.SavingsPlan()
};
Backbone.history.start();
