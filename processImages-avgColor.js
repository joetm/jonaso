// fast-average-color

'use strict';

const FastAverageColor = require('fast-average-color').FastAverageColor;
const fac = new FastAverageColor();
fac.getColorAsync(container.querySelector('img'))
    .then(color => {
        container.style.backgroundColor = color.rgba;
        container.style.color = color.isDark ? '#fff' : '#000';
    })
    .catch(e => {
        console.log(e);
    });

