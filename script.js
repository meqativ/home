const createEnterHandle = (element) => (e) => { if ((e.keyCode ? e.keyCode : e.which) == '13' && document.activeElement === element) document.activeElement.click(e); }
const wait = (ms) => new Promise(res => setTimeout(res, ms));
const scrollIntoView = (el) => el["scrollIntoViewIfNeeded" in el ? "scrollIntoViewIfNeeded" : "scrollIntoView"]({ behavior: "smooth", block: "start" });
const setDisabledOfChildButtonsTo = (parent, state) => { for (const child of parent.children) child.disabled = state };

// https://stackoverflow.com/questions/24969383
function absorbEvent(event) {
	let e = event || window.event;
	e.preventDefault && e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

// if JS is enabled in the browser replace all of the <a></a> elements with a button that was inside it 
document.querySelectorAll(".buttons > a").forEach((anchor) => {
	const button = anchor.children[0];
	const link = anchor.getAttribute("href");
	if (button.nodeName && button.nodeName.toLowerCase() !== 'button') return;
	if (link !== "#") button.setAttribute("onclick", `window.open(${JSON.stringify(link)})`);

	anchor.replaceWith(button);
})

const bio_elem = document.querySelector("h3#bio"),
	uaflag = document.querySelector("span#ua_flag");

function updateAge(element) {
	const age = ~~((new Date() - new Date("2007-03-13T08:25:00+0200")) / (1000 * 60 * 60 * 24 * 365.25));
	if (element === true) return age; // !!

	if (element) return (element.innerText = age);
	bio_elem.innerHTML = `a Ukrainian ${uaflag.outerHTML} <span id="age">${age}</span> y.o.`;
	uaflag.remove()
}
try { updateAge(); } catch (e) {
	console.error(e);
	alert(`Age update error:\n${e?.stack ?? e}`);
}
const tg_btn = document.querySelector("button#tg"),
	tg_btns = document.querySelector("div.telegram-btns"),
	tg_btn_arrow = document.querySelector("button#tg div:last-child"),
	[tg_text_1, tg_text_2] = document.querySelectorAll("button#tg h3"),
	button_height = "4rem";

tg_btn.onclick = "";
tg_btn_arrow.style.display = ""; // show if js enabled
tg_btns.style.display = ""; // show if js enabled


// there is probably alot of redundant stuff left but                    
tg_btn.addEventListener("click", (e) => {
	if (!tg_btn_arrow.matches(":hover, :focus")) return window.open(`https://t.me/meqativ`);
	absorbEvent(e);
	if /* close the fold */ (tg_btns.getAttribute("closed") === "false") {
		tg_btn_arrow.style.transform = "rotate(0turn)";
		tg_btns.setAttribute("closed", "true");
		setDisabledOfChildButtonsTo(tg_btns, true);
		tg_text_2.style = "width: 0px; opacity: 0; text-align: center; font-size: 0px";
		tg_text_1.style = "width: 100%; opacity: 1;";
		return
	}
	/* open the fold */
	tg_btn_arrow.style.transform = "rotate(-.25turn)";
	tg_btns.setAttribute("closed", "false");
	setDisabledOfChildButtonsTo(tg_btns, false);
	tg_text_1.style = "width: 0px; opacity: 0; font-size: 0px;";
	tg_text_2.style = "width: 100%; opacity: 1; text-align: center;";
	setTimeout(() => scrollIntoView(tg_btns), 300);
});

const x_btn = document.querySelector("button#x"),
	close_btn = document.querySelector("button#x div:last-child"),
	btn_title = document.querySelector("button#x h3");

close_btn.style.display = "";  // show if js enabled
x_btn.appendChild(close_btn);
x_btn.onclick = "";
btn_title.innerHTML = btn_title.innerHTML.slice(0, -2);

x_btn.addEventListener("click", async () => {
	if (!close_btn.matches(":hover, :focus")) return window.open(`https://x.com/meqativ`);
	x_btn.style.height = "0px";
	x_btn.style.opacity = "0";
	await wait(275);
	x_btn.remove();
});

const lib_text = document.getElementById("lib_text"),
	src_btn = document.getElementById("src_btn");
let lib_text_enter_handle = createEnterHandle(lib_text)
function showSourceCodeButton(e) {
	absorbEvent(e);
	with (src_btn) {
		style.opacity = "";
		style.position = "";
		style.height = "";
		setAttribute("tabindex", "0");
		focus();
	}
	with (lib_text) {
		innerText = "made with no libraries";
		classList.remove("pointer");
		removeEventListener("click", showSourceCodeButton);
		document.removeEventListener("keyup", lib_text_enter_handle);
		setAttribute("tabindex", "");
	}
};
with (src_btn) {
	style.opacity = "0";
	style.position = "absolute";
	style.height = "0px";
	setAttribute("tabindex", "-1");
}
with (lib_text) {
	setAttribute("tabindex", "0");
	classList.add("pointer");
	innerHTML += "<br/>press me"
	addEventListener("click", showSourceCodeButton);
	document.addEventListener("keyup", lib_text_enter_handle);
}

const usvgs = document.querySelectorAll('usvg');

usvgs.forEach(async (usvg) => {
	const source = await fetch(usvg.getAttribute('src'))
		.catch(console.error)
		.then(res => res.text());

	const temp = document.createElement('usvg-pending');
	temp.innerHTML = source;

	usvg.replaceWith(temp.querySelector('svg'));
	temp.remove()
});
