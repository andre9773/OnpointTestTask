 	var sX,sY,
		dX,dY,
		positionSector = 0,timer = true;


	window.addEventListener('wheel',
		function(e) {
			if(timer == true){
				timer = false;
			if (e.deltaY > 0) {
				scrolUp();
			}else{
				scrolDown();
			} 
			setTimeout(function time() {
				timer = true
			},500)}
		})
	
	


	window.addEventListener('touchstart', function(e) {
			var tchs = e.changedTouches[0];
			swdir = 'none';
			sX = tchs.pageX;
			sY = tchs.pageY;
		}, false);

	window.addEventListener('touchend', function(e) {
			var tchs = e.changedTouches[0];
			dX = tchs.pageX;
			dY = tchs.pageY;
			if(timer == true){
				timer = false;
				if (sY>dY) {
					scrolUp();
				}else{
					scrolDown();
				} 
				setTimeout(function time() {
					timer = true
				},300)}
			}, false);
	function scrolUp() {
		if (positionSector >= -100) {
			positionSector -=100;
			document.getElementById("page").style.transform = 'translateY(' + positionSector + 'vh)';
		}
	}
	function scrolDown() {
		if (positionSector < 0) {
			positionSector +=100;
			document.getElementById("page").style.transform = 'translateY(' + positionSector + 'vh)';
		}
	}