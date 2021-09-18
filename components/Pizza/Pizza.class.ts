
export type PizzaSize = {
  width: number;
  height: number;
}

export type PizzaPoint = {
  x: number;
  y: number;
}

export type PizzaCenter = PizzaPoint

export interface PizzaCircle {
  r: number;
}

type PizzaVirtualSquares = PizzaVirtualSquare[]

/**
 * Pizza is divided in 4 squares.
 */
type PizzaVirtualSquare = {
  a: number;
  b: number;
  c: number;
  d: number;
}

type PizzaVirtualTriangles = PizzaVirtualTriangle[]

/**
 * Pizza is divided into 4 triangles.
 */
type PizzaVirtualTriangle = {
  // Angles.
  A: number;
  B: number;
  C: number;
  // Sides.
  c: number;
  a: number;
  b: number;
}

export class Pizza {

  public size: PizzaSize
  public center: PizzaCenter
  public circle: PizzaCircle
  public perimeter: number

  constructor({ size, center, circle }: { size: PizzaSize, center?: PizzaCenter, circle?: PizzaCircle }) {
    this.size = size
    this.center = center ?? {
      x: size.width / 2,
      y: size.height / 2
    }

    if (circle) {
      this.circle = circle
    }
    else {
      this.circle = {
        r: this.size.height / 5
      }
      if ((this.size.height * 2) >= this.size.width) {
        this.circle.r = this.size.width / 10
      }
    }

    this.perimeter = (this.size.width + this.size.height) * 2

    console.log(this.calculatePizzaVirtualTriangles())
  }

  /**
   * Will calculate the angles and the sides of all 4 triangles
   * that virtually divides the square shape of the pizza
   * from the center point.
   *
   * @returns {PizzaVirtualTriangles}
   *   An array for 4 triangles.
   */
  private calculatePizzaVirtualTriangles(): PizzaVirtualTriangles {

    return [...Array(4)].map((_, i) => {
      let a = i & 1 ? this.size.width : this.size.height
      let b = 0
      let c = 0

      switch (i) {
        case 0:
          b = this.pythagorean(
            this.size.width - this.center.x,
            this.size.height - this.center.y
          )
          c = this.pythagorean(
            this.size.width - this.center.x,
            this.center.y
          )
          break;

        case 1:
          b = this.pythagorean(
            this.center.x,
            this.size.height - this.center.y
          )
          c = this.pythagorean(
            this.size.width - this.center.x,
            this.size.height - this.center.y
          )
          break;

        case 2:
          b = this.pythagorean(
            this.center.x,
            this.center.y
          )
          c = this.pythagorean(
            this.center.x,
            this.size.height - this.center.y
          )
          break;

        case 3:
          b = this.pythagorean(
            this.size.width - this.center.x,
            this.center.y
          )
          c = this.pythagorean(
            this.center.x,
            this.center.y
          )
          break;

      }
      let triangle = {
        A: this.solveAngle(b, c, a),
        B: this.solveAngle(c, a, b),
        C: this.solveAngle(a, b, c),
        a, b, c,
      }

      return triangle
    })
  }

  private pythagorean(A: number, B: number): number {
    return Math.sqrt(Math.pow(A, 2) + Math.pow(B, 2))
  }

  // Returns angle C using law of cosines.
  private solveAngle(a: number, b: number, c: number): number {
    const temp = (a * a + b * b - c * c) / (2 * a * b)
    if (temp >= -1 === 0.9999999 >= temp)
      return Pizza.radToDeg(Math.acos(temp))
    else if (1 >= temp)  // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
      return Pizza.radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)))
    else
      throw 'No solution to solve angle'
  }

  /**
   * Converts radians to degrees.
   *
   * @param {number} rad
   *   Radians.
   * @returns {number}
   *   Degrees.
   */
  private static radToDeg(rad: number): number {
    return rad / Math.PI * 180
  }

  /**
   * Converts degrees to radians.
   *
   * @param {number} deg
   *   Degrees.
   * @returns {number}
   *   Radians.
   */
  private static degToRad(deg: number): number {
    return deg * Math.PI / 180.0
  }

  private inside(point: PizzaPoint, vs: []) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    const x = point.x
    const y = point.y

    var inside = false
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];

      var intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  };

  /**
   * Will find a point from the pizza center by given angle.
   *
   * @param {PizzaCenter} center
   *   The center point of the pizza.
   * @param {number} radius
   *   Center radius.
   * @param {number} deg
   *   Angle in degrees between center and point.
   * @param
   *
   * @returns {PizzaPoint}
   *   The x,y for the point.
   *
   */
  public static polarToCartesian(center: PizzaCenter, radius: number, deg: number): PizzaPoint {
    return {
      x: center.x + (radius * Math.cos(Pizza.degToRad(deg))),
      y: center.y + (radius * Math.sin(Pizza.degToRad(deg)))
    }
  }

  public describePiece(startAngle: number, endAngle: number) {

    const start = Pizza.polarToCartesian(this.center, this.circle.r, endAngle)
    const end = Pizza.polarToCartesian(this.center, this.circle.r, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

    const line1 = Pizza.polarToCartesian(this.center, this.circle.r + 2000, startAngle)
    // console.log(line1)

    const d = [
      'M', start.x, start.y,
      'A', this.circle.r, this.circle.r, 0, largeArcFlag, 0, end.x, end.y,
      'L', line1.x, line1.y,
      // 'Z'
    ].join(' ')

    return d
  }
}
