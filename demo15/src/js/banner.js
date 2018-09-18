import '../css/banner.less';
import bannerTpl from '../tpl/banner.atpl';

// html
const render = ($wrapper) => {
    $wrapper.append(bannerTpl({}));
}

// 事件
const bindEvents = ($wrapper) => {
    // 点击发送按钮发送输入框内容
    $wrapper.on('click', '.btn', () => {
        const $ipt = $wrapper.find('.ipt');
        const $messageWrap = $wrapper.find('.message-wrap');
        const val = $ipt.val();
        // 当input有内容的时候才允许发送
        if ($ipt.length && val.length) {
            $messageWrap.prepend(`<li>${val}</li>`);
            // 发送完后清空input的val
            $ipt.val('');
        }
    })
}

export default function ($wrapper) {
    render($wrapper);
    bindEvents($wrapper);
}