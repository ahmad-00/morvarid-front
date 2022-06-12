<template>
	<MainContainer>
		<div class="flex flex-col px-12 mb-20">
			<BlogHeader />
		</div>
		<div class="flex flex-col px-6 items-center mb-24">
			<div
				class="w-full max-w-screen-xl grid grid-cols-3 gap-x-10 gap-y-10"
			>
				<ArticleCard
					v-for="(article, i) in articles"
					:key="i"
					:article="article"
				/>
			</div>
		</div>
		<div class="flex flex-col px-6 items-center">
			<Pagination
				:current="page"
				:total="limit * 5"
				:limit="limit"
				:link="
					(p) =>
						category
							? $routeUrl.BlogCategoryPageUrl(category.id, p)
							: $routeUrl.BlogPageUrl(p)
				"
				class="mb-24"
			/>
		</div>
	</MainContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import MainContainer from '~/components/home/MainContainer.vue'
import BlogHeader from '~/components/blog/BlogHeader.vue'
import ArticleCard from '~/components/article/ArticleCard.vue'
import { Article, ArticleCategory } from '~/config/types'
import Pagination from '~/components/utils/Pagination.vue'

const LIMIT = 12

@Component({
	middleware: ['fetch'],
	components: {
		Pagination,
		ArticleCard,
		BlogHeader,
		MainContainer,
	},
})
export default class HomeIndex extends Vue {
	get categoryId(): string | null {
		return this.$route.params.category_id || null
	}

	get page(): number {
		return Number(this.$route.params.page) || 1
	}

	get limit(): number {
		return LIMIT
	}

	get categories(): ArticleCategory[] {
		return this.$store.state.category.articleCategories || []
	}

	get category(): ArticleCategory | null {
		return this.categories.find((c) => c.id == this.categoryId) || null
	}

	articles = Array(12)
		.fill('')
		.map((i) => ({
			id: i + 1,
			title: 'ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ ﭼﺎپ',
			content: '',
			date: '۲۱ ﻓﺮوردﯾﻦ ۹۹',
			category: 'ﻧﺎم دﺳﺘﻪ',
			image: '/img/image_article_sample.jpg',
		})) as Article[]

	head() {
		if (this.category) {
			return {
				title:
					this.$strings.n_category(this.category.title) +
					' | ' +
					this.$strings.app_blog(),
			}
		} else {
			return {
				title:
					this.$strings.app_blog() +
					' | ' +
					this.$strings.app_subtitle(),
			}
		}
	}
}
</script>
