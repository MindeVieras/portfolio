
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

export class Pizza {

  public size: PizzaSize
  public center: PizzaCenter
  public circle: PizzaCircle

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
  }

  /**
   * Will find a point from center by the angle.
   *
   * @param centerX
   *   The x of the center.
   * @param centerY
   *   The y of the center.
   * @param radius
   *   Center radius.
   * @param angleInDegrees
   *   Angle in degrees between center and point.
   *
   * @returns {PizzaPoint}
   *   The x,y for the point.
   *
   */
  public static polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = angleInDegrees * Math.PI / 180.0

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    }
  }

  public static describePiece(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

    const start = Pizza.polarToCartesian(x, y, radius, endAngle)
    const end = Pizza.polarToCartesian(x, y, radius, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

    const line1 = Pizza.polarToCartesian(x, y, radius + 2000, startAngle)

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', line1.x, line1.y,
      // 'Z'
    ].join(' ')

    return d
  }
}
