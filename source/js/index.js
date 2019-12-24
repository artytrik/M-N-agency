const pageHeader = document.querySelector('.page-header');
const pageHeaderToggle = pageHeader.querySelector('.page-header__toggle');
const pageHeaderContactsOrder = pageHeader.querySelector('.page-header__contacts-order');
const modalCall = document.querySelector('.modal--call');
const modalClose = modalCall.querySelector('.modal__cross');
const modalOverlay = document.querySelector('.modal-overlay');
const introOrderButton = document.querySelector('.intro__order-button');
const modalForm = modalCall.querySelector('.modal__form');
const modalInput = modalForm.querySelectorAll('.modal__input');
const modalSuccess = document.querySelector('.modal-success');
const modalSuccessClose = modalSuccess.querySelector('.modal-success__cross');

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
  modalInput.forEach((input) => input.value = "");
  modalCall.classList.remove('modal__opened');
  modalOverlay.classList.remove('modal-overlay__show');
  modalClose.removeEventListener('click', onCloseButtonClick);
  modalOverlay.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onModalEscPress);
  pageHeaderContactsOrder.addEventListener('click', onContactsButtonClick);
  introOrderButton.addEventListener('click', onContactsButtonClick);
};

const onSendSuccess = () => {
  modalCall.classList.remove('modal__opened');
  modalSuccess.classList.add('modal-success__opened');
  modalClose.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onModalEscPress);
  modalSuccessClose.addEventListener('click', onCloseSuccess);
  modalOverlay.removeEventListener('click', onCloseButtonClick);
  modalOverlay.addEventListener('click', onCloseSuccess);
};

const onCloseSuccess = () => {
  modalSuccess.classList.remove('modal-success__opened');
  modalSuccessClose.removeEventListener('click', onCloseSuccess);
  modalOverlay.removeEventListener('click', onCloseSuccess);
  pageHeaderContactsOrder.addEventListener('click', onContactsButtonClick);
  introOrderButton.addEventListener('click', onContactsButtonClick);
  modalOverlay.classList.remove('modal-overlay__show');
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

$("#form").submit(function (e) { // Устанавливаем событие отправки для формы с id=form
  e.preventDefault();
   var form_data = $(this).serialize();
   console.log(form_data); // Собираем все данные из формы
   $.ajax({
       type: "POST", // Метод отправки
       url: "send.php", // Путь до php файла отправителя
       data: form_data,
       dataType: 'json', // what type of data do we expect back from the server
       encode: true
   })
   .done(function(data) {
    console.log(data);
    onSendSuccess();
   });
});

$(function(){
  $('a[href^="#"]').on('click', function(event) {
    // отменяем стандартное действие
    event.preventDefault();

    var sc = $(this).attr("href"),
        dn = $(sc).offset().top;
    /*
    * sc - в переменную заносим информацию о том, к какому блоку надо перейти
    * dn - определяем положение блока на странице
    */

    $('html, body').animate({scrollTop: dn}, 1000);

    /*
    * 1000 скорость перехода в миллисекундах
    */
  });
});
