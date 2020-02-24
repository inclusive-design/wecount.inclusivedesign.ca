<template>
	<article>
		<h1 class="title">
			{{ title }}
		</h1>
		<img v-if="picture" :src="picture" class="postImage">
		<div v-html="content" class="api-content" />
		<div v-if="tags">
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
			<span v-for="(t, index) in tags" :key="index">
				<nuxt-link v-if="(index+1)===tags.length" :to="{ path: '/tag', query: { s: t }}">{{ t }} </nuxt-link>
				<nuxt-link v-else :to="{ path: '/tag', query: { s: t }}">{{ t }},  </nuxt-link>
			</span>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Untitled"
		},
		content: {
			type: String,
			default: "No content found"
		},
		picture: {
			type: String,
			default: "https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
		},
		tags: {
			type: Array,
			default: () => []
		}
	}
}
</script>
