

//generate random number - a for seed and b for range
function randomNumWithSeed(a, b) {
	return Math.floor(a.random() * b);
};

// generate random text -- a for the word length range-- b for the word total range
function randomText(a,b,c) {
	
	let alphabet = 'abcdefghijklmnopqrstuvwxyz';
	let sentence = '';
	
	let bb = randomNumWithSeed(c, b) + 5; // 5 to 15 words each sentence.
	
	for(let o = 0; o < bb; o++){
		
		let aa = randomNumWithSeed(c, a) + 2; // ~5 word count per word.
		let word = '';
		
		for(let i = 0; i< aa; i++){
			word += alphabet[Math.floor(c.random() * 25)];
		};
		
		sentence += word + ' ';
	};
	return sentence;
}



//add content to the page - a for the tag name , b for contents, c for seed, d for the current file.
function createEle(a,b, theSeed, theFile ) {
	
	let newEle = document.createElement(a);

	// adding class to p tag and add id to h1 tag
	
	if (a[0] === 'p'){
		
		if (theFile === 'goal'){
			newEle.className = 'theClass';
		} else {
			newEle.className = 'theClas';
		}
		
	} else if (a[0] === 'h1' && theFile ==='goal'){
		newEle.id = 'theId';
	}
	
	
	//check for img tage and so on.
	if (a[0] === 'img'){
		
		newEle.alt = "Just an image";
		if (theFile === 'goal'){
			newEle.src = "https://via.placeholder.com/150?text=This.is.Thien.";
			newEle.width = 500;
			newEle.height = 500;
		} else {
			newEle.src = " ";
			newEle.width = '';
			newEle.height = '';
		}
		
	// create three li for the unordered list.
	} else if ( a[0] === 'ul'){
		
		for (let i = 0; i<3;i++){
			let newLi = document.createElement('li');
			newLi.textContent = randomText(5,(-3),theSeed)
			newEle.appendChild(newLi);
		};
	
	//create li  for the list -- and remove and add extra li randomly for 2 files.
	} else if ( a[0] === 'ol'){
		
		// Create extra li for goal page
		if (theFile === 'goal'){
			let newLi = document.createElement('li');
			newLi.textContent = "This MUST be added. "
			newEle.appendChild(newLi);
		}
		
		// Randomly remove 1 li from the list and change 1 li to different number
		let arrayI = [1,2,3,4,5];
		let o = randomNumWithSeed(theSeed,5);
		let h = arrayI.splice(o,1);
		let p = arrayI.splice(o,1);
		
		for (let i = 1; i<6;i++){
			
			if (theFile === 'start' && i === h[0] ){
				
			} else if (theFile === 'start' && i === p[0]){
				let newLi = document.createElement('li');
				newLi.textContent = "This is number " + (i+5);
				newEle.appendChild(newLi);
			} else {
				let newLi = document.createElement('li');
				newLi.textContent = "This is number " + i;
				newEle.appendChild(newLi);
			};
		};
		
		
		// Add an extra Li tag for the students to remove
		if (theFile === 'start'){
			let newLi = document.createElement('li');
			newLi.textContent = "This is EXTRA";
			newEle.appendChild(newLi);
		};
	
	// create H6 tag for extra credit
	} else if (a[0] === 'h6'){
		
		// start File would be p tag instead of h6
		if (theFile === 'start'){
			newEle = document.createElement('p')
		}
		
		newEle.textContent = "For extra credit change this tag to an h6 tag.";		
		
	} else {
		newEle.textContent = b;
	};
	return newEle;
};

// create the downloadable link in the a tag with the file name. - whatFile decide whether it is start or goal file
function download(content, whatFile) {
	
	let a = document.getElementById(whatFile);
	
	let file = new File([content], whatFile +".html", {type: "text/html"} );
	
	a.href = URL.createObjectURL(file);
	a.download = file.name;
}

//generate the content within the page.
function generateContent(whichFile) {
	//requirements
	let requireTag = ['p','h1','h2','h3','img','ol','ul','aside', 'h6'];
	// check list --  requireAttr = ['src','class','id','width','height','li','em'];


	// seed 
	let Jnum = Number(document.getElementById('jInput').value);

	var seed = new Chance(Jnum);


	// create Html file
	let newDoc = document.implementation.createHTMLDocument(whichFile);



	// loop through to the requireTag and add all needed tags into the file.

	let lengthTag = requireTag.length;
	for (i = lengthTag; i > 0; i--){
	
		let o = randomNumWithSeed(seed, i);
		
		let k = randomText(7, 10, seed);
		
		let p = requireTag.splice(o,1);
		
		newDoc.body.appendChild( createEle(p, k, seed, whichFile) ); 
		
		//
		if (whichFile === 'start' && p[0] === 'h6'){
			console.log('test')
			document.getElementsByTagName(p[0]).outerHTML = '<p class= "change-me">For extra credit change this tag to an h6 tag.</p>';
		}
	};



	//add all the page into the download link
	let newDocText = new XMLSerializer().serializeToString(newDoc);
	console.log(newDocText)
	console.log(newDoc)



	// make the link to download the file.
	let a = document.getElementById(whichFile);

	a.addEventListener('click', function() {
		download( newDocText, whichFile )
	});

	//remove hidden from download link
	document.getElementById(whichFile).removeAttribute('hidden');
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// put the form in the right working info
document.getElementsByTagName('form')[0].addEventListener('submit', function(){ 

	event.preventDefault(); 

	generateContent('goal');
	generateContent('start');
	
	// disable the submit button
	document.getElementById('jInput').disabled = true;
	document.getElementById('submit').disabled = true;
});