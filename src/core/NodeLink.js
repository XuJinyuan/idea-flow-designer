import Link from "./Link"

class NodeLink extends Link {
  constructor (fromNode, toNode, name, color) {
    super(fromNode.center, toNode.center, name, color);
    this.fromNode = fromNode;
    this.toNode = toNode;
    this.bindObserverFromNode(this.fromNode);
    this.bindObserverToNode(this.toNode);
    this.fromNode.addLinkToNode(this);
  }

  destroy () {
    this.fromNode.removeLinkFromNode(this);
    this.unbindObserverFromNode(this.fromNode);
    this.unbindObserverToNode(this.toNode);
    this.tar.parentNode.removeChild(this.tar);
  }

  exports () {
    return {
      to: this.toNode.id,
      name: this.name,
      id: this.id,
      type: '',
    }
  }

}

export default NodeLink;