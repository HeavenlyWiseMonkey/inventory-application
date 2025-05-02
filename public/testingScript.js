const groceryname = document.getElementById('groceryname');
groceryname.value = 'alsdjfklasdjflk;asdjf;laksjdf;lkasjdkoiuweriuweorija;sdfzxc123'

const price = document.getElementById('price');
price.type = 'text';
price.value = 'apple';

const rating = document.getElementById('rating');
rating.value = -10;

const category = document.getElementById('categoryname');
const newCategory = document.createElement('option');
newCategory.value = 'Noodles';
newCategory.textContent = 'Noodles';
category.appendChild(newCategory);
newCategory.selected = 'true';

const company = document.getElementById('companyname');
const newCompany = document.createElement('option');
newCompany.value = 'Long Noodle Company';
newCompany.textContent = 'Long Noodle Company';
company.appendChild(newCompany);
newCompany.selected = 'true';

const image = document.getElementById('image');
image.required = false;