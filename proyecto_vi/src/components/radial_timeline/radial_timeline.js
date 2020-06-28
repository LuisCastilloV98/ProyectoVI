import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {am4geodata_worldLow} from "@amcharts/amcharts4-geodata/worldLow";
import map from "@amcharts/amcharts4-geodata/costaRicaHigh";
import datos_provincia from "./bachillerato_provincia";
import datos_canton from "./bachillerato_canton";
import {Container, Button, Row, Col } from 'react-bootstrap';
import am4geodata_costarica from '../../assets/data/costarica';

am4core.useTheme(am4themes_animated);
class RadarTimeline extends React.Component{

    constructor(props) {
        super(props);
        this.gloabaXYchart = null;
        this.actual_province = null;
        this.actual_id_province = null;
        this.data_XY = null;
        this.actual_anno = null;

        this.mapachart = null;
        this.polygonSeriesmap = null;

    }

    setmapvalues(province, canton, anno){

    }


    setdataxy(anno, provincia){
        var temp = [];
        
        for (var i = 0; i < datos_canton.counters.length; i++) {
            var counter = datos_canton.counters[i];
            var actual_anno = "";
            if(anno==2000){
                actual_anno=counter.Promedio_2000;

            }else if(anno ==2001){
                actual_anno=counter.Promedio_2001;

            }
            else if(anno ==2002){
                actual_anno=counter.Promedio_2002;
                
            }
            else if(anno ==2003){
                actual_anno=counter.Promedio_2003;
                
            }
            else if(anno ==2004){
                actual_anno=counter.Promedio_2004;
                
            }
            else if(anno ==2005){
                actual_anno=counter.Promedio_2005;
                
            }
            else if(anno ==2006){
                actual_anno=counter.Promedio_2006;
                
            }
            else if(anno ==2007){
                actual_anno=counter.Promedio_2007;
                
            }
            else if(anno ==2008){
                actual_anno=counter.Promedio_2008;
                
            }
            else if(anno ==2009){
                actual_anno=counter.Promedio_2009;
                
            }
            else if(anno ==2010){
                actual_anno=counter.Promedio_2010;
                
            }
            else if(anno ==2011){
                actual_anno=counter.Promedio_2011;
                
            }else if(anno ==2012){
                actual_anno=counter.Promedio_2012;
                
            }else if(anno ==2013){
                actual_anno=counter.Promedio_2013;
                
            }else if(anno ==2014){
                actual_anno=counter.Promedio_2014;
                
            }else{
                actual_anno=counter.Promedio_2015;
                
            }


            if(counter.Provincia==provincia){
                temp.push({
                    "country": counter.Canton.toString(),
                    "canton_id": counter.Canton.toString(),
                    "visits": parseFloat(actual_anno)
                });
            }
        }

        this.actual_id_province =  counter.Canton.toString();
        this.actual_anno = anno;

        this.data_XY = temp;
        this.gloabaXYchart.data = this.data_XY;
        this.gloabaXYchart.invalidateRawData();
       

    }

    updatedataxy(anno){
        
        for (var i = 0; i < datos_canton.counters.length; i++) {
            var counter = datos_canton.counters[i];
            var actual_anno = "";
            if(anno==2000){
                actual_anno=counter.Promedio_2000;

            }else if(anno ==2001){
                actual_anno=counter.Promedio_2001;

            }
            else if(anno ==2002){
                actual_anno=counter.Promedio_2002;
                
            }
            else if(anno ==2003){
                actual_anno=counter.Promedio_2003;
                
            }
            else if(anno ==2004){
                actual_anno=counter.Promedio_2004;
                
            }
            else if(anno ==2005){
                actual_anno=counter.Promedio_2005;
                
            }
            else if(anno ==2006){
                actual_anno=counter.Promedio_2006;
                
            }
            else if(anno ==2007){
                actual_anno=counter.Promedio_2007;
                
            }
            else if(anno ==2008){
                actual_anno=counter.Promedio_2008;
                
            }
            else if(anno ==2009){
                actual_anno=counter.Promedio_2009;
                
            }
            else if(anno ==2010){
                actual_anno=counter.Promedio_2010;
                
            }
            else if(anno ==2011){
                actual_anno=counter.Promedio_2011;
                
            }else if(anno ==2012){
                actual_anno=counter.Promedio_2012;
                
            }else if(anno ==2013){
                actual_anno=counter.Promedio_2013;
                
            }else if(anno ==2014){
                actual_anno=counter.Promedio_2014;
                
            }else{
                actual_anno=counter.Promedio_2015;
                
            }

            am4core.array.each(this.data_XY, function (item) {
                        if(parseInt(item.canton_id) == counter.Canton){
                         item.visits =  parseFloat(actual_anno);
                        }
                    })

        }

        this.gloabaXYchart.invalidateRawData();
    
    }

