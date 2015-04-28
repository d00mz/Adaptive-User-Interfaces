
$(document).ready(function() {
				
		setTimeout(function() {
			$("#cd-handle").addClass("wiggle");
			$("#cd-handle").css("display", "block");
			$("#picTop").addClass("wigglePic");
		},800);
		
		var posYraw;

		var panelHeightRaw = $( "#main" ).height();

		var panelHeight = panelHeightRaw / 2;

		var posY;

		var percent = posY / panelHeight * 100 

		var myElement = document.getElementById('cd-handle');

		var panCount = 0;

		var imagesTop =    new Array("img/3.jpg","img/5.jpg","img/7.jpg");
		var imagesBottom = new Array("img/4.jpg","img/6.jpg","img/8.jpg");

		var attribute = [];

		// create a simple instance
		// by default, it only adds horizontal recognizers
		var mc = new Hammer(myElement);

		// let the pan gesture support all directions.
		// this will block the vertical scrolling on a touch-device while on the element
		mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		// listen to events...
		/*
		mc.on("panup", function(ev) {
		    myElement.textContent = ev.type +" gesture detected.";
		});
		*/
		mc.on('panend pancancel', function(ev) {
			//Attributwerte werden in das Array geladen
			var bottomPicValue = $("#percentTop").text().split('%')[0];
			attribute.push(bottomPicValue);
			var topPicValue = $("#percentBottom").text().split('%')[0];
			attribute.push(topPicValue);
			/*alert(attribute[panCount]);*/

			setTimeout(function() {
				$("#cd-handle").addClass("cd-locked");
					setTimeout(function() {
						$("#picTop").css("background-image","url('" + imagesTop[panCount] + "')");
						$("#picBottom").css("background-image","url('" + imagesBottom[panCount] + "')");
						$("#cd-handle").removeClass("cd-locked");
						$("#cd-handle, #picTop, #picBottom").addClass("resetanimation");
						$("#cd-handle").css("top", "50%");
						$("#picTop").css("height", "50%");
						$("#picBottom").css("height", "50%");
							setTimeout(function() {
							$("#cd-handle, #picTop, #picBottom").removeClass("resetanimation");
					},500);
				},2000);
				panCount += 1;
			},2000);
		});

		mc.on('panup pandown', function(ev) {
		    console.log(ev);
		    posYraw = ev.deltaY;
		    posY = panelHeight + posYraw;
		    posY2 = panelHeight - posYraw;

		    percentTop = posY / panelHeightRaw * 100;
		    percentTopRounded = Math.ceil(percentTop);
		    percentBottom = (1 - posY / panelHeightRaw) * 100;
		    percentBottomRounded = Math.ceil(percentBottom);

		    $( "#percentTop span" ).text(percentTopRounded + "%");
		    $( "#percentBottom span" ).text(percentBottomRounded + "%");

			$( "#cd-handle" ).css("top", posY);
			$( "#picTop" ).css("height", posY);
			$( "#picBottom" ).css("height", posY2);
		});	
	});