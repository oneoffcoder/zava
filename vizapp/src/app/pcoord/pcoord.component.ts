import {Component, Input} from '@angular/core';
import * as d3 from 'd3';
import {GrandTour} from '../zava.core';

@Component({
  selector: 'app-pcoord',
  templateUrl: './pcoord.component.html',
  styleUrls: ['./pcoord.component.scss']
})
export class PcoordComponent {

  pData: {headers: Array<string>, data: Array<Array<number>>, colors: Array<string>};

  @Input()
  get data(): {headers: Array<string>, data: Array<Array<number>>, colors: Array<string>} {
    return this.pData;
  }

  set data(data: {headers: Array<string>, data: Array<Array<number>>, colors: Array<string>}) {
    this.pData = data;
    this.init();
  }

  @Input()
  marginTop = 50;

  @Input()
  marginBottom = 10;

  @Input()
  marginRight = 10;

  @Input()
  marginLeft = 50;

  @Input()
  totalWidth = 960;

  @Input()
  totalHeight = 500;

  @Input()
  lineAttrs = new Map<string, string>([
    ['fill', 'none'],
    ['shape-rendering', 'crispEdges']
  ]);

  @Input()
  axisLabelAttrs = new Map<string, string>([
    ['text-anchor', 'middle'],
    ['y', '-9'],
    ['text-shadow', '0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff'],
    ['cursor', 'move'],
    ['fill', 'black']
  ]);

  line = d3.line();
  xScaler: any;
  yScalers: any;

  degree = 0;

  @Input()
  degreeDelta = 0.5;

  @Input()
  minScaling = 0.0;

  @Input()
  maxScaling = 100.0;

  grandTour: GrandTour;

  stopAnimation = true;
  timer: any;

  constructor() {
    this.pData = {
      headers: new Array<string>(),
      data: new Array<Array<number>>(),
      colors: new Array<string>()
    };
    this.grandTour = new GrandTour(this.pData.data);
  }

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

  public resetRotation(): void {
    if (!this.isValid()) {
      return;
    }

    this.degree = 0;
    this.doRotation();
  }

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

  public animateRotation(): void {
    if (!this.isValid()) {
      return;
    }

    this.stopAnimation = false;
    this.timer = setInterval(() => {
      if (this.stopAnimation === true) {
        clearInterval(this.timer);
      }
      this.rotateBackward();
    }, 100);
  }

  public stopRotation(): void {
    this.stopAnimation = true;
  }

  private isValid(): boolean {
    return this.pData && this.pData.data && this.pData.data.length > 0;
  }
}
