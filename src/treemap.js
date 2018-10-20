export default function drawTreemap(styles) {
	let data = google.visualization.arrayToDataTable([['Style', 'Parent', 'Number of Releases'], ...styles]);

	let tree = new google.visualization.TreeMap(document.getElementById('treemap'));

	tree.draw(data, {
		minColor: '#468966',
		midColor: '#FFF0A5',
		maxColor: '#FFB03B',
		headerHeight: 15,
		fontColor: 'black',
		showScale: true
	});

}