import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { typeScript as ts } from './typeScript';
import { Logger } from './utilities';

const Hello: React.SFC<{ compiler: string, framework: string }> = (props) => {
  return (
    <div>
      <div>{props.compiler}</div>
      <div>{props.framework}</div>

      { console.warn('----------------- Playing with typescript -----------------') }

      {Logger.LogDirectlyInConsole('some message')()}
      {Logger.LogUsingLoggerLog('some message')()}
      {Logger.LogUsingLogSomeMessage()()}

      {/* ts.AsyncAwait() */}
      { ts.Promises(3000, 4) }
      { ts.Destructuring() }
      { ts.SpreadOperator() }
      { ts.ForOf() }
      { ts.TemplateStrings() }
      { ts.Generators() }
      { ts.DeclarationSpaces() }
      { ts.LazyModuleLoading() }

      { ts.UnionType('one string') }
      { ts.UnionType(['one', 'two', 'three']) }
      { ts.TupleType() }
      { ts.TypeAlias() }

      { ts.Enums() }
      { ts.FunctionOverloading() }
      { ts.Callable() }
      { ts.TypeAssertion() }
      { ts.TypeOf('some string') }
      { ts.LiteralTypes() }
      { ts.ReadOnly() }
      { ts.StructuralTypeCompatibility() }
      { ts.DiscriminatedUnions() }
      { ts.IndexSignatures() }
      { ts.DeclaringIndexSignatures() }
      { ts.MovingTypes() }
      { ts.Mixins() }
      { ts.StrictNullChecks() }

      { console.warn('----------------- Async calls ends below this line ----------------------') }
    </div>
  );
};

ReactDOM.render(
  <Hello compiler='TypeScript' framework='React' />,
  document.getElementById('root'),
);
