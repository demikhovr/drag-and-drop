var addDivButton = document.querySelector('.example__btn');
var output = document.querySelector('.example__output');
var divParams = {
  WIDTH: {
    MIN: 50,
    MAX: 200
  },

  HEIGHT: {
    MIN: 50,
    MAX: 100
  },

  OFFSET_TOP: {
    MIN: 0,
    MAX: 300
  },

  OFFSET_LEFT: {
    MIN: 0,
    MAX: 300
  }
};
var lastCoords = {
  x: 0,
  y: 0
};

function createDiv() {
  var div = document.createElement('div');

  div.classList.add('draggable-div');
  div.textContent = 'drag me';
  div.draggable = false;
  div.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  div.style.width = Math.round(Math.random() * (divParams.WIDTH.MAX - divParams.WIDTH.MIN) + divParams.WIDTH.MIN) + 'px';
  div.style.height = Math.round(Math.random() * (divParams.HEIGHT.MAX - divParams.HEIGHT.MIN) + divParams.HEIGHT.MIN) + 'px';
  div.style.top = Math.round(Math.random() * (divParams.OFFSET_TOP.MAX - divParams.OFFSET_TOP.MIN) + divParams.OFFSET_TOP.MIN) + 'px';
  div.style.left = Math.round(Math.random() * (divParams.OFFSET_LEFT.MAX - divParams.OFFSET_LEFT.MIN) + divParams.OFFSET_LEFT.MIN) + 'px';

  return div;
}

function addListeners(target) {
  target.addEventListener('mousedown', mouseDownHandler);

  function mouseDownHandler(evt) {
    target.classList.add('dragged');
    target.textContent = 'drop me';

    if (target !== output.lastElementChild) {
      output.appendChild(target);
    }

    lastCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  function mouseMoveHandler(evt) {
    var shift = {
      x: lastCoords.x - evt.clientX,
      y: lastCoords.y - evt.clientY
    };

    lastCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var currentCoords = {
      x: target.offsetLeft - shift.x,
      y: target.offsetTop - shift.y
    };

    target.style.left = currentCoords.x + 'px';
    target.style.top = currentCoords.y + 'px';
  }

  var mouseUpHandler = function mouseUpHandler(evt) {
    evt.preventDefault();
    target.textContent = 'drag me';

    target.classList.remove('dragged');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseDownHandler);
  };
}

addDivButton.addEventListener('click', function () {
  var div = createDiv();

  output.appendChild(div);
  addListeners(div);
});