const {I} = inject();

Given('я регистрируюсь', () => {
  I.amOnPage('/register');

  const table = {
    rows: [
      {cells: [{value: 'email'}, {value: 'user2@user'}]},
      {cells: [{value: 'password'}, {value: '123'}]},
      {cells: [{value: 'displayName'}, {value: 'User2'}]},
    ],
  };

  I.attachFile('div input[type=file]', 'test_data/user.png');

  table.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.click('REGISTER', {css: 'form'});
  I.wait(1);

  return I.see('Registered successful!');
});

Given('я залогиненный {string}', (role) => {
  I.amOnPage('/login');

  const email = role === 'администратор' ? 'admin@admin' : 'user@user';
  const table = {
    rows: [
      {cells: [{value: 'email'}, {value: email}]},
      {cells: [{value: 'password'}, {value: '123'}]},
    ],
  };

  table.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.click('SIGN IN', {css: 'form'});
  I.wait(1);

  return I.see('Login successful!');
});