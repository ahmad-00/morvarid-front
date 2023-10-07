<template>
	<TransitionFade>
		<div
			v-if="visible"
			class="h-screen bg-black bg-opacity-75 fixed top-0 left-0 right-0 z-30 flex flex-col items-center px-6 select-none"
		>
			<div
				class="absolute left-0 top-0 right-0 bottom-0"
				@click="$emit('close')"
			/>
			<div
				class="flex-grow relative mb-6 mt-8 mx-6 overflow-hidden rounded-3xl"
			>
				<img
					:src="getImagePath(sliderSelected.path)"
					alt=""
					class="w-full h-full"
				/>
			</div>
			<div
				class="flex max-w-screen-md overflow-hidden mb-2 flex-shrink-0"
				v-dragscroll.x
			>
				<span
					v-for="(image, i) in images"
					:key="i"
					class="p-2 flex-shrink-0 relative cursor-pointer"
					@click="$emit('update:index', i)"
				>
					<img
						:src="getImagePath(image.path_thumb1)"
						alt=""
						class="w-14 h-14 object-cover rounded-xl"
					/>
					<div
						class="border-2 bg-primary bg-opacity-25 border-primary absolute left-0 top-0 right-0 bottom-0 pointer-events-none m-2 flex items-center justify-center rounded-xl"
						:class="{
							'opacity-100': index === i,
							'opacity-0': index !== i,
							[`pis-slider-${i}`]: true,
						}"
					/>
				</span>
			</div>
			<div
				class="ripple-bg-primary cursor-pointer w-14 h-14 absolute left-0 top-0 bottom-0 my-auto flex items-center justify-center me-4 rounded-full"
				@click="sliderGoNext"
			>
				<MyIcon name="arrow-left" class="text-white w-6 h-6" />
			</div>
			<div
				class="ripple-bg-primary cursor-pointer w-14 h-14 absolute right-0 top-0 bottom-0 my-auto flex items-center justify-center ms-4 rounded-full"
				@click="sliderGoPrev"
			>
				<MyIcon
					name="arrow-left"
					class="text-white w-6 h-6 transform rotate-180"
				/>
			</div>
			<span
				class="ripple-bg-primary absolute top-0 start-0 ms-8 mt-8 cursor-pointer w-12 h-12 flex items-center justify-center rounded-full"
				@click="$emit('close')"
			>
				<MyIcon name="close" class="text-white w-6 h-6" />
			</span>
		</div>
	</TransitionFade>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TransitionFade from '~/components/anim/TransitionFade.vue'
import { Image } from '~/config/types'
import MyIcon from './MyIcon.vue'

export default Vue.extend({
	components: { TransitionFade, MyIcon },
	props: {
		visible: Boolean,
		images: Array as PropType<Image[]>,
		index: Number,
	},
	watch: {
		index(n) {
			document.querySelector(`.pis-slider-${n}`)?.scrollIntoView({
				behavior: 'smooth',
			})
		},
	},
	methods: {
		sliderGoPrev() {
			let t = this.index - 1
			if (t < 0) t = this.images.length - 1
			this.$emit('update:index', t)
		},
		sliderGoNext() {
			let t = this.index + 1
			if (t > this.images.length - 1) t = 0
			this.$emit('update:index', t)
		},
		getImagePath(path: string): string {
			return (
				this.$apiUrl.MediaBaseUrl(this.$config) +
				this.$apiUrl.GetMediaUrl(path)
			)
		},
	},
	computed: {
		sliderSelected(): Image {
			return this.images[this.index] || null
		},
	},
})
</script>

<style scoped></style>
