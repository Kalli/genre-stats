
/**
 * Calculates totals for a subset of keys in an object
 *
 * @param {object} data     The data object we want to calculate the range for
 * @param {number} start    the start of the range
 * @param {number} end      The end of a range
 * @returns {object}        An object containing the sums of all the objects within the range
 */
export function range(data, start, end){

	let filtered = Object.keys(data)
		.filter( key => (key >= start && key <= end))
		.reduce( (res, key) => Object.assign(res, { [key]: data[key] }), {} )
	let result = {}

	// todo: this is a mess, figure out a more elegant, functional way
	Object.values(filtered).forEach(function(year){
		Object.keys(year).forEach(function(attribute){
            if (result.hasOwnProperty(attribute)){
                for (let entry in year[attribute]){
					if (year[attribute].hasOwnProperty(entry)){
						if (result[attribute].hasOwnProperty(entry)){
							result[attribute][entry] = result[attribute][entry] + year[attribute][entry];
						}else{
							result[attribute][entry] = year[attribute][entry];
						}
					}
				}
			}else{
				result[attribute] = Object.assign({}, year[attribute]);
	        }
		})
	})
	return result;
}


/**
 * Combines style stats based on hierarchical structure
 *
 * @param {object} styles       All styles
 * @param {number} hierarchy    The hierarchical structure of styles
 * @returns {object}            An array of arrays: [style, parent, count]
 */
export function calculateHierarchy(styles, hierarchy){
	let result = [
		['All', null, 0]
	];

	Object.keys(hierarchy).forEach(function(parent){
		// push the parent entries
		// get rid of cycles for instances where child is named the same as the parent... todo fix
		let p = parent + " ";
		result.push([p, 'All', 0]);
	})

	Object.keys(styles).forEach(function(style){
		Object.keys(hierarchy).forEach(function(parent){
			if (hierarchy[parent].includes(style)){
				let p = parent + " ";
				result.push([style, p, styles[style]])
			}
		})
	})

	return result;
}