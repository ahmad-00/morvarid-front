<template>
	<div class="flex flex-col items-center justify-center">
		<div v-if="info" class="flex flex-col items-start mt-20 mb-32">
			<MyIcon
				name="invoice"
				class="w-20 h-20 mb-8"
				:class="{
					[info.textClass]: true,
				}"
			/>
			<span
				class="font-bold text-3xl"
				:class="{
					[info.textClass]: true,
				}"
			>
				{{ info.title || '~' }}
			</span>
			<span class="text-natural-dark mt-1">
				{{ info.subtitle || '~' }}
			</span>
			<div v-if="trackingCode" class="flex items-center mt-8">
				<span class="text-xl text-natural-dark font-medium">
					{{ $strings.bank_tracking_code() + ' :' }}
				</span>
				<span class="text-3xl font-bold text-natural-dark ms-3">
					{{ trackingCode }}
				</span>
			</div>
			<span
				v-if="info.message"
				class="text-natural-semidark mt-8 text-lg font-bold"
			>
				{{ info.message || '~' }}
			</span>
			<div
				v-if="info.buttonLink && info.buttonText"
				class="flex items-center mt-8"
			>
				<nuxt-link
					class="ripple-bg-primary rounded-xl text-white font-bold appearance-none focus:outline-none px-8 py-4 cursor-pointer"
					:to="info.buttonLink"
				>
					{{ info.buttonText }}
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Location } from 'vue-router'

import MyIcon from '~/components/utils/MyIcon.vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({
	components: { MyIcon },
})
export default class BasketPaymentEndSection extends Vue {
	@Prop({ default: 'successful' }) type?: 'successful' | 'failed'
	@Prop({}) trackingCode!: string | number

	get info() {
		if (this.type === 'successful') {
			return {
				title: this.$strings.payment_was_successful(),
				subtitle: this.$strings.thank_you_for_your_purchase_and_trust(),
				message:
					this.$strings.your_order_will_be_sent_after_verification(),
				buttonText: this.$strings.order_tracking(),
				buttonLink: {
					path: this.$routeUrl.PanelOrdersUrl(),
					query: {
						status: 'submitted',
					},
				} as Location,
				textClass: 'text-green-500',
			}
		} else if (this.type === 'failed' || !this.type) {
			return {
				title: this.$strings.payment_failed(),
				subtitle: this.$strings.payment_operation_was_unsuccessful(),
				message: this.$strings.order_payment_error_tip_message(),
				buttonText: this.$strings.order_tracking(),
				buttonLink: {
					path: this.$routeUrl.PanelOrdersUrl(),
					query: {
						status: 'submitted',
					},
				} as Location,
				textClass: 'text-red-500',
			}
		}
	}
}
</script>

<style></style>
