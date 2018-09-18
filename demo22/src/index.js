import './css/index.less';

$.ajax({
  url: '/init.json',
  data: {},
  type: 'GET',
  success: (d = {}) => {
    $('body').prepend(d.title);
  },
  error: () => {
    $('body').prepend('ajax error');
  }
});