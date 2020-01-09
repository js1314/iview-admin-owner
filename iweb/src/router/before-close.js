import {Modal} from 'view-design';

const beforeClose = {
  before_close_normal: (resolve) => {
    Modal.confirm({
      title: '确定要关闭当前页吗',
      onOk: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      }
    });
  }
};

export default beforeClose;
