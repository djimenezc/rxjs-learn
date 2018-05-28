
https://www.youtube.com/watch?v=PhggNGsSQyg&t=26s&list=WL&index=4

https://coursetro.com/posts/code/147/How-to-Install-RxJS---Setting-up-a-Development-Environment

# What is a Stream?
A stream in the RxJS world simply represents values over time. Users sending chat messages, a user clicking around on a page, a user filling out different formfields in a form; these all represent the basic concept of values (or events) that take place over a period of time.

So, a stream is simply a concept. One that's necessary to understand, however, because Observables are what facilitates a stream.

## Observables, Observers & Subscriptions
An observable is a function that produces a stream of values to an observer over time. 
When you subscribe to an observable, you are an observer.
An observable can have multiple observers.
This is the basic gist of the relationship between observables, observers and subscriptions. Of course, there are more details, which we'll look at closer.


## A Closer Look at Observers
Once again, observers read values coming from an observable. An observer is simply a set of callbacks that accept notifications coming from the observer, which include:

next
error
complete
Observers are called partial, which means you don't have to provide all three callbacks in order for it to work.

In our current example, we've only provided for the next callback. Let's modify our observable to emit some values with a call to .complete() between them, and then add the other two callbacks for error and complete: on the observer:

## Hot vs. Cold Observables
The next most important aspect of observables to understand is whether or not an observable is hot or cold.

A cold observable -- like the type we have been working with so far -- is an observable whose producer is activated once a subscription has been created.

In other words, a cold observable is an observable with a producer that's created inside of the observable. Whenever a new subscription is created, it will receive the same values, even the subscription was created at a different time.

An observable is hot when the producer is emitting values outside of the observable.

By adding the .share() operator, it will share the same source to multiple subscribers.

This is also useful because it results in only 1 network request if you're dealing with an API.

This is warm because we've converted our cold observable to a warm observable. A truly hot observable is one that emits values without a subscriber having subscribed to it. 

An example of a hot observable would be mouse movements made by a user.

You can use these creation operators that create observables in a variety of ways:

Of
FromEventPattern
FromEvent
FromPromise
Interval
Range
Timer
Empty
Throw
Never

## Creating a Subject

A Subject, in contrast to an observable, is simply an observer that's also able to emit values. It's both an observable and an observer simultaneously. This is unlike an observable, as an observer that's subscribed to an observable can only read values emitted from an observable.


### BehaviorSubject
We've just created a regular Subject, but what about BehaviorSubject?

BehaviorSubject is a special type of Subject whose only different is that it will emit the last value upon a new observer's subscription.

For instance, in the above example of a regular Subject, when Observer 2 subscribed, it did not receive the previously emitted value 'The first thing has been sent' -- In the case of a BehaviorSubject, it would. 

### ReplaySubject
Another variation of the Subject is a ReplaySubject.

It's like BehaviorSubject, except it allows you to specify a buffer, or number of emitted values to dispatch to observers. BehaviorSubject only dispatches the last emitted value, and ReplaySubject allows you to dispatch any designated number of values.

ReplaySubject accepts an optional second argument upon creation, which is referred to as the window time, and it's defined in milliseconds. It allows you to define a maximum number of events to return in the first argument, and the second argument is the time in milliseconds.

### AsyncSubject
This is the last subject variation, and it's perhaps the most simple to understand.

AsyncSubject only emits the very last value, and will only do so once .complete() has been called on the subject.


# What is an RxJS Operator?
Operators are simply methods that you can use on Observables (and Subjects) that allow you to change the original observable in some manner and return a new observable. These operators do not change the existing Observable; they simply modify it and return a new one. Operators are known as pure functions, which are functions that do not modify the variables outside of its scope.

You can also create a sequence of operators that will modify an incoming observable, output a new observable, and so on..

There are also two types of operators:

Static Operators
These operators are usually used to create observables. You will find these mainly under the creation operators.

Instance Operators
These are methods on observable instances. These account for the majority of RxJS operators that are used.

## Understanding Marble Diagrams
The official documentation uses marble diagrams to help you understand how a given operator modifies an observable.

Here's the official explanation of how a marble diagram works:

![Operators Image](marble-diagram.svg "Operators")
 
 In other words, at the top you have the original observable along with their events emitted from time that goes left to right. In the middle it states the name of the operator, and then the newly transformed observable is at the bottom.

 ## Using an Operator

 If you take a look at the official documentation for categories of operators, you would see that there are several categories to choose from:

* Creation
* Transformation
* Filtering
* Combination
* Multicasting
* Error Handling
* Utility
* Conditional & Boolean
* Mathematical and Aggregate
* 
Depending on what you want to do with the incoming observable, you would choose an operator from one of these categories.

Let's say that we wanted to merge two separate observables into one. This merge operator is combining two observables, so it falls under the Combination category. 

Here's what the marble diagram looks like for merge:

![Merge Operator](merge.png "Merge Operator")

### Map Operator

Map is one operator that you see a lot when working within Angular and API's. It simply allows you to take the input values and make some type of transformation.

### Pluck Operator 

Let's say your observable emits an array of objects with multiple properties, but you only need a single property?  Well, you can pluck that property from the original observable, and return a new observable with just that property:

### SkipUntil Operator

This operator is a little more complex than the previous examples. It allows you to start emitting events from one observable, based on when a second observable begins emitting events.