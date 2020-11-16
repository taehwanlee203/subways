$(document).ready(function () {

  /* 드롭다운 */
	$('.gnb > ul > li').on('mouseenter', function () {
    $('.snb').css('display', 'block');
    $('.snb').stop().animate({'opacity': '1', 'top': '0'}, 300);
    $('header').stop().animate({'height': '400px'}, 300);
	});

	$('.gnb').on('mouseleave', function () {
    $('header').stop().animate({'height': '175px'}, 300);
    $('.snb').stop().animate({'opacity': '0', 'top': '-20px'}, 300, function() {
      $('.snb').css('display', 'none'); 
    });	
  });

  /* banner */
	const banner = $('.main > .banner');

	$(banner).find('h2').animate({ 'opacity': '1', 'top': '0' }, 700);
	$(banner).find('p').delay(300).animate({ 'opacity': '1', 'top': '0' }, 700);
  $(banner).find('.img').delay(300).animate({ 'opacity': '1', 'top': '0' }, 700);
  
  /* sub header */
	const subHeader = $('.main > .sub-header');
	const subTop = $(subHeader).find('.top');
	const subHeaderTop = $(subHeader).offset().top;

	function scrollSubHeader() {
		$(window).on('scroll', function () {
			const scroll = $(window).scrollTop();

			if (scroll > subHeaderTop) {
				$(subHeader).addClass('fixed');
			} else {
				$(subHeader).removeClass('fixed');
			}
		});
	};

	$(subTop).on('click', function () {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 1000);
	});

  scrollSubHeader();
  

	/* menu hover */
  let menu = $('#menu ul > li');
  
  function menuDetailShow(event) {
		const target = event.currentTarget;
		const menuKoTitle = $(target).find('.ko_title');
		const menuEnTitle = $(target).find('.en_title');
		const menuDesc = $(target).find('.desc');
		const menuMore = $(target).find('.icon');

		$(menuKoTitle).stop().animate({ 'top': '50px' }, 400);
		$(menuEnTitle).stop().animate({ 'top': '95px' }, 400);
		$(menuDesc).stop().animate({ 'top': '125px', 'opacity': '1' }, 500);
		$(menuMore).stop().animate({ 'bottom': '30px', 'opacity': '1' }, 300);
	}

	function menuDetailHide(event) {
		const target = event.currentTarget;
		const menuKoTitle = $(target).find('.ko_title');
		const menuEnTitle = $(target).find('.en_title');
		const menuDesc = $(target).find('.desc');
		const menuMore = $(target).find('.icon');

		$(menuKoTitle).stop().animate({ 'top': '100px' });
		$(menuEnTitle).stop().animate({ 'top': '145px' });
		$(menuDesc).stop().animate({ 'top': '200px', 'opacity': '0' });
		$(menuMore).stop().animate({ 'bottom': '100px', 'opacity': '0' });
	}

	$(menu).on('mouseenter', menuDetailShow);

	$(menu).on('mouseleave', menuDetailHide);


  /* menu */
	const menuTab = $('#menu-tab ul > li');

	$(menuTab).on('click', function (e) {
		const currentTarget = e.currentTarget;
		const menuName = $(currentTarget).data('menu');

		$(menuTab).removeClass('active');
		$(currentTarget).addClass('active');

		menu = $('#menu ul > li');
		$(menu).stop().animate({ 'opacity': '0' }, function () {
			$(menu).css('display', 'none');

			if (menuName === 'all') {
				$(menu).stop().css('display', 'block').animate({ 'opacity': '1' });
			} else {
				$(`.${menuName}`).stop().css('display', 'block').animate({ 'opacity': '1' });
			}
		});
	});

});