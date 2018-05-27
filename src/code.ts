import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/share';

var observable = Observable.create((observer:any) => {
    try {
        observer.next('Hey guys!')
        observer.next('How are you?')
        setInterval(() => {
            observer.next('I am good')
        }, 2000)
    } catch (err) {
        observer.error(err)
    }
}).share()

const observer = observable.subscribe(
    (x:any) => addItem(x),
    (error:any) => addItem(error),
    () => addItem('Completed')
);


setTimeout(() => {
    var subscription2 = observable.subscribe(
        (x:any) => addItem('Subscriber 2: '+x)
    );
}, 1000);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}

