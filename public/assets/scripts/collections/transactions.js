Piggybot.Collections.Transactions = Backbone.Collection.extend({
  model: Piggybot.Models.Transaction,

  total: function() {
    return this.reduce(function(total, tx) { return total + tx.get('amount') }, 0.0);
  },

  templateData: function() {
    return {total: this.total()};
  },

  amountInWeekEnding: function(end) {
    start = end.clone().addDays(-6);
    return this.filter(function(tx) { return tx.get('datedOn').between(start, end) }).reduce(function(total, tx) { return total + tx.get('amount')}, 0.0)
  }
});