<template>
	<div class="flex flex-col">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
			<div class="col-span-1 lg:col-span-7 flex flex-col">
				<span class="text-xl text-natural-dark font-bold mb-6">
					{{ $strings.your_details() }}
				</span>
				<span class="mb-4 max-w-lg relative">
					<TextInput
						:label="$strings.your_phone_number()"
						class=""
						:disabled="true"
						:value="user && user.phone"
						input-class="text-start"
					/>
					<MyIcon
						name="edit"
						class="w-8 h-8 p-1 text-primary absolute end-0 top-0 bottom-0 my-auto me-4 cursor-pointer"
						@click="openUserEditDialog('mobile')"
					/>
				</span>
				<span class="mb-4 max-w-lg relative">
					<TextInput
						:label="$strings.your_email_address()"
						class=""
						:disabled="true"
						:value="user && user.email"
						input-class="text-start"
					/>
					<MyIcon
						name="edit"
						class="w-8 h-8 p-1 text-primary absolute end-0 top-0 bottom-0 my-auto me-4 cursor-pointer"
						@click="openUserEditDialog('email')"
					/>
				</span>
				<span class="max-w-lg relative mb-8">
					<TextInput
						:label="$strings.your_full_name()"
						class=""
						:disabled="true"
						:value="
							user &&
							user.first_name &&
							user.last_name &&
							user.first_name + ' ' + user.last_name
						"
						input-class="text-start"
					/>
					<MyIcon
						name="edit"
						class="w-8 h-8 p-1 text-primary absolute end-0 top-0 bottom-0 my-auto me-4 cursor-pointer"
						@click="openUserEditDialog('name')"
					/>
				</span>
				<div class="flex items-center mb-6 max-w-lg overflow-hidden">
					<span
						class="text-xl text-natural-dark font-bold flex-grow line-clamp-1"
					>
						{{ $strings.order_receipt_information() }}
					</span>
					<span
						class="text-white font-bold text-xs py-2 px-3 rounded-lg ripple-bg-green-500 cursor-pointer flex-shrink-0"
						@click="openCreateAddress"
					>
						{{ $strings.add_n($strings.address()) }}
					</span>
				</div>
				<div class="flex flex-col max-w-lg mb-6">
					<span
						v-if="!addressLoading && !addresses"
						class="text-white font-bold text-sm ripple-bg-yellow-500 rounded-lg px-4 py-2.5 self-center cursor-pointer"
					>
						{{ $strings.try_again() }}
					</span>
					<span
						v-else-if="addressLoading"
						class="w-6 h-6 rounded-full animate-ping bg-primary self-center"
					></span>
					<span
						v-else-if="!addresses.length"
						class="text-2xl font-bold text-natural-mute opacity-50 self-center"
					>
						{{ $strings.nothing_found() }}
					</span>
					<div v-else class="flex flex-col">
						<AddressCard
							v-for="(address, i) in addresses"
							:key="i"
							:data="address"
							class="mb-4 cursor-pointer"
							:selected="address.id === selectedAddressId"
							@edit="openEditAddress(address)"
							@delete="openDeleteAddress(address)"
							@click="
								$store.commit(
									'basket/selectAddressId',
									address.id
								)
							"
						/>
					</div>
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
						v-if="false"
						class="flex items-center py-px ps-8 pe-6 w-full"
					>
						<span
							class="text-lg text-natural-dark flex-grow font-medium"
						>
							{{ $strings.discount() }}
						</span>
						<span class="text-3xl text-green font-medium">
							{{ formattedTotalPrice }}
						</span>
						<span
							class="text-xs text-natural-dark ms-1 self-start font-medium"
						>
							{{ $strings.toman() }}
						</span>
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
							{{ formattedTotalPrice }}
						</span>
						<MyIcon
							name="toman"
							class="w-6 h-6 text-natural-dark ms-1 self-center"
						/>
					</div>
				</div>
			</div>
		</div>
		<ModalContainer
			size="xl"
			:visible="userData.visible"
			:loading="userData.loading"
			:title="userData.title"
			:button-name="$strings.save()"
			@close="
				userData = {
					...userData,
					visible: false,
				}
			"
			@button-click="saveUser"
		>
			<div class="flex flex-col px-6 py-8">
				<AuthFormCard
					v-model="userData"
					:show-firstname="userData.showFirstname"
					:show-lastname="userData.showLastname"
					:show-mobile="userData.showMobile"
					:show-email="userData.showEmail"
					class="-mb-8"
				/>
				<span
					v-if="userData.showMobile"
					class="text-sm text-yellow-400 text-center mt-8"
				>
					{{ $strings.you_must_confirm_this_number_to_register() }}
				</span>
			</div>
		</ModalContainer>
		<CreateAddressDialog
			:visible="isCreateAddressDialogVisible"
			@close="isCreateAddressDialogVisible = false"
			@done="fetchAddresses"
			:data.sync="targetAddress"
		/>
		<ModalContainer
			:visible="isDeleteAddressDialogVisible"
			:title="$strings.delete_n($strings.address())"
			size="lg"
			:loading="modalLoading"
			@close="isDeleteAddressDialogVisible = false"
		>
			<div class="flex flex-col items-center text-center p-8">
				<span class="text-sm text-natural-semidark mb-3">
					{{ targetAddress.details || '~' }}
				</span>
				<span class="text-natural-dark text-sm mb-6">
					{{
						(targetAddress.province || '~') +
						' - ' +
						(targetAddress.city || '~')
					}}
				</span>
				<MyIcon name="trash" class="w-24 h-24 text-red-500" />
			</div>
			<div
				slot="footer"
				class="flex items-center justify-end border-t border-gray-200 p-4"
			>
				<button
					class="me-4 ripple-bg-white border-2 border-gray-200 ripple-bg-white text-natural-semidark px-8 py-3 font-bold rounded-xl"
					@click="isDeleteAddressDialogVisible = false"
				>
					{{ $strings.cancel() }}
				</button>
				<button
					class="text-white px-8 py-3 font-bold rounded-xl ripple-bg-red-500"
					@click="deleteAddress"
				>
					{{ $strings.delete() }}
				</button>
			</div>
		</ModalContainer>
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
	},
})
export default class BasketInfoSection extends Vue {
	@Prop({}) products!: Product[]

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

	get formattedTotalPrice(): string {
		return this.$stringUtils.thousandFormat(this.totalPrice) || ''
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

	mounted() {
		this.fetchAddresses()
	}
}
</script>

<style></style>
