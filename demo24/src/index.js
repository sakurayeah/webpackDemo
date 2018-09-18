import './css/index.less';

console.log(A_HOST, B_HOST)

$.ajax({
  url: `${A_HOST}/init.json`,
  data: {},
  type: 'GET',
  success: (d = {}) => {
    $('body').prepend(d.title);
  },
  error: () => {
    $('body').prepend('ajax error');
  }
});