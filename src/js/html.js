import Link from '../assets/libs/inspur/Link';
import Point from '../assets/libs/inspur/Point';
import Node from '../assets/libs/inspur/Node';
import TestData from './TestData'

const run = () => {
    const spaces = document.getElementById('fd-spaces');
    let nodes = {};
    let links = [];
    const tNodes = TestData.nodes().nodes;
    const tLayouts = TestData.layouts();
    for (let n in tNodes) {
        let iNode = {};
        iNode = Object.assign({}, tNodes[n]);
        for (let l in iNode.edges) {
            let iLink = {};
            iLink.k = iNode.id;
            iLink.v = iNode.edges[l].to;
            links.push(iLink);
        }
        delete iNode.edges;
        iNode.position = tLayouts[iNode.id].position;
        nodes[iNode.id] = iNode;
    }
    let realNodes = {}
    let realLinks = {}
    for (let i in nodes) {
        let node = new Node(
            new Point(nodes[i].position.left, nodes[i].position.top),
            nodes[i].description,
            i,
        );
        node.addToWorkSpaces(spaces);
        realNodes[i] = node;
    }
    for (let i in links) {
        let link = new Link(
            realNodes[links[i].k].center,
            realNodes[links[i].v].center,
        );
        link.addToWorkSpaces(spaces);
        link.bindObserverFromNode(realNodes[links[i].k]);
        link.bindObserverToNode(realNodes[links[i].v]);
        realLinks[i] = link;
    }
    let dragged;
    document.addEventListener("drag", function (event) {

    }, false);
    document.addEventListener("dragstart", function (event) {
        dragged = event.target;
        event.target.style.opacity = 1.5;
    }, false);

    document.addEventListener("dragend", function (event) {

    }, false);
    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function (event) {
    }, false);

    document.addEventListener("dragleave", function (event) {

    }, false);
    document.addEventListener("drop", function (event) {
        event.preventDefault();
        if (event.target.className == "spaces") {
            console.log(event);
            let node = new Node(
                new Point(event.clientX, event.clientY),
                dragged.getAttribute('data-name'),
            );
            node.addToWorkSpaces(spaces);
            realNodes[node.id] = node;
        }

    }, false);

};
export default {
    run
}


let a = [{
    "name": "起始节点",
    "id": "E558FD23-4B07-231E-9968-209725E5E5B0",
    "type": "entry",
    "edges": [{
        "to": "BA1A972B-E186-018A-B0B2-D0995CEE3F5E",
        "name": "起始节点 至 结束节点",
        "type": ""
    }, {"to": "5EE4A895-1E19-B06F-567E-0575BB521C06", "name": "起始节点 至 示例节点3", "type": ""}],
    "position": {"x": 418, "y": 128}
}, {
    "name": "结束节点",
    "id": "BA1A972B-E186-018A-B0B2-D0995CEE3F5E",
    "type": "exit",
    "edges": [{"to": "B14E8A9A-E9A7-E2AA-F640-714970BB1AB3", "name": "结束节点 至 结束节点", "type": ""}],
    "position": {"x": 833, "y": 225}
}, {
    "name": "结束节点",
    "id": "B14E8A9A-E9A7-E2AA-F640-714970BB1AB3",
    "type": "exit",
    "edges": [{"to": "A063321F-CB15-13B0-0105-8D66735E62A7", "name": "结束节点 至 示例节点1", "type": ""}],
    "position": {"x": 580, "y": 510.5}
}, {
    "name": "起始节点",
    "id": "A49D3787-408B-2D84-6EF8-97D34970905A",
    "type": "entry",
    "edges": [{"to": "B14E8A9A-E9A7-E2AA-F640-714970BB1AB3", "name": "起始节点 至 结束节点", "type": ""}],
    "position": {"x": 1154, "y": 277}
}, {
    "name": "结束节点",
    "id": "84AC4EBE-C537-B0FC-0D98-8B7CAEABE55B",
    "type": "exit",
    "edges": [{"to": "878140A9-AFE7-5E9C-1B3E-CD9DF29F7638", "name": "结束节点 至 判断节点", "type": ""}],
    "position": {"x": 1006, "y": 475.5}
}, {
    "name": "判断节点",
    "id": "878140A9-AFE7-5E9C-1B3E-CD9DF29F7638",
    "type": "if",
    "edges": [],
    "position": {"x": 922, "y": 646.5}
}, {
    "name": "示例节点1",
    "id": "A063321F-CB15-13B0-0105-8D66735E62A7",
    "type": "demo_node_1",
    "edges": [],
    "position": {"x": 740, "y": 797}
}, {
    "name": "示例节点2",
    "id": "678D235B-23FA-58E2-51FA-9D6F9184F827",
    "type": "demo_node_2",
    "edges": [{"to": "B14E8A9A-E9A7-E2AA-F640-714970BB1AB3", "name": "示例节点2 至 结束节点", "type": ""}],
    "position": {"x": 338, "y": 858.5}
}, {
    "name": "示例节点3",
    "id": "5EE4A895-1E19-B06F-567E-0575BB521C06",
    "type": "demo_node_3",
    "edges": [],
    "position": {"x": 231, "y": 525}
}, {
    "name": "示例节点3",
    "id": "776E4F03-6B4E-9874-3763-C329AB1E51C5",
    "type": "demo_node_3",
    "edges": [{"to": "B1D97D4E-9AF4-01FA-6EF9-85AEA7C8646C", "name": "示例节点3 至 示例节点2", "type": ""}],
    "position": {"x": 1188, "y": 825}
}, {
    "name": "示例节点2",
    "id": "B1D97D4E-9AF4-01FA-6EF9-85AEA7C8646C",
    "type": "demo_node_2",
    "edges": [],
    "position": {"x": 956, "y": 918.5}
}]