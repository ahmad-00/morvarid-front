<template>
	<PanelContainer
		:fetched="fetched"
		:loading.sync="loading"
		selected="account-information"
	>
		<span class="text-xl font-bold text-natural-dark mb-10">
			{{ $strings.account_information() }}
		</span>
		<div
			class="bg-white rounded-xl grid grid-cols-1 sm:grid-cols-2 bg-slate-100 gap-px border border-slate-100 overflow-hidden"
		>
			<div class="flex items-center px-6 py-5 bg-white">
				<div class="flex flex-col flex-grow">
					<span class="text-natural-mute mb-2">
						{{ $strings.firstname_and_lastname() }}
					</span>
					<span class="text-natural-dark font-medium">
						{{
							((user && user.first_name) || '~') +
							' ' +
							((user && user.last_name) || '~')
						}}
					</span>
				</div>
				<MyIcon
					name="edit"
					class="w-8 h-8 text-natural-dark p-1 cursor-pointer"
					@click="openEditDialog('name')"
				/>
			</div>
			<div class="flex items-center px-6 py-5 bg-white">
				<div class="flex flex-col flex-grow">
					<span class="text-natural-mute mb-2">
						{{ $strings.phone_number() }}
					</span>
					<span
						class="text-natural-dark font-medium direction-ltr text-start"
					>
						{{ (user && user.phone) || '~' }}
					</span>
				</div>
				<MyIcon
					name="edit"
					class="w-8 h-8 text-natural-dark p-1 cursor-pointer"
					@click="openEditDialog('mobile')"
				/>
			</div>
			<div class="flex items-center px-6 py-5 bg-white">
				<div class="flex flex-col flex-grow">
					<span class="text-natural-mute mb-2">
						{{ $strings.email() }}
					</span>
					<span
						class="text-natural-dark font-medium direction-ltr text-start"
					>
						{{ (user && user.email) || '~' }}
					</span>
				</div>
				<MyIcon
					name="edit"
					class="w-8 h-8 text-natural-dark p-1 cursor-pointer"
					@click="openEditDialog('email')"
				/>
			</div>
			<div class="bg-white"></div>
		</div>
		<ModalContainer
			size="xl"
			:visible="dialogData.visible"
			:loading="dialogData.loading"
			:title="dialogData.title"
			:button-name="$strings.save()"
			@close="
				dialogData = {
					...dialogData,
					visible: false,
				}
			"
			@button-click="save"
		>
			<div class="flex flex-col px-6 py-8">
				<AuthFormCard
					v-model="dialogData"
					:show-firstname="dialogData.showFirstname"
					:show-lastname="dialogData.showLastname"
					:show-mobile="dialogData.showMobile"
					:show-email="dialogData.showEmail"
					class="-mb-8"
				/>
				<span
					v-if="dialogData.showMobile"
					class="text-sm text-yellow-400 text-center mt-8"
				>
					{{ $strings.you_must_confirm_this_number_to_register() }}
				</span>
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
import { User } from '~/config/types'
import ModalContainer from '~/components/utils/ModalContainer.vue'
import TextInput from '~/components/utils/TextInput.vue'
import AuthFormCard from '~/components/auth/AuthFormCard.vue'

@Component({
	middleware: ['fetch', 'auth'],
	components: {
		AuthFormCard,
		ModalContainer,
		ProductStatusBar,
		PanelContainer,
		UserMenu,
		MyIcon,
		TextInput,
	},
})
export default class PanelProfilePage extends Vue {
	fetched = true
	loading = false

	dialogData = {
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

	get user(): User | null {
		return this.$store.state.user.user || null
	}

	openEditDialog(type: 'name' | 'email' | 'mobile') {
		if (type === 'name') {
			this.dialogData = {
				visible: true,
				title: this.$strings.firstname_and_lastname(),
				showFirstname: true,
				showLastname: true,
				firstname: this.user?.first_name || '',
				lastname: this.user?.last_name || '',
			} as any
		} else if (type === 'email') {
			this.dialogData = {
				visible: true,
				title: this.$strings.email(),
				showEmail: true,
				email: this.user?.email || '',
			} as any
		} else if (type === 'mobile') {
			this.dialogData = {
				visible: true,
				title: this.$strings.phone_number(),
				showMobile: true,
				mobile: this.user?.phone || '',
			} as any
		}
	}

	async save() {
		const errors = [
			...(this.dialogData.showFirstname
				? this.$validator.validate(
						this.dialogData.firstname,
						this.$strings.firstname(),
						'valid'
				  )
				: []),
			...(this.dialogData.showLastname
				? this.$validator.validate(
						this.dialogData.lastname,
						this.$strings.lastname(),
						'valid'
				  )
				: []),
			...(this.dialogData.showMobile
				? this.$validator.validate(
						this.dialogData.mobile,
						this.$strings.phone_number(),
						'valid|phone'
				  )
				: []),
			...(this.dialogData.showEmail
				? this.$validator.validate(
						this.dialogData.email,
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
			this.dialogData.showMobile &&
			this.dialogData.mobile !== this.user?.phone

		this.dialogData = { ...this.dialogData, loading: true }
		try {
			const r = await this.$axios.patch(
				this.$apiUrl.UpdateUserInfoUrl(),
				{
					first_name: this.dialogData.showFirstname
						? this.dialogData.firstname
						: this.user?.first_name,
					last_name: this.dialogData.showLastname
						? this.dialogData.lastname
						: this.user?.last_name,
					phone: this.dialogData.showMobile
						? this.dialogData.mobile
						: this.user?.phone,
					email: this.dialogData.showEmail
						? this.dialogData.email
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
						mobile: this.dialogData?.mobile,
					},
				})
			}

			this.dialogData = { ...this.dialogData, visible: false }
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.dialogData = { ...this.dialogData, loading: false }
	}

	head() {
		return {
			title:
				this.$strings.account_information() +
				' | ' +
				this.$strings.app_title(),
		}
	}
}
</script>

<style scoped></style>
