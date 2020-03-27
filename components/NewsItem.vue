<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<article>
		<figure class="preview-media">
			<img v-if="picture" :src="picture" :alt="altTag" class="news-item-img">
			<WeCountLogo v-else class="news-item-img" />
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
import WeCountLogo from "~/assets/images/logo_wecount.svg?inline"

export default {
	components: {
		WeCountLogo
	},
	props: {
		picture: {
			type: String,
			default: null
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
