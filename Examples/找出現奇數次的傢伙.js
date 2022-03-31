const arr = [1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 5]

let eor = 0;

for (let i = 0; i < arr.length; i++) {

    eor = eor ^ arr[i];
}

console.log(eor);