<template>
  <b-row align-h="center">
    <div id="container">
      <h1 id="title">
        <b>{{ Title }}</b>
      </h1>
      <img id="postImage" :src="Picture">
      <div id="api-content" v-html="Content" />
      <!-- Solcial media sites still use original wordpress url -->
      <section class="toolbelt_social_share">
        <a
          :href="'https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwecount.inclusivedesign.ca%2F' + $route.params.slug +'%2F'"
          title="Share on Facebook"
          class="toolbelt_facebook"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#111"
              fill-rule="evenodd"
              d="M6.5 5.5V4c0-.62.06-1.407.5-2 .463-.628.907-1 2-1 1.78 0 3.5.5 3.5.5l-1 2S10.55 3 10 3s-1 .438-1 1v1.5h2.5L11 8H9v7H6.5V8h-2V5.5h2z"
            />
          </svg> Share this
        </a>
        <a
          :href="'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwecount.inclusivedesign.ca%2F'+ $route.params.slug +'%2F'"
          title="Tweet on Twitter"
          class="toolbelt_twitter"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#111"
              fill-rule="evenodd"
              d="M16 2.56a6.473 6.473 0 01-1.885.524 3.328 3.328 0 001.444-1.84 6.51 6.51 0 01-2.086.806A3.258 3.258 0 0011.077 1C9.265 1 7.796 2.49 7.796 4.326c0 .261.028.514.084.758-2.728-.14-5.146-1.462-6.766-3.477A3.36 3.36 0 00.67 3.282c0 1.152.579 2.171 1.46 2.768a3.24 3.24 0 01-1.488-.415v.04c0 1.613 1.132 2.957 2.635 3.262a3.226 3.226 0 01-1.483.058c.418 1.321 1.63 2.283 3.066 2.31A6.535 6.535 0 010 12.683a9.212 9.212 0 005.032 1.493c6.038 0 9.34-5.067 9.34-9.464 0-.144-.003-.288-.009-.43A6.679 6.679 0 0016 2.56"
            />
          </svg> Tweet this
        </a>
        <a
          :href="'https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwecount.inclusivedesign.ca%2F'+ $route.params.slug +'%2F'"
          title="Share on LinkedIn"
          class="toolbelt_linkedin"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#111"
              fill-rule="evenodd"
              d="M15 14.176h-3.094V9.544c0-1.213-.484-2.04-1.549-2.04-.814 0-1.266.558-1.477 1.097-.08.193-.067.46-.067.732v4.843H5.748s.04-8.206 0-8.95h3.065V6.63c.181-.615 1.16-1.491 2.724-1.491 1.94 0 3.463 1.287 3.463 4.06v4.977zM2.648 4.104h-.02C1.64 4.104 1 3.421 1 2.554 1 1.67 1.66 1 2.667 1c1.007 0 1.626.668 1.645 1.552 0 .866-.638 1.552-1.664 1.552zM1.353 5.225h2.729v8.951H1.353v-8.95z"
            />
          </svg> Share this
        </a>
        <a
          :href="'https://wa.me/?text=https%3A%2F%2Fwecount.inclusivedesign.ca%2F'+ $route.params.slug +'%2F'"
          title="Share on WhatsApp"
          class="toolbelt_whatsapp"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 15l.984-3.595a6.923 6.923 0 01-.926-3.469C1.06 4.112 4.172 1 7.996 1c1.855 0 3.597.723 4.907 2.035a6.897 6.897 0 012.03 4.908c-.001 3.825-3.113 6.937-6.937 6.937a6.942 6.942 0 01-3.318-.845L1 15zm3.848-2.22c.978.58 1.911.927 3.146.928a5.777 5.777 0 005.768-5.766 5.764 5.764 0 00-5.764-5.77A5.775 5.775 0 002.23 7.936c0 1.298.38 2.27 1.018 3.286l-.583 2.128 2.183-.572zm5.125-3.955c-.158-.057-.274-.086-.39.087-.115.174-.448.564-.549.68-.1.115-.202.13-.375.043-.174-.087-.733-.27-1.395-.86A5.218 5.218 0 016.3 7.574c-.1-.174-.01-.268.076-.354.078-.077.377-.476.435-.593.058-.115.03-.217-.014-.303-.044-.087-.39-.94-.535-1.287-.14-.338-.284-.293-.39-.298-.424.025-.689.095-.795.211-.158.174-.606.593-.606 1.446 0 .854.621 1.678.707 1.794.087.115 1.223 1.866 2.961 2.617.414.178.737.285.989.365.415.132.793.113 1.092.069.333-.05 1.025-.42 1.17-.824.144-.406.144-.753.1-.825-.043-.072-1.357-.709-1.517-.767z"
            />
          </svg> Share this
        </a>
        <a
          :href="'https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwecount.inclusivedesign.ca%2F'+ $route.params.slug +'%2F'"
          title="Pin on Pinterest"
          class="toolbelt_pinterest"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="#111"
              fill-rule="evenodd"
              d="M8 1a7 7 0 00-2.81 13.412c-.019-.489-.002-1.076.122-1.609.135-.567.9-3.813.9-3.813s-.223-.448-.223-1.108c0-1.038.602-1.812 1.35-1.812.637 0 .945.478.945 1.051 0 .64-.409 1.598-.619 2.484-.175.742.372 1.347 1.105 1.347 1.326 0 2.22-1.702 2.22-3.72 0-1.534-1.034-2.683-2.913-2.683-2.123 0-3.446 1.584-3.446 3.351 0 .611.18 1.042.461 1.374.13.154.147.215.1.391-.032.128-.11.439-.142.561-.047.177-.19.241-.35.175-.979-.4-1.434-1.47-1.434-2.674 0-1.989 1.677-4.373 5.003-4.373 2.673 0 4.432 1.935 4.432 4.01 0 2.746-1.526 4.797-3.778 4.797-.755 0-1.466-.408-1.71-.871 0 0-.406 1.612-.492 1.923-.148.54-.439 1.08-.704 1.5A7 7 0 108 1"
            />
          </svg> Pin this
        </a>
      </section>
      <div>
        <span class="meta-icon">
          <svg
            class="svg-icon"
            aria-hidden="true"
            role="img"
            focusable="false"
            tabindex="-1"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          ><path fill="" d="M15.4496399,8.42490555 L8.66109799,1.63636364 L1.63636364,1.63636364 L1.63636364,8.66081885 L8.42522727,15.44178 C8.57869221,15.5954158 8.78693789,15.6817418 9.00409091,15.6817418 C9.22124393,15.6817418 9.42948961,15.5954158 9.58327627,15.4414581 L15.4486339,9.57610048 C15.7651495,9.25692435 15.7649133,8.74206554 15.4496399,8.42490555 Z M16.6084423,10.7304545 L10.7406818,16.59822 C10.280287,17.0591273 9.65554997,17.3181054 9.00409091,17.3181054 C8.35263185,17.3181054 7.72789481,17.0591273 7.26815877,16.5988788 L0.239976954,9.57887876 C0.0863319284,9.4254126 0,9.21716044 0,9 L0,0.818181818 C0,0.366312477 0.366312477,0 0.818181818,0 L9,0 C9.21699531,0 9.42510306,0.0862010512 9.57854191,0.239639906 L16.6084423,7.26954545 C17.5601275,8.22691012 17.5601275,9.77308988 16.6084423,10.7304545 Z M5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 C5.55228475,4 6,4.44771525 6,5 C6,5.55228475 5.55228475,6 5,6 Z" /></svg>							</span>
        <span v-for="(t, index) in Tags" :key="index">
          <nuxt-link v-if="(index+1)===Tags.length" :to="{ path: '/tag', query: { s: t }}">{{ t }} </nuxt-link>
          <nuxt-link v-else :to="{ path: '/tag', query: { s: t }}">{{ t }},  </nuxt-link>
        </span>
      </div>
      <hr id="lineBreak">
      <b-row align-h="center" class="overflow-auto">
        <b-pagination-nav
          id="pagination"
          :link-gen="linkGen"
          :page-gen="pageGen"
          :number-of-pages="links.length"
          use-router
        />
      </b-row>
    </div>
  </b-row>
</template>

<style>

#postImage {
	margin-top: 5rem;
}
.toolbelt_social_share {
	margin-bottom: 6rem;
}

#lineBreak {
	margin-top: 4rem;
	margin-bottom: 2rem;
}
#pagination {
	text-transform: capitalize;
}
</style>

<script>
export default {
	async validate ({ params, store }) {
		if (store.state.posts === null) {
			await store.dispatch("fetchApiData", "posts")
		}
		const linkList = store.state.posts.map(({ slug }) => slug)
		return linkList.includes(params.slug)
	},
	head () {
		return {
			title: this.Title
		}
	},
	components: {},
	data () {
		return {
		}
	},
	computed: {
		links () {
			return this.$store.state.posts.map(({ slug }) => slug)
		},
		linkNames () {
			return this.links.map(x => x.replace(/-/g, " "))
		},
		Title () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).title
		},
		Picture () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).picture
		},
		Content () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).content
		},
		Tags () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).tags
		}
	},
	methods: {
		linkGen (pageNum) {
			return { path: "/news/" + this.links[pageNum - 1] }
		},
		pageGen (pageNum) {
			return this.linkNames[pageNum - 1]
		}
	}
}
</script>
