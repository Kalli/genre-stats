export default function drawPie(styles) {
	let a = [['Style', 'Number of releases']];
	Object.keys(styles).forEach(function(key){
		a.push([key, styles[key]])
	})

	let dataTable = google.visualization.arrayToDataTable(a);

	let options = {
		title: 'Styles'
	};

	let chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(dataTable, options);
}