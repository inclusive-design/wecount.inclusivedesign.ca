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
		Brand
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
	position: fixed;
	height: 100vh;
	right: 0px;
	bottom: 0px;
	width: 0px;
	padding: 0 0px;
	background-color: rgb(255, 255, 255);
	z-index: 100;
	transition:  all 0.3s ease-in-out;
}

.nav-sidebar ul {
	padding-top: 15px;
	overflow: hidden;
	visibility: hidden;
}

.nav-sidebar ul li {
	line-height: 60px;
	list-style: none;
}

.nav-sidebar ul li span, .nav-sidebar ul li a {
	display: block;
	height: 60px;
	padding: 0 0px;
	text-decoration: none;
	/* text-transform: uppercase; */
	color: rgb(19, 18, 18);
	font-family: Arial, Helvetica, sans-serif;
	font-size: 16px;
	white-space: nowrap;
	opacity: 0;
	transition:  all 0.3s ease-in-out;
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

.nav-sidebar ul li a {
	text-align: left;
	font-weight: 500;
	font-size: 22px;
}

#phrase {
	font-size: 9.5px;
	text-align: center;
	transition:  all 100s ease-out;
	transition: all 0.1s ease-in;
}

.nav-sidebar ul {
	padding: 0 40px;
}
</style>
