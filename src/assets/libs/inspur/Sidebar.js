import Point from './Point';
import Node from './Node';
import UUID from './UUID';
const _attachDragEvents=Symbol('_attachDragEvents');
const _removeDragEvents=Symbol('_removeDragEvents');
const _dragEvents=Symbol('_dragEvents');
const _dragStartEvents=Symbol('_dragStartEvents');
const _dragEndEvents=Symbol('_dragEndEvents');
const _dragOverEvents=Symbol('_dragOverEvents');
const _dragLeaveEvents=Symbol('_dragLeaveEvents');
const _dropEvents=Symbol('_dropEvents');

class Sidebar {
    constructor(data) {
        this.data = data;
        this.dragged = null;
        this.templates=new Map();
        this[_dropEvents]=this._dropEventListener.bind(this);
        this[_dragEvents]=this._dragEventListener.bind(this);
        this.createSidebar();

    }

    createSidebar() {
        this.tar = document.createElement('div');
        this.tar.classList.add('sidebar');
        this.createSidebarElement(this.tar, this.data);
    }

    createSidebarElement(tar, data) {
        let html = '<span><i class="ic ic-list"></i> 节点列表</span>';
        let temp = data.node_templates;
        for (let t in temp) {
            let id=`TMP-${UUID.GenerateUUID()}`;
            html += `<div class="node-example" draggable="true" data-name="${temp[t].name}" data-id="${id}">
                    <i class="${temp[t].icon}"></i> ${temp[t].name}
                  </div>`
            this.templates.set(id,temp[t]);
        }
        tar.innerHTML = html;
    }

    [_attachDragEvents]() {
        document.addEventListener("drag", function (event) {}, false);
        document.addEventListener("dragstart", this[_dragEvents], false);
        document.addEventListener("dragend", function (event) {event.preventDefault();}, false);
        document.addEventListener("dragover", function (event) {event.preventDefault();}, false);
        document.addEventListener("dragenter", function (event) {}, false);
        document.addEventListener("dragleave", function (event) {}, false);
        document.addEventListener("drop",this[_dropEvents] , false);
    }
    [_removeDragEvents]() {
        document.removeEventListener("drag", function (event) {}, false);
        document.removeEventListener("dragstart", this[_dragEvents], false);
        document.removeEventListener("dragend", function (event) {event.preventDefault();}, false);
        document.removeEventListener("dragover", function (event) {event.preventDefault();}, false);
        document.removeEventListener("dragenter", function (event) {}, false);
        document.removeEventListener("dragleave", function (event) {}, false);
        document.removeEventListener("drop",this[_dropEvents] , false);
    }
    _dragEventListener(event){
        this.dragged = event.target;
        event.dataTransfer.setData('data',null);
    }
    _dropEventListener(event) {
        event.preventDefault();
        if (event.target.className === "spaces") {
            let id=this.dragged.getAttribute('data-id');
            let template=this.templates.get(id);
            let node = new Node(
                new Point(event.layerX, event.layerY),
                template.name,
                undefined,
                template.type,
                {
                    click: this.spaces.dialogCallback,
                    contains:template.contains||{}
                }
            );
            this.spaces.addNode(node);
        }

    }
    addToWorkSpace(spaces) {
        this.spaces = spaces;
        this.spaces.tar.appendChild(this.tar);
        this[_attachDragEvents]();
    }
    destroy(){
        this.templates.clear();
        this[_removeDragEvents]();
    }
}

export default Sidebar;