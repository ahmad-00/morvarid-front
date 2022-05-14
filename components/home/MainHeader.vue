<template>
	<div class="flex flex-col bg-white items-center px-6">
		<div class="flex items-center max-w-screen-xl w-full py-6">
			<nuxt-link :to="$routeUrl.HomeUrl()" class="flex items-center">
				<span class="me-4">
					<img src="/img/site_logo.png" alt="" class="h-9 w-auto" />
				</span>
				<span
					class="text-xl font-bold font-lalezar me-8 text-natural-dark hover:text-primary duration-300"
				>
					{{ $strings.app_title() }}
				</span>
			</nuxt-link>
			<div class="flex items-center">
				<nuxt-link
					v-for="(item, i) in menuItems"
					:key="i"
					:to="item.link"
					class="px-2 py-1 mx-2 text-natural-dark"
				>
					{{ item.name }}
				</nuxt-link>
			</div>
			<div class="flex-grow" />
			<nuxt-link
				v-if="type === 'main'"
				:to="$routeUrl.ShopUrl()"
				class="text-sm font-bold text-white ripple-bg-primary rounded-lg py-2 px-6"
			>
				<span>
					{{ $strings.shop() }}
				</span>
			</nuxt-link>
			<template v-else-if="type === 'shop'">
				<span
					class="text-sm font-bold text-white ripple-bg-primary rounded-lg py-2 px-4 me-4 cursor-pointer"
					@click="openOrderTrackingPage"
				>
					<span>
						{{ $strings.order_tracking() }}
					</span>
				</span>
				<nuxt-link
					:to="$routeUrl.ShopBasketUrl()"
					class="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center cursor-pointer relative"
					:class="{
						'text-primary-dark border-2 border-primary':
							basket.length,
						'text-natural-dark': !basket.length,
					}"
				>
					<MyIcon name="buy" class="w-5 h-5" />
					<span
						v-if="basket.length"
						class="w-4 h-4 text-white bg-primary rounded-full flex items-center justify-center overflow-hidden absolute start-0 top-0 -start-1 -top-1.5"
					>
						<span class="line-clamp-1 text-xs transform scale-75">
							{{ basket.length }}
						</span>
					</span>
				</nuxt-link>
			</template>
			<span class="w-px h-8 bg-gray-200 mx-4" />
			<nuxt-link
				v-if="!user"
				:to="$routeUrl.LoginUrl()"
				class="flex items-center text-sm font-bold text-natural-dark hover:text-primary-dark rounded-lg py-2 duration-300"
			>
				<span>
					{{ $strings.login_or_register() }}
				</span>
			</nuxt-link>
			<div v-else class="relative">
				<span
					class="flex items-center rounded-xl px-2 h-10 -ms-2 -me-2 cursor-pointer text-natural-dark hover:text-primary-dark bg-primary duration-300"
					:class="{
						'bg-opacity-0': !isUserMenuVisible,
						'bg-opacity-10': isUserMenuVisible,
					}"
					@click="
						(e) => {
							e.stopPropagation()
							isUserMenuVisible = !isUserMenuVisible
						}
					"
				>
					<MyIcon name="person" class="w-8 h-8" />
					<MyIcon name="arrow-down" class="w-6 h-6" />
				</span>
				<div
					v-if="isUserMenuVisible"
					class="absolute end-0 bg-white rounded-lg overflow-hidden w-72 flex flex-col z-10 mt-1 -me-2"
					:style="{
						boxShadow:
							'0 1px 1px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 30%)',
					}"
					@click="(e) => e.stopPropagation()"
				>
					<UserMenu
						:loading="loading"
						@update:loading="(v) => $emit('update:loading', v)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon, { IconType } from '~/components/utils/MyIcon.vue'
import { Product, User } from '~/config/types'
import UserMenu from '~/components/home/UserMenu.vue'
import TransitionFade from '~/components/anim/TransitionFade.vue'

export type MenuItemIds = null | 'home' | 'contact-us' | 'blog'

export type MenuItem = {
	id: MenuItemIds
	name: string
	link: string
	icon?: IconType
}

@Component({
	components: { TransitionFade, UserMenu, MyIcon },
})
export default class MainHeader extends Vue {
	@Prop({ default: 'main' }) type?: 'main' | 'shop'
	@Prop({}) loading?: boolean

	isUserMenuVisible = false

	get user(): User | null {
		return this.$store.state.user.user
	}

	get basket(): Product[] {
		return this.$store.state.basket.basket || []
	}

	get menuItems(): MenuItem[] {
		return [
			{
				id: 'home',
				name: this.$strings.home(),
				link: this.$routeUrl.HomeUrl(),
			},
			{
				id: 'contact-us',
				name: this.$strings.contact_us(),
				link: '#',
			},
			{
				id: 'blog',
				name: this.$strings.blog(),
				link: this.$routeUrl.BlogUrl(),
			},
		]
	}

	clickOutside() {
		this.isUserMenuVisible = false
	}

	openOrderTrackingPage() {
		if (this.user) {
			this.$router.push(this.$routeUrl.PanelOrdersUrl())
		} else {
			this.$toast.error(this.$strings.login_error(), '', {} as any)
			this.$router.push(this.$routeUrl.LoginUrl())
		}
	}

	mounted() {
		document.addEventListener('click', this.clickOutside)
	}

	destroyed() {
		document.removeEventListener('click', this.clickOutside)
	}
}
</script>

<style scoped></style>
