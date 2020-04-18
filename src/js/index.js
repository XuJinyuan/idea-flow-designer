import WorkSpace from '../core/WorkSpace';
import templates from './templates';
import Vue from '../assets/libs/vue/vue.min';


function dataAdapter (sData) {
  let nodes = {};
  let links = [];
  const tNodes = sData.result.content.nodes;
  const tLayouts = sData.result.editingLayout;
  for (let n in tNodes) {
    let iNode = {};
    iNode = Object.assign({}, tNodes[n]);
    for (let l in (iNode.edges || {})) {
      if (!iNode.node_id || !iNode.edges[l].to_node_id) continue;
      let iLink = {};
      iLink.k = iNode.node_id;
      iLink.v = iNode.edges[l].to_node_id;
      links.push(iLink);
    }
    try {
      iNode.position = tLayouts[iNode.node_id].position;
    } catch (e) {
    }
    nodes[iNode.node_id] = iNode;
  }
  return {
    nodes,
    links
  }

}

function dataAdapterLocal (sData) {
  let nodes = {};
  let links = [];
  const tNodes = sData;
  for (let n in tNodes) {
    let iNode = {};
    iNode = Object.assign({}, tNodes[n]);
    for (let l in (iNode.edges || {})) {
      if (!iNode.id || !iNode.edges[l].to) continue;
      let iLink = {};
      iLink.k = iNode.id;
      iLink.v = iNode.edges[l].to;
      links.push(iLink);
    }
    nodes[iNode.id] = iNode;
  }
  return {
    nodes,
    links
  }

}


const run = () => {
  let vue;
  const workspace = new WorkSpace({
    'el': document.body,
    'node_templates': [
      {
        name: '起始节点',
        type: 'entry',
        icon: 'ic ic-flag',
        contains: {
          params: [],
          action: []
        }
      },
      {
        name: '结束节点',
        type: 'exit',
        icon: 'ic ic-flag-fill',
        contains: {
          params: [{pName: 'P1', pType: 'String', pValue: ''}],
          action: []
        }
      },
      {
        name: '判断节点',
        type: 'if',
        icon: 'ic ic-computer',
        contains: {
          params: [{pName: 'P1', pType: 'String', pValue: ''}],
          action: []
        }
      },
      {
        name: '示例节点1',
        type: 'demo1',
        icon: 'ic ic-stealth',
        contains: {
          params: [{pName: 'P1', pType: 'String', pValue: ''}],
          action: []
        }
      },
      {
        name: '示例节点2',
        type: 'demo2',
        icon: 'ic ic-stealth',
        contains: {
          params: [{pName: 'P1', pType: 'String', pValue: ''}],
          action: []
        }
      },
      {
        name: '示例节点3',
        type: 'demo3',
        icon: 'ic ic-stealth',
        contains: {
          params: [{pName: 'P1', pType: 'String', pValue: ''}],
          action: []
        }
      }
    ],
    dialog_templates: templates.template,
    dialog_open_callback (data) {
      vue = new Vue({
        el: '#template',
        data: data
      });
    },
    dialog_save_callback (data) {
      console.log(vue.data);
      console.log(data);
    }

  });
  let data;
  try {
    data = JSON.parse(localStorage.getItem('savedWorkSpaces') || '');
  } catch (e) {
    data = [];
  }
  let {nodes, links} = dataAdapterLocal(data);
  workspace.loadScene({nodes, links});

};
export default {
  run
}