class Point {
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  debugString () {
    console.log(`Point is x:${this.x},y:${this.y}`);
  }

  static assignPoint (p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
  }

  static diffPoint (p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
  }

  static diffAxis (n1, n2) {
    return n1 - n2;
  }

  static copyPointValue (target, source) {
    target.x = source.x;
    target.y = source.y;
  }
}

export default Point;