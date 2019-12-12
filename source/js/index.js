const pageHeader = document.querySelector('.page-header');
const pageHeaderToggle = pageHeader.querySelector('.page-header__toggle');
const pageHeaderContactsOrder = pageHeader.querySelector('.page-header__contacts-order');
const modalCall = document.querySelector('.modal--call');
const modalClose = modalCall.querySelector('.modal__cross');
const modalOverlay = document.querySelector('.modal-overlay');
const introOrderButton = document.querySelector('.intro__order-button');

const onMenuClick = () => {
  if (pageHeader.classList.contains('page-header--closed')) {
    pageHeader.classList.remove('page-header--closed');
    pageHeader.classList.add('page-header--opened');
  }
  else {
    pageHeader.classList.add('page-header--closed');
    pageHeader.classList.remove('page-header--opened');
  }
};

const onCloseButtonClick = () => {
  modalCall.classList.remove('modal__opened');
  modalOverlay.classList.remove('modal-overlay__show');
  modalClose.removeEventListener('click', onCloseButtonClick);
  modalOverlay.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onModalEscPress);
  pageHeaderContactsOrder.addEventListener('click', onContactsButtonClick);
  introOrderButton.addEventListener('click', onContactsButtonClick);
};

const onContactsButtonClick = (evt) => {
  evt.preventDefault();
  modalCall.classList.add('modal__opened');
  modalOverlay.classList.add('modal-overlay__show');
  pageHeaderContactsOrder.removeEventListener('click', onContactsButtonClick);
  introOrderButton.removeEventListener('click', onContactsButtonClick);
  modalClose.addEventListener('click', onCloseButtonClick);
  modalOverlay.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onModalEscPress);
};

const onModalEscPress = (evt) => {
  if (evt.keyCode === 27) {
    onCloseButtonClick();
  }
}

pageHeaderToggle.addEventListener('click', onMenuClick);
pageHeaderContactsOrder.addEventListener('click', onContactsButtonClick);
introOrderButton.addEventListener('click', onContactsButtonClick);
