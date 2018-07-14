import Point from "./Point";
import UUID from "./UUID";
import Drag from './Drag';

const _pos = Symbol('_pos');
const _click = Symbol('_click');
const _trigger = Symbol('_trigger');
const _links=Symbol('_links');
const defaults = {
    contains:{}
};
class Node {
    constructor(position = new Point(0, 0), name = 'UNNAMED', id = UUID.GenerateUUID(), type = "UNTYPED", configs) {
        this.pos = position;
        this.tar = '';
        this.id = id;
        this.name = name;
        this.type = type;
        this.center = new Point();
        this[_pos] = this._pos.bind(this);
        this[_click] = this._onClickListener.bind(this);
        this.createNode();
        this.observers = {};
        this.configs=Object.assign({}, defaults, configs);
        this[_links] = new Set();
    }
    assignParams(p) {
        return `${p}px`;
    }
    createNodeElement(node) {
        node.classList.add('node');
        node.innerHTML =
            `
             <span>${this.name}</span><br>
             <span class="type">${this.type}</span><br>
             <button class="btn-delete" data-name="delete" data-id="${this.id}"></button>
             <button class="btn" data-name="edit" data-id="${this.id}">编辑</button>
             <button class="btn btn-connect ic ic-share" data-name="connect" data-id="${this.id}"></button>
            `;
        node.style.left = this.assignParams(this.pos.x);
        node.style.top = this.assignParams(this.pos.y);
    }

    createNode() {
        this.tar = document.createElement('div');
        this.createNodeElement(this.tar);
        this.tar.id = this.id;
        this.tar.addEventListener('click', this[_click], false);
        this.dragger=new Drag(this.tar, this.pos, this[_pos]);
    }

    addToWorkSpaces(spaces) {
        this.spaces=spaces;
        this.spaces.tar.appendChild(this.tar);
        this.center.set(
            this.pos.x + this.tar.offsetWidth / 2,
            this.pos.y + this.tar.offsetHeight / 2
        );
    }
    addLinkToNode(link){
        if(link){
            this[_links].add(link);
        }
    }
    removeLinkFromNode(link){
        if(link){
            this[_links].delete(link);
        }
    }
    _pos(pos) {
        Point.copyPointValue(this.pos, pos);
        this.center.set(
            this.pos.x + this.tar.offsetWidth / 2,
            this.pos.y + this.tar.offsetHeight / 2
        );
        this[_trigger]();
    }

    _onClickListener(event) {
        let name=event.target.getAttribute('data-name');
        if(!name)return;
        switch (name) {
            case 'connect':
                event.target.classList.toggle('connect-active');
                try{
                    if(this.spaces.updateConnects(this.id)){
                        let cList=document.querySelectorAll('.btn.connect-active');
                        for(let i in cList){
                            cList[i].classList.remove('connect-active')
                        }
                    }
                }catch (e){}

                break;
            case 'delete':
                this.spaces.delNode(this.id);
                break;
            default:
                try{
                    if(this.configs.click){
                        this.configs.click(event,this.exports());
                    }
                }catch (e){console.log(e.message)}
        }
    }
    addObserver(id, callback) {
        this.observers[id] = callback;
    }
    removeObserver(id) {
        delete this.observers[id];
    }
    [_trigger]() {
        for (let i in this.observers) {
            try {
                this.observers[i](this.center);
            } catch (e) {
                console.log(e.message);
            }
        }
    }
    getAllLinkedLink(){
        return this.observers;
    }
    destroy(){
        this.dragger.destroy();
        this.tar.parentNode.removeChild(this.tar);
    }
    exports(){
       let edges=[];
       for(let item of this[_links]){
           edges.push(item.exports())
       }
        return {
            name:this.name,
            id:this.id,
            type:this.type,
            position:this.pos,
            edges:edges,
            contains:this.configs.contains
        }
    }
}

export default Node;