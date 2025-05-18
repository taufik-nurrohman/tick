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

const [debounceStart] = debounce(() => {
    console.log('resize');
});

window.addEventListener('resize', debounceStart(1000));
~~~

### ECMAScript

~~~ js
import {debounce} from '@taufik-nurrohman/tick';

const [debounceStart] = debounce(() => {
    console.log('resize');
});

window.addEventListener('resize', debounceStart(1000));
~~~

Methods
-------

### confine(task, time)

Perform a task once. Repeating the same task multiple times will not cause it to be executed until you stop repeating it
after a certain amount of time has passed. An example use case would be to force the user to be patient.

~~~ js
const [confineStart, confineContinue] = confine(function (e) {
    console.log('Saving your data…');
}, 1000);

const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
    confineStart.call(this, e), e.preventDefault();
});

// Clicking the “Save” button multiple times is considered “rude”. Continue the restriction!
form.elements['save'].addEventListener('click', function () {
    confineContinue();
});
~~~

> [!TIP]
>
> If the `time` value is neither an integer nor less than zero, the first argument of the `confineStart` function call
> will be used to hold it:
>
> ~~~ js
> const [confineStart, confineContinue] = confine(function (e) {
>     console.log('Saving your data…');
> });
>
> const form = document.querySelector('form');
>
> form.addEventListener('submit', function (e) {
>     confineStart.call(this, 1000, e), e.preventDefault();
> });
>
> form.elements['save'].addEventListener('click', function () {
>     confineContinue();
> });
> ~~~

### debounce(task, time)

Perform a task only after the user pauses for a certain amount of time. An example use case would be to start an AJAX
search instantly after the user stops typing their search query.

~~~ js
const [debounceStart, debounceStop] = debounce(function (e) {
    console.log('Using query “' + this.value + '” to search for the data you want…');
}, 1000);

const form = document.querySelector('form');

form.elements['query'].addEventListener('input', function (e) {
    debounceStart.call(this, e);
});
~~~

> [!TIP]
>
> If the `time` value is neither an integer nor less than zero, the first argument of the `debounceStart` function call
> will be used to hold it:
>
> ~~~ js
> const [debounceStart, debounceStop] = debounce(function (e) {
>     console.log('Using query “' + this.value + '” to search for the data you want…');
> });
>
> const form = document.querySelector('form');
>
> form.elements['query'].addEventListener('input', function (e) {
>     debounceStart.call(this, 1000, e);
> });
> ~~~

### delay(task, time)

Perform a task after a certain amount of time has passed. An example use case would be to hide or show a custom
placeholder based on whether a content-editable element is empty or not.

~~~ js
const [delayStart, delayStop] = delay(function (e) {
    this.nextElementSibling.style.visibility = "" !== this.innerHTML.trim() ? 'hidden' : "";
}, 1000);

const editor = document.querySelector('[contenteditable]');

editor.addEventListener('input', function (e) {
    delayStart.call(this, e);
});
~~~

> [!TIP]
>
> If the `time` value is neither an integer nor less than zero, the first argument of the `delayStart` function call
> will be used to hold it:
>
> ~~~ js
> const [delayStart, delayStop] = delay(function (e) {
>     this.nextElementSibling.style.visibility = "" !== this.innerHTML.trim() ? 'hidden' : "";
> });
>
> const editor = document.querySelector('[contenteditable]');
>
> editor.addEventListener('input', function (e) {
>     delayStart.call(this, 1000, e);
> });
> ~~~

### repeat(task, start, step)

Repeat a task only after a certain amount of time has passed. An example use case would be to allow the user to scroll
an area with a click of a button and then continue scrolling when the user holds the button down.

~~~ js
const [repeatStart, repeatStop] = repeat(function (e) {
    // Continue scroll…
    document.body.scrollTop += 10;
    document.documentElement.scrollTop += 10;
}, 1000, 100);

const button = document.querySelector('button');

button.addEventListener('mousedown', function (e) {
    // Start scroll…
    document.body.scrollTop += 10;
    document.documentElement.scrollTop += 10;
    repeatStart.call(this, e);
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
>     document.body.scrollTop += 10;
>     document.documentElement.scrollTop += 10;
> });
>
> const button = document.querySelector('button');
> 
> button.addEventListener('mousedown', function (e) {
>     document.body.scrollTop += 10;
>     document.documentElement.scrollTop += 10;
>     repeatStart.call(this, 1000, 100, e);
> });
>
> button.addEventListener('mouseup', function (e) {
>     repeatStop();
> });
> ~~~

### throttle(task, step)

Perform a task only within a specific time frame and ignore repetitions outside of it. An example use case would be to
limit an API call.

~~~ js
const [throttleStart, throttleStop] = throttle(function (e) {
    console.log('Fetching information about the online status of other users…');
}, 1000);

// Fetch data every 10 seconds of user activity on the site!
function checkOnlineStatus() {
    throttleStart.call(this, e);
}

window.addEventListener('keydown', checkOnlineStatus);
window.addEventListener('mousedown', checkOnlineStatus);
window.addEventListener('mousemove', checkOnlineStatus);
window.addEventListener('scroll', checkOnlineStatus);
~~~

> [!TIP]
>
> If the `step` value is neither an integer nor less than zero, the first argument of the `throttleStart` function call
> will be used to hold it:
>
> ~~~ js
> const [throttleStart, throttleStop] = throttle(function (e) {
>     console.log('Fetching information about the online status of other users…');
> }, 1000);
>
> function checkOnlineStatus() {
>     throttleStart.call(this, e);
> }
>
> window.addEventListener('keydown', checkOnlineStatus);
> window.addEventListener('mousedown', checkOnlineStatus);
> window.addEventListener('mousemove', checkOnlineStatus);
> window.addEventListener('scroll', checkOnlineStatus);
> ~~~