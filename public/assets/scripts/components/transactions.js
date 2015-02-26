var Transactions = React.createBackboneClass({
  name: "Transactions",
  changeOptions: "change",

  renderTransactions: function(transactions) {
    return transactions.map(function(transaction) {
      return <Transaction model={transaction} key={transaction.get('name')} />
    });
  },

  render: function() {
    var transactions = this.getCollection();

    return <table>
      <tbody>
        {this.renderTransactions(transactions)}
      </tbody>
      <tfoot>
        <tr>
          <th className="total">Total</th>
          <th className="date"></th>
          <th className="amount money">{transactions.total().toFixed(2)}</th>
        </tr>
      </tfoot>
    </table>;
  }
});
