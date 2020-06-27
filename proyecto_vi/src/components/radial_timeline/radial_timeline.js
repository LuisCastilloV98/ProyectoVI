import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import temperatures from "./bachillerato_provincia";

am4core.useTheme(am4themes_animated);
class RadarTimeline extends React.Component{
    componentDidMount() {
        let startYear = 2000;
        let endYear = 2015;
        let currentYear = 2015;
        let colorSet = new am4core.ColorSet();

        let chart = am4core.create("radial_timeline", am4charts.RadarChart);
        chart.numberFormatter.numberFormat = "+#.0|#.0|0.0";
        chart.hiddenState.properties.opacity = 0;

        chart.startAngle = 270 - 180;
        chart.endAngle = 270 + 180;

        chart.padding(5,15,5,10)
        chart.radius = am4core.percent(65);
        chart.innerRadius = am4core.percent(40);

        // year label goes in the middle
        let yearLabel = chart.radarContainer.createChild(am4core.Label);
        yearLabel.horizontalCenter = "middle";
        yearLabel.verticalCenter = "middle";
        yearLabel.fill = am4core.color("#673AB7");
        yearLabel.fontSize = 30;
        yearLabel.text = String(currentYear);

        // zoomout button
        let zoomOutButton = chart.zoomOutButton;
        zoomOutButton.dx = 0;
        zoomOutButton.dy = 0;
        zoomOutButton.marginBottom = 15;
        zoomOutButton.parent = chart.rightAxesContainer;

        // vertical orientation for zoom out button and scrollbar to be positioned properly
        chart.rightAxesContainer.layout = "vertical";
        chart.rightAxesContainer.padding(120, 20, 120, 20);

        // category axis
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
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
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
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
        let series = chart.series.push(new am4charts.RadarColumnSeries());
        series.columns.template.width = am4core.percent(90);
        series.columns.template.strokeOpacity = 0;
        series.dataFields.valueY = "value" + currentYear;
        series.dataFields.categoryX = "colegio";
        series.tooltipText = "{categoryX}:{valueY.value}";

        // this makes columns to be of a different color, depending on value
        series.heatRules.push({ target: series.columns.template, property: "fill", minValue: -1, maxValue: 2, min: am4core.color("#673AB7"), max: am4core.color("#F44336"), dataField: "valueY" });

        // on click
        series.columns.events.on("hit", function(ev) {
            console.log('data context: ', ev.target.dataItem);
        }, this);

        series.columns.events.on("hit", function(ev) {
            alert('test');
            console.log(ev.target);
        }, this);

        // cursor
        let cursor = new am4charts.RadarCursor();
        chart.cursor = cursor;
        cursor.behavior = "zoomX";

        cursor.xAxis = categoryAxis;
        cursor.innerRadius = am4core.percent(40);
        cursor.lineY.disabled = true;

        cursor.lineX.fillOpacity = 0.2;
        cursor.lineX.fill = am4core.color("#000000");
        cursor.lineX.strokeOpacity = 0;
        cursor.fullWidthLineX = true;

        // year slider
        let yearSliderContainer = chart.createChild(am4core.Container);
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

        chart.data = generateRadarData();

        function generateRadarData() {
            let data = [];
            let i = 0;
            for (var continent in temperatures) {
                let continentData = temperatures[continent];

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


        function updateRadarData(year) {
            if (currentYear !== year) {
                currentYear = year;
                yearLabel.text = String(currentYear);
                series.dataFields.valueY = "value" + currentYear;
                chart.invalidateRawData();
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
            //axisFill.readerTitle = "click to zoom";
            //axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

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

            chart.startAngle = 270 - start * 175 + 1;
            chart.endAngle = 270 + start * 175 - 1;

            valueAxis.renderer.axisAngle = chart.startAngle;
        })

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render(){
        return(
            <section>
              <div id="radial_timeline" style={{ width: "100%", height: "700px" }}></div>
            </section>
        );
    }
}

export default RadarTimeline;
