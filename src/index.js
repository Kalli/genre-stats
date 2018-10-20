import range from './data'
import $ from 'jquery'


$(document).ready(function(){
    $.getJSON("/data.json", function(data){
        let max = Math.max.apply(Math, Object.keys(data));
        let min = Math.min.apply(Math, Object.keys(data));
        let subset = range(data, max, min);

        function getVals(){
            // Get slider values
            let parent = this.parentNode;
            let slides = parent.getElementsByTagName("input");
            let slide1 = parseFloat( slides[0].value );
            let slide2 = parseFloat( slides[1].value );
            // Neither slider will clip the other, so make sure we determine which is larger
            if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
            let displayElement = parent.getElementsByClassName("rangeValues")[0];
            displayElement.innerHTML = slide1 + " - " + slide2;
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
                    // Manually trigger event first time to display values
                    sliders[j].oninput();
                }
	        }
        }
    })

})

