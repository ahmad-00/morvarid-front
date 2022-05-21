<template>
	<div class="flex flex-col items-center justify-center">
		<div class="flex flex-col items-start mt-20 mb-32">
			<MyIcon name="invoice" class="w-20 h-20 text-primary-dark mb-8" />
			<span class="text-natural-dark font-bold text-3xl">
				{{ $strings.payment_was_successful() }}
			</span>
			<span class="text-natural-dark mt-1">
				{{ $strings.thank_you_for_your_purchase_and_trust() }}
			</span>
			<div v-if="trackingCode" class="flex items-center mt-8">
				<span class="text-xl text-natural-dark font-medium">
					{{ $strings.your_purchase_tracking_code() + ' :' }}
				</span>
				<span class="text-3xl font-bold text-natural-dark ms-3">
					{{ trackingCode }}
				</span>
			</div>
			<nuxt-link
				class="ripple-bg-primary-dark rounded-xl text-white font-bold appearance-none focus:outline-none px-8 py-4 mt-8 cursor-pointer"
				:to="$routeUrl.ShopUrl()"
			>
				{{ $strings.continue_the_buying_process() }}
			</nuxt-link>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Component, Prop } from "nuxt-property-decorator";

@Component({
	components: { MyIcon },
})
export default class BasketPaymentEndSection extends Vue {
	@Prop({}) trackingCode!: string | number
}
</script>

<style></style>
