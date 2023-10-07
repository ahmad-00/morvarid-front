<template>
	<div class="flex flex-col bg-white items-center px-6">
		<div class="flex items-center max-w-screen-xl w-full py-6">
			<nuxt-link :to="$routeUrl.HomeUrl()" class="flex items-center me-8">
				<span class="me-4">
					<img src="/img/site_logo.png" alt="" class="h-9 w-auto" />
				</span>
				<span
					class="text-2xl font-lalezar text-natural-dark hover:text-primary duration-300"
				>
					{{ $strings.app_title_part_1() }}
				</span>
				<span class="text-xs text-natural-dark -mb-8 -ms-3 opacity-75">
					{{ $strings.app_title_part_2() }}
				</span>
			</nuxt-link>
			<div class="items-center hidden lg:flex">
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
				class="text-sm font-bold text-white ripple-bg-primary rounded-lg py-2 px-6 hidden lg:flex"
			>
				<span>
					{{ $strings.shop() }}
				</span>
			</nuxt-link>
			<template v-else-if="type === 'shop'">
				<span
					class="text-sm font-bold text-white ripple-bg-primary rounded-lg py-2 px-4 me-4 cursor-pointer hidden lg:flex"
					@click="openOrderTrackingPage"
				>
					<span>
						{{ $strings.order_tracking() }}
					</span>
				</span>
				<nuxt-link
					:to="$routeUrl.ShopBasketUrl()"
					class="w-10 h-10 bg-primary bg-opacity-10 rounded-full items-center justify-center cursor-pointer relative hidden lg:flex"
					:class="{
						'text-primary-dark border-2 border-primary':
							basket.length,
						'text-natural-dark': !basket.length,
					}"
				>
					<MyIcon name="buy" class="w-5 h-5" />
					<span
						v-if="basket.length"
						class="w-4 h-4 text-white bg-primary rounded-full flex items-center justify-center overflow-hidden absolute -start-1 -top-1.5"
					>
						<span class="line-clamp-1 text-xs transform scale-75">
							{{ basket.length }}
						</span>
					</span>
				</nuxt-link>
			</template>
			<span class="w-px h-8 bg-gray-200 mx-4 hidden lg:flex" />
			<nuxt-link
				v-if="!user"
				:to="$routeUrl.LoginUrl()"
				class="items-center text-sm font-bold text-natural-dark hover:text-primary-dark rounded-lg py-2 duration-300 hidden lg:flex"
			>
				<span>
					{{ $strings.login_or_register() }}
				</span>
			</nuxt-link>
			<div v-else class="relative hidden lg:flex">
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
					class="absolute end-0 bg-white rounded-lg overflow-hidden w-72 flex flex-col z-10 mt-11 -me-2"
					:style="{
						boxShadow:
							'0 1px 1px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 30%)',
					}"
					@click="(e) => e.stopPropagation()"
				>
					<UserMenu
						:loading="loading"
						@update:loading="(v) => $emit('update:loading', v)"
						:selected="userSelected"
					/>
				</div>
			</div>
			<span
				class="w-9 h-9 flex-col justify-evenly cursor-pointer flex lg:hidden"
				@click="isMenuVisible = true"
			>
				<span
					v-for="i in 3"
					:key="i"
					class="bg-natural-dark rounded-full h-1 transform scale-90"
				/>
			</span>
		</div>
		<div
			:class="[
				'fixed left-0 right-0 top-0 h-screen z-20 bg-black bg-opacity-50 flex duration-300',
				isMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
			]"
			@click="isMenuVisible = false"
			@wheel="(e) => e.stopPropagation()"
			@touchmove="(e) => e.stopPropagation()"
			@scroll="(e) => e.stopPropagation()"
		>
			<div
				@click="(e) => e.stopPropagation()"
				:class="[
					'flex flex-col max-w-sm bg-white flex-grow shadow-xl overflow-y-auto transform duration-300',
					isMenuVisible ? 'translate-x-0' : 'translate-x-full',
				]"
			>
				<div class="flex items-center px-6 py-6 flex-shrink-0">
					<nuxt-link
						:to="$routeUrl.HomeUrl()"
						class="flex items-center me-8"
					>
						<span class="me-4">
							<img
								src="/img/site_logo.png"
								alt=""
								class="h-9 w-auto"
							/>
						</span>
						<span
							class="text-2xl font-lalezar text-natural-dark hover:text-primary duration-300"
						>
							{{ $strings.app_title_part_1() }}
						</span>
						<span
							class="text-xs text-natural-dark -mb-8 -ms-3 opacity-75"
						>
							{{ $strings.app_title_part_2() }}
						</span>
					</nuxt-link>
					<div class="flex-grow" />
					<MyIcon
						name="close"
						class="w-9 h-9 text-natural-dark -me-1 cursor-pointer"
						@click="isMenuVisible = false"
					/>
				</div>
				<div class="h-px bg-gray-200 flex-shrink-0" />
				<div class="flex flex-col py-2 flex-shrink-0">
					<nuxt-link
						v-for="(item, i) in menuItems"
						:key="i"
						:to="item.link"
						class="px-4 py-2 text-natural-dark ripple-bg-white"
					>
						{{ item.name }}
					</nuxt-link>
				</div>
				<div class="h-px bg-gray-200 mx-4 flex-shrink-0" />
				<div
					class="flex items-center justify-center flex-shrink-0 mx-4 my-4"
				>
					<nuxt-link
						v-if="type === 'main'"
						:to="$routeUrl.ShopUrl()"
						class="flex text-sm font-bold text-white ripple-bg-primary rounded-lg py-2 px-6"
					>
						<span>
							{{ $strings.shop() }}
						</span>
					</nuxt-link>
					<template v-else-if="type === 'shop'">
						<span
							class="flex text-sm font-bold text-white ripple-bg-primary rounded-lg py-2 px-4 me-4 cursor-pointer"
							@click="openOrderTrackingPage"
						>
							<span>
								{{ $strings.order_tracking() }}
							</span>
						</span>
						<nuxt-link
							:to="$routeUrl.ShopBasketUrl()"
							class="flex w-10 h-10 bg-primary bg-opacity-10 rounded-full items-center justify-center cursor-pointer relative"
							:class="{
								'text-primary-dark border-2 border-primary':
									basket.length,
								'text-natural-dark': !basket.length,
							}"
						>
							<MyIcon name="buy" class="w-5 h-5" />
							<span
								v-if="basket.length"
								class="w-4 h-4 text-white bg-primary rounded-full flex items-center justify-center overflow-hidden absolute -start-1 -top-1.5"
							>
								<span
									class="line-clamp-1 text-xs transform scale-75"
								>
									{{ basket.length }}
								</span>
							</span>
						</nuxt-link>
					</template>
					<span v-if="!user" class="flex w-px h-8 bg-gray-200 mx-4" />
					<nuxt-link
						v-if="!user"
						:to="$routeUrl.LoginUrl()"
						class="flex items-center text-sm font-bold text-natural-dark hover:text-primary-dark rounded-lg py-2 duration-300"
					>
						<span>
							{{ $strings.login_or_register() }}
						</span>
					</nuxt-link>
				</div>
				<div v-if="user" class="h-px bg-gray-200 mx-4 flex-shrink-0" />
				<UserMenu
					v-if="user"
					class="mx-4 my-4 border border-gray-200 rounded-lg"
					:loading="loading"
					@update:loading="(v) => $emit('update:loading', v)"
					:selected="userSelected"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import MyIcon, { IconType } from '~/components/utils/MyIcon.vue'
import { Product, User } from '~/config/types'
import UserMenu, {
	MenuItemIds as UserMenuItemIds,
} from '~/components/home/UserMenu.vue'
import TransitionFade from '~/components/anim/TransitionFade.vue'

export type MenuItemIds =
	| null
	| 'home'
	| 'contact-us'
	| 'blog'
	| 'about-us'
	| 'products'

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
	@Prop({}) userSelected?: UserMenuItemIds

	isMenuVisible = false
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
				id: 'products',
				name: this.$strings.products(),
				link: this.$routeUrl.ShopUrl(),
			},
			{
				id: 'about-us',
				name: this.$strings.about_us(),
				link: this.$routeUrl.AboutUsUrl(),
			},
		]
	}

	@Watch('isMenuVisible')
	onMenuVisibilityChange(n: boolean) {
		document.documentElement.style.overflow = n ? 'hidden' : 'auto'
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
		document.documentElement.style.overflow = 'auto'
	}
}
</script>

<style scoped></style>
