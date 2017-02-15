(function(){
	function separateInput($sourceInput) {
		$sourceInput.style.display = 'none';

		var digitCount = $sourceInput.getAttribute('maxlength');
		var $digitInputArr = [];

		var $digitInputContainer = document.createElement('div');
		$digitInputContainer.className = 'input-group';
		for (var i = 0; i < digitCount; i++) {
			var $digitInput = document.createElement('input');
			$digitInput.className = 'digit';
			$digitInput.type = $sourceInput.type;
			$digitInput.setAttribute('maxlength', 1);
			$digitInputContainer.appendChild($digitInput);
			$digitInputArr.push($digitInput);

			$digitInput.addEventListener("keydown", function (e) {
				$digitInput = this;

				if (e.keyCode === 8 && this.selectionStart === 0 && $digitInput.previousSibling) {
					setTimeout(function(){
						$digitInput.previousSibling.focus();
					}, 0);
					return;
				}

				// Allow: backspace, delete, tab, escape, enter and .
				if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
					// Allow: Ctrl+A
					(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
					// Allow: Ctrl+C
					(e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
					// Allow: Ctrl+X
					(e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
					// Allow: home, end, left, right
					(e.keyCode >= 35 && e.keyCode <= 39) ||
					//Allow numbers and numbers + shift key
					((e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57)) || (e.keyCode >= 96 && e.keyCode <= 105))) {
					// let it happen, don't do anything
					
					// console.log ("Caret position: " + this.selectionStart);
					return;
				}

				// Ensure that it is a number and stop the keypress
				if (!e.shiftKey && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {
					return;
				} else {
					e.preventDefault();
					return;
				}
			}, false);

			$digitInput.addEventListener('keyup', function (e) {
				$sourceInput.value = $digitInputArr.map(function($input){return $input.value}).join('');
				
				if (!e.shiftKey && ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {					
					if ($digitInput.nextSibling) $digitInput.nextSibling.focus();
				}

			}, false);
		}

		$sourceInput.parentNode.insertBefore($digitInputContainer, $sourceInput.nextSibling);

		$digitInputArr[0].focus();
	}

	[].forEach.call(document.querySelectorAll('input.separate-input'), separateInput);
})();