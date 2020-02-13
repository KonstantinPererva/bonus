function Scale(node) {
    if (!node) { return; }

    var self = this;
    self.slave = null;
    self.wrapper = null;
    self.leading = null;

    self.node = node || null;

    self.min = self.node.dataset.min || null;
    self.max = self.node.dataset.max || null;
    self.dif = parseInt(self.max, 10) - parseInt(self.min, 10);

    self.mark = self.node.querySelectorAll('[data-mark]') || null;
    self.band = self.node.querySelector('[data-band]') || null;

    self.activeBonus = function() {

        if (self.mark instanceof NodeList && self.mark.length > 0)
        {
            if (self.node.getAttribute('data-bonus-type') === 'present')
            {
                var isssetActiveBonus = false;
                var nextThreshold = null;
                var thresholdValue;
                var nextThresholdValue;
                var value = Number.parseInt(self.leading.dataset.leading);

                for (var i = 0; i < self.mark.length; i++) {

                    self.mark[i].slave = self.mark[i].querySelector('[data-slave]');

                    if (isssetActiveBonus === false)
                    {
                        nextThreshold = self.mark[i + 1];

                        if (nextThreshold instanceof Node)
                        {
                            thresholdValue = Number.parseInt(self.mark[i].dataset.position);
                            nextThresholdValue = Number.parseInt(nextThreshold.dataset.position);

                            if (thresholdValue <= value && nextThresholdValue > value)
                            {
                                self.mark[i].slave.classList.add('bonus-active');
                            }
                            else
                            {
                                self.mark[i].slave.classList.remove('bonus-active');
                            }
                        }
                        else
                        {
                            thresholdValue = Number.parseInt(self.mark[i].dataset.position);

                            if (thresholdValue <= value)
                            {
                                self.mark[i].slave.classList.add('bonus-active');
                            }
                            else
                            {
                                self.mark[i].slave.classList.remove('bonus-active');
                            }
                        }
                    }
                }
            }
            else
            {
                [].forEach.call(self.mark, function (mark) {
                    mark.slave = mark.querySelector('[data-slave]');

                    var pos = parseInt(mark.dataset.position, 10);
                    var data = parseInt(self.leading.dataset.leading, 10);

                    if (pos <= data) {
                        mark.slave.classList.add('bonus-active');
                    } else {
                        mark.slave.classList.remove('bonus-active');
                    }
                });
            }
        }
    };

    self.setLeading = function() {
        self.parentSearch(self.node);
        self.leading = self.wrapper.querySelector('[data-leading]') || null;
    };

    self.parentSearch = function(el) {
        var parent = el.parentElement;

        if (parent.dataset.card === "bonus") {
            return self.wrapper = parent;
        }

        self.parentSearch(parent);
    };

    self.fullness = function() {
        var data = self.leading.dataset.leading;
        var per = (parseInt(data, 10) - self.min) * 100 / self.dif;

        if (per > 100) {
            self.band.style.width = "100%";
        } else if (per < 0) {
            self.band.style.width = "0";
        } else {
            self.band.style.width = per + "%";
        }
    };

    self.positionMark = function() {
        [].forEach.call(self.mark, function (mark, ind) {
            var pos = mark.dataset.position;
            var per = (parseInt(pos, 10) - self.min) * 100 / self.dif;

            if (self.mark[0] === self.mark[ind]) {
                mark.style.left = per + "%";
            } else {
                mark.style.left = "calc(" + per + "% - 1px)";
            }
        })
    };

    self.recalculateScale = function() {
        self.fullness();
        self.activeBonus();
    };

    self.init = function() {
        self.positionMark();
        self.setLeading();
        self.fullness();
        self.activeBonus();
    };

    return {
        init: self.init,
        recalculate: self.recalculateScale
    }
}

if (document.querySelectorAll('[data-scale="bonus"]').length) {
    var scaleList = document.querySelectorAll('[data-scale="bonus"]');
    [].forEach.call(scaleList, function (scale) {
        var scl = new Scale(scale);
        scl.init();
    });
}