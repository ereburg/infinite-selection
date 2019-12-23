document.addEventListener("DOMContentLoaded", () => {
	// Add class to header on scroll
	const header = document.querySelector('.header');

	window.addEventListener('scroll', () => {
		let y = window.pageYOffset;

		if (y > 95) {
			header.classList.add('scroll');
		} else {
			header.classList.remove('scroll');
		}
	});


	// Search

	document.querySelector('#elastic').oninput = function () {
		let val = this.value.trim();
		let elasticItems = document.querySelectorAll('.elastic li');
		if (val != '') {
			elasticItems.forEach(function (elem) {
				if (elem.innerText.search(val) == -1) {
					elem.classList.add('hide');
					elem.innerHTML = elem.innerText;
				}
				else {
					elem.classList.remove('hide');
					let str = elem.innerText;
					elem.innerHTML = insertMark(str, elem.innerText.search(val), val.length);
				}
			});
		}
		else {
			elasticItems.forEach(function (elem) {
				elem.classList.remove('hide');
				elem.innerHTML = elem.innerText;
			});
		}
	};

	function insertMark(string, pos, len) {
		return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
	}

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