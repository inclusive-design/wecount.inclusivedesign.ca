<template>
	<!-- This compenent is used by data from pages api call as well as post api call -->
	<nuxt-link :to="'/news-and-views/' + slug" class="news-item">
		<figure class="preview-media">
			<img :src="picture" class="news-item-img" alt="">
			<figcaption>
				<h2>
					{{ title }}
				</h2>
			</figcaption>
		</figure>
		<div class="date">
			<img class="date-icon" alt="">
			<time>{{ date }}</time>
		</div>
	</nuxt-link>
</template>

<script>
export default {
	props: {
		picture: {
			type: String,
			default: "https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
		},
		title: {
			type: String,
			default: "Untitled Post"
		},
		date: {
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
