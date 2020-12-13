	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.fillStyle = 'pink';
	context.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);


	context.scale(20, 20);

	let tetramino = [
		[0,1,1],
		[1,1,0]
	];

	let spawnPointX = 4;
	let spawnPointY = 0;

		

	function drower(tetramino, posX, posY) {
		console.log(posY);
			tetramino.forEach((y, iy) => {
					y.forEach((x, ix) => {
						if (x === 0) {
						} else {
							context.fillStyle = 'blue'; 
							context.fillRect(ix + posX, iy + posY, 1, 1)
						}
					})
				})  

		
	}

	document.addEventListener('keyup', startKey);

	function startKey(e) {
		console.log.textContent += ` ${e.keyCode}`;
		if (e.keyCode === 13) {
			gameLoopStart(spawnPointY, spawnPointX)
		}
	  }

	  function gameLoopStart(){
		  
			setInterval(dropper, 500);
	  }

	  function dropper() {
		spawnPointY ++;

		drower(tetramino, spawnPointX, spawnPointY);
	  }