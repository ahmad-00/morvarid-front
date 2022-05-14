<template>
	<div
		class="flex items-center bg-primary bg-opacity-5 rounded-full py-6 px-9"
	>
		<template v-for="(s, i) in steps">
			<span
				:key="'a-' + i"
				class="flex items-center text-primary"
				:class="{
					'opacity-30': i + 1 >= step,
					'opacity-100': i + 1 < step,
				}"
			>
				<MyIcon :name="s.icon" class="w-6 h-6 me-2" />
				<span class="font-bold">{{ s.title }}</span>
			</span>
			<span
				v-if="steps.length !== i + 1"
				:key="'b-' + i"
				class="h-1 flex-grow mx-6 bg-natural-dark rounded-full"
				:class="{
					'opacity-10': i + 1 >= step,
					'opacity-40': i + 1 < step,
				}"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon, { IconType } from '~/components/utils/MyIcon.vue'

export type StepItemType = {
	title: string
	icon: IconType
}

@Component({
	components: { MyIcon },
})
export default class StepBar extends Vue {
	@Prop({}) steps!: StepItemType[]
	@Prop({}) step!: number
}
</script>

<style scoped></style>
