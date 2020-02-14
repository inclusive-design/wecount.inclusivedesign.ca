<template>
	<header>
		<Brand />
		<NavBar />
		<SearchForm />
	</header>
</template>

<script>
// TODO
// Want to make this more of a modal
import Brand from "~/components/Brand"
import NavBar from "~/components/NavBar"
import SearchForm from "~/components/SearchForm"
export default {
	components: {
		Brand,
		NavBar,
		SearchForm
	},
	data () {
		return {
			toggleNavStatus: false
		}
	},
	methods: {
		toggleNav () {
			const getSidebar = document.querySelector(".nav-sidebar")
			const getSidebarUl = document.querySelector(".nav-sidebar ul")
			const getSidebarLinks = document.querySelectorAll(".nav-sidebar a")
			const getPhrase = document.querySelectorAll("#phrase")

			getSidebarUl.style.visibility = "visible"
			getSidebar.style.width = String(1439 - 1132) + "px"

			const arrayLength = getSidebarLinks.length

			for (let i = 0; i < arrayLength; i++) {
				getSidebarLinks[i].style.opacity = "1"
			}

			const len = getPhrase.length
			for (let i = 0; i < len; i++) {
				getPhrase[i].style.opacity = "1"
			}
		}
	}
}
</script>

<style>
#slogan {
	color: black;
}

#iconButton {
	color: black;
}
.nav-sidebar {
	background-color: rgb(255, 255, 255);
	bottom: 0px;
	height: 100vh;
	padding: 0 0px;
	position: fixed;
	right: 0px;
	transition:  all 0.3s ease-in-out;
	width: 0px;
	z-index: 100;
}

.nav-sidebar ul {
	overflow: hidden;
	padding: 15px 40px 0;
	visibility: hidden;
}

.nav-sidebar ul li {
	line-height: 60px;
	list-style: none;
}

.nav-sidebar ul li span, .nav-sidebar ul li a {
	/* text-transform: uppercase; */
	color: rgb(19, 18, 18);
	display: block;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 16px;
	height: 60px;
	opacity: 0;
	padding: 0 0px;
	text-decoration: none;
	transition:  all 0.3s ease-in-out;
	white-space: nowrap;
}

.nav-sidebar ul li a {
	font-size: 22px;
	font-weight: 500;
	text-align: left;
}

.nav-sidebar ul li a:hover {
	text-decoration: underline;

}

.nav-sidebar ul li span {
	font-size: 25px;
	font-weight: bold;
	text-align: left;
}

#blanks {
	font-size: 25px;
	font-weight: bold;
	text-align: right;

}

#phrase {
	font-size: 9.5px;
	text-align: center;
	transition:  all 100s ease-out;
	transition: all 0.1s ease-in;
}
</style>
