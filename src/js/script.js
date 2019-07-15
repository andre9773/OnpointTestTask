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




	wrap = document.getElementById("wrap");
	pagination__dots = document.getElementsByClassName("pagination__dot");
	slideCount = Math.abs(positionSector/100);



	function scrolUp() {
		if (positionSector >= -100) {
			positionSector -=100;
			document.getElementById("page").style.transform = 'translateY(' + positionSector + 'vh)';
			
			slideCount = Math.abs(positionSector/100);
			pagination__dots[slideCount-1].classList.remove("pagination__dot-active");
			pagination__dots[slideCount].classList.add("pagination__dot-active");

			if (positionSector == -200) {
				wrap.classList.remove("slideUpUp");
				wrap.classList.add("slideDownDown");
				document.getElementById("next").style.cssText = 'transition: 1s; opacity: 0';
			}else{
			console.log("scrolUp");
			wrap.classList.remove("slideDownUp");
			wrap.classList.add("slideUpUp");
		}
		}
	}
	function scrolDown() {
		if (positionSector < 0) {
			positionSector +=100;
			
			slideCount = Math.abs(positionSector/100);
			pagination__dots[slideCount+1].classList.remove("pagination__dot-active");
			pagination__dots[slideCount].classList.add("pagination__dot-active");

			document.getElementById("page").style.transform = 'translateY(' + positionSector + 'vh)';
			document.getElementById("next").style.cssText = 'transition: 1s; opacity: 1';

			if (positionSector == -100) {
				wrap.classList.remove("slideDownDown");
				wrap.classList.add("slideUpDown");
			}else{
			wrap.classList.remove("slideUpUp", "slideUpDown");
			wrap.classList.add("slideDownUp");
			}
		}
	}
