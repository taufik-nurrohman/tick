import {W} from '@taufik-nurrohman/document';
import {isInteger} from '@taufik-nurrohman/is';

function _toArray(iterable) {
    return Array.from(iterable);
}

const {Date, clearTimeout, setTimeout} = W; // For better minification

export const confine = (task, time) => {
    let f = 0, first = 1, stickyTime = time, timer;
    return [function () {
        timer && clearTimeout(timer);
        let lot = _toArray(arguments);
        if (!stickyTime) {
            time = lot.shift();
        }
        if (first) {
            f = 1;
            first = 0;
            task.apply(this, lot);
        }
        timer = setTimeout(() => first = 1, time);
    }, function () {
        if (f) {
            first = 0;
        }
    }];
};

export const debounce = (task, time) => {
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

export const delay = (task, time) => {
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

export const repeat = (task, start, step) => {
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
        if (start > 0) {
            timerToStart = setTimeout(r, start);
        } else {
            r();
        }
    }, function () {
        timerToRepeat && clearTimeout(timerToRepeat);
        timerToStart && clearTimeout(timerToStart);
    }];
};

export const throttle = (task, step) => {
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