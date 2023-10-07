<template>
	<BasketContainer
		:step="step"
		@back="back"
		@submit="submit"
		:loading="loading"
		:fetched="fetched"
		@tryAgain="getOrder"
	>
		<div class="flex flex-col px-6 items-center flex-grow">
			<div
				class="w-full max-w-screen-xl flex flex-col mt-14 mb-16 flex-grow"
			>
				<BasketBuySection
					v-if="step === 1"
					:products="basket"
					@update:products="(v) => $store.commit('basket/set', v)"
				/>
				<BasketInfoSection
					v-else-if="step === 2"
					:products="basket"
					@update:products="(v) => $store.commit('basket/set', v)"
				/>
				<BasketReceiptSection
					v-else-if="step === 3"
					:products="orderProducts"
					:receiptImage.sync="receiptImage"
					@uploading="(v) => (loading = v)"
				/>
				<BasketPaymentEndSection v-else-if="step === 4" />
			</div>
		</div>
	</BasketContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import BasketContainer from '~/components/basket/BasketContainer.vue'
import BasketItemCard from '~/components/basket/BasketProductCard.vue'
import { Product, User, Order } from '~/config/types'
import BasketFirstSection from '~/components/basket/BasketBuySection.vue'
import BasketBuySection from '~/components/basket/BasketBuySection.vue'
import BasketInfoSection from '~/components/basket/BasketInfoSection.vue'
import BasketReceiptSection from '~/components/basket/BasketReceiptSection.vue'
import BasketPaymentEndSection from '~/components/basket/BasketPaymentEndSection.vue'

@Component({
	middleware: ['fetch'],
	components: {
		BasketPaymentEndSection,
		BasketInfoSection,
		BasketReceiptSection,
		BasketBuySection,
		BasketFirstSection,
		BasketItemCard,
		BasketContainer,
		MyIcon,
	},
})
export default class BasketPage extends Vue {
	loading = true
	fetched = false
	step = 1
	order = null as Order | null
	receiptImage = null as any

	get user(): User | null {
		return this.$store.state.user.user || null
	}

	get basket(): Product[] {
		return this.$store.state.basket.basket || []
	}

	get orderProducts(): Product[] {
		return (
			this.order?.items?.map((item) => ({
				...item.product_detail,
				quantity: item.quantity,
			})) || []
		)
	}

	get selectedAddressId(): string | null {
		return this.$store.state.basket.selectedAddressId || null
	}

	get trackingNumber(): string | null {
		return String(this.$route.query.tracking_number || '') || null
	}

	back() {
		if (this.step > 1) {
			this.step--
			return
		}
		if (window.history.length > 2) {
			this.$router.back()
		} else {
			this.$router.push(this.$routeUrl.ShopUrl())
		}
	}

	async submit() {
		if (this.step === 1) {
			if (!this.basket.length) {
				this.$toast.error(
					this.$strings.error_empty_basket(),
					'',
					{} as any
				)
				return
			} else if (!this.user) {
				this.$toast.error(this.$strings.login_error(), '', {} as any)
				this.loading = true
				await this.$router.push(this.$routeUrl.LoginUrl())
				return
			} else if (this.basket.some((p) => !Number(p.quantity))) {
				this.$toast.error(
					this.$strings.error_product_number_is_wrong(),
					'',
					{} as any
				)
				return
			}
			this.step = 2
		} else if (this.step === 2) {
			if (
				!this.user ||
				!this.user?.first_name ||
				!this.user?.last_name ||
				!this.user.phone
			) {
				this.$toast.error(
					this.$strings.error_empty_user_info(),
					'',
					{} as any
				)
				return
			} else if (!this.selectedAddressId) {
				this.$toast.error(
					this.$strings.error_empty_address(),
					'',
					{} as any
				)
				return
			}
			await this.submitOrder()
		} else if (this.step === 3) {
			if (!this.receiptImage) {
				this.$toast.error(
					this.$strings.error_empty_payment_receipt(),
					'',
					{} as any
				)
				return
			}
			await this.submitPaymentReceipt()
		}
	}

	async submitOrder() {
		this.loading = true
		try {
			const r = await this.$axios.post(this.$apiUrl.SubmitOrderUrl(), {
				products: this.basket.map((v) => ({
					product_id: v.id,
					quantity: v.quantity,
				})),
				address_id: this.selectedAddressId,
			})
			this.$store.commit('basket/set', [])
			this.step = 3
			await this.getOrder()
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.loading = false
	}

	async submitPaymentReceipt() {
		this.loading = true
		try {
			const r = await this.$axios.post(
				this.$apiUrl.SubmitPaymentReceiptUrl(this.order?.id!),
				{
					receipt_image: this.receiptImage,
				}
			)
			console.log(r.data)
			this.step = 4
			// await this.$router.push(this.$routeUrl.PaymentSuccessfulUrl())
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.loading = false
	}

	async getOrder() {
		this.loading = true
		this.fetched = false
		try {
			const r = await this.$axios.get(this.$apiUrl.GetOrdersUrl(), {
				params: this.trackingNumber
					? {
							limit: 1,
							page: 1,
							tracking_number: this.trackingNumber,
					  }
					: {
							limit: 1,
							page: 1,
					  },
			})
			const order: Order | null = r?.data?.results?.[0] || null
			this.order = order
			if (order) {
				if (this.trackingNumber != order.tracking_number) {
					await this.$router.replace({
						query: {
							...this.$route.query,
							tracking_number: order.tracking_number,
						},
					})
				}
				if (order.status == 'submitted') {
					this.step = 3
				} else {
					this.step = 4
					// await this.$router.push(this.$routeUrl.PaymentSuccessfulUrl())
				}
			}
			this.fetched = true
		} catch (e: any) {
			this.$toastErrors(this, e)
		}

		this.loading = false
	}

	head() {
		return {
			title: this.$strings.basket() + ' | ' + this.$strings.app_title(),
		}
	}

	mounted() {
		if (this.trackingNumber) {
			this.getOrder()
		} else {
			this.loading = false
			this.fetched = true
		}
	}
}
</script>
