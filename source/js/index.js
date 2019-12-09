var pageHeader = document.querySelector('.page-header');
var pageHeaderToggle = pageHeader.querySelector('.page-header__toggle');

pageHeaderToggle.addEventListener('click', function() {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
  }
  else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--opened');
  }
});
