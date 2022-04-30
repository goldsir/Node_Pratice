let str = `https://www.bilibili.com/video/BV1Vf4y1T7bw?p=@`;

for (let i = 25; i <= 200; i++) {
    let _str = str.replace(/@/, i)
    console.log(_str);
}