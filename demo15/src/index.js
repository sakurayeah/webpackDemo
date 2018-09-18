import '../src/css/index.less';
import $ from 'jquery';
import bannerRender from '../src/js/banner';
import messageRender from '../src/js/message';

const $wrapper = $('.wrapper');

const init = () => {
  bannerRender($wrapper); // 引入banner部分
  messageRender($wrapper); // 引入message部分
}

init();