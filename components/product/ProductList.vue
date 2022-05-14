<template>
	<div class="flex flex-col items-center px-6">
		<div class="flex flex-col max-w-screen-xl w-full">
			<div class="flex items-center mb-12">
				<span class="text-4xl font-bold flex-grow text-natural-dark">
					{{ title }}
				</span>
				<nuxt-link
					v-if="moreLink"
					class="flex items-center text-primary-dark rounded-md hover:text-primary duration-300 cursor-pointer"
					:to="moreLink"
				>
					<span class="text-lg font-medium me-2.5">
						{{ $strings.view_all_products() }}
					</span>
					<MyIcon name="arrow-left-square" class="w-5 h-5" />
				</nuxt-link>
			</div>
			<div
				:class="{
					[`product-list-swiper-${uid} swiper w-full`]: true,
					hidden: !sliderInitialized,
				}"
			>
				<div class="swiper-wrapper">
					<div
						v-for="(product, i) in products"
						:key="i"
						class="swiper-slide"
					>
						<ProductCard :product="product" />
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
import ProductCard from '~/components/product/ProductCard.vue'
import { Product } from '~/config/types'
import { Swiper } from 'swiper'

let uidCounter = 1

@Component({
	components: { ProductCard, MyIcon },
})
export default class ProductList extends Vue {
	@Prop() products!: Product[]
	@Prop() title!: string
	@Prop() moreLink!: string

	uid = uidCounter++
	sliderInitialized = false

	initSwiper() {
		new Swiper(`.product-list-swiper-${this.uid}`, {
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
			slidesPerView: 4,
			spaceBetween: 40,
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
