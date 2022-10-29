<template>
	<BasketContainer
		:step="step"
		@back="back"
		@submit="submit"
		:loading="loading"
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
import { Product, User } from '~/config/types'
import BasketFirstSection from '~/components/basket/BasketBuySection.vue'
import BasketBuySection from '~/components/basket/BasketBuySection.vue'
import BasketInfoSection from '~/components/basket/BasketInfoSection.vue'
import BasketPaymentEndSection from '~/components/basket/BasketPaymentEndSection.vue'

@Component({
	middleware: ['fetch'],
	components: {
		BasketPaymentEndSection,
		BasketInfoSection,
		BasketBuySection,
		BasketFirstSection,
		BasketItemCard,
		BasketContainer,
		MyIcon,
	},
})
export default class BasketPage extends Vue {
	loading = false
	step = 1

	get user(): User | null {
		return this.$store.state.user.user || null
	}

	get basket(): Product[] {
		return this.$store.state.basket.basket || []
	}

	get selectedAddressId(): string | null {
		return this.$store.state.basket.selectedAddressId || null
	}

	get trackingCode(): string | null {
		return String(this.$route.query.tracking_code) || null
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
			} else if (this.basket.some(p => !Number(p.quantity))) {
				this.$toast.error(this.$strings.error_product_number_is_wrong(), '', {} as any)
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
		}
	}

	async submitOrder() {
		this.loading = true
		try {
			await this.$axios.post(this.$apiUrl.SubmitOrderUrl(), {
				products: this.basket.map((v) => ({
					product_id: v.id,
					quantity: v.quantity,
				})),
				address_id: this.selectedAddressId,
			})
			this.$store.commit('basket/set', [])
			this.step = 3
			await this.$router.push(this.$routeUrl.PaymentSuccessfulUrl())
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
}
</script>
