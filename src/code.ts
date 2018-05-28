import { Observable } from "rxjs/Observable";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";

var subject = new ReplaySubject(30, 500)

subject.subscribe(
    data => addItem('Observer 1: '+ data),
    err => addItem(err),
    () => addItem('Observer 1 Completed')
)

var i = 1;
var int = setInterval(() => subject.next(i++), 100);

setTimeout(() => {
    var observer2 = subject.subscribe(
        data => addItem('Observer 2: '+ data)
    )
    clearInterval(int);
}, 500);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}

