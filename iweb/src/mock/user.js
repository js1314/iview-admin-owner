export const user_detail = () => {
  return {
    msg: 'success',
    code: 200,
    result: {
      id: 1,
      name: 'iview-admin-owner',
      token: 'iview-admin-owner',
      logo: 'logo.png'
    }
  };
};

export const user_list = () => {
  return {
    msg: 'success',
    code: 200,
    result: [{
      id: 1,
      name: 'iview-admin-owner',
      token: 'iview-admin-owner',
      logo: 'logo.png'
    }]
  };
};
