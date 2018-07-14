import Link from '../assets/libs/inspur/Link';
import Point from '../assets/libs/inspur/Point';
import Node from '../assets/libs/inspur/Node';
import Dialog from '../assets/libs/inspur/Dialog';
import Vue from '../assets/libs/vue/vue.min';
import TestData from './data_example.js';
import templates from './templates'
import WorkSpace from "../assets/libs/inspur/WorkSpace";
const data=TestData.data;
const dialog=new Dialog();

const callback=function (event,data) {
    switch (event.target.getAttribute('data-name')) {
        case 'edit':
            dialog.show({
                id: data.description,
                value:templates.template,
            });
            let vue=new Vue({
                el: '#template',
                data: data
            });
            break;
        default:
            break;
    }
};
const run = () => {
    const spaces = new WorkSpace();
    let nodes = {};
    let links = [];
    const tNodes = data.result.content.nodes;
    const tLayouts =data.result.editingLayout;
    for (let n in tNodes) {
        let iNode = {};
        iNode = Object.assign({}, tNodes[n]);
        for (let l in (iNode.edges||{})) {
            if(!iNode.node_id||!iNode.edges[l].to_node_id)continue;
            let iLink = {};
            iLink.k = iNode.node_id;
            iLink.v = iNode.edges[l].to_node_id;
            links.push(iLink);
        }
        try{
            iNode.position = tLayouts[iNode.node_id].position;
        }catch (e){}
        nodes[iNode.node_id] = iNode;
    }
    let realNodes = {};
    let realLinks = {};
    for (let i in nodes) {
        let pos=nodes[i].position||{left:0,top:0};
        let node = new Node(
            new Point(pos.left, pos.top),
            nodes[i].description,
            i,
            nodes[i].node_type,
            nodes[i],
            {
                click:callback
            }
        );
        node.addToWorkSpaces(spaces);
        realNodes[i] = node;
    }
    for (let id in links) {
        let link=new Link(
            realNodes[links[id].k].center,
            realNodes[links[id].v].center,
        );
        link.addToWorkSpaces(spaces);
        link.bindObserverFromNode(realNodes[links[id].k]);
        link.bindObserverToNode(realNodes[links[id].v]);
        realLinks[id]=link;
    }
    let dragged;
    document.addEventListener("drag", function( event ) {

    }, false);
    document.addEventListener("dragstart", function( event ) {
        dragged = event.target;
    }, false);
    document.addEventListener("dragend", function( event ) {

    }, false);
    document.addEventListener("dragover", function( event ) {
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function( event ) {
    }, false);

    document.addEventListener("dragleave", function( event ) {

    }, false);
    document.addEventListener("drop", function( event ) {
        event.preventDefault();
        if (event.target.className === "spaces") {
            let node=new Node(
                new Point(event.clientX, event.clientY),
                dragged.getAttribute('data-name'),
                undefined,
                dragged.getAttribute('data-name'),
            );
            node.addToWorkSpaces(spaces);
            realNodes[node.id]=node;
        }

    }, false);
};
export default {
    run
}