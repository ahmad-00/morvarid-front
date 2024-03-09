<template>
	<div class="flex flex-col bg-primary">
		<nuxt-link :to="$routeUrl.HomeUrl()" class="my-16 self-center">
			<img class="w-auto h-20" src="/img/site_logo_white.png" alt="" />
		</nuxt-link>
		<div class="flex flex-col px-6">
			<div
				class="self-center max-w-screen-xl w-full h-px bg-white opacity-50"
			/>
		</div>
		<div class="flex flex-col py-4 px-6">
			<div
				class="self-center max-w-screen-xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-base font-medium text-white gap-6"
			>
				<div class="flex items-center justify-center">
					<span class="me-6">
						{{ $strings.phone_number() + ' :' }}
					</span>
					<span class="font-bold">
						{{ '۷۷۵۱۱۰۲۲' }}
					</span>
				</div>
				<div class="flex items-center justify-center">
					<span class="me-6">
						{{ $strings.email_address() + ' :' }}
					</span>
					<span class="font-bold">
						{{ 'info@morvaridsepid.ir' }}
					</span>
				</div>
				<div class="flex items-center justify-center">
					<span class="me-6">
						{{ $strings.follow_us() + ' :' }}
					</span>
					<a href="https://wa.me/989123100181" class="">
						<MyIcon name="whatsapp" class="w-6 h-6" />
					</a>
				</div>
			</div>
		</div>
		<div class="w-full h-px bg-white opacity-100" />
		<div class="flex flex-col px-6 py-6">
			<div
				class="max-w-screen-xl w-full flex flex-col lg:flex-row items-start self-center"
			>
				<div
					class="flex-grow flex flex-col me-0 lg:me-20 text-white mb-6 lg:mb-0 self-stretch lg:self-start"
				>
					<b class="font-bold mb-6">
						{{ $strings.pages() }}
					</b>
					<div class="grid grid-cols-3 gap-x-6 gap-y-6">
						<nuxt-link
							v-for="(p, i) in footerPages"
							:key="i"
							:to="p.link"
							class="text-sm"
						>
							{{ p.title }}
						</nuxt-link>
					</div>
				</div>
				<div class="flex items-center self-center lg:self-start">
					<div class="w-32 h-32 rounded-xl bg-slate-100">
						<client-only>
							<a
								referrerpolicy="origin"
								target="_blank"
								href="https://trustseal.enamad.ir/?id=324644&Code=mRsJ7t5r2hDhyVvPKHEg"
								class="w-full h-full flex items-center justify-center"
							>
								<img
									referrerpolicy="origin"
									src="https://Trustseal.eNamad.ir/logo.aspx?id=324644&Code=mRsJ7t5r2hDhyVvPKHEg"
									alt=""
									id="mRsJ7t5r2hDhyVvPKHEg"
									class="w-20 h-20"
								/>
							</a>
						</client-only>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col px-6">
			<div
				class="self-center max-w-screen-xl w-full h-px bg-white opacity-50"
			/>
		</div>
		<div class="flex flex-col px-6 relative">
			<div
				class="self-center max-w-screen-xl w-full pt-8 pb-12 lg:pb-8 text-center"
			>
				<p class="m-0 text-xs text-white">
					{{ $strings.copyright_text() }}
				</p>
			</div>
			<div
				class="flex items-center text-white bg-natural-dark rounded-t-md text-xs px-3 py-1 absolute end-0 bottom-0 me-6"
			>
				<span class="">
					{{ $strings.website_developer() }}
				</span>
				<span class="mx-1.5">-</span>
				<a
					href="https://codegames.ir"
					class="font-bold"
					target="_blank"
				>
					CodeGames
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'

@Component({
	components: { MyIcon },
})
export default class MainHeader extends Vue {
	footerPages = [
		{
			title: this.$strings.home(),
			link: this.$routeUrl.HomeUrl(),
		},
		{
			title: this.$strings.products(),
			link: this.$routeUrl.ShopUrl(),
		},
		{
			title: this.$strings.about_us(),
			link: this.$routeUrl.AboutUsUrl(),
		},
		{
			title: this.$strings.privacy_policy(),
			link: this.$routeUrl.PrivacyPolicyUrl(),
		},
		{
			title: this.$strings.terms_of_use(),
			link: this.$routeUrl.TermsOfUseUrl(),
		},
		{
			title: this.$strings.faq(),
			link: this.$routeUrl.HomeUrl() + '#home-faq-section',
		},
	]
}
</script>

<style scoped></style>
