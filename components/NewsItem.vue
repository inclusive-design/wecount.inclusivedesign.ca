<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<article>
		<figure class="preview-media">
			<img :src="picture" :alt="caption" class="news-item-img">
		</figure>
		<nuxt-link :to="'/news-and-views/' + slug" class="news-item">
			<h2>
				{{ title }}
			</h2>
		</nuxt-link>
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
		caption: {
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
