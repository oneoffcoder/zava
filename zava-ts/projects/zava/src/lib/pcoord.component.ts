import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import {GrandTour} from './zava.core';

/**
 * Parallel coordinate component.
 */
@Component({
  selector: 'lib-pcoord',
  template: `
    <div id="zavaDisplay"></div>
  `,
  styles: []
})
export class PcoordComponent {

  /**
   * Continuous data. Should have headers, data and colors for each record.
   */
  pData: {headers: Array<string>, data: Array<Array<number>>, colors: Array<string>};

  /**
   * Gets the data.
   */
  @Input()
  get data(): {headers: Array<string>, data: Array<Array<number>>, colors: Array<string>} {
    return this.pData;
  }

  /**
   * Sets the data.
   * @param data Data.
   */
  set data(data: {headers: Array<string>, data: Array<Array<number>>, colors: Array<string>}) {
    this.pData = data;
    this.init();
  }

  /**
   * Margin at the top.
   */
  @Input()
  marginTop = 50;

  /**
   * Margin at the bottom.
   */
  @Input()
  marginBottom = 10;

  /**
   * Margin to the right.
   */
  @Input()
  marginRight = 10;

  /**
   * Margin to the left.
   */
  @Input()
  marginLeft = 50;

  /**
   * Total width of SVG display.
   */
  @Input()
  totalWidth = 960;

  /**
   * Total height of SVG display.
   */
  @Input()
  totalHeight = 500;

  /**
   * Line attributes. These can be overridden with any valid
   * attributes for the SVG <line> element.
   */
  @Input()
  lineAttrs = new Map<string, string>([
    ['fill', 'none'],
    ['shape-rendering', 'crispEdges']
  ]);

  /**
   * Axis label attributes. These can be overriden with any valid
   * attributes for the SVG <text> element.
   */
  @Input()
  axisLabelAttrs = new Map<string, string>([
    ['text-anchor', 'middle'],
    ['y', '-9'],
    ['text-shadow', '0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff'],
    ['cursor', 'move'],
    ['fill', 'black']
  ]);

  /**
   * D3 line function to create a line from a list of (x, y) coordinates.
   */
  line = d3.line();

  /**
   * Scaler for the x-axis.
   */
  xScaler: any;

  /**
   * Dictionary of scalers for the y-axes.
   */
  yScalers: any;

  /**
   * The degree at which we have rotated to.
   */
  degree = 0;

  /**
   * The amount of rotation to change by.
   */
  @Input()
  degreeDelta = 0.5;

  /**
   * The minimum value to scale to.
   */
  @Input()
  minScaling = 0.0;

  /**
   * The maximum value to scale to.
   */
  @Input()
  maxScaling = 100.0;

  /**
   * Grand Tour instance that handles rotation.
   */
  grandTour: GrandTour;

  /**
   * Boolean to indicate if we should stop animation.
   */
  stopAnimation = true;

  /**
   * Timer handle for setInterval().
   */
  timer: any;

  /**
   * ctor.
   */
  constructor() {
    this.pData = {
      headers: new Array<string>(),
      data: new Array<Array<number>>(),
      colors: new Array<string>()
    };
    this.grandTour = new GrandTour(this.pData.data);
  }

