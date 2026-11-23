const featureControls = document.querySelector('[data-feature-controls]');
const featureButtons = [...featureControls.querySelectorAll('button')];

for (const button of featureButtons) {
  button.addEventListener('click', () => {
    for (const option of featureButtons) {
      const selected = option === button;
      option.setAttribute('aria-pressed', String(selected));
      document.getElementById(option.getAttribute('aria-controls')).hidden = !selected;
    }
  });
}
featureControls.hidden = false;

const filterControls = document.querySelector('[data-filter-controls]');
const filterButtons = [...filterControls.querySelectorAll('button')];
const products = [...document.querySelectorAll('.product')];
const countLabel = document.querySelector('.result-count');
const plural = new Intl.PluralRules('ru');
const productForms = {one: 'продукт', few: 'продукта', many: 'продуктов', other: 'продукта'};

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    const platform = button.dataset.filter;
    for (const option of filterButtons) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    let count = 0;
    for (const product of products) {
      const visible = platform === 'all' || product.dataset.platforms.split(' ').includes(platform);
      product.hidden = !visible;
      if (visible) count++;
    }
    countLabel.textContent = count + ' ' + productForms[plural.select(count)];
  });
}
filterControls.hidden = false;
