let a = [555, 333, 888].sort((a, b) => {

    console.log(a, b);
    return (a - b) * -1

});

console.log(a);