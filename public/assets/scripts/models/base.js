Piggybot.Models.Base = Backbone.Model.extend({

  initialize: function() {
    // If data exists in local storage, restore it
    var key = this.getLocalStorageKey();
    if (key && localStorage[key]) {
      var previousData = JSON.parse(localStorage[key]);
      _.each(previousData, this.restoreData.bind(this));
    }

    this.on('change', this.updateLocalStorage);
  },

  restoreData: function(value, attribute) {
    // Dates are stringified in local storage in "YYYY-MM-DDT00:00:00.000Z" format
    // we just need the year, month, and day, otherwise they display in the
    // wrong format inside date pickers
    if (_.indexOf(this.dateAttrs, attribute) != -1) {
      value = Date.parse(value.split('T')[0], 'dd/MM/yyyy');
    }
    this.set(attribute, value);
  },

  // Updates attributes specified in the localStorageAttrs array
  // (define this array on models inheriting from Piggybot.Models.Base)
  updateLocalStorage: function(model) {
    var key = this.getLocalStorageKey();
    if (!key) return;
    if (!localStorage[key]) localStorage[key] = '{}';

    var storedAttributes = JSON.parse(localStorage[key]);
    var _this = this;

    _.each(model.changedAttributes(), function(value, attribute) {
      if (_.indexOf(_this.localStorageAttrs, attribute) == -1) return;
      storedAttributes[attribute] = value;
    });

    localStorage[key] = JSON.stringify(storedAttributes);
  },

  getLocalStorageKey: function() {
    if (typeof(this.localStorageKey) == "function") {
      return this.localStorageKey();
    } else {
      return this.localStorageKey;
    }
  }

});
