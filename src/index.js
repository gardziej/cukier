var app = document.getElementById('app');
app.innerHTML = 'test';

if (module.hot) {
  module.hot.accept();
}
