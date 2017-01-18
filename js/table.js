// (function(){

	window.addEventListener('DOMContentLoaded', function(){
		var firstTable = document.querySelector('section.schedule:first-child table');
		initScheduleSticky(firstTable);
		initSchedulePopup(firstTable);
	});

	function initScheduleSticky($table) {
		var $stickyDiv = document.createElement('div');
		$stickyDiv.className = 'sticky-head';
		var $stickyTable = document.createElement('table');
		$stickyDiv.appendChild($stickyTable);

		var $stickyTableHead = $table.querySelector('thead').cloneNode(true);
		$stickyTable.appendChild($stickyTableHead);

		$table.parentNode.appendChild($stickyDiv);

		function checkBounds() {
			var bounds = $table.getBoundingClientRect();
			if (bounds.top < 50 && bounds.bottom > 130) {
				$stickyDiv.style.display = 'block';
			} else {
				$stickyDiv.style.display = 'none';
			}
			// console.log(bounds);
		}

		window.addEventListener('scroll', checkBounds);
		checkBounds();
	}

	// TODO: обработать resize
	function initSchedulePopup($table, fn) {
		[].forEach.call($table.querySelectorAll('tbody td:nth-child(n+4)'), function($cell){
			$cell.addEventListener('click', function(e){
				// console.log(this.cellIndex, this.parentNode.rowIndex);
				var rowIndex = this.parentNode.rowIndex;
				var colIndex = this.cellIndex + 1;

				$table.querySelector('tbody tr:nth-child('+rowIndex+')').classList.add('selected');
				$table.querySelector('thead tr:first-child > *:nth-child('+colIndex+')').classList.add('selected');
				$table.parentNode.querySelector('.sticky-head table thead tr > *:nth-child('+colIndex+')').classList.add('selected');
				if (this.getAttribute('rowspan') == '2') {
					$table.querySelector('tbody tr:nth-child('+(rowIndex+1)+')').classList.add('selected');
				}

				var bounds = $table.getBoundingClientRect();

				if (bounds.top > 50) {
					// прокручиваем к верху таблицы
					document.body.scrollTop += bounds.top - 50;
				} else if (bounds.bottom < window.innerHeight) {
					// прокручиваем к низу таблицы
					document.body.scrollTop += bounds.bottom - window.innerHeight;
				}

				document.body.style.overflow = 'hidden';

				var $popup = $table.parentNode.querySelector('.popup');
				var $popupWrap = $popup.querySelector('.wrap');

				var bounds = $table.getBoundingClientRect();
				// console.log(bounds);

				$popupWrap.style.top = -bounds.top + 50 + 'px';
				$popupWrap.style.height = window.innerHeight - 130 + 'px';
				$popup.classList.add('opened');
			});
		});
		[].forEach.call($table.parentNode.querySelectorAll('.cancel'), function($cancelButton){
			$cancelButton.addEventListener('click', function(){
				document.querySelector('.popup.opened').classList.remove('opened');
				[].forEach.call(document.querySelectorAll('.selected'), function($element){
					$element.classList.remove('selected');
				});

				document.body.style.overflow = 'auto';
			});
		});
	}


// })()