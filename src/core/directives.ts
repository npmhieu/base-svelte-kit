export function clickOutside (node) {
	
	/**
	 * emit true/false when click out side host element
	 *
	 * example: <Component use:clickOutside on:click_outside={callback}/>
	 *
	 */
	const handleClick = event => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(
				new CustomEvent('click_outside', node)
			)
		}
	}
	
	document.addEventListener('click', handleClick, true);
	
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	}
}
