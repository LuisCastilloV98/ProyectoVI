import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class Hierarchy extends React.Component{
    componentDidMount() {
        let chart = am4core.create("hierarchy", am4charts.SankeyDiagram);
        chart.data = [
            //{"from": "Violencia", "to": "Violencia Verbal/Escrita", "value": 10},
            //{"from": "Violencia", "to": "Violencia Fisica", "value": 10},
            //{"from": "Violencia", "to": "Robo", "value": 10},
            {"from": "Violencia", "to": "SM", "value": 70},
            {"from": "Violencia", "to": "IM", "value": 30},
            {"from": "IM", "to": "Violen. Verbal", "value": 7},
            {"from": "IM", "to": "Violen. Fisica", "value": 7},
            {"from": "IM", "to": "Violen. Escrita", "value": 16},
            {"from": "SM", "to": "Violen. Verbal", "value": 14},
            {"from": "SM", "to": "Violen. Fisica", "value": 14},
            {"from": "SM", "to": "Violen. Escrita", "value": 42},
        ]

        //chart.data = [
        //    { "from": "A", "to": "D", "value": 10 },
        //    { "from": "B", "to": "D", "value": 8 },
        //    { "from": "B", "to": "E", "value": 4 },
        //    { "from": "C", "to": "E", "value": 3 },
        //    { "from": "D", "to": "G", "value": 5 },
        //    { "from": "D", "to": "I", "value": 2 },
        //    { "from": "D", "to": "H", "value": 3 },
        //    { "from": "E", "to": "H", "value": 6 },
        //    { "from": "G", "to": "J", "value": 5 },
        //    { "from": "I", "to": "J", "value": 1 },
        //    { "from": "H", "to": "J", "value": 9 }
        //];

        chart.dataFields.fromName = "from";
        chart.dataFields.toName = "to";
        chart.dataFields.value = "value";
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
