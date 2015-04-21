var jt = jt || {};
jt.nav = (function() {
  function mobileMenu() {
    document.querySelector('.trigger').addEventListener('click', function(e) {
      e.preventDefault();
      [].map.call(document.querySelectorAll('.about'), function(el) {
        el.classList.toggle('about--active');
      });
      [].map.call(document.querySelectorAll('.trigger'), function(el) {
        el.classList.toggle('trigger--active');
      });
    });
  }
  return {
      mobileMenu: mobileMenu
  };
})();
jt.nav.mobileMenu();