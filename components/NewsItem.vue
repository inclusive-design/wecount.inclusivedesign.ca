<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<article>
		<figure class="preview-media">
			<img :src="picture" :alt="altTag" class="news-item-img">
		</figure>
		<h2 class="h3">
			<nuxt-link :to="'/news-and-views/' + slug">
				{{ title }}
			</nuxt-link>
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
			default: "~/assets/images/logo.svg"
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
		slug: {
			type: String,
			default: ""
		}
	}
}
</script>
