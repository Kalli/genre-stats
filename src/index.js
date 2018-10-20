import range from './data'
import $ from 'jquery'
import drawPie from './pie'


$(document).ready(function(){
    $.getJSON("/data.json", function(all){
    	let data = all['stats'];
        let max = Math.max.apply(Math, Object.keys(data));
        let min = Math.min.apply(Math, Object.keys(data));
        let subset = range(data, min, max);

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(function(){drawPie(subset['styles'])})
		$('.rangeValues').text(min + " - " + max);

	    function getVals(){
            // Get slider values
            let parent = this.parentNode;
            let slides = parent.getElementsByTagName("input");
            let new_min = parseFloat( slides[0].value );
            let new_max = parseFloat( slides[1].value );

            // Neither slider will clip the other, so make sure we determine which is larger
            if( new_min > new_max ){ let tmp = new_max; new_max = new_min; new_min = tmp; }

            let displayElement = parent.getElementsByClassName("rangeValues")[0];
            displayElement.innerHTML = new_min + " - " + new_max;
            subset = range(data, new_min, new_max);
            drawPie(subset['styles']);

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

