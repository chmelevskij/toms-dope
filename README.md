Plan
====
1. FP Concepts.
  1. higher order functions
  2. Partial application and Curry
  3. Pipe and compose.
3. Non React example.
4. HOC's
5. Simple HOC.
6. Styled-components, recompose, redux?
7. Build an app, todo? just native or web as well.

FP Concepts
-----------

### Higher Order Functions

First off all it's good to touch on some basic FP concepts. Main ideas for this
talk are "Higher Order Functions", currying and will touch a little bit on partial
application.

From Wikipedia
> Higher-order function is a function that does at least one of the following:
>   - takes one or more functions as arguments
>   - returns a function as its result

So the basic idea is that functions are just another type which we can pass around.

### Partial application and Currying

Often confused and for a reason. Let's quickly touch on those. First partial
application. What it does is taking taking function of multiple arguments, and
binding one of them. While currying does similar thing, but it takes a function
taking multiple arguments and creates a function chain returning function with
one argument. When using functions of arity of 2 they both look the same so let
me show little example with arity of 3.

Partial Aplication:
```javascript
var _add  = (x, y, z) => x + y + z
var add5 = _add.bind(null, 5)
add5()     // -> NaN
add5(1)    // -> Nan
add5(1, 2) // -> 8
```

Currying:
```javascript
var _add = (x, y, z) => x + y + z
var add  = _.curry(_add) // -> a => b => c => a + b + c
var add5 = add(5)
add5()     // -> b => c => 5 + b + c
add5(1)    // -> c => 5 + 1 + c
add5(1)(2) // -> 8
```
So the main idea is that if you write a function with arity > 1 curry it.

### Pipe and Compose

So the last piece of the puzzle is pipe and compose. Bash users users might
have used this idea, simple example would be:

```sh
$ history | grep docker
```

This will take the output of history and put it put it into grep command. (Show
and example live?) While JS doesn't provide such functionality in the language
(yet, there is stage-1) it's possible to create our own function for it. Let's
tackle that in multiple steps.  Given three functions `piping` them would
simply mean passing results into each other.

```javascript
var add1   = x => x + 1
var double = x => x * 2
var square = x => x * x

square(double(add1(2))) // -> 36
```

While this is tottally valid and acceptable it has flaws. One of the biggest ones
is that functions are applied left to right and it's quite hard to see where
data actually enters the pipeline. Another is that we can't easily reuse all of
the functions combined. While we could wrap all of them in another function
like:

```javascript
var calculate = x => square(double(add1(x)))
```

If we have another set of functions it becomes quite tedious and error prone.
To tackle this problem we can write a little helper called `pipe` which would
take multiple functions and apply them left to right, building a similar
function to calculate which can later on be used as a function. Let's think
this problem through. Our function has to accept multiple a list of functions
and pass result of the previous one into the next one. First let's build
function which does the last step.

```javascript
var _pipe = (f, g) => x => g(f(x))
_pipe(add1, double)(2) // -> 6
```

So while this allows piping one function output to the other one it's still
limited to 2 functions only. So if we try to do `_pipe(add1, double,
square)(2)` we still will get 6 back. So we need annother function to tackle
the list of functions and applying them to each other.

```javascript
var pipe = (...os) => os.reduce(_pipe)
var calculate = pipe(add1, double, square)
calculate(2) // -> 36
```

Somehow Practical Example
-------------------------

So now with knowledge about currying and piping we can write a simple app which
uses both of the concepts to build up bigger system ou of smaller components.
Sorry got carried away with it but will quickly show just these concepts
applied to non-react project.  But the good part is that we will be able to
reuse some of this.
[SHOW THE QUICK DEMO]

HOC's
-----

So just like higher order functions in plain Js Higher Order Components have
very similar properties. It's a function which accepts a component and returns
a component. Usually injecting some sort of functionality or adding extra props.
For example we can create a component which capitalizes all letters.

```jsx
const Title = props => <h1>{props.children}</h1>
const toUpper = Comp => ({children, ...props}) => <Comp {...props}>{children.toUpperCase()}</Comp>
const UpperTitle = toUpper(Title)

const App = () => (
  <div style={styles}>
    <Title> Tom </Title>
    <UpperTitle> Tom2 </UpperTitle>
  </div>
);
```

One of the biggest contributors to popularizing this pattern is `redux` it's
connect does exactly that. It takes a component and returns a component.

### Recompose

It's pretty much lodash for React. The best part is that you can actually mix
and match some functions between the two.
[Recompose](https://github.com/acdlite/recompose#recompose)

### Styled-components

I was sceptical about it when I first saw it but this is where it shines IMO.
It creates styled functional components which later on can be enhanced with
required functionality.
[Styled Components](https://www.styled-components.com/docs/basics#adapting-based-on-props)

Pizza Example
-------------

So I've rebuild previous example with all the components.

### Resources
1. [Higher Order Function - Wikipedia](https://en.wikipedia.org/wiki/Higher-order_function)
2. [Pipe Function in Javascript - Neerthigan S - Medium](https://medium.com/@venomnert/pipe-function-in-javascript-8a22097a538e)
3. [Pipeline operator - TC39](https://github.com/tc39/proposal-pipeline-operator)
4. [HOC's](https://hackernoon.com/higher-order-components-hocs-for-beginners-25cdcf1f1713)