    updateDataXY(anno, provincia){
        if (provincia=="San Jose") {
            if(provincia==this.actual_province){
                this.updatedataxy(anno);
            }else{
            this.setdataxy(anno, 1);
            }
            console.log(anno,1);
          } else if (provincia=="Puntarenas") {
            if(provincia==this.actual_province){
                this.updatedataxy(anno);
            }else{
            this.setdataxy(anno, 6);
        }
            console.log(anno,6);
          } else if (provincia=="Limón") {
            if(provincia==this.actual_province){
                this.updatedataxy(anno);
            }else{
            this.setdataxy(anno, 7);
        }
            console.log(anno,7);
          }else if (provincia=="Cartago") {
            if(provincia==this.actual_province){
                this.updatedataxy(anno);
            }else{
            this.setdataxy(anno, 3);
        }
            console.log(anno,3);
          }else if (provincia=="Alajuela") {
            if(provincia==this.actual_province){
                this.updatedataxy(anno);
            }else{
            this.setdataxy(anno, 2);
        }
            console.log(anno,2);
          }else if (provincia=="Guanacaste") {
            if(provincia==this.actual_province){
                this.updatedataxy(anno);
            }else{
            this.setdataxy(anno, 5);
        }
            console.log(anno,5);
          }else {
            if(provincia==this.actual_province){
                this.updatedataxy(anno);
            }else{
            this.setdataxy(anno, 4);
            console.log(anno,4);
            }
          }
        console.log(anno, provincia);
    }

