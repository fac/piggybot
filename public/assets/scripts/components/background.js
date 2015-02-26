var Background = React.createClass({
  name: "Background",
  render: function() {
    return <div>
      <img alt="machine panel" className="background_image svg" data-fallback="http://cdn2.invoiceomatic.io/assets/panel2-fdd8132140078219d67fc8898469f2d4.png" id="machine_panel" src="http://cdn1.invoiceomatic.io/assets/panel2-c743db0aa39d2a568f43b7b5b1bc2e21.svg"/>
      <img alt="grill" className="background_image svg" data-fallback="http://cdn1.invoiceomatic.io/assets/grill-1073ebea8b18b4f1b5cc071a76654dfc.png" id="machine_grill" src="http://cdn2.invoiceomatic.io/assets/grill-b0899dac87de2b374205ec56fe46d5db.svg"/>
      <div id="head" role="step" data-target="1">
        <div id="nose" data-target="1"></div>
      </div>

      <div id="mouth_top">
        <div id="teeth">
          <span className="tooth"></span>
          <span className="tooth"></span>
          <span className="tooth"></span>
          <span className="tooth"></span>
          <span className="tooth"></span>
          <span className="tooth"></span>
        </div>
      </div>
    </div>;
  }
});
