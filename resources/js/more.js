let getSiblings = function (e) {
    // for collecting siblings
    let siblings = [];
    
    // collecting siblings
	let sibling = e.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling.classList.contains("event-more")) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

// Create 'more' text at end of parent node if .event-more appears
var event_more = document.querySelectorAll(".event-more:last-child"),
	event_more_parent = [],
	more_HTML = "<div class='show-more'>Show more </div>"
for (const em of event_more) {
	if (!event_more_parent.includes(em.parentNode)) {
		event_more_parent.push(em.parentNode);	// remember not to use again
		em.parentNode.insertAdjacentHTML("beforeend", more_HTML);
	}
}

// Find the more text/buttons we've created
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