    createRadialTimeLine(){
        let startYear = 2000;
        let endYear = 2015;
        let currentYear = 2015;
        let colorSet = new am4core.ColorSet();

        let chart_radial_timeline =  am4core.create("radial_timeline", am4charts.RadarChart);
        chart_radial_timeline.numberFormatter.numberFormat = "+#.0|#.0|0.0";
        chart_radial_timeline.hiddenState.properties.opacity = 0;

        chart_radial_timeline.startAngle = 270 - 180;
        chart_radial_timeline.endAngle = 270 + 180;

        chart_radial_timeline.padding(5,15,5,10)
        chart_radial_timeline.radius = am4core.percent(65);
        chart_radial_timeline.innerRadius = am4core.percent(40);

        // year label goes in the middle
        let yearLabel = chart_radial_timeline.radarContainer.createChild(am4core.Label);
        yearLabel.horizontalCenter = "middle";
        yearLabel.verticalCenter = "middle";
        yearLabel.fill = am4core.color("#673AB7");
        yearLabel.fontSize = 30;
        yearLabel.text = String(currentYear);

        // zoomout button
        let zoomOutButton = chart_radial_timeline.zoomOutButton;
        zoomOutButton.dx = 0;
        zoomOutButton.dy = 0;
        zoomOutButton.marginBottom = 15;
        zoomOutButton.parent = chart_radial_timeline.rightAxesContainer;

        // vertical orientation for zoom out button and scrollbar to be positioned properly
        chart_radial_timeline.rightAxesContainer.layout = "vertical";
        chart_radial_timeline.rightAxesContainer.padding(120, 20, 120, 20);

        // category axis
        let categoryAxis = chart_radial_timeline.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "colegio";

        let categoryAxisRenderer = categoryAxis.renderer;
        let categoryAxisLabel = categoryAxisRenderer.labels.template;
        categoryAxisLabel.location = 0.5;
        categoryAxisLabel.radius = 28;
        categoryAxisLabel.relativeRotation = 90;

        categoryAxisRenderer.fontSize = 8;
        categoryAxisRenderer.minGridDistance = 10;
        categoryAxisRenderer.grid.template.radius = -25;
        categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
        categoryAxisRenderer.grid.template.interactionsEnabled = false;

        categoryAxisRenderer.ticks.template.disabled = true;
        categoryAxisRenderer.axisFills.template.disabled = true;
        categoryAxisRenderer.line.disabled = true;

        categoryAxisRenderer.tooltipLocation = 0.5;
        categoryAxis.tooltip.defaultState.properties.opacity = 0;

        // value axis
        let valueAxis = chart_radial_timeline.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.max = 1;
        valueAxis.strictMinMax = true;
        valueAxis.tooltip.defaultState.properties.opacity = 0;
        valueAxis.tooltip.animationDuration = 0;
        valueAxis.cursorTooltipEnabled = true;
        valueAxis.zIndex = 10;
        valueAxis.fontSize = 5;

        let valueAxisRenderer = valueAxis.renderer;
        valueAxisRenderer.axisFills.template.disabled = true;
        valueAxisRenderer.ticks.template.disabled = true;
        valueAxisRenderer.minGridDistance = 20;
        valueAxisRenderer.grid.template.strokeOpacity = 0.05;


        // series
        let series = chart_radial_timeline.series.push(new am4charts.RadarColumnSeries());
        series.columns.template.width = am4core.percent(90);
        series.columns.template.strokeOpacity = 0;
        series.dataFields.valueY = "value" + currentYear;
        series.dataFields.categoryX = "colegio";
        series.tooltipText = "{categoryX}:{valueY.value}";

        // this makes columns to be of a different color, depending on value
        series.heatRules.push({ 
            target: series.columns.template, 
            property: "fill",
             minValue: -1, 
             maxValue: 2, 
             min: am4core.color("#673AB7"),
             max: am4core.color("#F44336"), 
             dataField: "valueY" });



        // cursor
        let cursor = new am4charts.RadarCursor();
        chart_radial_timeline.cursor = cursor;
        cursor.behavior = "selectY";

        cursor.xAxis = categoryAxis;
        cursor.innerRadius = am4core.percent(40);
        cursor.lineY.disabled = true;

        cursor.lineX.fillOpacity = 0.2;
        cursor.lineX.fill = am4core.color("#000000");
        cursor.lineX.strokeOpacity = 0;
        cursor.fullWidthLineX = true;

        // on click
        series.columns.template.events.on("hit", function(ev) {
            var anno_p = startYear + Math.round(yearSlider.start * (endYear - startYear));
            var provincia_p =  ev.target.dataItem.dataContext.colegio;
            this.updateDataXY(anno_p, provincia_p);
            this.actual_province = provincia_p;
        }, this);

        // year slider
        let yearSliderContainer = chart_radial_timeline.createChild(am4core.Container);
        yearSliderContainer.layout = "vertical";
        yearSliderContainer.padding(0, 38, 0, 38);
        yearSliderContainer.width = am4core.percent(100);

        let yearSlider = yearSliderContainer.createChild(am4core.Slider);
        yearSlider.events.on("rangechanged", function () {
            updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
        })
        yearSlider.orientation = "horizontal";
        yearSlider.start = 0.5;
        yearSlider.exportable = false;

        chart_radial_timeline.data = generateRadarData();

        function generateRadarData() {
            let data = [];
            let i = 0;
            for (var continent in datos_provincia) {
                let continentData = datos_provincia[continent];

                continentData.sort((a, b) => (a - b));
                continentData.forEach(function (colegio) {
                    let rawDataItem = { "colegio": colegio[0] }

                    for (var y = 2; y < colegio.length; y++) {
                        rawDataItem["value" + (startYear + y - 2)] = colegio[y];
                    }

                    data.push(rawDataItem);
                });

                createRange(continent, continentData, i);
                i++;

            }
            return data;
        }

        var self = this;


        function updateRadarData(year) {
            if (currentYear !== year) {
                currentYear = year;
                yearLabel.text = String(currentYear);
                series.dataFields.valueY = "value" + currentYear;
                chart_radial_timeline.invalidateRawData();
                if (self.actual_province!=null){
                    self.updateDataXY(year, self.actual_province);
                }
            }
        }

        function createRange(name, continentData, index) {

            let axisRange = categoryAxis.axisRanges.create();
            axisRange.axisFill.interactionsEnabled = true;
            axisRange.text = name;
            // first colegio
            axisRange.category = continentData[0][0];
            // last colegio
            axisRange.endCategory = continentData[continentData.length - 1][0];

            // every 3rd color for a bigger contrast
            axisRange.axisFill.fill = colorSet.getIndex(index * 3);
            axisRange.grid.disabled = true;
            axisRange.label.interactionsEnabled = false;
            axisRange.label.bent = true;

            let axisFill = axisRange.axisFill;
            axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
            axisFill.radius = -20; // negative radius means it is calculated from max radius
            axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
            axisFill.fillOpacity = 1;
            axisFill.togglable = true;

            axisFill.showSystemTooltip = true;
            axisFill.readerTitle = "click to zoom";
            axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

            //axisFill.events.on("hit", function (event) {
            //    let dataItem = event.target.dataItem;
            //    if (!event.target.isActive) {
            //        categoryAxis.zoom({ start: 0, end: 1 });
            //    }
            //    else {
            //        categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
            //    }
            //})

            // hover state
            //let hoverState = axisFill.states.create("hover");
            //hoverState.properties.innerRadius = -10;
            //hoverState.properties.radius = -25;

            let axisLabel = axisRange.label;
            axisLabel.location = 0.5;
            axisLabel.fill = am4core.color("#ffffff");
            axisLabel.radius = 3;
            axisLabel.relativeRotation = 0;
        }

        let slider = yearSliderContainer.createChild(am4core.Slider);
        slider.start = 1;
        slider.exportable = false;
        slider.events.on("rangechanged", function () {
            let start = slider.start;

            chart_radial_timeline.startAngle = 270 - start * 175 + 1;
            chart_radial_timeline.endAngle = 270 + start * 175 - 1;

            valueAxis.renderer.axisAngle = chart_radial_timeline.startAngle;
        })

        this.chart_radial_timeline =  chart_radial_timeline;
    }

