import {W} from '@taufik-nurrohman/document';
import {isInteger} from '@taufik-nurrohman/is';

function _toArray(iterable) {
    return Array.from(iterable);
}

const {clearTimeout, setTimeout} = W; // For better minification

const debounce = (task, time) => {
    let timer;
    return [function () {
        timer && clearTimeout(timer);
        let lot = _toArray(arguments);
        if (!isInteger(time) || time < 0) {
            time = lot.shift();
        }
        timer = setTimeout(() => task.apply(this, lot), time);
    }, function () {
        timer = clearTimeout(timer);
    }];
};

const delay = (task, time) => {
    let timer;
    return [function () {
        let lot = _toArray(arguments);
        if (!isInteger(time) || time < 0) {
            time = lot.shift();
        }
        timer = setTimeout(() => task.apply(this, lot), time);
    }, function () {
        timer && clearTimeout(timer);
    }];
};

const repeat = (task, start, step) => {
    let timerToRepeat, timerToStart;
    return [function () {
        let lot = _toArray(arguments);
        if (!isInteger(start) || start < 0) {
            start = lot.shift();
        }
        if (!isInteger(step) || step < 0) {
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
    let last = 0;
    return [function () {
        let lot = _toArray(arguments),
            now = Date.now();
        if (step < 0) {
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