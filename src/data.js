
/**
 * Calculates totals for a subset of keys in an object
 *
 * @param {object} data     The data object we want to calculate the range for
 * @param {number} start    the start of the range
 * @param {number} end      The end of a range
 * @returns {object}        An object containing the sums of all the objects within the range
 */
export default function range(data, start, end){

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