import '../css/message.less';
import messageTpl from '../tpl/message.atpl';

export default function ($wrapper) {
  $wrapper.append(messageTpl({}));
}