  /**
   * Initialization.
   * @private
   */
  private init(): void {
    if (!this.isValid()) {
      return;
    }

    this.grandTour = new GrandTour(this.data.data);
    this.data.data = this.grandTour.rotate(this.degree);

    const margin = {
      top: this.marginTop,
      bottom: this.marginBottom,
      left: this.marginLeft,
      right: this.marginRight
    };

    const width = this.totalWidth - margin.left - margin.right;
    const height = this.totalHeight - margin.top - margin.bottom;

    const xScaler = d3.scaleLinear([0, this.data.headers.length], [0, width]);
    const yScalers = new Map<number, any>(this.data.headers.map((header, i) => {
      const domain = d3.extent(this.data.data, (row) => row[i]) as [number, number];
      const range = [height, 0];
      return [i, d3.scaleLinear(domain, range)];
    }));
    this.xScaler = xScaler;
    this.yScalers = yScalers;

    const svg = d3.select('div#zavaDisplay')
      .append('svg')
      .attr('id', 'zavaSvg')
      .attr('width', this.totalWidth)
      .attr('height', this.totalHeight)
      .attr('font', '10px sans-serif')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('g')
      .attr('class', 'lines')
      .selectAll('path')
      .data(this.data.data)
      .enter()
      .append('path')
      .attr('class', 'line-path')
      .attr('d', (row) => this.getLine(row))
      .attr('stroke', (row, index) => this.data.colors[index])
      .each((data, index, group) => {
        const item = d3.select(group[index]);
        for (const k of this.lineAttrs.keys()) {
          const v = this.lineAttrs.get(k) as string;
          item.attr(k, v);
        }
      });

    const dimensions = yScalers.values();
    const g = svg.selectAll('.dimension')
      .data(dimensions)
      .enter()
      .append('g')
      .attr('class', 'dimension')
      .attr('transform', (h, i) => `translate(${xScaler(i)})`);

    const axis = d3.axisLeft(d3.scaleLinear([0, this.data.headers.length], [0, width]));
    g.append('g')
      .attr('class', 'axis')
      .each((data, index, group) => {
        d3.select(group[index]).call(axis.scale(yScalers.get(index)));
      })
      .append('text')
      .text((e, i) => this.data.headers[i])
      .each((data, index, group) => {
        const item = d3.select(group[index]);
        for (const k of this.axisLabelAttrs.keys()) {
          const v = this.axisLabelAttrs.get(k) as string;
          item.attr(k, v);
        }
      });
  }

  /**
   * Do one rotation forward.
   */
  public rotateForward(): void {
    if (!this.isValid()) {
      return;
    }

    this.degree += this.degreeDelta;
    if (this.degree > 360) {
      this.degree = 0;
    }

    this.doRotation();
  }

  /**
   * Do one rotation backward.
   */
  public rotateBackward(): void {
    if (!this.isValid()) {
      return;
    }

    this.degree -= this.degreeDelta;
    if (this.degree < 0) {
      this.degree = 360;
    }

    this.doRotation();
  }

  /**
   * Reset the rotation.
   */
  public resetRotation(): void {
    if (!this.isValid()) {
      return;
    }

    this.degree = 0;
    this.doRotation();
  }

  /**
   * Do the rotation.
   * @private
   */
  private doRotation(): void {
    if (!this.isValid()) {
      return;
    }

    const data = this.grandTour.rotate(this.degree);
    this.data.data = data;

    d3.selectAll('.line-path')
      .data(this.data.data)
      .attr('d', (row) => this.getLine(row));
  }

  /**
   * Creates a visual (SVG) line from a row/record.
   * @param row Record.
   * @private
   */
  private getLine(row: number[]): string {
    const line = this.line;
    const xScaler = this.xScaler;
    const yScalers = this.yScalers;

    const toCoord = (v: number, c: number) => [xScaler(c), yScalers.get(c)(v)];
    const rowToCoord = (r: number[]) => r.map((v, c) => toCoord(v, c));
    const rowToLine = (r: number[]) => {
      const d = rowToCoord(r) as [number, number][];
      return line(d);
    };

    return rowToLine(row) as string;
  }

  /**
   * Starts the rotation animation.
   */
  public animateRotation(): void {
    if (!this.isValid() || this.stopAnimation === false) {
      return;
    }

    this.stopAnimation = false;
    this.timer = setInterval(() => {
      if (this.stopAnimation === true) {
        clearInterval(this.timer);
      }
      this.rotateForward();
    }, 100);
  }

  /**
   * Stops the rotation.
   */
  public stopRotation(): void {
    this.stopAnimation = true;
  }

  /**
   * Checks if the state of the component is valid for rendering.
   * @private
   */
  private isValid(): boolean {
    return this.pData && this.pData.data && this.pData.data.length > 0;
  }

}
