<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<article>
		<figure v-if="showPreviewImage" class="preview-media">
			<img v-if="picture" :src="picture" :alt="altTag" class="news-item-img">
			<WeCountLogo v-else class="news-item-img" />
		</figure>
		<h2 class="h3">
			<a v-if="isExternalHref" :href="href" v-html="title" target="_blank" />
			<nuxt-link v-else :to="href" v-html="title" />
		</h2>
		<div v-html="author" class="author" />
		<div class="date">
			<time :datetime="dateTime">{{ date }}</time>
		</div>
		<div v-html="previewContent" class="preview-content" />
	</article>
</template>

<script>
import WeCountLogo from "~/assets/images/logo.svg?inline"

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
		author: {
			type: String,
			default: ""
		},
		previewContent: {
			type: String,
			default: ""
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
		},
		showPreviewImage: {
			type: Boolean,
			default: false
		}
	}
}
</script>
