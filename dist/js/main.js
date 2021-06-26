"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(function () {
  var shoresList = $('.shores-list')[0].children,
      shoresItems = [].concat(_toConsumableArray($('.shore-active')), _toConsumableArray($('.shore-name')), _toConsumableArray($('.shore-path'))),
      surfMapDots = $('.surf-location__dot'); // Hero slider

  $('.hero-slick-slider').slick({
    infinite: true,
    fade: true,
    prevArrow: $('.hero-prev-arrow'),
    nextArrow: $('.hero-next-arrow')
  });
  $('.hero-slick-slider').on('afterChange', function (slick, currentSlide) {
    for (var i = 0; i < shoresList.length; i++) {
      if (i === currentSlide.currentSlide) {
        shoresList[i].classList.add('shores-item_active');
      } else {
        shoresList[i].classList.remove('shores-item_active');
      }
    }

    for (var _i = 0; _i < shoresItems.length; _i++) {
      shoresItems[_i].classList.remove('show');

      if (_i === shoresItems.length - 1) {
        shoresItems[currentSlide.currentSlide].classList.add('show');
        shoresItems[currentSlide.currentSlide + 4].classList.add('show');
        shoresItems[currentSlide.currentSlide + 8].classList.add('show');
      }
    }
  }); // Surf slider

  $('.surf-slick-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.surf-prev-arrow'),
    nextArrow: $('.surf-next-arrow')
  }); // TODO:

  $('.surf-slick-slider').on('afterChange', function (slick, currentSlide) {
    for (var i = 0; i < surfMapDots.length; i++) {
      surfMapDots[i].parentElement.classList.remove('surf-location_active');
    }

    surfMapDots[currentSlide.currentSlide].parentElement.classList.add('surf-location_active');
  });

  for (var i = 0; i < surfMapDots.length; i++) {
    surfMapDots[i].addEventListener('click', function (event) {
      for (var _i2 = 0; _i2 < surfMapDots.length; _i2++) {
        surfMapDots[_i2].parentElement.classList.remove('surf-location_active');
      }

      event.target.parentElement.classList.add('surf-location_active');
      $('.surf-slick-slider').slick('slickGoTo', event.target.parentElement.dataset.number, false);
    });
  }
});