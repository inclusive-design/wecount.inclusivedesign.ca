
<template>
	<article class="news-grid">
		<div v-for="row in groupedList" :key="row.id" class="row">
			<div v-for="x in row" :key="x.id" class="api-content">
				<NewsItem
					v-if="row.length>1"
					:picture="x.picture"
					:title="x.title"
					:date="x.date"
					:slug="x.slug"
				/>
				<NewsItem
					v-else
					:picture="x.picture"
					:title="x.title"
					:date="x.date"
					:slug="x.slug"
					style="width: 50%"
				/>
			</div>
		</div>
	</article>
</template>

<script>
import _ from "lodash"
import NewsItem from "~/components/NewsItem"
export default {
	components: {
		NewsItem
	},
	props: {
		postList: {
			type: String,
			default: () => []
		}
	},
	computed: {
		groupedList () {
			return _.chunk(this.postList, 2)
		}
	}
}
</script>
