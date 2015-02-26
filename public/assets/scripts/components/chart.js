var Chart = React.createClass({
  name: "Chart",

  componentDidMount: function() {
    var data = this.props.data;

    if(data.series == undefined)
      return;

    $('#chart').highcharts({
      chart: { type: 'line', height: 510 },
      title: { text: '' },
      xAxis: {
        title: { text: 'Weeks to go', style: {font: '20px Helvetica', color: '#194772'}},
        labels: { y:20, style: {color: '#777777', font: '16px Helvetica'} },
      },
      yAxis: {
        title: {text: 'Money Saved', style: {font: '20px Helvetica', color: '#194772'} }, gridLineColor: '#eeeeee', labels: {style: {color: '#777777', font: '16px Helvetica'}, formatter: function() { return this.value.toFixed(0) } },
        min: 0
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        spline: {marker: {radius: 4, lineColor: '#ffffff', lineWidth: 2 } }
      },
      series: [
        {name: 'Savings', marker: {symbol: 'url(http://freeagent-piggybot.herokuapp.com/pig-nose.png)'},
        data: data.values,
        color: '#edb0ba'
      }]
    });
  },

  render: function() {
    return <div id="chart"></div>;
  }
});
