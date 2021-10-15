let getSiblings = function (e) {
    // for collecting siblings
	console.log(e)
    let siblings = [];
    
    // collecting siblings
	let sibling = e.previousSibling;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling.classList.contains("event-more")) {
            siblings.push(sibling);
        }
        sibling = sibling.previousSibling;
    }
    return siblings;
};


var morebuttons = document.getElementsByClassName("show-more");
for (const mb of morebuttons) {
	// set text dynamically
	let n_siblings = getSiblings(mb).length;
	mb.innerHTML = mb.innerHTML.replace("more", n_siblings + " more");
	
	// add listener for toggle
	mb.addEventListener("click", function() {
		this.classList.toggle("show-more-active");
		let siblings = getSiblings(this);
		if (this.classList.contains("show-more-active")) {
			mb.innerHTML = mb.innerHTML.replace("Show", "Hide").replace(" more", "");
			for (const s of siblings) {
				s.classList.add("event-more-active");
			}
		}
		else {
			mb.innerHTML = mb.innerHTML.replace("Hide", "Show") + " more ";
			for (const s of siblings) {
				s.classList.remove("event-more-active");
			}
		}
	});
}