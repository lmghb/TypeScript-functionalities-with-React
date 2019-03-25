
export class typeScript {

  /*
  notations allowed:

  static FunctionName = (): void => {}
  static FunctionName(): void {}
   */

  // ES6 https://basarat.gitbooks.io/typescript/content/docs/destructuring.html
  public static Destructuring(): void {
    const rect = { a: "string", x: 0, y: 10, width: 15, height: 20 };

    // ---------------------------------------------------
    // Destructuring assignment:
    const { a } = rect;
    console.log(`Destructuring assignment: a = ${a}`);

    let { x, y, width, height } = rect;
    console.log("Destructuring assignment:", x, y, width, height); // 0,10,15,20

    rect.x = 10;
    ({ x, y, width, height } = rect); // assign to existing variables using outer parentheses
    console.log("Destructuring assignment:", x, y, width, height); // 10,10,15,20

    // ---------------------------------------------------
    // Object Destructuring with rest:
    const { w, d, ...remaining } = { w: 1, d: 2, y: 3, z: 4 };
    console.log("Object Destructuring with rest:", w, d, remaining); // 1, 2, {y:3,z:4}
  }

  // https://basarat.gitbooks.io/typescript/content/docs/spread-operator.html
  public static SpreadOperator(): void {
    // ---------------------------------------------------
    const foo = (x: number, y: number, z: number) => { };
    const args = [0, 1, 2];
    // foo(...args);

    // ---------------------------------------------------
    // Object spread:
    const point2D = { x: 1, y: 2 };
    const anotherPoint3D = { x: 5, z: 4, ...point2D };
    console.log("Object spread:", anotherPoint3D); // {x: 1, y: 2, z: 4}
    const yetAnotherPoint3D = { ...point2D, x: 5, z: 4 };
    console.log("Object spread:", yetAnotherPoint3D); // {x: 5, y: 2, z: 4}
  }

  // https://basarat.gitbooks.io/typescript/content/docs/for...of.html
  public static ForOf(): void {
    const someArray = [9, 2, 5];
    console.log("For of:");
    for (const item of someArray) {
      console.log(item); // 9,2,5
    }
  }

  // https://basarat.gitbooks.io/typescript/content/docs/iterators.html
  public static Iterators(): void {
    interface Iterator<T> {
      next(value?: any): IteratorResult<T>;   // <reference lib="es2015.iterable" />
      return?(value?: any): IteratorResult<T>;
      throw?(e?: any): IteratorResult<T>;
    }
  }

