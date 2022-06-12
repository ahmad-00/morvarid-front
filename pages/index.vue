<template>
	<MainContainer
		:fetched="fetched"
		:loading.sync="loading"
		@tryAgain="fetchData"
	>
		<MainHeroSection class="mt-4 mb-20" />
		<SaffronHistorySection class="mb-8 lg:mb-px" />
		<SaffronBenefitSection class="mb-16" />
		<ProductList
			:products="saffrons"
			:title="$strings.types_of_saffron_available_for_sale()"
			:more-link="$routeUrl.ShopCategoryUrl(saffronCategoryId)"
			class="mb-8"
			:loading="loading"
		/>
		<SaffronFooterSection class="mb-20" />
		<CardamonHistorySection class="mb-8 lg:mb-px" />
		<CardamonBenefitSection class="mb-16" />
		<ProductList
			:products="cardamons"
			:title="$strings.types_of_cardamon_available_for_sale()"
			:more-link="$routeUrl.ShopCategoryUrl(cardamonCategoryId)"
			class="mb-8"
			:loading="loading"
		/>
		<CardamonFooterSection class="mb-16" />
		<ArticleList
			:articles="articles"
			:title="$strings.latest_articles()"
			more-link="#"
			class="mb-28"
		/>
	</MainContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import MainHeader from '~/components/home/MainHeader.vue'
import MainFooter from '~/components/home/MainFooter.vue'
import MainHeroSection from '~/components/home/MainHeroSection.vue'
import MainContainer from '~/components/home/MainContainer.vue'
import SaffronHistorySection from '~/components/home/SaffronHistorySection.vue'
import SaffronBenefitSection from '~/components/home/SaffronBenefitSection.vue'
import ProductList from '~/components/product/ProductList.vue'
import SaffronFooterSection from '~/components/home/SaffronFooterSection.vue'
import CardamonHistorySection from '~/components/home/CardamonHistorySection.vue'
import CardamonBenefitSection from '~/components/home/CardamonBenefitSection.vue'
import { Article, Product } from '~/config/types'
import CardamonFooterSection from '~/components/home/CardamonFooterSection.vue'
import ArticleList from '~/components/article/ArticleList.vue'
import { Context } from '@nuxt/types'

const _fetchData = async ({ app, store, route, error, $axios }: Context) => {
	try {
		const [r1, r2] = await Promise.all([
			$axios.get(app.$apiUrl.GetShopProducts(), {
				params: {
					limit: 8,
					offset: 0,
					category_id: process.env.CATEGORY_SAFFRON_ID,
				},
			}),
			$axios.get(app.$apiUrl.GetShopProducts(), {
				params: {
					limit: 8,
					offset: 0,
					category_id: process.env.CATEGORY_CARDAMON_ID,
				},
			}),
		])
		return {
			saffrons: r1.data.results,
			cardamons: r2.data.results,
		}
	} catch (e: any) {
		app.$errorPage(error, e)
		return Promise.reject(e)
	}
}

@Component({
	middleware: ['fetch'],
	components: {
		ArticleList,
		CardamonFooterSection,
		CardamonBenefitSection,
		CardamonHistorySection,
		SaffronFooterSection,
		ProductList,
		SaffronBenefitSection,
		SaffronHistorySection,
		MainContainer,
		MainHeroSection,
		MainFooter,
		MainHeader,
		MyIcon,
	},
})
export default class HomeIndex extends Vue {
	fetched = false
	loading = true

	saffrons = [] as Product[]
	cardamons = [] as Product[]

	articles = Array(4)
		.fill('')
		.map((i) => ({
			id: i + 1,
			title: 'ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ ﭼﺎپ',
			content: '',
			date: '۲۱ ﻓﺮوردﯾﻦ ۹۹',
			category: 'ﻧﺎم دﺳﺘﻪ',
			image: '/img/image_article_sample.jpg',
		})) as Article[]

	get saffronCategoryId(): string {
		return process.env.CATEGORY_SAFFRON_ID || ''
	}

	get cardamonCategoryId(): string {
		return process.env.CATEGORY_CARDAMON_ID || ''
	}

	async asyncData(context: Context) {
		if (process.server) {
			return {
				...((await _fetchData(context)) || {}),
				fetched: true,
				loading: false,
			}
		} else {
			return {
				fetched: false,
				loading: true,
			}
		}
	}

	async fetchData() {
		this.loading = true
		_fetchData({
			app: this,
			route: this.$route,
			store: this.$store,
			$axios: this.$axios,
			error: this.$nuxt.error,
		} as any)
			.then((r) => {
				this.saffrons = r.saffrons
				this.cardamons = r.cardamons
				this.fetched = true
			})
			.catch((e) => this.$toastErrors(this, e))
			.finally(() => {
				this.loading = false
			})
	}

	mounted() {
		if (!this.fetched) {
			this.fetchData()
		}
	}

	head() {
		return {
			title:
				this.$strings.app_title() +
				' | ' +
				this.$strings.app_subtitle(),
		}
	}
}
</script>
