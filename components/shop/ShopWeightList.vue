<template>
	<div class="flex flex-col px-6 items-center">
		<div class="max-w-screen-xl w-full flex flex-col">
			<div
				ref="swiper"
				class="shop-weight-list-swiper swiper w-full"
				:class="{
					hidden: !sliderInitialized,
				}"
			>
				<div class="swiper-wrapper">
					<template v-if="!loading">
						<div
							v-for="(d, i) in data"
							:key="i"
							class="swiper-slide"
						>
							<ShopWeightCard
								:key="i"
								:title="d.title"
								:subtitle="d.subtitle"
								:image="d.image"
								:selected="d.selected"
								@click="$emit('select', d.weight)"
								class=""
							/>
						</div>
					</template>
					<template v-else>
						<div v-for="i in 5" :key="i" class="swiper-slide">
							<ShopWeightCard :key="i" :loading="true" />
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
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import ShopWeightCard from '~/components/shop/ShopWeightCard.vue'
import { Swiper, Pagination } from 'swiper'
import 'swiper/swiper.min.css'

Swiper.use([Pagination])

@Component({
	components: {
		ShopWeightCard,
		MyIcon,
	},
})
export default class ShopWeightList extends Vue {
	@Prop() data!: any[]
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
					slidesPerView: 2,
					spaceBetween: 24,
				},
				600: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 24,
				},
				1280: {
					slidesPerView: 5,
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
.shop-weight-list-swiper .swiper-pagination-bullet {
	@apply w-1.5 h-1.5 rounded-full bg-slate-300 text-xs text-natural-semidark mx-1 duration-300 cursor-pointer;
}

.shop-weight-list-swiper .swiper-pagination-bullet-active {
	@apply w-3 bg-primary-dark text-white;
}
</style>
