// open characteristics block - dropdown

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slide = function () {
    function Slide(node, opt) {
        _classCallCheck(this, Slide);

        this.opt = opt || {};
        this.option = Object.assign({
            btn: '[data-button]',
            box: '[data-box-dropdown]',
            transition: 600,
            onOpen: null
        }, this.opt);
        this.node = node;
        this.btn = this.node.querySelector(this.option.btn);
        this.box = this.node.querySelector(this.option.box);
        this.heightBox = null;
        this.open = false;
    }

    _createClass(Slide, [{
        key: "down",
        value: function down() {
            var _this = this;

            function getSizeBoxes(elem) {
                var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
                var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
                return {
                    width: elemWidth,
                    height: elemHeight
                };
            }

            var downBlock = new Promise(function (resolve, reject) {
                _this.box.style.height = '';
                _this.box.style.opacity = '0';
                _this.box.style.display = 'block';
                _this.heightBox = getSizeBoxes(_this.box).height;
                _this.box.style.height = '0';
                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this.box.style.transition = _this.option.transition + 'ms';
                    _this.box.style.opacity = '1';
                    _this.box.style.height = _this.heightBox + 'px';

                    _this.open = true;
                }, 0);
            });
        }
    }, {
        key: "up",
        value: function up() {
            var _this2 = this;

            var upBlock = new Promise(function (resolve, reject) {
                _this2.box.style.height = '0';
                _this2.box.style.opacity = '0';

                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this2.box.style.display = 'none';
                    _this2.open = false;
                }, _this2.option.transition);
            });
        }
    }]);

    return Slide;
}();

if (document.querySelectorAll('.order-tel').length) {
    var slides = document.querySelectorAll('.order-tel');
    [].forEach.call(slides, function (el) {
        var slide = new Slide(el, {
            btn: '[data-button="open-tel"]',
            box: '[data-box-dropdown="tel"]',
            transition: 300
        });

        slide.toggle = function () {
            return slide.open ? slide.up() : slide.down();
        };

        slide.btn.addEventListener('click', slide.toggle);
    });
}



(function fixedHeaderMainDesktop() {
    var self = this;

    if (document.querySelectorAll('.header-main__wrapper-children').length) {
        self.header = document.querySelector('.header-main__wrapper-children');
        self.headerFixed = document.querySelector('.header-main-fixed');
        self.headerHeight = self.header.getBoundingClientRect().top - self.header.getBoundingClientRect().bottom;

        self.visibleHeader = function() {
            self.headerFixed.style.display = 'block';
            setTimeout(function () {
                self.headerFixed.classList.remove('header-hidden');
            },0);
        };

        self.hideHeader = function() {
            self.headerFixed.style.display = 'none';
            self.headerFixed.classList.add('header-hidden');
        };

        window.addEventListener('scroll', function () {
            self.headerTop = self.header.getBoundingClientRect().top;
            if (self.headerTop < self.headerHeight) {
                self.visibleHeader();
            }  else {
                self.hideHeader();
            }
        });
    }
})();





// function MoveClone(firstPoint, secondPoint) {
//     var self = this;
//     self.firstPoint = firstPoint;
//     self.secondPoint = secondPoint;
//
//     console.log(self.firstPoint);
//
//     self.sizePoint = function(el) {
//         var height = el.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
//         var width = el.getBoundingClientRect().right - el.getBoundingClientRect().left;
//         var top = el.getBoundingClientRect().top;
//         var left = el.getBoundingClientRect().left;
//
//         return {
//             width: width,
//             height: height,
//             top: top,
//             left: left
//         }
//     };
//
//     self.point = {
//         el: null,
//         width: function () {return self.sizePoint(self.firstPoint.el).width},
//         height: function () {return self.sizePoint(self.firstPoint.el).height},
//         top: function () {return self.sizePoint(self.firstPoint.el).top},
//         left: function () {return self.sizePoint(self.firstPoint.el).left},
//     };
//
//     self.clone = function() {
//         var clone = self.firstPoint.cloneNode(true);
//         clone.style.cssText = `
//                 position: fixed;
//                 top: ${self.point.top()}px;
//                 left: ${self.point.left()}px;
//                 transition: 1000ms;
//                 display: block;
//                 width: ${self.point.width()}px;
//                 height: ${self.point.height()}px;
//             `;
//
//         var appendClone = function () {
//             console.log(clone);
//             document.body.appendChild(clone);
//         };
//
//         return {
//             element: clone,
//             appendClone: appendClone,
//         };
//     };
//
//     self.moveCloneIn = function () {
//         self.point.el = self.firstPoint;
//         self.clone().appendClone();
//
//         // setTimeout(function () {
//         //     self.point.el = self.secondPoint;
//         //     self.clone().element;
//         // }, 1000);
//     };
//
//     self.moveCloneOf = function () {
//
//     };
//
//     return {
//         moveCloneIn: self.moveCloneIn
//     }
// }
//
// document.addEventListener('load', function () {
//     var clone = new MoveClone(
//         document.querySelector('.clone-img img'),
//         document.querySelector('.clone-basket')
//     );
//
//     clone.moveCloneIn();
// });
