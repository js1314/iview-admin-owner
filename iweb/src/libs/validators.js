import {scrollTop} from '@/libs/util';

export default {
  /**
   * 聚焦到表单验证的第一个错误元素上
   */
  focus() {
    window.setTimeout(() => {
      let itemErr = document.querySelector('.ivu-form-item-error');
      let content = document.querySelector('.content-wrapper');
      scrollTop(content, content.scrollTop, itemErr.getOffsetTop(content));
    }, 10);
  },
  /**
   * 价格
   * @param token
   * @returns {Function}
   */
  price(token = '') {
    return (rule, value, callback) => {
      if (!value && value != 0) {
        callback(new Error("请输入" + token));
      } else if (value <= 0) {
        callback(new Error(token + "必须大于0"));
      } else {
        callback();
      }
    };
  },
  /**
   * 折扣
   * @param token
   * @returns {Function}
   */
  discount(token = '', decimal = 2) {
    return (rule, value, callback) => {
      if (!value && value != 0) {
        callback(new Error("请输入" + token));
      } else if (value < 0 || value > 10) {
        callback(new Error(token + "必须在0至10以内"));
      } else if (decimal == 0 || parseInt(value, 10) == value || (new RegExp('^[0-9]+\\.[0-9]{1,' + decimal + '}$')).test(value)) {
        callback();
      } else {
        callback(new Error(token + "最多只能保留" + decimal + '位小数'));
      }
    };
  }
};
