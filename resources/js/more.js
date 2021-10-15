let getSiblings = function (e) {
    // for collecting siblings
    let siblings = []; 
    // first child of the parent node
	let sibling = e.previousSibling;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.previousSibling;
    }
    return siblings;
};


var morebuttons = document.getElementsByClassName("show-more");
for (const mb of morebuttons) {
	mb.addEventListener("click", function() {
		this.classList.toggle("show-more-active");
		let siblings = getSiblings(this);
		for (const s of siblings) {
			if (s.classList.contains("event-more")) {
			console.log(s);
				s.classList.toggle("event-more-active");
			}
		}
	});
}