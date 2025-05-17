Time Utility
============

Utility functions to do time-related tasks.

**FYI:**

 - [Debounce](https://developer.mozilla.org/en-US/docs/Glossary/Debounce)
 - [Throttle](https://developer.mozilla.org/en-US/docs/Glossary/Throttle)

Usage
-----

### CommonJS

~~~ js
const {debounce} = require('@taufik-nurrohman/tick');

const [debounceStart] = debounce(e => {
    console.log('resize');
});

window.addEventListener('resize', debounceStart(1000));
~~~

### ECMAScript

~~~ js
import {debounce} from '@taufik-nurrohman/tick';

const [debounceStart] = debounce(e => {
    console.log('resize');
});

window.addEventListener('resize', debounceStart(1000));
~~~

Methods
-------

### debounce(task, time)

~~~ js
const [debounceStart] = debounce(function (e) {
    console.log('tick');
    console.log(e);
}, 1000);

window.addEventListener('resize', function (e) {
    debounceStart.apply(this, [e]);
});
~~~

> [!TIP]
>
> If the `time` value is neither an integer nor less than zero, the first argument of the `debounceStart` function call
> will be used to hold it:
>
> ~~~ js
> const [debounceStart] = debounce(function (e) {
>     console.log('tick');
>     console.log(e);
> });
> 
> window.addEventListener('resize', function (e) {
>     debounceStart.apply(this, [1000, e]);
> });
> ~~~

### delay(task, time)

~~~ js
const [delayStart] = delay(function (e) {
    console.log('tick');
    console.log(e);
}, 1000);

window.addEventListener('resize', function (e) {
    delayStart.apply(this, [e]);
});
~~~

> [!TIP]
>
> If the `time` value is neither an integer nor less than zero, the first argument of the `delayStart` function call
> will be used to hold it:
>
> ~~~ js
> const [delayStart] = delay(function (e) {
>     console.log('tick');
>     console.log(e);
> });
> 
> window.addEventListener('resize', function (e) {
>     delayStart.apply(this, [1000, e]);
> });
> ~~~

### repeat(task, start, step)

~~~ js
const [repeatStart, repeatStop] = repeat(function (e) {
    console.log('repeat');
    console.log(e);
}, 1000, 100);

const button = document.querySelector('button');

button.addEventListener('mousedown', function (e) {
    console.log('start');
    repeatStart.apply(this, [e]);
});

button.addEventListener('mouseup', function (e) {
    repeatStop();
});
~~~

> [!TIP]
>
> If the `start` value is neither an integer nor less than zero, the first argument of the `repeatStart` function call
> will be used to hold it. If the `step` value is neither an integer nor less than zero, the second argument of the
> `repeatStart` function call will be used to hold it:
>
> ~~~ js
> const [repeatStart, repeatStop] = repeat(function (e) {
>     console.log('repeat');
>     console.log(e);
> });
> 
> const button = document.querySelector('button');
> 
> button.addEventListener('mousedown', function (e) {
>     console.log('start');
>     repeatStart.apply(this, [1000, 100, e]);
> });
> 
> button.addEventListener('mouseup', function (e) {
>     repeatStop();
> });
> ~~~

### throttle(task, step)

~~~ js
const [throttleStart] = throttle(function (e) {
    console.log('tick');
    console.log(e);
}, 1000);

window.addEventListener('resize', function (e) {
    throttleStart.apply(this, [e]);
});
~~~

> [!TIP]
>
> If the `step` value is neither an integer nor less than zero, the first argument of the `throttleStart` function call
> will be used to hold it:
>
> ~~~ js
> const [throttleStart] = throttle(function (e) {
>     console.log('tick');
>     console.log(e);
> });
> 
> window.addEventListener('resize', function (e) {
>     throttleStart.apply(this, [1000, e]);
> });
> ~~~