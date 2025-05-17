const {W} = require('@taufik-nurrohman/document');
const {isInteger} = require('@taufik-nurrohman/is');

function _toArray(iterable) {
    return Array.from(iterable);
}

const {clearTimeout, setTimeout} = W; // For better minification

const debounce = (task, time) => {
    let stickyTime = isInteger(time) && time >= 0, timer;
    return [function () {
        timer && clearTimeout(timer);
        let lot = _toArray(arguments);
        if (!stickyTime) {
            time = lot.shift();
        }
        timer = setTimeout(() => task.apply(this, lot), time);
    }, function () {
        timer = clearTimeout(timer);
    }];
};

const delay = (task, time) => {
    let stickyTime = isInteger(time) && time >= 0, timer;
    return [function () {
        let lot = _toArray(arguments);
        if (!stickyTime) {
            time = lot.shift();
        }
        timer = setTimeout(() => task.apply(this, lot), time);
    }, function () {
        timer && clearTimeout(timer);
    }];
};

const repeat = (task, start, step) => {
    let stickyStart = isInteger(start) && start >= 0,
        stickyStep = isInteger(step) && step >= 0,
        timerToRepeat, timerToStart;
    return [function () {
        let lot = _toArray(arguments);
        if (!stickyStart) {
            start = lot.shift();
        }
        if (!stickyStep) {
            step = lot.shift();
        }
        let r = () => {
            task.apply(this, lot);
            timerToRepeat = setTimeout(r, step);
        };
        timerToStart = setTimeout(r, start);
    }, function () {
        timerToRepeat && clearTimeout(timerToRepeat);
        timerToStart && clearTimeout(timerToStart);
    }];
};

const throttle = (task, step) => {
    let last = 0, stickyStep = isInteger(step) && step >= 0;
    return [function () {
        let lot = _toArray(arguments),
            now = Date.now();
        if (!stickyStep) {
            step = lot.shift();
        }
        if (now - last >= step) {
            task.apply(this, lot);
            last = now;
        }
    }, function () {
        last = Date.now();
    }];
};

Object.assign(exports, {
    debounce,
    delay,
    repeat,
    throttle
});