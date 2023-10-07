<template>
	<div class="flex flex-col">
		<div class="flex items-center px-5 py-4">
			<MyIcon
				name="person-circle"
				class="w-12 h-12 rounded-full bg-gray-400 text-white flex-shrink-0"
			/>
			<div class="flex flex-col flex-grow overflow-hidden ms-3 me-3">
				<span
					class="text-sm font-bold text-natural-dark mb-1 line-clamp-1"
				>
					{{
						((user && user.first_name) || '~') +
						' ' +
						((user && user.last_name) || '~')
					}}
				</span>
				<span class="text-xs text-natural-semidark line-clamp-1">
					<span dir="ltr">
						{{ (user && user.phone) || '~' }}
					</span>
				</span>
			</div>
			<MyIcon
				name="logout"
				class="text-red-500 duration-300 w-6 h-6 flex-shrink-0 cursor-pointer"
				@click="logout"
			/>
		</div>
		<div class="h-px bg-gray-200 mb-3" />
		<nuxt-link
			v-for="(item, i) in profileMenuItems"
			:key="i"
			class="flex items-center rounded-xl mb-1 mx-3"
			:to="item.link"
			:class="{
				'pointer-events-none bg-primary bg-opacity-10':
					selected === item.id,
				'ripple-bg-white cursor-pointer': selected !== item.id,
			}"
		>
			<div
				class="w-10 h-10 flex-shrink-0 my-2 ms-2 me-3 rounded-lg"
				:class="{
					'bg-primary text-white': selected === item.id,
					'text-natural-dark': selected !== item.id,
				}"
			>
				<MyIcon :name="item.icon" class="w-full h-full p-1" />
			</div>
			<span class="flex-grow overflow-hidden text-natural-dark">
				<span class="text-sm font-medium line-clamp-1">
					{{ item.name }}
				</span>
			</span>
		</nuxt-link>
		<div class="mb-2" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon, { IconType } from '~/components/utils/MyIcon.vue'
import { User } from '~/config/types'

export type MenuItemIds =
	| null
	| 'dashboard'
	| 'account-information'
	| 'addresses'
	| 'orders'

export type MenuItem = {
	id: MenuItemIds
	name: string
	link: string
	icon?: IconType
}

@Component({
	components: { MyIcon },
})
export default class UserMenu extends Vue {
	@Prop({}) selected?: MenuItemIds
	@Prop({}) loading?: boolean

	get user(): User | null {
		return this.$store.state.user.user
	}

	get profileMenuItems(): MenuItem[] {
		return [
			{
				id: 'dashboard',
				name: this.$strings.dashboard(),
				link: this.$routeUrl.PanelDashboardUrl(),
				icon: 'dashboard',
			},
			{
				id: 'account-information',
				name: this.$strings.account_information(),
				link: this.$routeUrl.PanelProfileUrl(),
				icon: 'person',
			},
			{
				id: 'addresses',
				name: this.$strings.addresses(),
				link: this.$routeUrl.PanelAddressesUrl(),
				icon: 'location',
			},
			{
				id: 'orders',
				name: this.$strings.orders(),
				link: this.$routeUrl.PanelOrdersUrl(),
				icon: 'bag-fill',
			},
		]
	}

	async logout() {
		await this.$store.dispatch('user/logout')
		await this.$router.push(this.$routeUrl.HomeUrl())
		this.$toast.success(this.$strings.logged_out(), '', {} as any)
	}
}
</script>

<style scoped></style>
