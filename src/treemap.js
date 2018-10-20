export default function drawTreemap(styles) {
	let data = google.visualization.arrayToDataTable([['Style', 'Parent', 'Number of Releases'], ...styles]);

	let tree = new google.visualization.TreeMap(document.getElementById('treemap'));

	tree.draw(data, {
		minColor: '#468966',
		midColor: '#FFF0A5',
		maxColor: '#FFB03B',
		headerHeight: 15,
		fontColor: 'black',
		showScale: true,
	    generateTooltip: showStaticTooltip
	});

    function showStaticTooltip(row) {
    	let style = data.getValue(row, 0);
    	let link = `https://www.discogs.com/style/${style}`;
        return `<div class="treemap-tooltip"> Browse <a target="_blank" href="${link}">${style}</a> on Discogs</div>`;
    }
}