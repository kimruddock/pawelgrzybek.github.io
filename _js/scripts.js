var jt = jt || {};
jt.nav = (function() {
  function mobileMenu() {
    document.querySelector('.header__trigger').addEventListener('click', function(e) {
      e.preventDefault();
      [].map.call(document.querySelectorAll('.about'), function(el) {
        el.classList.toggle('about--active');
      });
      [].map.call(document.querySelectorAll('.header__trigger'), function(el) {
        el.classList.toggle('header__trigger--active');
      });
    });
  }
  return {
      mobileMenu: mobileMenu
  };
})();
jt.nav.mobileMenu();