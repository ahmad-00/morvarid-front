<template>
	<MainContainer type="shop" :fetched="fetched" :loading.sync="loading">
		<div class="flex flex-col px-6 items-center flex-grow">
			<div
				class="w-full max-w-screen-xl flex flex-col mt-14 mb-16 flex-grow"
			>
				<BasketPaymentEndSection
					:type="
						successful && realSuccessful ? 'successful' : 'failed'
					"
					:trackingCode="referenceNumber"
				/>
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
	fetched = false
	loading = false
	realSuccessful = true

	get successful() {
		return String(this.$route.query.status) == 'success' ? true : false
	}

	get invoiceId() {
		return String(this.$route.query.invoiceId)
	}

	get referenceNumber() {
		return String(this.$route.query.referenceNumber)
	}

	get trackId() {
		return String(this.$route.query.trackId)
	}

	async confirm() {
		if (!this.successful) {
			this.fetched = true
			return
		}
		this.loading = true
		try {
			const r = await this.$axios.get(this.$apiUrl.ConfirmPaymentUrl(), {
				params: {
					invoice_id: this.invoiceId,
					reference_number: this.referenceNumber,
					track_id: this.trackId,
				},
			})
			this.realSuccessful = r.data.status == 'success'
			this.fetched = true
		} catch (e) {
			if (e.response?.data?.status == 'not_found') {
				this.fetched = true
			} else {
				this.$toastErrors(this, e)
			}
		}
		this.loading = false
	}

	mounted() {
		this.confirm()
	}
}
</script>

<style scoped></style>
