<template>
	<header>
		<Brand />
		<div class="site-nav-wrapper">
			<div class="site-nav">
				<button id="menuToggleButton" @click="toggleNavMenu()" aria-expanded="false">
					<MenuIcon />&nbsp;Menu
				</button>
				<NavBar />
				<SearchForm />
			</div>
		</div>
	</header>
</template>

<script>
// TODO
// Want to make this more of a modal
import Brand from "~/components/Brand"
import NavBar from "~/components/NavBar"
import SearchForm from "~/components/SearchForm"
import MenuIcon from "~/assets/images/menu.svg?inline"

export default {
	components: {
		Brand,
		NavBar,
		SearchForm,
		MenuIcon
	},
	data () {
		return {
			// Used on the mobile design to determine whether the navigation menu should be shown.
			// Set to true when a user clicks on the "menu" icon to see the navigation menu.
			// Set to false when a user clicks on the "menu" icon again to hide the navigation menu.
			showMenu: false
		}
	},
	mounted () {
		// Attach the DOM listener that closes the navigation menu when the user clicks on anywhere
		// on the page except the menu button.
		if (process.browser) {
			window.addEventListener("click", this.closeNavMenu)
		}
	},
	destroyed () {
		// Detach the listener at the destroy of the application
		if (process.browser) {
			window.removeEventListener("click", this.closeNavMenu)
		}
	},
	methods: {
		// Toggle the "aria-expanded" value of the menu button
		toggleNavMenu () {
			const currentValue = document.getElementById("menuToggleButton").getAttribute("aria-expanded", "true")
			const newValue = currentValue === "true" ? "false" : "true"
			document.getElementById("menuToggleButton").setAttribute("aria-expanded", newValue)
		},
		// Close the navigation menu when clicking anywhere except the menu toggle button, which toggles the visibility
		// of the navigation menu.
		closeNavMenu (e) {
			const menuToggleButton = document.getElementById("menuToggleButton")
			if (e.target !== menuToggleButton) {
				document.getElementById("menuToggleButton").setAttribute("aria-expanded", "false")
			}
		}
	}
}
</script>
