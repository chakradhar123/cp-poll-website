const another = document.getElementById('ano');
let did1 = document.getElementById(`o1`);
let did2 = document.getElementById(`o2`);
did1.addEventListener('click', () => {
	did1.parentElement.outerHTML = '';
});
did2.addEventListener('click', () => {
	did2.parentElement.outerHTML = '';
});

let o = 2;
let i = 3;

another.addEventListener('click', () => {
	let k = o + 1;
	let optionclass = document.getElementById(`option${o}`);

	optionclass.outerHTML += `<div class="cen" id="os${i}"><input type="text" name="option[${i}]" placeholder="option" required><span id="o${i}">X</span></div> <div id="option${k}"></div>`;
	let did = document.getElementById(`o${i}`);
	did.addEventListener('click', () => {
		did.parentElement.outerHTML = '';
	});
	i++;
	o++;
});
