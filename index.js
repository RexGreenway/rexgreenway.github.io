

// Show the content
console.log('CONTENT: ', content)


function animate_dropdown(element, dropdown) {
  // Chevron Animation
  element.classList.toggle('transition');
  // Dropdown Animation
  dropdown.classList.toggle("show");
};

function create_menu(content_json) {
  // Create Menu
  const menu = document.createElement('div');
  menu.classList.add('menu');
  for (let [key, val] of Object.entries(content_json)) {
    // CREATE MENU ITEM
    const has_children = Object.hasOwn(val, 'children');

    const item = document.createElement('div');
    item.classList.add('item');

    const symbol = document.createElement('p');

    const item_text = document.createElement('p');
    item_text.innerHTML = `<p class="item-text">${val.title}</p>`;

    item.append(symbol, item_text);
    
    // IF has_children THEN create DROPDOWN:
    if (has_children) {
      // Create correct symbol:
      symbol.classList.add('chevron', 'symbol');
      symbol.setAttribute('onclick', `animate_dropdown(this, ${key})`);
      symbol.innerHTML = `<span class="material-symbols-outlined">chevron_right</span>`;

      // CREATE DROPDOWN
      const dropdown = document.createElement('div');
      dropdown.classList.add('dropdown');
      dropdown.id = key

      const vl = document.createElement('div');
      vl.classList.add('vl', 'symbol');

      const sub_menu = create_menu(val.children);

      dropdown.append(vl, sub_menu);

      menu.append(item, dropdown);
    } else {
      symbol.classList.add('dash', 'symbol');
      symbol.innerHTML = `<span class="material-symbols-outlined">remove</span>`;

      menu.append(item);
    };
  
  };
  return menu;

};

const nav_wrapper = document.getElementById('nav-wrapper');
nav_wrapper.append(create_menu(content));
