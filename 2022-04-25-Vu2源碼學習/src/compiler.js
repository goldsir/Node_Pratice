const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
const ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
const startTagOpen = new RegExp(("^<" + qnameCapture));
const endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
const startTagClose = /^\s*(\/?)>/;
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

/*
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const doctype = /^<!DOCTYPE [^>]+>/i;
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
*/



function parseHTML(html) {

    let root;
    let currentParent;
    let stack = [];

    function createASTElement(tagName, attrs) {

        return {
            tag: tagName
            , type: 1
            , attrs
            , parent: null
            , children: []
        }
    }

    /* 
        要校驗標籤是否正確 => <div><span></div> 少掉</span> , 標籤閉合不正確
    */

    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs);
        if (!root) {
            root = element;  // 第一個被解析出來的標籤就是根
        }

        let currentParent = stack[stack.length - 1]; //取最後一個做為父元素    

        if (currentParent) {// 棧中已有元素

            element.parent = currentParent;         // 互相連結
            currentParent.children.push(element);   // 產生父子關係
        }

        stack.push(element);
    }

    function chars(text) {
        text = text.replace(/\s/g, ''); // 刪空白
        if (text) {
            let currentParent = stack[stack.length - 1]; //取最後一個做為父元素      
            currentParent.children.push({ type: 3, text, parent: currentParent })
        }
    }

    function end(tagName) { // 結束標籤不會有attrs
        let element = stack.pop(); // 出棧
    }
    function advance(n) {
        html = html.substring(n);
    }

    while (html) // 不停解析html字符串, 匹配一點，刪除一點, 慢慢把html吃光, 直到html為''
    {
        let textEnd = html.indexOf('<');  // textEnd: 文本結束位置， 遇到角括號就是文本最後的位置

        if (textEnd == 0) {// < 在0的位置，就是一個標籤，但可能是開始標籤，也可能是結束標籤

            // 可能是開始標籤
            let startTagMatch = parseStartTag();
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }

            // 也可能是結束標籤   </div>
            let endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1]);
                continue;
            }
        }

        let text;
        if (textEnd > 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length)
            chars(text);
        }
    }

    function parseStartTag() {

        let start = html.match(startTagOpen);
        if (start) {
            advance(start[0].length)

            const match = {
                tagName: start[1]
                , attrs: []
            }

            let end, attr;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {

                //console.log(end);
                //console.log(attr)
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1]
                    , value: attr[3] || attr[4] || attr[5]
                })
            }
            if (end) {
                advance(end[0].length)
                return match
            }
        }
    }

    return root;
}

function genAttrs(attrs) {

    // style="color:red;background:blue"

    let str = '';

    for (let i = 0; i < attrs.length; i++) {

        let attr = attrs[i];
        if ('style' === attr.name) {

            let obj = {}
            attr.value.split(';').reduce((acc, cur) => {
                let [key, value] = cur.split(':');
                acc[key] = value;
                return acc
            }, obj);

            attr.value = obj
        }

        str += `${attr.name}:${JSON.stringify(attr.value)},`

    }

    return str.replace(/,$/, '');
}

function genChildren(children) {

    return children.map((child) => {

        return gen(child)

    }).join(',')
}

function gen(node) {

    if (node.type === 1) {

        return genCode(node)

    } else if (node.type === 3) {

        if (defaultTagRE.test(node.text)) { // 文本是帶變量的

            let tokens = [];

            //正則如果是全局模式/g， 使用前要把lastIndex置0
            let startIndex = defaultTagRE.lastIndex = 0;
            let match; // 每次匹配的結果
            while ((match = defaultTagRE.exec(node.text)) !== null) {
                let endIndex = match.index;
                if (endIndex > startIndex) {//由右往左看， 有文本
                    let text = node.text.slice(startIndex, endIndex);
                    text = JSON.stringify(text);
                    tokens.push(text);
                }

                let textVariable = `_s(${match[1].trim()})`;  // 花括號中的變量
                tokens.push(textVariable);
                startIndex = endIndex + match[0].length;
            }

            if (startIndex < node.text.length) { // 看一下有沒有剩下的文本尾巴
                let text = node.text.slice(startIndex);
                text = JSON.stringify(text);
                tokens.push(text);
            }

            return `_v(${tokens.join('+')})`

        } else {

            return `_v(${JSON.stringify(node.text)})`
        }
    }
}

function genCode(ast)  // 把ast語法樹轉一個字符串
{
    let code;

    /*
        _c  createElement
        _v  建立節點   
        _s  JSON.stringify 
    */

    // 開始很噁心的拼接, 還不能亂斷行
    code = `_c('${ast.tag}', ${ast.attrs.length ? '{' + genAttrs(ast.attrs) + '}' : 'undefined'}, ${ast.children ? genChildren(ast.children) : undefined})`;
    return code;
}

export function compileToFunction(template) {

    let astTree = parseHTML(template);

    let code = genCode(astTree);

    const render = new Function(`with(this){ return ${code}}`);  // 不要亂斷行， return會錯掉    

    return render;
}

/*

    將html轉換成ast語法樹
    可以用ast語法樹來描述語言本身
    通過ast語法樹生成新的代碼，還能對代碼加以優化

    <div id="app">
        <p>hello</p>
    </div>

    const astRoot = {
        tag: 'div'
        , attrs: [{ name: 'id', value: 'app' }]
        , parent: null
        , type: 1  // nodeType
        , children: [
            {
                tag: 'p'
                , attrs: []
                , parent: astRoot
                , type: 1  // nodeType
                , children: [
                    { type: 3, text: 'hello' }
                ]
            }
        ]
    }
*/
