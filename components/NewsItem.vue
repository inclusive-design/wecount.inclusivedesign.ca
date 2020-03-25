<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<article>
		<figure class="preview-media">
			<img :src="picture" :alt="altTag" class="views-item-img">
		</figure>
		<h2>
			<nuxt-link :to="'/views/' + slug" class="views-item">
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
			default: "https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
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
