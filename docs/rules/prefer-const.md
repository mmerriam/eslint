# Suggest using `const` (prefer-const)

If a variable is never reassigned, using the `const` declaration is better.

`const` declaration tells readers, "this variable is never reassigned," reducing cognitive load and improving maintainability.

## Rule Details

This rule is aimed at flagging variables that are declared using `let` keyword, but never reassigned after the initial assignment.

Examples of **incorrect** code for this rule:

```js
/*eslint prefer-const: "error"*/
/*eslint-env es6*/

// it's initialized and never reassigned.
let a = 3;
console.log(a);

let a;
a = 0;
console.log(a);

// `i` is redefined (not reassigned) on each loop step.
for (let i in [1, 2, 3]) {
    console.log(i);
}

// `a` is redefined (not reassigned) on each loop step.
for (let a of [1, 2, 3]) {
    console.log(a);
}
```

Examples of **correct** code for this rule:

```js
/*eslint prefer-const: "error"*/
/*eslint-env es6*/

// using const.
const a = 0;

// it's never initialized.
let a;
console.log(a);

// it's reassigned after initialized.
let a;
a = 0;
a = 1;
console.log(a);

// it's initialized in a different block from the declaration.
let a;
if (true) {
    a = 0;
}
console.log(a);

// it's initialized at a place that we cannot write a variable declaration.
let a;
if (true) a = 0;
console.log(a);

// `i` gets a new binding each iteration
for (const i in [1, 2, 3]) {
  console.log(i);
}

// `a` gets a new binding each iteration
for (const a of [1, 2, 3]) {
  console.log(a);
}

// `end` is never reassigned, but we cannot separate the declarations without modifying the scope.
for (let i = 0, end = 10; i < end; ++i) {
    console.log(a);
}

// suggest to use `no-var` rule.
var b = 3;
console.log(b);
```

## Options

```json
{
    "prefer-const": ["error", {"ignoreMixedDestructuring": false}]
}
```

* `ignoreMixedDestructuring` (`boolean`) -
  The flag to ignore variables inside of destructuring if the variables are a mix of reassigned and never reassigned.
  Default is `false`.

### ignoreMixedDestructuring

Examples of **incorrect** code for the default `{"ignoreMixedDestructuring": false}` option:

```js
/*eslint prefer-const: 2*/
/*eslint-env es6*/

let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
a = a + 1;
```

Examples of **correct** code for the default `{"ignoreMixedDestructuring": false}` option:

```js
/*eslint prefer-const: 2*/
/*eslint-env es6*/

// using const.
const {a: a0, b} = obj;
const a = a0 + 1;

// all variables are reassigned.
let {a, b} = obj;
a = a + 1;
b = b + 1;
```

Examples of **incorrect** code for the `{"ignoreMixedDestructuring": true}` option:

```js
/*eslint prefer-const: 2*/
/*eslint-env es6*/

let {a, b} = obj;    /*error 'a' is never reassigned, use 'const' instead.
                             'b' is never reassigned, use 'const' instead.*/
```

Examples of **correct** code for the `{"ignoreMixedDestructuring": true}` option:

```js
/*eslint prefer-const: 2*/
/*eslint-env es6*/

// 'b' is never reassigned, but '{a, b}' is a mix of reassigned and never reassigned.
let {a, b} = obj;
a = a + 1;
```

## When Not To Use It

If you don't want to be notified about variables that are never reassigned after initial assignment, you can safely disable this rule.

## Related Rules

* [no-var](no-var.md)
