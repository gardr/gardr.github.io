/*(function () {
  var elements = [].slice.call(document.querySelectorAll( 'code' ),0);

  function getLang (el) {
    if (!el) { return null; }
    var lang = el.getAttribute('data-lang');
    return lang || getLang(el.parentElement);
  }

  elements.forEach(function (el) {
    var lang = getLang(el);
    var text = el.innerHTML;
  });
  console.log(elements);
})();
*/