    createXYChart(){
        var chartXY = am4core.create("chartXY", am4charts.XYChart);
        chartXY.data = this.data_XY; 
        chartXY.padding(40, 40, 40, 40);

        var categoryAxis = chartXY.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        var valueAxis = chartXY.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        //valueAxis.rangeChangeEasing = am4core.ease.linear;
        //valueAxis.rangeChangeDuration = 1500;

        var series = chartXY.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "country";
        series.dataFields.valueY = "visits";
        series.tooltipText = "{country}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.cornerRadiusTopLeft = 10;

         // cursor
         let cursor = new am4charts.XYCursor();
         chartXY.cursor = cursor;
         cursor.behavior = "selectY";

        //series.interpolationDuration = 1500;
        //series.interpolationEasing = am4core.ease.linear;
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.verticalCenter = "bottom";
        labelBullet.label.dy = -10;
        labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.##')}";

        chartXY.zoomOutButton.disabled = true;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chartXY.colors color set
        series.columns.template.adapter.add("fill",function (fill, target) {
            return chartXY.colors.getIndex(target.dataItem.index);
        });

        // setInterval(function () {
        //     am4core.array.each(chartXY.data, function (item) {
        //         item.visits += Math.round(Math.random() * 200 - 100);
        //         item.visits = Math.abs(item.visits);
        //     })
        //     chartXY.invalidateRawData();
        // }, 2000)

        categoryAxis.sortBySeries = series;
        this.gloabaXYchart = chartXY;


        series.columns.template.events.on("hit", function(ev) {
            var input =  ev.target.dataItem.dataContext;
            if(this.actual_id_province!=null && this.actual_anno!=null){
                this.setmapvalues(this.actual_id_province, parseInt(input.canton_id), this.actual_anno);
            }
            
        }, this);

    }

