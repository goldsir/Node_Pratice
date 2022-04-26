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
    let stack = []
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
        currentParent = element;
        stack.push(element);
    }
    function chars(text) {
        text = text.replace(/\s/g, ''); // 刪空白
        if (text) {
            currentParent.children.push({ type: 3, text })
        }

    }
    function end(tagName) { // 結束標籤不會有attrs
        let element = stack.pop(); // 取出最後一個

        if (tagName == element.tag) {
            currentParent = stack[stack.length - 1];

            if (currentParent) {
                element.parent = currentParent  // 在標籤閉合時可以知道父親是誰
                currentParent.children.push(element)
            }
        }
        else {
            throw new Error('HTML不正確')  // 標籤閉合不正確
        }
    }
    function advance(n) {
        html = html.substring(n);
    }

    while (html) // 不停解析html字符串, 匹配一點，刪除一點, 慢慢把html吃光, 直到html為''
    {
        let textEnd = html.indexOf('<');

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

export function compileToFunction(template) {

    let astTree = parseHTML(template);

    console.log(astTree);

    return function render(h) {   // h是什麼呢??



    }
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
