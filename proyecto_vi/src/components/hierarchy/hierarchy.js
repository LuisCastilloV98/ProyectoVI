import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class Hierarchy extends React.Component{
    componentDidMount() {
        let chart = am4core.create("hierarchy", am4charts.SankeyDiagram);
        chart.data = [
            {"from": "Violencia", "to": "SM", "value": 70},
            {"from": "Violencia", "to": "IM", "value": 30},
            {"from": "IM", "to": "Violen. Verbal", "value": 7},
            {"from": "IM", "to": "Violen. Fisica", "value": 7},
            {"from": "IM", "to": "Violen. Escrita", "value": 16},
            {"from": "SM", "to": "Violen. Verbal", "value": 14},
            {"from": "SM", "to": "Violen. Fisica", "value": 14},
            {"from": "SM", "to": "Violen. Escrita", "value": 42},
        ]

        chart.dataFields.fromName = "from";
        chart.dataFields.toName = "to";
        chart.dataFields.value = "value";

        chart.links.template.interactionsEnabled = true;
        chart.links.template.events.on("hit", function(ev) {
            let connection = ev.target.dataItem.properties;
            let value = ev.target.value;
            console.log('data context: ', ev.target.dataItem.dataContext);
            console.log("clicked on ", connection, value);
        }, this);
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render(){
        return(
            <section>
              <div id="hierarchy" style={{ width: "100%", height: "500px" }}></div>
            </section>
        );
    }
}

export default Hierarchy;
