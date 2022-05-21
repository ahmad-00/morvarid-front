<template>
	<div class="select-none"
		 :class="{
			'animate-pulse': loading,
		}"
	>
		<div
			v-if="!loading"
			class="relative rounded-3xl overflow-hidden mb-8 cursor-pointer"
			@click="isSliderVisible = true"
		>
			<div class="pt-3/4">
				<img
					class="absolute left-0 top-0 w-full h-full object-cover"
					:src="
						selectedImage
							? $apiUrl.BaseUrl() +
							  $apiUrl.GetMediaUrl(selectedImage.path)
							: null
					"
					alt=""
				/>
			</div>
		</div>
		<div
			v-else
			class="mb-8 pt-3/4 rounded-3xl bg-gray-200"
		></div>
		<div
			ref="swiper"
			class="swiper w-full"
			:class="{
				hidden: !sliderInitialized,
			}"
		>
			<div class="swiper-wrapper">
				<template v-if="!loading">
					<div
						v-for="(image, i) in images"
						:key="i"
						class="swiper-slide relative rounded-3xl overflow-hidden cursor-pointer"
						@click="selectedIndex = i"
					>
						<div class="pt-1/1">
							<img
								class="absolute left-0 top-0 w-full h-full object-cover"
								:src="
									$apiUrl.BaseUrl() +
									$apiUrl.GetMediaUrl(image.path_thumb1)
								"
								alt=""
							/>
							<div
								class="absolute left-0 top-0 right-0 bottom-0 rounded-3xl border-8 border-primary-dark bg-primary-dark bg-opacity-30 flex items-center justify-center transform"
								:class="{
									'opacity-100 scale-100':
										selectedIndex === i,
									'opacity-0 scale-0': selectedIndex !== i,
								}"
							>
								<div
									class="w-8 h-8 rounded-full bg-primary-dark shadow-lg"
								/>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div
						v-for="i in 3"
						:key="i"
						class="swiper-slide rounded-3xl bg-gray-200"
					>
						<div class="pt-1/1" />
					</div>
				</template>
			</div>
		</div>
		<ImageSlider
			:visible="isSliderVisible"
			:index.sync="selectedIndex"
			:images="images"
			@close="isSliderVisible = false"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import MainContainer from '~/components/home/MainContainer.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import Vue from 'vue'
import { Image } from '~/config/types'
import ImageSlider from '~/components/utils/ImageSlider.vue'
import { Swiper } from 'swiper'
import 'swiper/swiper.min.css'

@Component({
	components: {
		ImageSlider,
		MainContainer,
		MyIcon,
	},
})
export default class ProductSliderSection extends Vue {
	@Prop({}) images?: Image[]
	@Prop({ default: false }) loading?: boolean

	isSliderVisible = false
	selectedIndex = 0
	sliderInitialized = false

	get selectedImage(): Image | null {
		return this.images?.[this.selectedIndex] || null
	}

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
					slidesPerView: 2,
					spaceBetween: 24,
				},
				500: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
				1280: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
			},
			slideToClickedSlide: true,
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
