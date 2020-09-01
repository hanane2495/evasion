window.addEventListener('load', function(){
    new Glider(document.querySelector('.glider'), {
      slidesToScroll: 1,
      slidesToShow: 4,
      draggable: true,
      dots: '.dots',
      arrows:{
          prev : '.glider-prev',
          next : '.glider-next'
      },
      

    })
  })

  // sticky navbar
  window.addEventListener('scroll', () => {
    const isTop = window.scrollY > 0;
    const nav = document.getElementById('nav');
    const navRight = document.getElementById('nav-right')
    if (isTop){
        nav.classList.add('scrolled');
        navRight.classList.replace('navbar-right','navbar-left')
    }else{
        nav.classList.remove('scrolled');
        navRight.classList.replace('navbar-left','navbar-right')
    }
})

  // banner slider managment
  const track = document.querySelector('.carousel-track')
  const slides = Array.from(track.children)
  const prevButton = document.querySelector('.carousel_button--down')
  const nextButton = document.querySelector('.carousel_button--up')
  const dotsNav = document.querySelector('.carousel-nav')
  const dots = Array.from(dotsNav.children)

  const slideHeight = slides[0].getBoundingClientRect().height

  //arrange the slides one to each other
  const setSlidePosition = (slide, index) => {
    slide.style.bottom = slideHeight * index + 'px';
  }
  slides.forEach(setSlidePosition)


  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateY(-'+targetSlide.style.bottom+')'
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
  }

  const updateDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
  }

  const showHideButton = (targetIndex, prevButton, nextButton, slides) =>{
    if(targetIndex === 0){
      prevButton.classList.add('is-hidden')
      nextButton.classList.remove('is-hidden')
    }else if(targetIndex === slides.length - 1){
      prevButton.classList.remove('is-hidden')
      nextButton.classList.add('is-hidden')
    }else{
      prevButton.classList.remove('is-hidden')
      nextButton.classList.remove('is-hidden')
    }
  }

  // when i click up slide move up 
  prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    updateDot(currentDot, prevDot)
    moveToSlide(track, currentSlide, prevSlide)
    showHideButton(prevIndex, prevButton, nextButton, slides)
  })

  // when i click down slides move down
  nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    updateDot(currentDot, nextDot)
    moveToSlide(track, currentSlide, nextSlide)
    showHideButton(nextIndex, prevButton, nextButton, slides)

  })

  // when i click the nav indicator move to that slide
  dotsNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button');

    if(!targetDot) return

    const currentSlide = track.querySelector('.current-slide')
    const currentDot = dotsNav.querySelector('.current-slide')
    const targetIndex = dots.findIndex( dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide)
    updateDot(currentDot, targetDot)
    showHideButton(targetIndex, prevButton, nextButton, slides)
    })

    //footer auto update copyright
    /*$(document).ready(function () {
      var a = (new Date().getFullYear()) ? new Date().getFullYear() : "2010"
      $("p.copyright").html("&copy; "+ a + " Monster studio");
    });*/