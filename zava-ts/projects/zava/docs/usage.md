# Usage

`zava` was built as an Angular library and meant for use with Angular applications (`v11` or higher). 

## Installation

To use `zava` with your Angular application, install it from the `npm` [repository](https://www.npmjs.com/package/@oneoffcoder/zava).

```bash
npm i @oneoffcoder/zava @types/d3 @types/mathjs d3 mathjs --save-dev
```

## Module import

Go ahead and import `ZavaModule` into your `app.module.ts` file. A snippet is shown below.

```typescript
import {ZavaModule} from '@oneoffcoder/zava';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZavaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Component

In any of your component, you can now use the component.

```html
<zava-pcoord></zava-pcoord>
```

You might also want to add controls to animate the Grand Tour.

```html
<div id="zavaControls">
  <div>
    <button (click)="rotateForward()">Forward</button>
    <button (click)="rotateBackward()">Backward</button>
    <button (click)="resetRotation()">Reset</button>
  </div>
  <div>
    <button (click)="animateRotation()">Animation</button>
    <button (click)="stopRotation()">Stop Animation</button>
  </div>
</div>
```

Your backing TypeScript file can access the component using `@ViewChild`.

```typescript
@ViewChild(PcoordComponent) private pcoord: PcoordComponent;
```

The idea is then to set data on the component.

```typescript
ngAfterViewInit(): void {
    const data = this.getData();
    this.pcoord.data = data;
}

private getData(): {headers: Array<string>, data: Array<Array<number>>, colors: Array<string>} {
    headers = ['x1', 'x2'];
    data = [[1, 2], [3, 4], [5, 6]];
    colors = ['blue', 'green', 'black'];
    return {headers, data, colors};
}
```

Make sure you add handlers for the buttons.

```typescript
rotateForward(): void {
    this.pcoord.rotateForward();
}

rotateBackward(): void {
    this.pcoord.rotateBackward();
}

resetRotation(): void {
    this.pcoord.resetRotation();
}

animateRotation(): void {
    this.pcoord.startRotationAnimation();
}

stopRotation(): void {
    this.pcoord.stopAnimationRotation();
}
```

## Barebones Example

[A complete working example is available](https://github.com/oneoffcoder/zava/tree/ng-demo/demo).