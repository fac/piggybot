Piggybot.Models.SavingsPlan = Piggybot.Models.Base.extend({
  localStorageKey: "savingsPlan",
  localStorageAttrs: ['userName', 'userEmail', 'openingBalance', 'targetName', 'targetValue'],
  defaults: {
    userName: null,
    userEmail: null,
    openingBalance: 0.00,
    targetName: null,
    targetDate: null,
    sleeps: null,
    targetValue: 0.00,
    income: new Piggybot.Collections.Transactions([
      new Piggybot.Models.Transaction({name: 'Pocket Money'}),
      new Piggybot.Models.Transaction({name: 'Jobs'}),
      new Piggybot.Models.Transaction({name: 'Other'}),
    ]),
    spending: new Piggybot.Collections.Transactions([
      new Piggybot.Models.Transaction({name: 'Games & Toys'}),
      new Piggybot.Models.Transaction({name: 'Clothes'}),
      new Piggybot.Models.Transaction({name: 'Sweets & Comics'}),
      new Piggybot.Models.Transaction({name: 'Books & DVDs'}),
      new Piggybot.Models.Transaction({name: 'Other'}),
    ]),
    bonuses: new Piggybot.Collections.Transactions([
      new Piggybot.Models.Transaction({name: 'Birthday Money', datedOn: Date.today()}),
      new Piggybot.Models.Transaction({name: 'Christmas Money', datedOn: Date.today().set({month: 11, day: 25})})
    ])
  },

  templateData: function() {
    return this.toJSON();
  },

  resultsData: function() {
    var data = this.toJSON();
    var weeklyDelta = this.netWeeklyIncome();
    data.negativeCashflow = (weeklyDelta <= 0)

    if(weeklyDelta <= 0)
      return data;

    var currentWeek = 0;
    var currentDate = Date.today();
    var currentValue = this.get('openingBalance');
    var series = [currentDate.addWeeks(currentWeek)];
    var values = [currentValue];

    var required = this.savingRequired();
    var bonuses = this.get('bonuses');

    while(required > 0) {
      currentWeek += 1;
      currentDate = Date.today().addWeeks(currentWeek);

      weeklyBonuses = bonuses.amountInWeekEnding(currentDate)
      currentValue += weeklyDelta + weeklyBonuses;
      required -= (weeklyDelta + weeklyBonuses);

      series.push(currentDate.clone());
      values.push(currentValue);
    }

    data.series = series;
    data.values = values;
    data.weeks = series.length;
    data.sleeps = series.length * 7;
    data.targetDate = currentDate;

    return data;
  },

  savingRequired: function() {
    return this.get('targetValue') - this.get('openingBalance')
  },

  netWeeklyIncome: function() {
    return this.get('income').total() - this.get('spending').total()
  }
});
