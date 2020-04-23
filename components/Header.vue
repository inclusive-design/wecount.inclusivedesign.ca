<template>
	<header>
		<Brand />
		<div class="site-nav-wrapper">
			<div class="site-nav">
				<button id="menuToggleButton" @click="toggleNavMenu()" aria-expanded="false">
					<MenuIcon />&nbsp;Menu
				</button>
				<NavBar :navMenu="navMenu" />
				<SearchForm :placeholder="placeholderForSerch" :ariaLabel="ariaLabelForSearch" />
			</div>
		</div>
	</header>
</template>

<script>
import Utils from "~/shared/Utils";
import Brand from "~/components/Brand";
import NavBar from "~/components/NavBar";
import SearchForm from "~/components/SearchForm";
import MenuIcon from "~/assets/images/menu.svg?inline";

export default {
	components: {
		Brand,
		NavBar,
		SearchForm,
		MenuIcon
	},
	data () {
		return {
			placeholderForSerch: "Search...",
			ariaLabelForSearch: "Enter keywords for a site-wide search"
		};
	},
	computed: {
		navMenu () {
			return Utils.generateNavMenu(this.$store.state.sitePages);
		}
	},
	mounted () {
		// Attach the DOM listener that closes the navigation menu when the user clicks on anywhere
		// on the page except the menu button.
		if (process.browser) {
			window.addEventListener("click", this.closeNavMenu);
		}
	},
	destroyed () {
		// Detach the listener at the destroy of the application
		if (process.browser) {
			window.removeEventListener("click", this.closeNavMenu);
		}
	},
	methods: {
		// Toggle the "aria-expanded" value of the menu button
		toggleNavMenu () {
			const currentValue = document.getElementById("menuToggleButton").getAttribute("aria-expanded", "true");
			const newValue = currentValue === "true" ? "false" : "true";
			document.getElementById("menuToggleButton").setAttribute("aria-expanded", newValue);
		},
		// Close the navigation menu when clicking anywhere except the menu toggle button, which toggles the visibility
		// of the navigation menu.
		closeNavMenu (e) {
			const menuToggleButton = document.getElementById("menuToggleButton");
			if (e.target !== menuToggleButton) {
				document.getElementById("menuToggleButton").setAttribute("aria-expanded", "false");
			}
		}
	}
};
</script>
