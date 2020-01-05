<template>
  <aside class="nav-sidebar">
    <ul>
      <br>
      <b-row align-h="end">
        <b-button @click="toggleNav" variant="link" style="color: black;">
          <b-img align-h="end" height="30%" src="~/static/img/cancel.png" />
        </b-button>
      </b-row>
      <br>
      <br>
      <br>
      <br>
      <hr style="width:100%; background-color: grey;">
      <li>
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </li>
      <hr style="width:100%; background-color: grey;">
      <li>
        <nuxt-link to="/about">
          About
        </nuxt-link>
      </li>
      <hr style="width:100%; background-color: grey;">
      <li>
        <nuxt-link to="/news">
          News
        </nuxt-link>
      </li>
      <hr style="width:100%; background-color: grey;">
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <p id="phrase">
        © 2020
        <a href="https://wecount.inclusivedesign.ca" style="color: black;">
          We Count
        </a>
      </p>
    </ul>
  </aside>
</template>

<script>
export default {
	data () {
		return {
			toggleNavStatus: true
		}
	},
	methods: {
		toggleNav () {
			const getSidebar = document.querySelector(".nav-sidebar")
			const getSidebarUl = document.querySelector(".nav-sidebar ul")
			const getSidebarLinks = document.querySelectorAll(".nav-sidebar a")
			const getPhrase = document.querySelectorAll("#phrase")

			getSidebar.style.width = "0px"

			const arrayLength = getSidebarLinks.length

			for (let i = 0; i < arrayLength; i++) {
				getSidebarLinks[i].style.opacity = "0"
			}

			getSidebarUl.style.visibility = "visible"

			const len = getPhrase.length
			for (let i = 0; i < len; i++) {
				getPhrase[i].style.opacity = "0"
			}
		}
	}
}

</script>

<style>
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
