function karmaHelper(sub) {
	return new Promise((resolve, reject) => {
		fetch(`${window.location.protocol}//www.reddit.com/r/${sub}/hot.json?limit=100`)
			.then(r => r.json())
			.then(rr => {
				var results = new Array(24).fill(0);
				var topScore = 0, top = 0;
				
				rr.data.children.forEach( post => {
					results[ (new Date(post.data.created_utc * 1000)).getHours() ] += post.data.score;
				});
				
				results.forEach( (n, i) => {
					if (n > topScore) {
						topScore = n;
						top = i;
					}
				});
				
				resolve({ results: results, mean: mean(results), std: std(results), best: top, bestScore: topScore });
			})
			.catch(err => reject(err));
	});
}

function mean(arr) {
    return arr.reduce( (p, c) => p + c ) / arr.length;
}

function std(arr) {
	return Math.sqrt( mean( arr.map( n => Math.pow(n - mean(arr), 2) ) ) );
}

/* ------Example------ */
var sub = "pcmasterrace";

function handleSuccess(results) {
	console.log(results);
}

function handleError(err) {
	console.log(err);
}

karmaHelper(sub).then(handleSuccess).catch(handleError);
