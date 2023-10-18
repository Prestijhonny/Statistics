// Data structures: Array, list, dictionary, sorted list, hashset, sortedset, queue, stack, linkedlist

// Array
let arr = [0,10,22,31,441];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 22){
        break;
    }
}

for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 31){
        console.log(arr[i]);
        continue;
    }
}
let element = 100;
arr.push(element); // Add element
let index = 3;
arr.splice(index,1); // Remove one element at index 3 
arr[index-1]; // Get element by index
arr.includes(element); // Check existence of element

// List (simulated using Array in JavaScript)
// Same operations as Array

// Dictionary (JavaScript object)
const obj = {};
for (const key in obj) {
    if (key == someValue){
        break;
    }else{
        console.log(key);
        continue;
    }
}
let key = 42;
obj[key] = value; // Add key/value
let value = 18;
delete obj[key]; // Remove key/value
obj[key]; // Get value by key
obj.hasOwnProperty(key); // Check existence

// Sorted List (sort an Array in JavaScript)
// Same operations as Array, but maintain sorted order after add

// HashSet (using JavaScript Set)
const set = new Set();
element = 200;
for (const el in set) {
    if (el){
        //Do something
        break;
    }
    if (el == element){
        console.log(el);
        continue;
    }
}

set.add(element); // Add element
set.delete(element); // Remove element
set.has(element); // Check existence

// SortedSet (using an Array and sorting)
const sortedSet = [];
element = 13;
for (const elOrd in sortedSet) {
    if (elOrd){
        //Do something
        break;
    }
    if (elOrd == element){
        console.log(elOrd);
        continue;
    }
}

// Add element (and maintain sorted order)
sortedSet.push(element);
sortedSet.sort();
sortedSet.includes(element); // Check existence

// Queue (using Array)
const queue = [];
element = 109;
for (const el in queue) {
    if (el){
        //Do something
        break;
    }
    if (el == element){
        console.log(el);
        continue;
    }
}
queue.push(element); // Enqueue
queue.shift(); // Dequeue
queue[0]; // Get front element
queue.length > 0; // Check non-empty

// Stack (using Array)
const stack = [];
element = 11;
for (const stackEl in stack) {
    if (stackEl){
        //Do something
        break;
    }
    if (stackEl == element){
        console.log(stackEl);
        continue;
    }
}
stack.push(element); // Push
stack.pop(); // Pop
stack[stack.length - 1]; // Get top element
stack.length > 0; // Check non-empty

// LinkedList (custom implementation)
let linkedList = new LinkedList();
  
// add elements
linkedList.append(1);
linkedList.append(6);
linkedList.append(0);
 
// loop
linkedList.print();
 
// remove elements
linkedList.removeElement(0);
linkedList.removeElement(6);
  
// check existance
linkedList.exists(0);
 
// retrieve elements
console.log(linkedList.retrieve(2))