const button = document.getElementById('button');
const card = document.querySelector('.card');
const container = document.getElementById('container');
const input = document.getElementById('input');

input.addEventListener('mousedown', function(e) {
  e.preventDefault();
});

button.addEventListener('click', function() {
  input.value = input.value.slice(0, input.value.length - 1);
});

const createCard = text => {
  const copy = card.cloneNode('deep');
  const textNode = document.createTextNode(text);
  copy.children[1].appendChild(textNode);
  return copy;
};

const createCards = () => {
  let cards = [];
  let i = 65;
  let node;
  while (i <= 90) {
    node = createCard(String.fromCharCode(i));
    node.addEventListener('click', clickCard);
    cards.push(node);
    node = node.cloneNode('deep');
    node.addEventListener('click', clickCard);
    cards.push(node);
    i++;
  }
  shuffle(cards);
  cards.forEach(card => {
    container.appendChild(card);
  });
};

const shuffle = deck => {
  let index;
  for (let i = 0; i < deck.length; i++) {
    index = Math.floor(Math.random() * deck.length);
    [deck[i], deck[index]] = [deck[index], deck[i]];
  }
};

const cardsSelected = [];

const clickCard = event => {
  if (cardsSelected.length === 1 && event.currentTarget === cardsSelected[0]) {
    return;
  }

  event.currentTarget.children[0].style.transform = 'rotateY(-180deg)';
  event.currentTarget.children[1].style.transform = 'rotateY(0deg)';
  cardsSelected.push(event.currentTarget);

  if (cardsSelected.length === 2) {
    if (
      cardsSelected[0].children[1].innerText ===
      cardsSelected[1].children[1].innerText
    ) {
      cardsSelected[0].children[1].style['box-shadow'] = '0px 0px 50px green';
      cardsSelected[1].children[1].style['box-shadow'] = '0px 0px 50px green';
      input.value += cardsSelected[1].children[1].innerText;
    } else {
      cardsSelected[0].children[1].style['box-shadow'] = '0px 0px 50px red';
      cardsSelected[1].children[1].style['box-shadow'] = '0px 0px 50px red';
    }

    setTimeout(() => {
      while (cardsSelected.length > 0) {
        cardsSelected[0].children[0].style.transform = '';
        cardsSelected[0].children[0].style['box-shadow'] = '';
        cardsSelected[0].children[1].style.transform = '';
        cardsSelected[0].children[1].style['box-shadow'] = '';
        cardsSelected.shift();
      }
    }, 2000);
  }
};

createCards();
document.body.removeChild(document.body.firstElementChild);
