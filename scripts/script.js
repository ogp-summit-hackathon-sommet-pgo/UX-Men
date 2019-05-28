$('window').ready(() => {
   console.log('ready');


   am4core.ready(function () {

      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      am4core.options.autoSetClassName = true;

      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.colors.step = 2;
      chart.maskBullets = false;

      // Add data
      chart.data = [{
         "date": "2012-01-01",
         "distance": 227,
         "townName": "New York",
         "townSize": 12,
         "latitude": 40.71,
         "duration": 408
}, {
         "date": "2012-01-02",
         "distance": 371,
         "townName": "Washington",
         "townSize": 7,
         "latitude": 38.89,
         "duration": 482
}, {
         "date": "2012-01-03",
         "distance": 433,
         "townName": "Wilmington",
         "townSize": 3,
         "latitude": 34.22,
         "duration": 562
}, {
         "date": "2012-01-04",
         "distance": 345,
         "townName": "Jacksonville",
         "townSize": 3.5,
         "latitude": 30.35,
         "duration": 379
}, {
         "date": "2012-01-05",
         "distance": 480,
         "townName": "Miami",
         "townSize": 5,
         "latitude": 25.83,
         "duration": 501
}, {
         "date": "2012-01-06",
         "distance": 386,
         "townName": "Tallahassee",
         "townSize": 3.5,
         "latitude": 30.46,
         "duration": 443
}, {
         "date": "2012-01-07",
         "distance": 348,
         "townName": "New Orleans",
         "townSize": 5,
         "latitude": 29.94,
         "duration": 405
}, {
         "date": "2012-01-08",
         "distance": 238,
         "townName": "Houston",
         "townSize": 8,
         "latitude": 29.76,
         "duration": 309
}, {
         "date": "2012-01-09",
         "distance": 218,
         "townName": "Dalas",
         "townSize": 8,
         "latitude": 32.8,
         "duration": 287
}, {
         "date": "2012-01-10",
         "distance": 349,
         "townName": "Oklahoma City",
         "townSize": 5,
         "latitude": 35.49,
         "duration": 485
}, {
         "date": "2012-01-11",
         "distance": 603,
         "townName": "Kansas City",
         "townSize": 5,
         "latitude": 39.1,
         "duration": 890
}, {
         "date": "2012-01-12",
         "distance": 534,
         "townName": "Denver",
         "townSize": 9,
         "latitude": 39.74,
         "duration": 810
}, {
         "date": "2012-01-13",
         "townName": "Salt Lake City",
         "townSize": 6,
         "distance": 425,
         "duration": 670,
         "latitude": 40.75,
         "dashLength": 8,
         "alpha": 0.4
}];

      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dataFields.category = "category";
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.fullWidthTooltip = true;

      var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
      distanceAxis.title.text = "Opioid related deaths";
      distanceAxis.renderer.grid.template.disabled = true;

      var durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
      durationAxis.title.text = "Dollar amount";
      durationAxis.title.fontSize = "Dollar amount";
      durationAxis.baseUnit = "minute";
      durationAxis.renderer.grid.template.disabled = true;
      durationAxis.renderer.opposite = true;
      durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";

      var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
      latitudeAxis.renderer.grid.template.disabled = true;
      latitudeAxis.renderer.labels.template.disabled = true;

      // Create series
      var distanceSeries = chart.series.push(new am4charts.ColumnSeries());
      distanceSeries.id = "g1";
      distanceSeries.dataFields.valueY = "distance";
      distanceSeries.dataFields.dateX = "date";
      distanceSeries.yAxis = distanceAxis;
      distanceSeries.tooltipText = "{valueY} miles";
      distanceSeries.name = "Income";
      distanceSeries.columns.template.fillOpacity = 0.7;

      var disatnceState = distanceSeries.columns.template.states.create("hover");
      disatnceState.properties.fillOpacity = 0.9;

      var durationSeries = chart.series.push(new am4charts.LineSeries());
      durationSeries.id = "g3";
      durationSeries.dataFields.valueY = "duration";
      durationSeries.dataFields.dateX = "date";
      durationSeries.yAxis = durationAxis;
      durationSeries.name = "Debt";
      durationSeries.strokeWidth = 2;
      durationSeries.tooltipText = "{valueY.formatDuration()}";

      var durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
      var durationRectangle = durationBullet.createChild(am4core.Rectangle);
      durationBullet.horizontalCenter = "middle";
      durationBullet.verticalCenter = "middle";
      durationBullet.width = 7;
      durationBullet.height = 7;
      durationRectangle.width = 7;
      durationRectangle.height = 7;

      var durationState = durationBullet.states.create("hover");
      durationState.properties.scale = 1.2;

      var latitudeSeries = chart.series.push(new am4charts.LineSeries());
      latitudeSeries.id = "g2";
      latitudeSeries.dataFields.valueY = "latitude";
      latitudeSeries.dataFields.dateX = "date";
      latitudeSeries.yAxis = latitudeAxis;
      latitudeSeries.name = "Opioid related deaths";
      latitudeSeries.strokeWidth = 2;
      latitudeSeries.tooltipText = "Latitude: {valueY} ({townName})";

      var latitudeBullet = latitudeSeries.bullets.push(new am4charts.CircleBullet());
      latitudeBullet.circle.fill = am4core.color("#fff");
      latitudeBullet.circle.strokeWidth = 2;
      latitudeBullet.circle.propertyFields.radius = "townSize";

      var latitudeState = latitudeBullet.states.create("hover");
      latitudeState.properties.scale = 1.2;

      var latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
      latitudeLabel.label.text = "{townName2}";
      latitudeLabel.label.horizontalCenter = "left";
      latitudeLabel.label.dx = 14;

      // Add legend
      chart.legend = new am4charts.Legend();

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.fullWidthLineX = true;
      chart.cursor.xAxis = dateAxis;
      chart.cursor.lineX.strokeOpacity = 0;
      chart.cursor.lineX.fill = am4core.color("#000");
      chart.cursor.lineX.fillOpacity = 0.1;

   }); // end am4core.ready()
})
