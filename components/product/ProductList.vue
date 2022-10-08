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
					v-if="moreLink"
					class="flex items-center text-primary-dark rounded-md hover:text-primary duration-300 cursor-pointer flex-shrink-0"
					:to="moreLink"
				>
					<span class="text-base lg:text-lg font-medium me-2.5">
						{{ $strings.view_all_products() }}
					</span>
					<MyIcon name="arrow-left-square" class="w-5 h-5" />
				</nuxt-link>
			</div>
			<div
				v-if="loading || products.length"
				ref="swiper"
				class="product-list-swiper swiper w-full"
				:class="{
					hidden: !sliderInitialized,
				}"
			>
				<div class="swiper-wrapper">
					<template v-if="!loading">
						<div
							v-for="(product, i) in products"
							:key="i"
							class="swiper-slide h-auto flex flex-col"
						>
							<ProductCard :product="product" class="flex-grow" />
						</div>
					</template>
					<template v-else>
						<div
							v-for="i in 4"
							:key="i"
							class="swiper-slide h-auto flex flex-col"
						>
							<ProductCard :loading="true" class="flex-grow" />
						</div>
					</template>
				</div>
				<div
					class="swiper-pagination flex items-center justify-center mt-8"
				></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
				<div class="swiper-scrollbar"></div>
			</div>
			<span
				v-else
				class="text-2xl font-bold text-natural-mute opacity-50 self-center"
			>
				{{ $strings.nothing_found() }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import { Product } from '~/config/types'
import { Swiper, Pagination } from 'swiper'
import 'swiper/swiper.min.css'

Swiper.use([Pagination])

@Component({
	components: { ProductCard, MyIcon },
})
export default class ProductList extends Vue {
	@Prop() products!: Product[]
	@Prop() title!: string
	@Prop() moreLink!: string
	@Prop({ default: false }) loading?: boolean

	sliderInitialized = false

	initSwiper() {
		const swiperEl = this.$refs.swiper as HTMLElement
		new Swiper(swiperEl, {
			loop: false,
			pagination: {
				el: swiperEl.querySelector('.swiper-pagination') as HTMLElement,
				clickable: true,
				renderBullet: function (index, className) {
					return `<span class="${className}"></span>`
				},
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

<style>
.product-list-swiper .swiper-slide {
	height: auto !important;
}

.product-list-swiper .swiper-pagination-bullet {
	@apply w-1.5 h-1.5 rounded-full bg-gray-300 text-xs text-natural-semidark mx-1 duration-300 cursor-pointer;
}

.product-list-swiper .swiper-pagination-bullet-active {
	@apply w-3 bg-primary-dark text-white;
}
</style>
