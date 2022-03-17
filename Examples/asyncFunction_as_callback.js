function delay(sec) {

    return new Promise((resolve, reject) => {
        setTimeout(resolve, sec * 1000);
    });
}

async function showTime() {

    console.log(new Date().toLocaleString());
    await delay(2)
    console.log(new Date().toLocaleString());
}

function go(cb) {
    console.log('start');
    cb()
    console.log('end');
}

go(showTime)