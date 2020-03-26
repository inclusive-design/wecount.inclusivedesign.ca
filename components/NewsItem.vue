<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<article>
		<figure class="preview-media">
			<img :src="picture" :alt="altTag" class="views-item-img">
		</figure>
		<h2>
			<a v-if="isExternalHref" :href="href" v-html="title" class="views-item" target="_blank" />
			<nuxt-link v-else :to="href" v-html="title" class="views-item" />
		</h2>
		<div class="date">
			<time :datetime="dateTime">{{ date }}</time>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		picture: {
			type: String,
			default: "https://wecount-cms.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
		},
		altTag: {
			type: String,
			default: "post thumbnail"
		},
		title: {
			type: String,
			default: "Untitled Post"
		},
		date: {
			type: String,
			default: ""
		},
		dateTime: {
			type: String,
			default: ""
		},
		href: {
			type: String,
			default: ""
		},
		isExternalHref: {
			type: Boolean,
			default: false
		}
	}
}
</script>
