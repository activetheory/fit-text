import './styles.css';

import fitText from '../src/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const test1 = document.getElementById('test1');
  const el = test1.querySelector('.el');
  fitText({
    el,
    maxWidth: 100,
    maxHeight: 100,
    afterFit: console.log,
  });

  const test2 = document.getElementById('test2');
  const el2 = test2.querySelector('.el');
  fitText({
    el: el2,
    box: test2,
    afterFit: console.log,
  });

  const test3 = document.getElementById('test3');
  const el3 = test3.querySelector('.el');
  fitText({
    el: el3,
    box: test3,
    boxWidthOnly: true,
    afterFit: console.log,
  });

  const test4 = document.getElementById('test4');
  const el4 = test4.querySelector('.el');
  fitText({
    el: el4,
    box: test4,
    singleLine: true,
    boxWidthOnly: true,
    afterFit: console.log,
  });

  const test5 = document.getElementById('test5');
  const el5 = test5.querySelector('.el');
  fitText({
    el: el5,
    box: test5,
    clipOnly: true,
    afterFit: console.log,
  });
});
