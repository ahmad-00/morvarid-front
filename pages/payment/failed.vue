<template>
	<MainContainer type="shop" :fetched="fetched" :loading.sync="loading">
		<div class="flex flex-col px-6 items-center flex-grow">
			<div
				class="w-full max-w-screen-xl flex flex-col mt-14 mb-16 flex-grow"
			>
				<BasketPaymentEndSection type="failed" />
			</div>
		</div>
	</MainContainer>
</template>

<script>
import Vue from 'vue'
import MainContainer from '~/components/home/MainContainer'
import { Component } from 'nuxt-property-decorator'
import BasketPaymentEndSection from '~/components/basket/BasketPaymentEndSection'

@Component({
	middleware: ['fetch', 'auth'],
	components: { BasketPaymentEndSection, MainContainer },
})
export default class PaymentSuccessfulPage extends Vue {
	fetched = true
	loading = false
}
</script>

<style scoped></style>
