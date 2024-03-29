export const debounce = (then, time) => {
    let timer;
    return function () {
        timer && clearTimeout(timer);
        timer = setTimeout(() => then.apply(this, arguments), time);
    };
};

export const delay = (then, time) => {
    return function () {
        setTimeout(() => then.apply(this, arguments), time);
    };
};

export const throttle = (then, interval) => {
    let last;
    return function () {
        let now = new Date;
        if (now - last >= interval) {
            then.apply(this, arguments);
            last = now;
        }
    };
};