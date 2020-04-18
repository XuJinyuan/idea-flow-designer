export default {
  template:
    "  <div id=\"template\">\n" +
    "    <span>基础信息</span>\n" +
    "    <fieldset>\n" +
    "      <label class=\"label\">节点名称</label><input class=\"input\" v-model=\"data.name\"/><br>\n" +
    "      <label class=\"label\">节点名称</label>{{data.name}}<br>" +
    "      <label class=\"label\">节点ID</label><input class=\"input\" v-model=\"data.id\" disabled/><br>\n" +
    "      <label class=\"label\">节点类型</label>\n" +
    "      <select class=\"input\" v-model=\"data.type\">\n" +
    "        <option v-for=\"type in types\" v-model=\"type.type\">{{type.type}}</option>\n" +
    "      </select><br>\n" +
    "      <label class=\"label\">节点位置 X:</label><input class=\"input\" v-model=\"data.position.x+'px'\" disabled/><br>" +
    "      <label class=\"label\">节点位置 Y:</label><input class=\"input\" v-model=\"data.position.y+'px'\" disabled/><br>" +
    "    </fieldset>\n" +
    "    <span>参数信息</span>\n" +
    "    <fieldset>\n" +
    "      <div v-for='item in data.contains.params'>\n" +
    "        <label class=\"label\">{{item.pName}}({{item.pType}})</label><input class=\"input\" v-model=\"item.pValue\"/><br>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <span>节点连接信息</span>\n" +
    "    <fieldset>\n" +
    "      <ul>\n" +
    "        <li v-for=\"e in data.edges\">\n" +
    "          <div>标识:{{e.to}}</div>\n" +
    "          <div>名称:{{e.name}}</div>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <button class=\"btn\" @click='data.name+=\"T\"'>新增连接线</button>\n" +
    "    </fieldset>\n" +
    "  </div>",
};