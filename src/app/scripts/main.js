document.addEventListener('DOMContentLoaded', () => {
  // Add class to header on scroll
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    let y = window.pageYOffset;

    if (y > 1) {
      header.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
    }
  });


  // Search

  // Фильтрация по ключевым словам в поиске
  const inputSearch = document.querySelector('.search-input');
  const wrapper = document.querySelector('.sneakers-browse-container');
  const browseItem = document.querySelectorAll('.browse-item');


  function Check() {
    let counter = 0;
    let p = document.createElement('p');
    p.classList.add('added');
    p.textContent = `We tried hard and couldn't find anything...  But you can hire Eugene, if you like his work :)`;

    browseItem.forEach(e => {
      if (e.hasAttribute('hidden', '')) {
        counter++;
      }
    });

    let newEl = document.querySelector('.added');

    if (counter < browseItem.length && wrapper.contains(newEl)) {
      newEl.remove();
    } else if (counter >= browseItem.length && !wrapper.contains(newEl)) {
      wrapper.append(p);
    }
  }

  inputSearch && inputSearch.addEventListener('keyup', () => {
    let filter, browseItemTitle, browseItemTitleText;
    filter = inputSearch.value.trim().toUpperCase();

    for (let i = 0; i < browseItem.length; i++) {
      browseItemTitle = browseItem[i].querySelector('.releases-title'),
        browseItemTitleText = browseItemTitle.textContent || browseItemTitle.innerText,
        checkBrowseItem = browseItemTitleText.trim().toUpperCase().indexOf(filter) > -1;

      if (checkBrowseItem) {
        browseItem[i].removeAttribute('hidden', '');
        Check();
      } else {
        browseItem[i].setAttribute('hidden', '');
        Check();
      }


    }
  });

  // document.querySelector('#exampleInputText').oninput = function () {
  // 	let val = this.value.trim();
  // 	let elasticItems = document.querySelectorAll('.browse-item');
  // 	if (val != '') {
  // 		elasticItems.forEach(function (elem) {
  // 			if (elem.innerText.search(val) == -1) {
  // 				elem.classList.add('hide');
  // 				elem.innerHTML = elem.innerText;
  // 			}
  // 			else {
  // 				elem.classList.remove('hide');
  // 				let str = elem.innerText;
  // 				elem.innerHTML = insertMark(str, elem.innerText.search(val), val.length);
  // 			}
  // 		});
  // 	}
  // 	else {
  // 		elasticItems.forEach(function (elem) {
  // 			elem.classList.remove('hide');
  // 			elem.innerHTML = elem.innerText;
  // 		});
  // 	}
  // };

  // function insertMark(string, pos, len) {
  // 	return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
  // }

  // Validation

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('infinite-form-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
});
