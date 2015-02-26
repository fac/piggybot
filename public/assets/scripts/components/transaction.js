var Transaction = React.createBackboneClass({
  name: "Transaction",
  dateFormat: "yyyy-MM-dd",

  updateAmount: function(event) {
    var transaction = this.getModel();

    val = parseFloat($(event.target).val());
    if(isNaN(val)) {
      $(event.target).val(transaction.get('amount').toFixed(2));
    } else {
      transaction.set('amount', val);
      $(event.target).val(val.toFixed(2));
    }
  },

  datePickerID: function() {
    return this.getModel().get('name').replace(/\s|&/g, '_') + "_datePicker";
  },

  updateDate: function(e) {
    var datePickerID = '#' + this.datePickerID();
    var date = Date.parseExact($(datePickerID).val(), this.dateFormat);
    this.getModel().set('datedOn', date);
  },

  componentDidMount: function() {
    var transaction = this.getModel();
    var datePickerID = "#" + this.datePickerID();

    // Disable date picker on mobile, as date pickers have their own native selector
    if (navigator.userAgent.search(/iPhone|Android/) == -1) {
      $(datePickerID).datepicker({
        dateFormat: "yy-mm-dd",   // this is actually the jQuery UI equivalent of yyyy-MM-dd. Lovely.
        onSelect: this.updateDate
      });
    } else {
      $(datePickerID).on('change', this.updateDate);
    }
  },

  render: function() {
    var transaction = this.getModel();
    var datedOn = transaction.get('datedOn') ? transaction.get('datedOn').toString(this.dateFormat) : null;
    var datePickerID = this.datePickerID();

    return <tr className="transaction">
      <td className="name"><label>{transaction.get('name')}</label></td>
      <td className="date"><input id={datePickerID} type="date" className="datepicker" defaultValue={datedOn} /></td>
      <td className="amount money"><input className="money" onBlur={this.updateAmount} defaultValue={transaction.get('amount').toFixed(2)} /></td>
    </tr>;
  }
});
