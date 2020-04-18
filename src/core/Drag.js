import Point from './Point.js'

const _dragStart = Symbol('_dragStart');
const _dragMove = Symbol('_dragMove');
const _dragEnd = Symbol('_dragEnd');

class Drag {
  constructor (tar, position = new Point(0, 0), observer) {
    this.tar = tar;
    this.pos = position;
    this.observer = observer;
    this.distance = new Point();
    this.tar.style.position = 'absolute';
    this[_dragStart] = this.dragStartListener.bind(this);
    this[_dragMove] = this.dragMoveListener.bind(this);
    this[_dragEnd] = this.dragEndListener.bind(this);
    this.addListener();
  }

  assignParams (p) {
    return `${p}px`;
  }

  processNumber (p) {
    return Math.max(0, p);
  }

  updatePosition () {
    this.tar.style.left = this.assignParams(this.pos.x);
    this.tar.style.top = this.assignParams(this.pos.y);
    try {
      this.observer(this.pos);
    } catch (e) {
      console.log(e.message)
    }
  }

  dragStartListener (e) {
    this.tar.classList.add('active');
    this.distance.set(
      Point.diffAxis(e.clientX, this.pos.x),
      Point.diffAxis(e.clientY, this.pos.y)
    );
    document.addEventListener('mousemove', this[_dragMove], false);
    document.addEventListener('mouseup', this[_dragEnd], false);
  }

  dragMoveListener (e) {
    e.preventDefault();
    e.stopPropagation();
    this.pos.set(
      this.processNumber(Point.diffAxis(e.clientX, this.distance.x)),
      this.processNumber(Point.diffAxis(e.clientY, this.distance.y))
    );
    this.updatePosition();
  }

  dragEndListener (e) {
    e.preventDefault();
    e.stopPropagation();
    this.tar.classList.remove('active');
    document.removeEventListener('mousemove', this[_dragMove], false);
    document.removeEventListener('mouseup', this[_dragEnd], false);
  }

  addListener () {
    if (this.tar) {
      this.tar.addEventListener('mousedown', this[_dragStart], false);
    }
  }

  destroy () {
    document.removeEventListener('mousedown', this[_dragStart], false);
  }
}

export default Drag;