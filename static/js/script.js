console.log('test');

var filterknop = document.querySelector('.f-knop');
var filterblok = document.querySelector('.filters');

function showKnop(){
	filterblok.classList.toggle('showfilters');
	console.log('testfunction');
}

filterknop.addEventListener('click', showKnop);

// console.log(filterblok)
// console.log(filterknop)
