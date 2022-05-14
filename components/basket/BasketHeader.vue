<template>
	<div class="flex flex-col pt-12 px-6 items-center">
		<div class="max-w-screen-lg w-full flex flex-col">
			<nuxt-link :to="$routeUrl.HomeUrl()" class="mb-6 self-center">
				<img
					src="/img/site_logo.png"
					alt=""
					class="h-11 w-auto"
				/>
			</nuxt-link>
			<StepBar :steps="steps" :step="step" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import StepBar, { StepItemType } from '~/components/utils/StepBar.vue'

@Component({
	components: { StepBar, MyIcon },
})
export default class BasketHeader extends Vue {
	@Prop({}) step!: number
	steps = [
		{
			title: this.$strings.shopping_cart(),
			icon: 'buy',
		},
		{
			title: this.$strings.additional_information(),
			icon: 'document',
		},
		{
			title: this.$strings.payment(),
			icon: 'ticket',
		},
		{
			title: this.$strings.end_of_purchase(),
			icon: 'tick',
		},
	] as StepItemType[]
}
</script>

<style scoped></style>
