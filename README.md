Time Utility
============

Utility functions to do time-related tasks.

Usage
-----

### CommonJS

~~~ js
const {debounce} = require('@taufik-nurrohman/tick');

window.addEventListener('resize', debounce(e => {
    console.log('Resize!');
}, 1000));
~~~

### ECMAScript

~~~ js
import {debounce} from '@taufik-nurrohman/tick';

window.addEventListener('resize', debounce(e => {
    console.log('Resize!');
}, 1000));
~~~

Methods
-------

### debounce(then, time)

### delay(then, time)

### throttle(then, interval)