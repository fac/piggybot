Piggybot.Models.Transaction = Piggybot.Models.Base.extend({
  localStorageAttrs: ['amount', 'datedOn'],
  dateAttrs: ['datedOn'],
  defaults: {
    name: null,
    amount: 0.00,
    datedOn: null
  },

  localStorageKey: function() {
    return this.get('name');
  },

  templateData: function() {
    return this.toJSON();
  }
});
