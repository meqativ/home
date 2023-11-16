function create_enter_handle(element) {
 return (e) => {
   if ((e.keyCode ? e.keyCode : e.which) == '13' && document.activeElement === element) document.activeElement.click(e);
  }
 }
function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

// https://stackoverflow.com/questions/24969383
function absorbEvent(event) {
	var e = event || window.event;
	e.preventDefault && e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

function unwrapAnchorButton(anchor) {
	const { 
		children: [button], 
		href: link 
	} = anchor;

	button.setAttribute("onclick", `window.open(${JSON.stringify(link)})`);
	anchor.replaceWith(button);
}

// if js is enabled in the browser replace all of the <a></a> elements with a button that was inside it 
document.querySelectorAll(".buttons > a").forEach(function unwrapAnchorButton(anchor) {
	const { 
		children: [button], 
		href: link 
	} = anchor;
    if (button.nodeName && button.nodeName.toLowerCase() !== 'button') return;
	button.setAttribute("onclick", `window.open(${JSON.stringify(link)})`);
	anchor.replaceWith(button);
})

const bio_elem = document.querySelector("h3#bio");

// passing true to element basically makes the function b called getAge
function updateAge(element) {
	const age = ~~((new Date() - new Date("2007-03-13T08:25:00")) / (1000 * 60 * 60 * 24 * 365.25));
	if (element === true) return age;
	
	if (element) return (element.innerText = age);
	bio_elem.innerHTML = `a Ukrainian ${document.querySelector("span#ua_flag").outerHTML} <span id="age">${age}</span> y.o.`;
}
try { updateAge(); } catch (e) { 
	alert("Failed while updating the age\nError: " + e);
	console.error(e);
}
const age = document.querySelector("span#age"),
	onlyfans_btn = document.querySelector("button#onlyfans"),
	btns = document.querySelector(".buttons");

let last,
	font_size = 2;
onlyfans_btn.style.display = ""; // show the button if js enabled
onlyfans_btn.addEventListener("click", () => {
	if (last) clearTimeout(last);
	if (age) updateAge(age);
	if (!age || age.innerText > 18) return window.open("https://media.tenor.com/iHAv4WoNo2kAAAAC/gotcha-bitch.gif");
	age["scrollIntoViewIfNeeded" in age ? "scrollIntoViewIfNeeded" : "scrollIntoView"]
			({ behavior: "smooth", block: "start" })
	if (font_size < 8) return (age.style = `font-size: ${(font_size *= 4)}rem;`);
	age.style.animation = "look 2s";
	age.addEventListener(
		"animationend",
		() => {
			age.style.animation = "";
		},
		{ once: true }
	);

	// revert to normal font size
	last = setTimeout(() => {
		font_size = 1;
		age.style = ``;
		last = undefined;
	}, 10 * 1000);
});

const tg_btn = document.querySelector("button#tg"),
	tg_btns = document.querySelector("div.telegram-btns"),
	tg_btn_arrow = document.querySelector("button#tg div:last-child"),
	[tg_text_1, tg_text_2] = document.querySelectorAll("button#tg h3"),
	button_height = "4rem";
	
tg_btn.onclick = ""; 
tg_btn_arrow.style.display = ""; // show it for js users
tg_btns.style.display = ""; // show them for js users

function setDisabledOfChildButtonsTo(parent, state) {
	for (const child of parent.children) child.disabled = state;
}

tg_btn.addEventListener("click", (e) => {
	if (!tg_btn_arrow.matches(":hover, :focus")) return window.open(`https://t.me/paketmeqa`);
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
	setTimeout(() => tg_btns["scrollIntoViewIfNeeded" in tg_btns ? "scrollIntoViewIfNeeded" : "scrollIntoView"]
			({ behavior: "smooth", block: "end" }), 300);
});

const x_btn = document.querySelector("button#x"),
	close_btn = document.querySelector("button#x div:last-child"),
	btn_title = document.querySelector("button#x h3");
	
close_btn.style.display = "";
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
  src_btn	= document.getElementById("src_btn");
let lib_text_enter_handle = create_enter_handle(lib_text)
function showSourceCodeButton(e) {
	absorbEvent(e);
	src_btn.style.opacity = "";
	src_btn.style.position = "";
	src_btn.style.height = "";
  src_btn.setAttribute("tabindex", "0");
  src_btn.focus();
  
	lib_text.innerText = "made with no libraries";
	lib_text.classList.remove("pointer");
	lib_text.removeEventListener("click", showSourceCodeButton);
  document.removeEventListener("keyup", lib_text_enter_handle);
  lib_text.setAttribute("tabindex", "");
};
src_btn.style.opacity = "0";
src_btn.style.position = "absolute";
src_btn.style.height = "0px";
src_btn.setAttribute("tabindex", "-1");
lib_text.setAttribute("tabindex", "0");
lib_text.classList.add("pointer");
lib_text.innerHTML = lib_text.innerHTML + "<br/>press me"
lib_text.addEventListener("click", showSourceCodeButton);
document.addEventListener("keyup", lib_text_enter_handle);
// remove ad banner
(async ()=>{
		while (window.location.hostname === "meqativ.tiiny.site") {
				const elem = document.querySelector(`div[style="position: fixed !important; bottom: 0% !important; width: 100% !important; height: 55px !important; z-index: 9999 !important;"]`)

				if (elem) {
						document.body.style = "";
						document.querySelector(`head > script[type="text/javascript"]`).remove()
						document.querySelector(`head > script[data-domain="meqativ.tiiny.site"]`).remove()
						elem.remove(); 
						break;
				} else {
						await wait(50);
				}
		}
})()
