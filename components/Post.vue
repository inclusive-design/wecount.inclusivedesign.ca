<template>
  <!-- This compenent is used by data from pages api call as well as post api call -->
  <figure class="preview-media">
    <nuxt-link :to="'/news/' + slug">
      <div :style="'background-image: url(' + picture + ');'" class="grid-item" />
    </nuxt-link>
    <header>
      <nuxt-link :to="'/news/' + slug">
        <h2>
          {{ title.toUpperCase() }}
        </h2>
      </nuxt-link>
      <div class="post-meta-wrapper post-meta-archive">
        <ul class="post-meta color-accent">
          <li class="post-date">
            <nuxt-link :to="'/news/' + slug">
              <span class="meta-icon">
                <svg
                  class="svg-icon"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  tabindex="-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                >
                  <path
                    fill
                    d="M4.60069444,4.09375 L3.25,4.09375 C2.47334957,4.09375 1.84375,4.72334957 1.84375,5.5 L1.84375,7.26736111 L16.15625,7.26736111 L16.15625,5.5 C16.15625,4.72334957 15.5266504,4.09375 14.75,4.09375 L13.3993056,4.09375 L13.3993056,4.55555556 C13.3993056,5.02154581 13.0215458,5.39930556 12.5555556,5.39930556 C12.0895653,5.39930556 11.7118056,5.02154581 11.7118056,4.55555556 L11.7118056,4.09375 L6.28819444,4.09375 L6.28819444,4.55555556 C6.28819444,5.02154581 5.9104347,5.39930556 5.44444444,5.39930556 C4.97845419,5.39930556 4.60069444,5.02154581 4.60069444,4.55555556 L4.60069444,4.09375 Z M6.28819444,2.40625 L11.7118056,2.40625 L11.7118056,1 C11.7118056,0.534009742 12.0895653,0.15625 12.5555556,0.15625 C13.0215458,0.15625 13.3993056,0.534009742 13.3993056,1 L13.3993056,2.40625 L14.75,2.40625 C16.4586309,2.40625 17.84375,3.79136906 17.84375,5.5 L17.84375,15.875 C17.84375,17.5836309 16.4586309,18.96875 14.75,18.96875 L3.25,18.96875 C1.54136906,18.96875 0.15625,17.5836309 0.15625,15.875 L0.15625,5.5 C0.15625,3.79136906 1.54136906,2.40625 3.25,2.40625 L4.60069444,2.40625 L4.60069444,1 C4.60069444,0.534009742 4.97845419,0.15625 5.44444444,0.15625 C5.9104347,0.15625 6.28819444,0.534009742 6.28819444,1 L6.28819444,2.40625 Z M1.84375,8.95486111 L1.84375,15.875 C1.84375,16.6516504 2.47334957,17.28125 3.25,17.28125 L14.75,17.28125 C15.5266504,17.28125 16.15625,16.6516504 16.15625,15.875 L16.15625,8.95486111 L1.84375,8.95486111 Z"
                  />
                </svg>
              </span>
              <span class="meta-text">{{ date }}</span>
            </nuxt-link>
          </li>
        </ul>
        <!-- .post-meta -->
      </div>
    </header>
  </figure>
</template>

<script>
export default {
	// Pages have no media attached to them so when they render they are imageless
	props: ["picture", "title", "date", "slug"]
}
</script>

<style>
/* Some of these fields are not needed */
figure {
	padding: 0;
	margin: 0;
	border: 0;
	height: 500px;
	width: 100%;
	line-height:0px;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
}
.grid-item {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 1px;  /* Rounded border */
  padding: 0px; /* Some padding */
  width: 100%; /* Set a small width */
  height: 60%;
  display: inline-block;
  background-position: top;
  flex-flow: row wrap;

}

/* Add a hover effect (blue shadow) */
.grid-item:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>
