import {range, calculateHierarchy} from './data'
import $ from 'jquery'
import drawPie from './pie'
import drawTreemap from './treemap'


$(document).ready(function(){
    $.getJSON("/data.json", function(all){
    	let data = all['stats'];
    	let hierarchy = all['hierarchy'];
        let max = Math.max.apply(Math, Object.keys(data));
        let min = Math.min.apply(Math, Object.keys(data));
        let subset = range(data, min, max);

        google.charts.load('current', {'packages':['corechart', 'treemap']});
        google.charts.setOnLoadCallback(function(){drawCharts(subset)})
		setText(min, max)

	    function getVals(){
            // Get slider values
            let parent = this.parentNode;
            let slides = parent.getElementsByTagName("input");
            let new_min = parseFloat(slides[0].value);
            let new_max = parseFloat(slides[1].value);

            // Neither slider will clip the other, so make sure we determine which is larger
            if( new_min > new_max ){ let tmp = new_max; new_max = new_min; new_min = tmp; }
			setText(new_min, new_max);
            subset = range(data, new_min, new_max);
            drawCharts(subset);

        }

		function setText(min, max){
            let displayElement = document.getElementsByClassName("rangeValues")[0];
            let minLink = `<a href=https://www.discogs.com/search/?genre_exact=Electronic&type=release&year=${min}" target="_blank">${min}</a>`
            let maxLink = `<a href=https://www.discogs.com/search/?genre_exact=Electronic&type=release&year=${max}" target="_blank">${max}</a>`
		    let text = `Now exploring years ${minLink} - ${maxLink} in Electronic Music`;
            displayElement.innerHTML = text;
		}

        function drawCharts(subset){
        	drawPie(subset['styles']);
        	let treemap_data = calculateHierarchy(subset['styles'], hierarchy);
        	drawTreemap(treemap_data);
        }

        let sliderSections = document.getElementsByClassName("range-slider");

        for( let i = 0; i < sliderSections.length; i++ ){
            let sliders = sliderSections[i].getElementsByTagName("input");

            for( let j = 0; j < sliders.length; j++ ){
                if( sliders[j].type === "range" ){
                    sliders[j].max = max;
                    sliders[j].min = min;
                    sliders[j].value = j === 0 ? min : max;
                    sliders[j].oninput = getVals;
                }
	        }
        }
    })

})