    createMapChart(){
        /* Create map instance */
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        /* Set map definition */
        //chart.geodata = am4geodata_worldLow;
        //chart.geodataSource.url = "http://daticos-geotec.opendata.arcgis.com/datasets/249bc8711c33493a90b292b55ed3abad_0.geojson";
        //chart.geodata = am4geodata_costarica;
        chart.geodata = am4geodata_costarica;
        
        /* Set projection */
        chart.projection = new am4maps.projections.Mercator();

        /* Create map polygon series */
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        /* Make map load polygon (like country names) data from GeoJSON */
        polygonSeries.useGeodata = true;


        /* Configure series */
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.applyOnClones = true;
        polygonTemplate.togglable = true;
        polygonTemplate.tooltipText = "{NOM_CANT_1}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeOpacity = 0.5;
        polygonTemplate.fill = chart.colors.getIndex(0);
        var lastSelected;
        polygonTemplate.events.on("hit", function(ev) {
        if (lastSelected) {
            // This line serves multiple purposes:
            // 1. Clicking a country twice actually de-activates, the line below
            //    de-activates it in advance, so the toggle then re-activates, making it
            //    appear as if it was never de-activated to begin with.
            // 2. Previously activated countries should be de-activated.
            lastSelected.isActive = false;
        }
        ev.target.series.chart.zoomToMapObject(ev.target);
        if (lastSelected !== ev.target) {
            lastSelected = ev.target;
        }
        })

        /* Create selected and hover states and set alternative fill color */
        var ss = polygonTemplate.states.create("active");
        ss.properties.fill = chart.colors.getIndex(2);

        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(4);

        // Small map
        chart.smallMap = new am4maps.SmallMap();
        // Re-position to top right (it defaults to bottom left)
        chart.smallMap.align = "right";
        chart.smallMap.valign = "top";
        chart.smallMap.series.push(polygonSeries);

        // Zoom control
        chart.zoomControl = new am4maps.ZoomControl();

        var homeButton = new am4core.Button();
        homeButton.events.on("hit", function(){
        chart.goHome();
        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = chart.zoomControl;
        homeButton.insertBefore(chart.zoomControl.plusButton);  
   
        
        //Agregacion de puntos
        // Add image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.mapImages.template.tooltipText = "{title}";
        imageSeries.mapImages.template.propertyFields.url = "url";

        var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 3;
        circle.propertyFields.fill = "color";

        var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle2.radius = 3;
        circle2.propertyFields.fill = "color";


        circle2.events.on("inited", function(event){
        animateBullet(event.target, 1);
        })


        function animateBullet(circle, con) {
            if(con < 3){
                var animation = circle.animate([
                    { property: "scale", from: 1, to: 5 }, 
                    { property: "opacity", from: 1, to: 0 }], 
                    1000,
                    am4core.ease.circleOut);
                animation.events.on("animationended", function(event){
                animateBullet(event.target.object, con+1);
                })
            }
        }

        var colorSet = new am4core.ColorSet();

        imageSeries.data = [ {
        "title": "Brussels",
        "latitude": 10.330922326542,
        "longitude": -84.8366774763672,
        "color":"red"
        }, {
        "title": "Copenhagen",
        "latitude": -84.8366774763672,
        "longitude": 10.330922326542,
        "color":"red"
        }];

        this.mapachart = chart;
        this.polygonSeriesmap = polygonSeries;

}
    
    componentDidMount() {
        this.createRadialTimeLine();
        this.createXYChart();
        this.createMapChart();

    }

    componentWillUnmount() {
        if (this.chart_radial_timeline) {
            this.chart_radial_timeline.dispose();
        }

        if (this.chartXY) {
            this.chartXY.dispose();
        }

        if (this.chart) {
            this.chart.dispose();
        }
    }

    render(){
        return(
            <Container fluid>
                <Row> 
                    <Col>
                        <div id="radial_timeline" style={{ height: "45vh" }}></div>
                    </Col>
                </Row>
                <Row> 
                    <Col>
                    <div id="chartdiv" style={{ height: "45vh" }}></div>
                    </Col>
                    <Col>
                    <div id="chartXY" style={{ height: "45vh" }}></div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RadarTimeline;
