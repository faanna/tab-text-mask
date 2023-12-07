const main = document.querySelector('main');
const btns = main.querySelectorAll('ul li');
const boxes = main.querySelectorAll('article');

let enableClick = true;
const btnsDelay = convertSpeed(btns[0].querySelector('a'));
console.log(btnsDelay);
btns.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		// 활성화작업
		if (enableClick) {
			//  enableClick이 트루이어야지만 {}코드블록이 실행됩니다
			//실행되자마자 enableClick을 펄스로 바꾸어서 이벤트가 재실행되지 않도록
			enableClick = false;
			active(index);
		}
	});
});

function active(index) {
	//1. main의 클래스를 변경(bg1, bg2)
	main.className = `bg${index + 1}`;

	//2. ul li, article에 각각 on을 제거하고
	//내가 클릭한 대상(index)만 on을 붙이는작업

	//반복을 돌면서 ul li, article에서on을 제거
	//해당인덱스에만 on을 붙임

	//먼저 모든 대상에 클래스를 반복해서 지우고

	// for (let el of btns) el.classList.remove('on');
	// for (let el of boxes) el.classList.remove('on');

	document.querySelector('ul li.on').classList.remove('on');
	document.querySelector('article.on').classList.remove('on');

	btns[index].classList.add('on');
	boxes[index].classList.add('on');

	//반복문을 사용하게 되면 리소스를 잡아먹어요
	//쓸데없는 반복문을 사용하는 결과입니다

	//액티브 함수내용이 마친 이 곳
	//enableClick을 다시 트루로 변경합니다
	//반드시 이 변경은 위의 내용이 마친뒤에 순서대로 적용되어야합니다

	setTimeout(() => {
		enableClick = true;
	}, btnsDelay);
	//
}

boxes.forEach((el, index) => {
	spliTxt(el.querySelector('h2'));
});
function spliTxt(el) {
	const txt = el.innerText;
	const fragment = document.createDocumentFragment();
	let num = 0;
	for (let el of txt) {
		let span = document.createElement('span');
		span.style.transitionDelay = `${0.1 * num++}s`;
		span.textContent = el;
		fragment.appendChild(span);
	}
	el.innerText = ''; //지금 el은 아티클
	el.appendChild(fragment);
}
//DocumentFragment은 DOM을 조작할때 직접 리얼DOM에 조작하는것이
//아니라, 메모리에서만 DOM을 구성하고 실제 DOM은 구성이 완료된 이후
//완성된 DOM을 한번만 삽입하여 성능에 개선을 주는 메서드입니다
//h2태그안의 내용을 span으로 분리하는 작업을 직접DOM에서 하지않고
//메모리에서 한뒤 결과만 DOM에 직접 적용하고자 합니다

function convertSpeed(el) {
	const durations = parseFloat(getComputedStyle(el).transitionDuration) * 1000;

	const duration = getComputedStyle(el).transitionDuration.split('s');
	console.log(duration);

	return 4 * (duration[0] * 1000);

	//js에서 사용하는 시간, css에서 사용하는 시간
	//css 1s 1초 0.5s 0.5초  js에서는 1000이 1초
}
