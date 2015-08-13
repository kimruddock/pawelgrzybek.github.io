var more = document.querySelector('.header__more');
var about = document.querySelector('.about');

more.addEventListener('click', function() {
  about.classList.toggle('about--active');
  more.classList.toggle('header__more--active');
}, false);
