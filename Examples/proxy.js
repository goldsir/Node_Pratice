let obj = { a: 10 };


let handler = {

    get(target, key, receiver) {

        console.log(proxy === receiver);
    }
}


let proxy = new Proxy(obj, handler);

proxy.a;