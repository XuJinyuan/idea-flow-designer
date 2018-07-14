import Point from "./Point"
import UUID from './UUID'
import Color from './Color'

const _fromObserver = Symbol('_fromObserver');
const _toObserver = Symbol('_toObserver');
const _updateLinkPosition = Symbol('_updateLinkPosition');

class Link {
    constructor(from = new Point(0, 0), to = new Point(40, 40), name, color) {
        this.tar = '';
        this.from = from;
        this.to = to;
        this.name = name || 'UNNAMED LINK';
        this.id = UUID.GenerateUUID();
        this.color = color || Color.GenerateColor();
        this[_fromObserver] = this._fromObserver.bind(this);
        this[_toObserver] = this._toObserver.bind(this);
        this.createLink();
    }

    assignParams(p) {
        return `${Math.abs(p)}px`;
    }

    createLink() {
        this.tar = document.createElement('link-line');
        this.createLinkStyle(this.tar);
        this.tar.id = this.id;
        this.tar.innerHTML = `<span class="link-name"><p>${this.name}</p></span>`
    }

    createLinkStyle(link) {
        link.classList.add('link');
        link.style.color = this.color;
        this[_updateLinkPosition](link);
    }

    [_updateLinkPosition](link) {
        link.classList.remove('bottom', 'top', 'right', 'left');
        this.size = Point.diffPoint(this.to, this.from);
        link.style.width = this.assignParams(this.size.x);
        link.style.height = this.assignParams(this.size.y);
        if (this.size.x > 0) {
            link.classList.add('left');
            if (this.size.y > 0) {
                link.classList.add('bottom');
                link.style.left = this.assignParams(this.from.x);
                link.style.top = this.assignParams(this.from.y);
            } else {
                link.classList.add('top');
                link.style.left = this.assignParams(this.from.x);
                link.style.top = this.assignParams(this.to.y);
            }
        } else {
            link.classList.add('right');
            if (this.size.y > 0) {
                link.classList.add('bottom');
                link.style.left = this.assignParams(this.to.x);
                link.style.top = this.assignParams(this.from.y);
            } else {
                link.classList.add('top');
                link.style.left = this.assignParams(this.to.x);
                link.style.top = this.assignParams(this.to.y);
            }
        }
    }

    _fromObserver(p) {
        this.from.x = p.x;
        this.from.y = p.y;
        this[_updateLinkPosition](this.tar);
    }

    _toObserver(p) {
        this.to.x = p.x;
        this.to.y = p.y;
        this[_updateLinkPosition](this.tar);
    }

    bindObserverFromNode(node) {
        if (node) {
            node.addObserver(this.id, this[_fromObserver]);
        }
    }

    unbindObserverFromNode(node) {
        if (node) {
            node.removeObserver(this.id);
        }
    }

    bindObserverToNode(node) {
        if (node) {
            node.addObserver(this.id, this[_toObserver]);
        }
    }

    unbindObserverToNode(node) {
        if (node) {
            node.removeObserver(this.id);
        }
    }

    addToWorkSpaces(spaces) {
        spaces.appendChild(this.tar);
    }

    destroy() {
        this.tar.parentNode.removeChild(this.tar);
    }
}

export default Link;