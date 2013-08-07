$(document).ready(function(){

	//mover el sistema de coordenadas al centro del elemento
	var
	$container = $('.knob-slider'),
	$kCircle = $('.knob-circle'),
	distanciaTop = $container.offset().top,
	distanciaLeft = $container.offset().left,
	anchoContenedor = $container.outerWidth()/2,
	altoContenedor = $container.outerHeight()/2,
	centerX = distanciaLeft + anchoContenedor,
	centerY = distanciaTop + altoContenedor;

	//Lo otro
	var
	$knob = $('.knob'),
	knobHeight = $knob.outerHeight()/2,
	knobWidth = $knob.outerWidth()/2,
	knobPosX = -knobWidth,
	knobPosY = altoContenedor-knobHeight,
	$dragging = null;

	var init = function () {
		rotateKnob(45);
		slideCircle(0);

		$kCircle.addClass('green-glow');
		$knob.css('transformOrigin', anchoContenedor+'px '+altoContenedor+'px');
	};

	var calculatePolar = function (valX, valY) {
		var
		x = valX,
		y = valY,
		theta = Math.atan(y/x)*360/2/Math.PI;

		if (x >= 0 && y >= 0) {
			theta = theta;
		} else if (x < 0 && y >= 0) {
			theta = 180 + theta;
		} else if (x < 0 && y < 0) {
			theta = 180 + theta;
		} else if (x > 0 && y < 0) {
			theta = 360 + theta;
		}

		return theta;

	};

	var slideCircle = function (deg) {
		$('.circle').css({
			'transform': 'translate3d(-500px,0,0)'
		});

		$kCircle.attr('class', 'knob-circle');

		if(deg >= 0 && deg < 90) {
			$kCircle.addClass('green-glow');
			$('.circle:nth-child(1)').css({
				'transform': 'translate3d(0,0,0)',
				opacity: 1
			});
			$('.circle:nth-child(2)').css({
				'transform': 'translate3d(500px,0,0)',
				opacity: 0
			});
		} else if(deg >= 90 && deg < 180) {
			$kCircle.addClass('red-glow');
			$('.circle:nth-child(2)').css({
				'transform': 'translate3d(0,0,0)',
				opacity: 1
			});
			$('.circle:nth-child(3)').css({
				'transform': 'translate3d(500px,0,0)',
				opacity: 0
			});
		} else if(deg >= 180 && deg < 270) {
			$kCircle.addClass('blue-glow');
			$('.circle:nth-child(3)').css({
				'transform': 'translate3d(0,0,0)',
				opacity: 1
			});
			$('.circle:nth-child(4)').css({
				'transform': 'translate3d(500px,0,0)',
				opacity: 0
			});
		} else if(deg >= 270 && deg < 360) {
			$kCircle.addClass('purple-glow');
			$('.circle:nth-child(4)').css({
				'transform': 'translate3d(0,0,0)',
				opacity: 1
			});
			$('.circle:nth-child(1)').css({
				'transform': 'translate3d(500px,0,0)',
				opacity: 0
			});
		}
	};

	var rotateKnob = function (deg) {
		$knob.css('transform','rotate('+deg+'deg) translate('+knobPosX+'px, '+knobPosY+'px)');
	};

	document.onselectstart = function () { return false; };
  
	$(document.body).on('mousemove', function(e) {
		var
		newPageX = -1 * (e.pageX - centerX),
		newPageY = -1 * (e.pageY - centerY);

		if ($dragging) {
			var
			deg = Math.floor(calculatePolar(newPageX, newPageY));
      
      $('.instructions').fadeOut('fast');

			rotateKnob(deg);
			slideCircle(deg);
		}
	});

	$(document.body).on('mousedown', '.knob', function (e) {
		$dragging = $(e.target);
		$knob.addClass('grab');
	});

	$(document.body).on('mouseup', function () {
		$dragging = null;
		$knob.removeClass('grab');
	});

	$kCircle.on('click', function(e) {
		var
		newPageX = -1 * (e.pageX - centerX),
		newPageY = -1 * (e.pageY - centerY),
		deg = Math.floor(calculatePolar(newPageX, newPageY));

		rotateKnob(deg);
		slideCircle(deg);

		e.preventDefault();
	});

	init();

});