const _H2 = Symbol('H2');

class Color {
  static [_H2] () {
    return (((1 + Math.random()) * 0x100) | 0).toString(16).substring(1).toUpperCase();
  }

  //生成随机颜色
  static GenerateColor () {
    let H2 = this[_H2];
    return `#${H2()}${H2()}${H2()}`
  }
}

export default Color;