Function.prototype.call = function (context) {

    context = context ? Object(context) : window;

    context.fn = this;

    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(`${arguments[i]}`)
    }

    let r = eval('contenxt.fn(' + args + ')')
    delete context.fn;
}