import NodeLink from './NodeLink';
import Point from './Point';
import Node from './Node';
import Sidebar from './Sidebar';
import Dialog from './Dialog';
import Toast from './Toast';

const defaults = {
  'el': document.body,
  'node_templates': [],
  'dialog_templates': {},
  'dialog_save_callback' (data) {
    console.log(data);
  },
  'dialog_open_callback' (data) {
    console.log(data);
  }
};
const _dialog = new Dialog();
const _click = Symbol('_click');

class WorkSpace {
  constructor (params = {}) {
    this.params = Object.assign({}, defaults, params);
    this.nodes = new Map();
    this.links = new Map();
    this.connects = new Set();
    this[_click] = this._onClickListener.bind(this);
    this.dialogCallback = this._dialogCallback.bind(this);
    this.message = new Toast();
    this.createWorkSpace(this.params);
  }

  createWorkSpaceToolbars () {
    return `<div class="tool-bar">
                    <button class="btn ic ic-share-fill" data-name="save"> 保存</button>
                    <button class="btn ic ic-delete" data-name="clear"> 清除缓存</button>
                    <button class="btn ic ic-delete" data-name="export"> 导出</button>
                </div>`;
  }

  createWorkSpace () {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('spaces-wrapper');
    this.wrapper.innerHTML += this.createWorkSpaceToolbars();
    this.tar = document.createElement('div');
    this.tar.classList.add('spaces');
    this.wrapper.appendChild(this.tar);
    this.params.el.appendChild(this.wrapper);
    this.sidebar = new Sidebar(this.params);
    this.sidebar.addToWorkSpace(this);
    this.wrapper.addEventListener('click', this[_click], false);
  }

  _onClickListener (event) {
    switch (event.target.getAttribute('data-name')) {
      case 'save':
        this.saveScene();
        this.message.show('保存成功');
        break;
      case 'clear':
        console.log(`clear`);
        localStorage.removeItem('savedWorkSpaces');
        this.message.show('已清除本地缓存');
        break;
      case 'export':
        console.log(`export`);
        this.message.show(JSON.stringify(this.saveScene()), 5000);
        break;
      default:
        break;
    }
  }

  getSpaces () {
    return this.tar;
  }

  loadScene ({nodes, links}) {
    for (let i in nodes) {
      let pos = nodes[i].position || {left: 0, top: 0};
      let node = new Node(
        new Point(pos.x, pos.y),
        nodes[i].name,
        i,
        nodes[i].type,
        {
          click: this.dialogCallback,
          contains: nodes[i].contains || {}
        },
      );
      this.addNode(node)
    }
    for (let id in links) {
      this.addNodeLink(links[id].k, links[id].v);
    }
  }

  saveScene () {
    let nodes = new Map();
    for (let item of this.nodes.values()) {
      let id = item.id;
      nodes.set(id, item.exports());
    }
    localStorage.setItem('savedWorkSpaces', JSON.stringify([...nodes.values()]));
    return [...nodes.values()];

  }

  addNode (node) {
    if (!node || (!node instanceof Node) || node.id === '0') return false;
    node.addToWorkSpaces(this);
    this.nodes.set(node.id, node);
    return true;
  }

  delNode (id) {
    let node = this.nodes.get(id);
    let links = node.getAllLinkedLink();
    for (let id in links) {
      this.delNodeLink(id);
    }
    node.destroy();
    this.nodes.delete(id);
  }

  getAllNodes () {
    return this.nodes;
  }

  clearNodes () {
    this.nodes.clear();
  }

  addNodeLink (fromId, toId) {
    if (!(fromId && toId)) return false;
    let fromNode = this.nodes.get(fromId);
    if (!fromNode) return false;
    let toNode = this.nodes.get(toId);
    if (!toNode) return false;
    let nodeLink = new NodeLink(fromNode, toNode, `${fromNode.name} 至 ${toNode.name}`);
    nodeLink.addToWorkSpaces(this.tar);
    this.links.set(nodeLink.id, nodeLink);
  }

  delNodeLink (id) {
    let link = this.links.get(id);
    link.destroy();
    this.links.delete(id);
  }

  getAllNodeLinks () {
    return this.links;
  }

  clearNodeLinks () {
    this.links.clear();
  }

  updateConnects (id) {
    if (this.connects.has(id)) {
      this.connects.delete(id)
    } else {
      this.connects.add(id);
    }
    if (this.connects.size >= 2) {
      let c = [...this.connects];
      this.addNodeLink(c[0], c[1]);
      this.connects.clear();
      return true;
    }
    return false;
  }

  _dialogCallback (event, data) {
    switch (event.target.getAttribute('data-name')) {
      case 'edit':
        _dialog.show({
          id: data.name,
          value: this.params.dialog_templates,
        }, (data) => {
          this.params.dialog_save_callback(data);
          _dialog.hide();
        });
        try {
          this.params.dialog_open_callback({data, types: this.params.node_templates});
        } catch (e) {
          console.log(e.message);
        }
        break;
      default:
        break;
    }
  }
}

export default WorkSpace;