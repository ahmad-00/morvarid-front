<template>
	<div class="flex flex-col min-h-screen">
		<BasketHeader :step="step" />
		<div class="flex flex-col flex-grow">
			<slot />
		</div>
		<div class="flex flex-col items-center px-6 mb-16">
			<div class="w-full max-w-screen-xl flex items-center">
				<span
					v-if="step !== buttonTitles.length"
					class="text-lg py-4 px-10 rounded-xl border border-primary-dark ripple-bg-white text-natural-dark cursor-pointer"
					@click="$emit('back')"
				>
					{{ $strings.back() }}
				</span>
				<span class="flex-grow" />
				<span
					v-if="step !== buttonTitles.length"
					class="text-lg font-bold py-4 px-10 rounded-xl ripple-bg-primary-dark text-white cursor-pointer"
					@click="$emit('submit')"
				>
					{{ buttonTitles[step - 1] }}
				</span>
			</div>
		</div>
		<div
			v-if="loading"
			class="fixed left-0 top-0 right-0 h-screen bg-white bg-opacity-40 flex items-center justify-center z-50"
		>
			<span class="bg-primary rounded-full w-12 h-12 animate-ping" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import BasketHeader from '~/components/basket/BasketHeader.vue'
import MainFooter from '~/components/home/MainFooter.vue'

@Component({
	components: { MainFooter, BasketHeader, MyIcon },
})
export default class BasketContainer extends Vue {
	@Prop({}) step!: number
	@Prop({}) loading?: boolean

	buttonTitles = [
		this.$strings.order_registration(),
		this.$strings.registration_of_information_and_payment(),
		this.$strings.registration_of_information_and_payment(),
		'',
	]
}
</script>

<style scoped></style>
