const subtractSign = document.querySelector('.btn__sign--subtract');
const addSign = document.querySelector('.btn__sign--add');
const number = document.querySelector('.btn__number');

let count = 0;

function subtract(){
  if (count > 0){
    count--;
    number.textContent = count;
  }
}

function add(){
  count++;
  number.textContent = count;
}

//function that gets the button styles
function getStylesNumber(){
  let getStyle = window.getComputedStyle(number);
  let left = parseInt(getStyle.left);
  let right = parseInt(getStyle.right);
  
  return {left, right};
}

//function to drag the button
function dragNumber({movementX}){
  let {left} = getStylesNumber(); //get the left position
  //the movementX property to the left is negative and to the right is positive
  //sum it to the left position
  number.style.left = `${left + movementX}px`
}

//function that returns the button to its original position
function centerButton(){
  number.style = `transition: left .3s ease`
  number.style.left = '1.5em';
}

//function for addition and subtraction when the button is dragged
function mathOnDrag(){
  let {left, right} = getStylesNumber();

  if(left <= 0) subtract();
  if(right <= 0) add();
}


subtractSign.addEventListener('click', subtract);

addSign.addEventListener('click', add);

number.addEventListener('mousedown', () => {
  number.addEventListener('mousemove', dragNumber);
  number.style = `none`;
})

//when the mouse up event occurs, removes the mouse movement event
number.addEventListener('mouseup', () => {
  number.removeEventListener('mousemove', dragNumber);
  //when mouse up, the button returns to its initial position.
  centerButton();
  //addition and subtraction when the button is dragged
  mathOnDrag();
})

//when the mouse leave event occurs, removes the mouse movement event
number.addEventListener('mouseleave', () => {
  number.removeEventListener('mousemove', dragNumber);
  //when mouse leave, the button returns to its initial position.
  centerButton();
  //addition and subtraction when the button is dragged
  mathOnDrag();
})