  // https://basarat.gitbooks.io/typescript/content/docs/template-strings.html
  public static TemplateStrings(): void {

    // ---------------------------------------------------
    // String interpolation:
    const lyrics = 'Never gonna give you up';
    const htmlLyrics = `<div>${lyrics}</div>`;

    console.log(`String interpolation: 1 and 1 make ${1 + 1}`);

    // ---------------------------------------------------
    // Multiline Strings:
    // instead of: "Never gonna give you up\nNever gonna let you down"
    const brokenLyrics = `Never gonna give you up
Never gonna let you down`;

    // ---------------------------------------------------
    // Tagged Templates:
    const say = "a bird in hand > two in the bush";
    const html = this.htmlEscape`<div> I would just like to say : ${say}</div>`;
    console.log(`Tagged Templates: ${html}`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/promise.html
  public static Promises(waitMilliseconds: number, result: number): void {
    new Promise<number>((resolve, reject) => {
      console.log("Promises", new Date().toLocaleString("pl-PL"));

      setTimeout(() => {
        reject("rejected");
        resolve(result);
      }, waitMilliseconds);
    })
      .then(result => console.log(`Promises: ${new Date().toLocaleString("pl-PL")}, result ${result}`))
      .catch(reason => console.error(`Promises: ${new Date().toLocaleString("pl-PL")}, error - ${reason}`));

    console.warn(`Promises: ${new Date().toLocaleString("pl-PL")}, after all - don't wait for end of async method call`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/generators.html
  public static Generators(): void {

    function* infiniteSequence() {
      let i = 0;
      while (true) {
        yield i++;
      }
    }

    const sequence = infiniteSequence();

    let i = sequence.next(); console.log(`Generators: { ${i.value}, ${i.done} }`);
    i = sequence.next(); console.log(`Generators: { ${i.value}, ${i.done} }`);
    i = sequence.next(); console.log(`Generators: { ${i.value}, ${i.done} }`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/async-await.html
  // public static AsyncAwait = async (): Promise<number> => {
  public static async AsyncAwait(): Promise<number> {
    const delay = async (waitMilliseconds: number, result: number): Promise<number> => {
      return new Promise<number>((resolve, reject) => {

        setTimeout(() => {
          // reject("rejected");
          resolve(result);
        }, waitMilliseconds);
      });
    };

    console.log("AsyncAwait:", new Date().toLocaleString("pl-PL"));
    const result = await delay(2000, 3)
      .then(result => {
        console.log("AsyncAwait:", new Date().toLocaleString("pl-PL"), result);
        return result;
      })
      .catch((reason) => {
        console.error(`AsyncAwait: ${new Date().toLocaleString("pl-PL")}, error - ${reason}`);
        return 0;
      });

    console.warn(`AsyncAwait: ${new Date().toLocaleString("pl-PL")}, ${result} - wait for end of async method call`);

    return result;
  }

  public static DeclarationSpaces(): void {
    class Foo { }
    interface Bar { }
    interface Bas {}

    // ---------------------------------------------------
    // Type Declaration Space
    const foo = Foo; const fooInstance = new foo();
    // var bar = Bar; // ERROR: "cannot find name 'Bar'"
    // var bas = Bas;

    // ---------------------------------------------------
    // Variable Declaration Space
    let foo2: Foo;
    let bar2: Bar;
    let bas2: Bas;
  }

  // https://basarat.gitbooks.io/typescript/content/docs/project/external-modules.html
  // Use case: Lazy loading
  public static LazyModuleLoading(): void {

    // var a = new Promises.PendingPromise();
    // require(['path-to-module'], (_foo: typeof Promises.PendingPromise) => {
    // });
    // require(['./Utilities'], (utility: any) => {
    //     utility.Log("some log");
    // });

    import("./utilities").then((utilities: any) => {
      utilities.Logger.Log("LazyModuleLoading: dynamically loaded Utilities module");
    });

    import(/* webpackChunkName: "momentjs" */ "moment")
      .then((moment: any) => {
        // lazyModule has all of the proper types, autocomplete works,
        // type checking works, code references work \o/
        const time = moment.default().format();
        console.log(`LazyModuleLoading: TypeScript >= 2.4.0 Dynamic Import Expression: ${time}`);
      })
      .catch((err) => {
        console.error("Failed to load moment", err);
      });
  }

  // https://basarat.gitbooks.io/typescript/docs/types/type-system.html
  // Union Type
  public static UnionType(command: string[] | string) {
    let line: string = "";
    if (typeof command === "string") {
      line = `UnionType: command is simple string - ${command.trim()}`;
    } else {
      line = `UnionType: command is array of strings - ${command.join(" ").trim()}`;
    }

    // Do stuff with line: string
    console.log(line);
  }

  // Intersection Type
  // public static IntersectionType<T, U>(first: T, second: U): T & U {
  //     let result = <T & U> {};

  //     for (let id in first) {
  //         result[id] = first[id];
  //     }

  //     for (let id in second) {
  //         if (!result.hasOwnProperty(id)) {
  //             result[id] = second[id];
  //         }
  //     }

  //     return result;
  // }

  // Tuple Type
  public static TupleType(): void {
    let nameNumber: [string, number];
    nameNumber = ["Jenny", 219837];
    console.log(`TupleType: ['Jenny', 219837] -> ${nameNumber}`);

    const [name, num] = nameNumber;
    console.log(`TupleType with destructuring: [name, num] = nameNumber -> ${name}, ${num}`);
  }

  // Type Alias
  public static TypeAlias(): void {
    type Action = () => void;
    interface Func<P, R> {
      (param: P): R;
      (...params: P[]): R;
    }
    type numOrName = number | string;

    let myAction: Action; // = () => {};
    const nn: numOrName = "name this time";
    myAction = () => {
      console.log("TypeAlias: `type Action = () => void;`, `type numOrName = number|string;`");
    };

    let myFunc: Func<number, number>;
    myFunc = (param: number) => {

      console.log("TypeAlias: `interface Func<P, R> { (param: P): R }`");
      return param;
    };

    myAction();
    myFunc();
  }

  // https://basarat.gitbooks.io/typescript/docs/enums.html
  public static Enums(): void {

    enum Color {
      Red = 1,     // 1
      Green,   // 2
      Blue,     // 3
    }

    console.log(`Enums: color red - ${Color.Red}`);

    enum AnimalFlags {
      None = 0,         // 000
      HasClaws = 1 << 0,    // 001
      CanFly = 1 << 1,    // 010
    }

    console.log(`Enums: AnimalFlags.HasClaws - ${AnimalFlags.HasClaws}`);

    enum StringEnums {
      None = "None",
    }

    console.log(`Enums: StringEnums.None - ${StringEnums.None}`);

    const enum ConstEnums {
      False,
      True,
      Unknown,
    }
    const constEnum = ConstEnums.Unknown;

    // disable it by 'preserveConstEnums' setting in tsconfig.json
    console.log(`Enums: const enums - TS compiles to js as 'var constEnum = 2;' instead of 'var constEnum = ConstEnums.Unknown;'`);
    console.log(`Enums: use 'enum + namespace' to add static methods to an enum`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/functions.html
  public static FunctionOverloading(): void {

    // overload signatures:
    function padding(all: number): void;
    function padding(topAndBottom: number, leftAndRight: number): void;
    function padding(top: number, right: number, bottom: number, left: number): void;

    // function implementation:
    function padding(a: number, b?: number, c?: number, d?: number): void {
      console.log(`FunctionOverloading: a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
    }

    padding(1);
    padding(1, 2);
    padding(1, 2, 3, 4);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/callable.html
  public static Callable(): void {
    type Overloaded = (foo: string) => string;

    const str: Overloaded = (a: string) => a;
    console.log(`Callable: interface Overloaded { (foo: string): string; } -> ${str("something")}`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/type-assertion.html
  public static TypeAssertion(): void {
    interface Foo {
      bar: number;
      bas: string;
    }

    const foo = { bar: 1, bas: "string" } as Foo;
    console.log(`TypeAssertion: var foo = {bar: 1, bas: "string"} as Foo -> {${foo.bar}, ${foo.bas}}, dont use <string>foo syntax`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/typeGuard.html
  public static TypeOf(x: number | string): void {
    if (typeof x === "string") {
      console.log(`TypeOf: inside "typeof x === 'string'" block -> ${x.substr(1)}`);
    }

    console.log(`TypeOf: outside "typeof x === 'string'" block property substr does not exist`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/literal-types.html
  public static LiteralTypes(): void {
    let readOnly: boolean | "true" | "false" | 1 | 0;
    // readOnly = 'something'; // Error: not assignable
    // readOnly = -2;          // Error: not assignable
    type DayOfWeek = 'Monday' | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    let dayOfWeek: DayOfWeek;
    dayOfWeek = "Monday";

    console.log(`LiteralTypes: let readOnly: boolean | 'true' | 'false' | 1 | 0;`);
    console.log(`LiteralTypes: type DayOfWeek = 'Monday' | 'Tuesday' |...; let dayOfWeek: DayOfWeek;`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/readonly.html
  public static ReadOnly(): void {
    // readonly properties:
    interface Foo {
      readonly bar: number;
      readonly bas: number;
    }
    const foo: Foo = { bar: 123, bas: 456 };

    // readonly index:
    interface IBar {
      readonly [x: number]: number;
    }
    const bar: IBar = { 0: 123, 2: 345 };
    console.log("ReadOnly: index - 'readonly[x: number]: number;'");

    // ReadonlyArray
    const bas: ReadonlyArray<number> = [1, 2, 3];
    console.log("ReadOnly: 'let bas: ReadonlyArray<number> = [1, 2, 3];'");

    // class getter:
    class Person {
      public firstName: string = "John";
      public lastName: string = "Doe";
      get fullName() {
        return this.firstName + this.lastName;
      }
    }
    const person = new Person();
    console.log(`ReadOnly: getter - persons fullName is '${person.fullName}'`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/type-compatibility.html
  public static StructuralTypeCompatibility(): void {
    interface Point2D {
      x: number;
      y: number;
    }
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }
    const point2D: Point2D = { x: 0, y: 10 };
    const point3D: Point3D = { x: 0, y: 10, z: 20 };
    function iTakePoint2D(point: Point2D) { console.log(`StructuralTypeCompatibility: iTakePoint2D(${JSON.stringify(point)})`); }

    console.log(`StructuralTypeCompatibility: point2D and point3D without inheritance - iTakePoint2D(point2D); iTakePoint2D(point3D);`);

    iTakePoint2D(point2D); // exact match okay
    iTakePoint2D(point3D); // extra information okay
    // iTakePoint2D({ x: 0 }); // Error: missing information `y`
  }

  //
  public static DiscriminatedUnions() {
    interface Square {
      kind: "square";
      size: number;
    }

    interface Rectangle {
      kind: "rectangle";
      width: number;
      height: number;
    }

    // Someone just added this new `Circle` Type
    // We would like to let TypeScript give an error at any place that *needs* to cater for this
    interface Circle {
      kind: "circle";
      radius: number;
    }

    type Shape = Square | Rectangle | Circle;

    function Area(s: Shape): number {
      switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default:
          const _exhaustiveCheck: never = s;  // when new class appears and not included here
          return _exhaustiveCheck;            // not all code paths return a value
      }
    }

    const area = Area(/* Shape */{ kind: "circle", radius: 20 });
    console.log(`DiscriminatedUnions: Area(/* Shape */{ kind: "circle", radius: 20 }) = ${area}`);
  }

  // index signatures:
  public static IndexSignatures(): void {
    const obj = { toString: () => "Hello" };
    const foo: any = {};

    // foo[obj] = 'World'; // Type '{ toString: () => string; }' cannot be used as an index type.
    foo[obj.toString()] = "World";
    foo[1] = "Galaxy";

    console.log(`IndexSignatures: TypeScript index signatures must be either string or number - foo[obj.toString()] = ${foo[obj.toString()]}`);
  }

  public static DeclaringIndexSignatures(): void {
    interface Bar {
      [key: string]: number;
      giraffe: number;      // giraffe will be required and must be a number because of index signature
      // z: string;   // ERROR: Property `z` must be of type number
    }
    // let bar: Bar = { x: 2, y: 3, z: 5 }; // Property 'giraffe' is missing in type '{ x: number; y: number; z: number; }' but required in type 'Bar'.
    const bar: Bar = { x: 2, y: 3, z: 5, giraffe: 23 };
    console.log(`DeclaringIndexSignatures: bar = ${JSON.stringify(bar)}, bar['x'] = ${bar.x}`);

    // limited set of string literals:
    type Index = "a" | "b" | "c";
    type FromIndex = { [k in Index]?: number };
    // let foo: FromIndex = { b: 2, d: 4 };            // Type '{ b: number; d: number; }' is not assignable to type 'FromIndex'
    const foo: FromIndex = { b: 2 };
  }

  // https://basarat.gitbooks.io/typescript/content/docs/types/moving-types.html
  public static MovingTypes(): void {

    // -------------- type of variable ---------------
    class Foo { }
    const Bar = Foo;
    // var bar: Bar; // ERROR: cannot find name 'Bar'

    let foo = 123;
    let bar: typeof foo; // `bar` has the same type as `foo` (here `number`)
    bar = 456; // Okay
    // bar = '789'; // ERROR: Type `string` is not `assignable` to type `number`
    console.log(`MovingTypes: type of variable - 'let bar: typeof foo;'`);

    // -------------- type of a class member ---------------
    class Bas {
      public bas: number = 0; // some member whose type we want to capture
    }

    // Purely to capture type
    let _foo: Bas;

    // Same as before
    let bas: typeof _foo.bas;
    console.log(`MovingTypes: type of class member - 'let bas: typeof _foo.bas;'`);

    // -------------- type of a magic strings ---------------
    // Capture both the *type* and *value* of magic string:
    const hello = "Hello World";

    // Use the captured type:
    let justHello: typeof hello;

    // bar can only ever be assigned to `Hello World`
    justHello = "Hello World"; // Okay!
    // justHello = "anything else "; // Error!
    console.log(`MovingTypes: type of magic strings - 'const hello = "Hello World"; justHello = "anything else "; // Error!'`);

    // -------------- key names ---------------
    const colors = {
      red: "red",
      blue: "blue",
    };
    type Colors = keyof typeof colors;

    let color: Colors; // same as let color: "red" | "blue"
    color = "red"; // okay
    color = "blue"; // okay
    // color = 'anythingElse'; // Error
    console.log(`MovingTypes: key names - 'type Colors = keyof typeof colors;'`);
  }

  public static Mixins(): void {

    type Constructor<T = {}> = new (...args: any[]) => T;

    class Base {

    }

    function Timestamped<TBase extends Constructor>(base: TBase) {
      return class extends base {
        public timestamp = Date.now();
      };
    }

    const TimestampedBase = Timestamped(Base);
    const w = new TimestampedBase();

    console.log(`Mixins: function Timestamped<TBase extends Constructor>(base: TBase); const TimestampedBase = Timestamped(Base); let w = new TimestampedBase();`);
  }

  // https://basarat.gitbooks.io/typescript/content/docs/options/strictNullChecks.html
  public static StrictNullChecks(): void {
    // --------------- Definite Assignment Assertion Operator ---------------
    class C {
      private foo!: number;   // only for strictNullChecks
      // ^ exclamation mark - this var is initialized somewhere else than the constructor

      constructor() {
        this.initialize();
      }

      public initialize(): void {
        this.foo = 1;
      }
    }

    console.log("StrictNullChecks: definite assignment assertion - 'private foo!: number;'");
  }

  private static htmlEscape(literals: TemplateStringsArray, ...placeHolders: string[]): string {
    let result = "";

    // interleave the literals with the placeholders
    for (let i = 0; i < placeHolders.length; i++) {
      result += literals[i];
      result += placeHolders[i]
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    // add the last literal
    result += literals[literals.length - 1];
    return result;  // "<div> I would just like to say : a bird in hand &gt; two in the bush</div>"
  }
}
