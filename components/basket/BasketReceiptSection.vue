<template>
	<div class="flex flex-col">
		<div :class="['grid grid-cols-1 lg:grid-cols-12 gap-8 py-8']">
			<div class="col-span-1 lg:col-span-7 flex flex-col">
				<span class="text-xl text-natural-dark font-bold mb-2">
					{{ $strings.payment() }}
				</span>
				<div class="grid grid-cols-2 mt-4 mb-6 gap-4">
					<div
						v-for="(paymentMethod, i) in paymentMethods"
						:key="i"
						:class="[
							'border rounded-lg text-sm duration-300 px-3 py-3 flex items-center',
							paymentMethod.value == method
								? 'border-primary bg-primary bg-opacity-5 text-primary pointer-events-none'
								: 'border-slate-300 bg-white hover:bg-slate-50 text-natural-dark cursor-pointer',
						]"
						@click="$emit('update:method', paymentMethod.value)"
					>
						<MyIcon
							:name="paymentMethod.icon"
							class="w-8 h-8 me-3"
						/>
						<span class="">
							{{ paymentMethod.label }}
						</span>
					</div>
				</div>
				<div v-if="method == 'card-to-card'" class="flex flex-col">
					<span class="text-sm text-natural-semidark mb-6">
						{{ $strings.order_payment_message_1() }}
					</span>
					<div class="flex flex-col space-y-4 mb-8">
						<div
							v-for="(bankCard, i) in bankCards"
							:key="i"
							class="flex border border-slate-300 rounded-lg bg-white p-4 relative overflow-hidden"
						>
							<div class="flex flex-col z-1 flex-grow me-4">
								<div class="flex flex-col mb-4">
									<span
										class="text-sm font-bold text-natural-dark"
									>
										{{ $strings.bank_name() }}
									</span>
									<span
										class="text-sm text-natural-semidark mt-1.5"
									>
										{{ bankCard.name }}
									</span>
								</div>
								<div class="flex flex-col mb-4">
									<span
										class="text-sm font-bold text-natural-dark"
									>
										{{ $strings.card_number() }}
									</span>
									<span
										class="text-sm text-natural-semidark mt-1.5"
									>
										{{ bankCard.card_number }}
									</span>
								</div>
								<div class="flex flex-col">
									<span
										class="text-sm font-bold text-natural-dark"
									>
										{{ $strings.account_holder_name() }}
									</span>
									<span
										class="text-sm text-natural-semidark mt-1.5"
									>
										{{ bankCard.card_holder }}
									</span>
								</div>
							</div>
							<div class="flex flex-col z-1 flex-grow">
								<div class="flex flex-col mb-4">
									<span
										class="text-sm font-bold text-natural-dark"
									>
										{{ $strings.shaba() }}
									</span>
									<span
										class="text-sm text-natural-semidark mt-1.5"
									>
										{{ bankCard.shaba }}
									</span>
								</div>
								<div class="flex flex-col">
									<span
										class="text-sm font-bold text-natural-dark"
									>
										{{ $strings.account_number() }}
									</span>
									<span
										class="text-sm text-natural-semidark mt-1.5"
									>
										{{ bankCard.account_number }}
									</span>
								</div>
							</div>
							<MyIcon
								name="credit-card"
								class="w-32 h-32 absolute bottom-0 end-0 transform scale-150 -mb-7 rotate-12 me-2 text-primary opacity-10 pointer-events-none"
							/>
						</div>
					</div>
					<span class="text-xl text-natural-dark font-bold mb-2">
						{{ $strings.payment_receipt() }}
					</span>
					<span class="text-sm text-natural-semidark mb-6">
						{{ $strings.order_payment_message_2() }}
					</span>
					<ImageUploader
						:name="$strings.payment_receipt()"
						:src="receiptImage"
						@change="onUploadImage"
						@uploading="(v) => $emit('uploading', v)"
					/>
				</div>
			</div>
			<div class="col-span-1 lg:col-span-5 flex flex-col">
				<span class="text-natural-dark font-bold text-xl mb-4">
					{{ $strings.order_summary() }}
				</span>
				<BasketProductHorizontalCard
					v-for="(item, i) in products"
					:key="i"
					:product="item"
					class="bg-primary bg-opacity-3 mb-2"
				/>
				<div class="flex flex-col w-full mt-6">
					<div class="flex items-center py-px ps-8 pe-6 w-full">
						<span
							class="text-lg text-natural-dark flex-grow font-medium"
						>
							{{ $strings.total() }}
						</span>
						<span class="text-3xl text-natural-dark font-medium">
							{{ formattedTotalPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-6 h-6 text-natural-dark ms-1 self-center"
						/>
					</div>
					<div
						v-if="discountPrice"
						class="flex items-center py-px ps-8 pe-6 w-full mt-3"
					>
						<span class="text-lg text-natural-dark flex-grow">
							{{ $strings.discount() }}
						</span>
						<span class="text-3xl text-green-500 font-bold">
							{{ formattedDiscountPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-7 h-7 text-natural-dark ms-1 flex-shrink-0"
						/>
					</div>
					<div
						class="flex items-center bg-primary bg-opacity-10 rounded-full py-1.5 ps-8 pe-6 w-full mt-6"
					>
						<span
							class="text-lg text-natural-dark flex-grow font-medium"
						>
							{{ $strings.payment_amount() }}
						</span>
						<span class="text-3xl font-bold text-natural-dark">
							{{ formattedActualTotalPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-6 h-6 text-natural-dark ms-1 self-center"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import MaterialLabel from '~/components/utils/MaterialLabel.vue'
import TextInput from '~/components/utils/TextInput.vue'
// @ts-ignore
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { Address, Product, User } from '~/config/types'
import BasketProductHorizontalCard from '~/components/basket/BasketProductHorizontalCard.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import ModalContainer from '~/components/utils/ModalContainer.vue'
import AuthFormCard from '~/components/auth/AuthFormCard.vue'
import CreateAddressDialog from '~/components/address/CreateAddressDialog.vue'
import AddressCard from '~/components/address/AddressCard.vue'
import ImageUploader from '~/components/utils/ImageUploader.vue'

@Component({
	components: {
		AddressCard,
		CreateAddressDialog,
		AuthFormCard,
		ModalContainer,
		MyIcon,
		BasketProductHorizontalCard,
		TextInput,
		vSelect,
		MaterialLabel,
		ImageUploader,
	},
})
export default class BasketReceiptSection extends Vue {
	@Prop({}) products!: Product[]
	@Prop({}) receiptImage!: any
	@Prop({}) method!: 'card-to-card' | 'gateway'

	addressLoading = false
	addresses = null as Address[] | null

	userData = {
		visible: false,
		loading: false,
		title: '',
		showFirstname: false,
		showLastname: false,
		showEmail: false,
		showMobile: false,
		firstname: '' as any,
		lastname: '' as any,
		email: '' as any,
		mobile: '' as any,
	}

	modalLoading = false
	isCreateAddressDialogVisible = false
	isDeleteAddressDialogVisible = false
	targetAddress = {} as Address

	get paymentMethods() {
		return [
			{
				value: 'gateway',
				label: this.$strings.bank_gateway(),
				icon: 'bank',
			},
			{
				value: 'card-to-card',
				label: this.$strings.card_to_card(),
				icon: 'credit-card',
			},
		]
	}

	get user(): User | null {
		return this.$store.state.user.user || null
	}

	get selectedAddressId(): string | null {
		return this.$store.state.basket.selectedAddressId || null
	}

	get totalPrice(): number {
		return (
			this.products
				.map((v) => (v.quantity || 0) * v.price)
				.reduce((a, b) => a + b, 0) || 0
		)
	}

	get actualTotalPrice(): number {
		return (
			this.products
				.map((v) => {
					const q = Number(v.quantity) || 0
					if (
						q >= v.wholesale_min_count &&
						v.wholesale_payable_price
					) {
						return (v.quantity || 0) * v.wholesale_payable_price
					} else if (v.payable_price) {
						return (v.quantity || 0) * v.payable_price
					} else {
						return (v.quantity || 0) * v.price
					}
				})
				.reduce((a, b) => a + b, 0) || 0
		)
	}

	get discountPrice(): number {
		return this.totalPrice - this.actualTotalPrice
	}

	get formattedTotalPrice(): string {
		return this.$stringUtils.prettyPrice(this.totalPrice) || ''
	}

	get formattedActualTotalPrice(): string {
		return this.$stringUtils.prettyPrice(this.actualTotalPrice) || ''
	}

	get formattedDiscountPrice(): string {
		return this.$stringUtils.prettyPrice(this.discountPrice) || ''
	}

	get bankCards() {
		return [
			{
				name: 'مسکن',
				shaba: 'IR670140040000014005211785',
				card_number: '6280231382526035',
				account_number: '14005211785',
				card_holder: 'مروارید سپید فرشتگان',
			},
		]
	}

	@Watch('user')
	onUserChange(n: User | null) {
		this.userData = {
			...this.userData,
			firstname: n?.first_name as any,
			lastname: n?.last_name as any,
			email: n?.email as any,
			mobile: n?.phone as any,
		}
	}

	openUserEditDialog(type: 'name' | 'email' | 'mobile') {
		if (type === 'name') {
			this.userData = {
				visible: true,
				title: this.$strings.firstname_and_lastname(),
				showFirstname: true,
				showLastname: true,
				firstname: this.user?.first_name || '',
				lastname: this.user?.last_name || '',
			} as any
		} else if (type === 'email') {
			this.userData = {
				visible: true,
				title: this.$strings.email(),
				showEmail: true,
				email: this.user?.email || '',
			} as any
		} else if (type === 'mobile') {
			this.userData = {
				visible: true,
				title: this.$strings.phone_number(),
				showMobile: true,
				mobile: this.user?.phone || '',
			} as any
		}
	}

	async saveUser() {
		const errors = [
			...(this.userData.showFirstname
				? this.$validator.validate(
						this.userData.firstname,
						this.$strings.firstname(),
						'valid'
				  )
				: []),
			...(this.userData.showLastname
				? this.$validator.validate(
						this.userData.lastname,
						this.$strings.lastname(),
						'valid'
				  )
				: []),
			...(this.userData.showMobile
				? this.$validator.validate(
						this.userData.mobile,
						this.$strings.phone_number(),
						'valid|phone'
				  )
				: []),
			...(this.userData.showEmail
				? this.$validator.validate(
						this.userData.email,
						this.$strings.email(),
						'valid|email'
				  )
				: []),
		]

		if (errors.length) {
			this.$toast.error(errors[0], '', {} as any)
			return
		}

		const needLogout =
			this.userData.showMobile &&
			this.userData.mobile !== this.user?.phone

		this.userData = { ...this.userData, loading: true }
		try {
			const r = await this.$axios.patch(
				this.$apiUrl.UpdateUserInfoUrl(),
				{
					first_name: this.userData.showFirstname
						? this.userData.firstname
						: this.user?.first_name,
					last_name: this.userData.showLastname
						? this.userData.lastname
						: this.user?.last_name,
					phone: this.userData.showMobile
						? this.userData.mobile
						: this.user?.phone,
					email: this.userData.showEmail
						? this.userData.email
						: this.user?.email,
				}
			)
			this.$store.commit('user/set', r.data)
			this.$toast.success(
				this.$strings.information_saved(),
				'',
				{} as any
			)

			if (needLogout) {
				await this.$store.dispatch('user/logout')
				await this.$router.push({
					path: this.$routeUrl.SecretLoginUrl(),
					query: {
						mobile: this.userData?.mobile,
					},
				})
			}

			this.userData = { ...this.userData, visible: false }
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.userData = { ...this.userData, loading: false }
	}

	async fetchAddresses() {
		this.addresses = null
		this.addressLoading = true
		try {
			const r = await this.$axios.get(this.$apiUrl.GetAddressesUrl(), {
				params: {
					limit: 50,
					offset: 0,
				},
			})
			this.addresses = r.data.results
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.addressLoading = false
	}

	async deleteAddress() {
		this.modalLoading = true
		try {
			await this.$axios.delete(
				this.$apiUrl.DeleteAddressUrl(this.targetAddress.id)
			)
			this.isDeleteAddressDialogVisible = false
			this.$toast.success(
				this.$strings.n_deleted(this.$strings.address()),
				'',
				{} as any
			)
			if (this.selectedAddressId === this.targetAddress.id) {
				this.$store.commit('basket/selectAddressId', null)
			}
			this.addresses =
				this.addresses?.filter((v) => v.id !== this.targetAddress.id) ||
				[]
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.modalLoading = false
	}

	openCreateAddress() {
		this.targetAddress = {} as Address
		this.isCreateAddressDialogVisible = true
	}

	openEditAddress(address: Address) {
		this.targetAddress = { ...address } as Address
		this.isCreateAddressDialogVisible = true
	}

	openDeleteAddress(address: Address) {
		this.targetAddress = { ...address } as Address
		this.isDeleteAddressDialogVisible = true
	}

	onUploadImage(file: any) {
		this.$emit('update:receiptImage', file || null)
	}

	mounted() {
		this.fetchAddresses()
	}
}
</script>

<style></style>
