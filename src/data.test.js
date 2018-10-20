import range from './data'

let test_data = {
  1999: {
	  "countries": {
		  "Europe": 1,
		  "US": 1,
	  },
	  "genres": {
		  "Electronic": 3,
		  "Funk / Soul": 1,
		  "Hip Hop": 1
	  },
	  "styles": {
		  "Hip Hop": 1,
		  "House": 2,
	  }
  },
  2000: {
	  "countries": {
		  "Europe": 2,
		  "US": 1,
	  },
	  "genres": {
		  "Electronic": 2,
		  "Funk / Soul": 1,
		  "Hip Hop": 1
	  },
	  "styles": {
		  "Hip Hop": 1,
		  "House": 2,
	  }
  },
	2001: {
	  "countries": {
		  "Europe": 2,
		  "US": 1,
	  },
	  "genres": {
		  "Electronic": 2,
		  "Funk / Soul": 1,
		  "Hip Hop": 1
	  },
	  "styles": {
		  "Hip Hop": 1,
		  "House": 2,
	  }
  }
}

let result_one = {
    "countries": {
        "Europe": 3,
        "US": 2,
    },
    "genres": {
        "Electronic": 5,
        "Funk / Soul": 2,
        "Hip Hop": 2
    },
    "styles": {
        "Hip Hop": 2,
        "House": 4,
    }
}

let result_two = {
    "countries": {
        "Europe": 5,
        "US": 3,
    },
    "genres": {
        "Electronic": 7,
        "Funk / Soul": 3,
        "Hip Hop": 3
    },
    "styles": {
        "Hip Hop": 3,
        "House": 6,
    }
}

test('Correctly calculates a range of data', () => {
    expect(range(test_data, 1999, 2000)).toEqual(result_one);
    expect(range(test_data, 1999, 2001)).toEqual(result_two);
});