$(document).ready(function () {

    //    마우스 올렸을 때
    $('.gnb > ul > li').on('mouseenter', function () {
        $('.snb').css({ 'display': 'inline-block' });
        $('header').stop().animate({ 'height': '405px' });
        $('.snb').stop().animate({ 'opacity': '1' });




        // $('.snb').stop().animate({
        //     'opcity' : '1'
        // }, 300);
    });

    // 마우스 내렸을 때
    $('.gnb > ul > li').on('mouseleave', function () {

        $('header').stop().animate({ 'height': '175px' });
        $('.snb').stop().animate({ 'opacity': '0' }, 300, function () {
            $('.snb').css({ 'display': 'none' });
        });


    });

    // banner

    var banner = $('.main > .banner');

    banner.find('h2').animate({ 'opacity': '1', 'top': '0' }, 600);
    banner.find('p').delay(300).animate({ 'opacity': '1', 'top': '0' }, 600);
    banner.find('.img').delay(300).animate({ 'opacity': '1', 'top': '0' }, 600);

    // sub header 

    var subheader = $('.main > .sub-header');
    var subtop = subheader.find('.top');
    var subheadertop = subheader.offset().top;

    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        //
        if (scroll > subheadertop) {
            subheader.addClass('fixed');
        } else {
            subheader.removeClass('fixed');
        }

    });
    subtop.on('clock', function () {
        $('html, body').stop().animate({
            'scrollTop': '0'
        }, 1000);
    })

    // menu 설명 보기
    var menu = $('#menu ul > li');

    const menuShow = (event) => {
        menu.on('mouseenter', function (event) {
            var target = event.currentTarget;
    
            $(target).find('.ko_title').stop().animate({ 'top': '50px' }, 400);
            $(target).find('.en_title').stop().animate({ 'top': '95px' }, 400);
            $(target).find('.desc').stop().animate({ 'top': '125px', 'opacity': '1' }, 500);
            $(target).find('.icon').stop().animate({ 'bottom': '30px', 'opacity': '1' }, 300);
        });
    }

    const menuHide = (event) => {
        menu.on('mouseleave', function (event) {
            var target = event.currentTarget;
    
            $(target).find('.ko_title').stop().animate({ 'top': '100px' });
            $(target).find('.en_title').stop().animate({ 'top': '145px' });
            $(target).find('.desc').stop().animate({ 'top': '200px', 'opacity': '0' });
            $(target).find('.icon').stop().animate({ 'bottom': '100px', 'opacity': '0' });
        });
    }
    
    var menuTab = $('#menu-tab ul > li');

    menuTab.on('click', function (event) {
        var target = event.currentTarget;

        var menuName = $(target).data('menu');

        menuTab.removeClass('active');
        $(target).addClass('active');

        $(menu).stop().animate({
            'opacity': '0'
        }, 300, function () {
            $(menu).css({ 'display': 'none' })

            if (menuName === 'all') {
                $(menu).stop().css({ 'display': 'block' }).animate({
                    'opacity': '1'
                });
            } else {
                // $('.' + menuName) //ES5 방법
                // $(`.${nemuName}`) //ES6 방법
                $(`.${menuName}`).stop().css({'display' : 'block'}).animate({'opacity' : '1'
            });
            }
        });

        
        //ES5
        //ES6 - 요즘 쓰는 문법
    });

    const getSandwich = () => {

        return fetch('http://localhost:3000/subway/sandwich', {
            'method' : 'GET',
            'headers' : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res)
        .then(res => res.json())
    }
    
    const templateSandwichLabel = (label) => {
        if(label) {
            return `<div class="label">${label}</div>`;
        } else {
            return ``;
        }
    }

    const templateSandwichKcal = (kcal) => {
        if(kcal) {
            return `<span class="kcal">${kcal}</span>`;
        } else {
            return ``;
        }
    }

    const templateSandwich = (sandwich) => {
        const {type, label, img, ko_title, en_title, kcal, summary, view_id} = sandwich;  // = const ko_title = sandwich['ko_titlle'];

        return `
        <li class="${type}">
        <a href="#">
            ${templateSandwichLabel(label)}
            <div class="img">
                <img src="${img}" alt="${ko_title}">
            </div>
            <strong class="ko_title">${ko_title}</strong>
            <span class="en_title">${en_title}</span>
            ${templateSandwichKcal(kcal)}
            <p class="desc">${summary}</p>
            <div class="icon" data-id="${view_id}"></div>
        </a>
        </li>
        
        `;
    }

    const listSandwich = async () => {
        
        const sandwiches = await getSandwich();

        // sandwiches.then((data) => {
        //     console.log(data)
        // })

        const menu = document.getElementById('menu');
        const menuWrap = menu.querySelector('ul');


        for (const sandwich of sandwiches) {
            const node = $(templateSandwich(sandwich))[0];
            $(node).on('mouseenter', menuShow);
            $(node).on('mouseleave', menuHide);
            menuWrap.append(node);

        }

    }

    listSandwich();

});
