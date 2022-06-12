<template>
	<PanelContainer
		:fetched="fetched"
		:loading.sync="loading"
		selected="addresses"
		@tryAgain="fetchData"
	>
		<div class="flex items-center mb-10">
			<span class="text-xl font-bold text-natural-dark me-4">
				{{ $strings.addresses() }}
			</span>
			<span
				class="text-white font-bold text-sm py-2 px-3 rounded-lg ripple-bg-green-500 cursor-pointer"
				@click="openCreateAddress"
			>
				{{ $strings.add() }}
			</span>
		</div>
		<div v-if="addresses && addresses.length" class="flex flex-col">
			<AddressCard
				v-for="(address, i) in addresses"
				:key="i"
				:data="address"
				class="mb-6"
				@edit="openEditAddress(address)"
				@delete="openDeleteAddress(address)"
			/>
		</div>
		<CreateAddressDialog
			:visible="isCreateDialogVisible"
			@close="isCreateDialogVisible = false"
			@done="fetchData"
			:data.sync="targetAddress"
		/>
		<ModalContainer
			:visible="isDeleteDialogVisible"
			:title="$strings.delete_n($strings.address())"
			size="lg"
			:loading="modalLoading"
			@close="isDeleteDialogVisible = false"
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
					@click="isDeleteDialogVisible = false"
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
	</PanelContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import UserMenu from '~/components/home/UserMenu.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import PanelContainer from '~/components/panel/PanelContainer.vue'
import ProductStatusBar from '~/components/panel/ProductStatusBar.vue'
import { Address } from '~/config/types'
import AddressCard from '~/components/address/AddressCard.vue'
import CreateAddressDialog from '~/components/address/CreateAddressDialog.vue'
import ModalContainer from '~/components/utils/ModalContainer.vue'

@Component({
	middleware: ['fetch', 'auth'],
	components: {
		ModalContainer,
		CreateAddressDialog,
		AddressCard,
		ProductStatusBar,
		PanelContainer,
		UserMenu,
		MyIcon,
	},
})
export default class PanelAddressesPage extends Vue {
	fetched = false
	loading = false
	modalLoading = false
	addresses = [] as Address[]
	isCreateDialogVisible = false
	isDeleteDialogVisible = false
	targetAddress = {} as Address

	get selectedAddressId(): string | null {
		return this.$store.state.basket.selectedAddressId || null
	}

	async fetchData() {
		this.fetched = false
		this.loading = true
		try {
			const r = await this.$axios.get(this.$apiUrl.GetAddressesUrl(), {
				params: {
					limit: 50,
					offset: 0,
				},
			})
			this.addresses = r.data.results
			this.fetched = true
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.loading = false
	}

	async deleteAddress() {
		this.modalLoading = true
		try {
			await this.$axios.delete(
				this.$apiUrl.DeleteAddressUrl(this.targetAddress.id)
			)
			this.isDeleteDialogVisible = false
			this.$toast.success(
				this.$strings.n_deleted(this.$strings.address()),
				'',
				{} as any
			)
			if(this.selectedAddressId === this.targetAddress.id) {
				this.$store.commit('basket/selectAddressId', null)
			}
			this.addresses = this.addresses.filter(
				(v) => v.id !== this.targetAddress.id
			)
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.modalLoading = false
	}

	openCreateAddress() {
		this.targetAddress = {} as Address
		this.isCreateDialogVisible = true
	}

	openEditAddress(address: Address) {
		this.targetAddress = { ...address } as Address
		this.isCreateDialogVisible = true
	}

	openDeleteAddress(address: Address) {
		this.targetAddress = { ...address } as Address
		this.isDeleteDialogVisible = true
	}

	mounted() {
		this.fetchData()
	}

	head() {
		return {
			title:
				this.$strings.addresses() +
				' | ' +
				this.$strings.app_title(),
		}
	}
}
</script>

<style scoped></style>
