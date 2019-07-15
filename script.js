"use-strict";

const multiItemSlider = (() => {
    return (selector, config) => {
        let _mainElement = document.querySelector(selector);
        let _sliderWrapper = _mainElement.querySelector(".slider__wrapper");
        let _sliderItems = _mainElement.querySelectorAll(".slider__item");
        let _sliderControls = _mainElement.querySelectorAll(".slider__control");
        let _sliderControlLeft = _mainElement.querySelector(
            ".slider__control_left"
        );
        let _sliderControlRight = _mainElement.querySelector(
            ".slider__control_right"
        );
        let _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
        let _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
        _positionLeftItem = 0;
        _transform = 0;
        _step = (_itemWidth / _wrapperWidth) * 100;
        _items = [];
        _sliderItems.forEach((item, index) => {
            _items.push({ item, position: index, transform: 0 });
        });
        let = position = {
            getMin: 0,
            getMax: _items.length - 1
        }

        const _transformItem = direction => {
            if (direction === 'right') {
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
                    return
                }
                if (!_sliderControlLeft.classList.contains('slider__control_show')) {
                    _sliderControlLeft.classList.add('slider__control_show');
                }
                if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
                    _sliderControlRight.classList.remove('slider__control_show');
                }
                _positionLeftItem++;
                _transform -= _step;
            }
            if (direction === 'left') {
                if (_positionLeftItem <= position.getMin) {
                  return;
                }
                if (!_sliderControlRight.classList.contains('slider__control_show')) {
                  _sliderControlRight.classList.add('slider__control_show');
                }
                if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
                  _sliderControlLeft.classList.remove('slider__control_show');
                }
                _positionLeftItem--;
                _transform += _step;
              }
              _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }
        const _controlClick = item => e => {
            const direction = item.classList.contains('slider__control_right');
            e.preventDefault();
            _transformItem(direction);
        }

        const _setupListeners = () => {
            _sliderControls.forEach(control => {
                control.addEventListener('click', _controlClick(control))
            })
        }

        _setupListeners();

        return {
            right: () => _transformItem("right"),
            left: () => _transformItem("left")
        }
    };
})();

const slider = multiItemSlider(".slider");
