<template>
	<div class="relative cursor-pointer" @click="$emit('click')">
		<div class="pt-1/1">
			<div
				class="absolute left-0 top-0 right-0 bottom-0 bg-primary-dark m-2 duration-300"
				:style="{ borderRadius: selected ? '100%' : '25%' }"
				:class="{
					'bg-opacity-0': selected,
					'bg-opacity-10': !selected,
				}"
			/>
			<div
				class="absolute left-0 top-0 right-0 bottom-0 bg-natural-dark rounded-full overflow-hidden"
				:style="{
					backgroundImage: `url('${image}')`,
					backgroundSize: 'cover',
				}"
			>
				<div
					class="w-full h-full flex flex-col items-center justify-center text-white bg-natural-dark bg-opacity-75"
				>
					<span class="text-6xl font-black mb-8">
						{{ title }}
					</span>
					<span class="text-3xl font-medium">
						{{ subtitle }}
					</span>
				</div>
			</div>
			<div
				class="absolute left-0 top-0 right-0 bottom-0 rounded-full duration-300 border-primary pointer-events-none"
				:class="{
					'border-8': selected,
					'border-0': !selected,
				}"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import Vue from 'vue'

@Component({
	components: {
		MyIcon,
	},
})
export default class ShopWeightCard extends Vue {
	@Prop({ default: 'title' }) title?: string
	@Prop({ default: 'subtitle' }) subtitle?: string
	@Prop({}) image?: string
	@Prop({}) selected?: boolean
}
</script>

<style scoped></style>
