'use strict';

function loadItems(items) {
  return fetch('data/data.json') //
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector('.items');
  // == for..of
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// on~ 이벤트 처리 함수
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListener(items) {
  const logo = document.querySelector('.logo');
  const btns = document.querySelector('.btns');
  logo.addEventListener('click', () => displayItems(items));
  btns.addEventListener('click', (event) => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListener(items);
  })
  .catch((error) => console.log(error));
