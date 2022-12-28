// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('#fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minweightInput = document.querySelector('.minweight__input');
const maxweightInput = document.querySelector('.maxweight__input');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript'
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (fruits) => {


if (fruitsList.hasChildNodes()) {
  var children = fruitsList.childNodes;
  fruitsList.innerHTML = "";
}
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
    // while (children[i]) {
    //   children[i].removeChild(children[0];
    // }
    

    const li = document.createElement("li");
    li.className = "fruit__item fruit";

   
    li.innerHTML = `${i} ${fruits[i].kind} ${fruits[i].color} ${fruits[i].weight}`;
    console.log(fruits[i], li, li.innerHTML);



    fruitsList.appendChild(li);
    
    if (fruits[i].color == 'фиолетовый') {
      li.style.border = '5px solid #fcf' 
    }
    if (fruits[i].color == 'зеленый') {
      li.style.border = '5px solid #00FF7F' 
    }
    if (fruits[i].color == 'розово-красный') {
      li.style.border = '5px solid #FA8072' 
    }
    if (fruits[i].color == 'желтый') {
      li.style.border = '5px solid #DAA520' 
    }
    if (fruits[i].color == 'светло-коричневый') {
      li.style.border = '5px solid #A0522D';
       
    }
    
  }
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
  
};


const shuffleFruits = (fruits) => {
    
  result = [];
  fruits = fruits.slice();
  while (fruits.length > 0) {
   
    let i = getRandomInt(0, fruits.length-1);
    result.push(fruits[i]);

    fruits.splice(i, 1);
  }
  return result;
};

shuffleButton.addEventListener('click', () => {
  
  
  let a = shuffleFruits(fruits);
  display(a);
    let isEqual = fruits.length === a.length && 
    fruits.every((value, index) => value === a[index])

  if (isEqual == true) {
    alert('порядок не изменился');
    }
  });
  display(fruits); 

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  
  const arr = fruits.filter((item) => { 
    
      if (item.weight > minweightInput.value && item.weight < maxweightInput.value) {

        return true;        
      }
  });
  return arr;
};

filterButton.addEventListener('click', () => {
  let c = filterFruits();
  display(c);
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
//let time = 0;
let count = 0;
const comparationColor = (a, b) => {
  for (let i = 0; i < fruits.length; i++) {
    count = 1;
    if (a > b) {
      return a;
    }
  }
  return b;  
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(fruits, comparation) {
    for (let i = 0; i < fruits.length; i++) {
      let indexMin = 1;
      for (let j = i+1; j < fruits.length; j++) {
        if (fruits[j] < fruits[indexMin]) {
          indexMin = j;
        }
        count +=1;
      }
      let sortKind = fruits[i];
      fruits[i] = fruits[indexMin];
      fruits[indexMin] = sortKind;

    }
    return fruits;
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
