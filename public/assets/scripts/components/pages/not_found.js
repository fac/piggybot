var NotFoundPage = React.createBackboneClass({
  name: "not_found",

  render: function() {
    return <section id="not_found">
      <h1>Squeal!</h1>
      <p>Sorry but that page doesn't exist! <a href="/">Try again</a></p>
    </section>;
  }
});
