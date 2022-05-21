<template>
	<div class="flex flex-col items-center px-6">
		<div class="flex flex-col max-w-screen-xl w-full">
			<div class="flex items-center mb-12">
				<span
					class="text-2xl lg:text-3xl font-bold flex-grow text-natural-dark line-clamp-1 me-4"
				>
					{{ title }}
				</span>
				<nuxt-link
					class="flex items-center text-primary-dark rounded-md hover:text-primary duration-300 cursor-pointer flex-shrink-0"
					:to="moreLink"
				>
					<span class="text-base lg:text-lg font-medium me-2.5">
						{{ $strings.view_all_articles() }}
					</span>
					<MyIcon name="arrow-left-square" class="w-5 h-5" />
				</nuxt-link>
			</div>
			<div
				ref="swiper"
				class="swiper w-full"
				:class="{
					hidden: !sliderInitialized,
				}"
			>
				<div class="swiper-wrapper">
					<div
						v-for="(article, i) in articles"
						:key="i"
						class="swiper-slide"
					>
						<ArticleCard :article="article" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
				<div class="swiper-scrollbar"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import ArticleCard from '~/components/article/ArticleCard.vue'
import { Article } from '~/config/types'
import { Swiper } from 'swiper'
import 'swiper/swiper.min.css'

@Component({
	components: { ArticleCard, MyIcon },
})
export default class ArticleList extends Vue {
	@Prop() articles!: Article[]
	@Prop() title!: string
	@Prop() moreLink!: string

	sliderInitialized = false

	initSwiper() {
		new Swiper(this.$refs.swiper as HTMLElement, {
			loop: false,
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			scrollbar: {
				el: '.swiper-scrollbar',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 24,
				},
				600: {
					slidesPerView: 2,
					spaceBetween: 24,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				1280: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			},
			on: {
				init: () => {
					this.sliderInitialized = true
				},
			},
		})
	}

	mounted() {
		this.initSwiper()
	}
}
</script>

<style scoped></style>
