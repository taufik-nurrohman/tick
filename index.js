const debounce = (then, time) => {
    let timer;
    return function() {
        timer && clearTimeout(timer);
        timer = setTimeout(() => then.apply(this, arguments), time);
    };
};

const delay = (then, time) => {
    return function() {
        setTimeout(() => then.apply(this, arguments), time);
    };
};

const throttle = (then, interval) => {
    let last;
    return function() {
        let now = new Date;
        if (now - last >= interval) {
            then.apply(this, arguments);
            last = now;
        }
    };
};

Object.assign(exports, {
    debounce,
    delay,
    throttle
});