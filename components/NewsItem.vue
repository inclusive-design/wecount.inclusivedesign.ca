<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<nuxt-link :to="'/news-and-views/' + slug" class="news-item">
		<figure class="preview-media">
			<img :src="picture" class="news-item-img">
			<figcaption>
				<h2>
					{{ title }}
				</h2>
			</figcaption>
			<div class="date">
				<img class="date-icon">
				<time>{{ date }}</time>
			</div>
		</figure>
	</nuxt-link>
</template>

<script>
export default {
	// Pages have no media attached to them so when they render they are imageless
	props: {
		picture: {
			type: Object,
			default: () => "https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
		},
		title: {
			type: String,
			default: "Untitled Post"
		},
		date: Date,
		slug: {
			type: String,
			default: ""
		}
	}
}
</script>
