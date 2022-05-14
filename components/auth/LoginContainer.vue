<template>
	<div
		class="min-h-screen flex flex-col bg-gray-100 px-6 pt-6 pb-16 items-center justify-center relative"
	>
		<span class="w-full left-0 top-0 right-0 absolute z-0">
			<LoginBackground class="text-primary-dark w-full opacity-70" />
		</span>
		<div class="flex flex-col flex-grow z-1 items-center w-full">
			<nuxt-link :to="$routeUrl.HomeUrl()" class="mt-6">
				<img
					src="/img/site_logo_white.png"
					alt=""
					class="w-auto h-20"
				/>
			</nuxt-link>
			<div
				class="w-full max-w-xl flex flex-col-reverse bg-white rounded-2xl px-6 mt-12 shadow-lg z-1 items-start"
			>
				<div
					class="pt-4 pb-8 pe-0 flex flex-col w-full flex-shrink-0 self-stretch"
				>
					<slot />
				</div>
			</div>
			<div class="flex-grow" />
		</div>
		<div
			v-if="loading"
			class="fixed left-0 top-0 right-0 h-screen bg-white bg-opacity-40 flex items-center justify-center z-10"
		>
			<span class="bg-primary rounded-full w-12 h-12 animate-ping" />
		</div>
		<div
			v-else-if="!fetched"
			class="fixed left-0 top-0 right-0 h-screen bg-white bg-opacity-40 flex items-center justify-center z-50"
		>
			<span
				class="ripple-bg-yellow-500 rounded-lg px-6 py-3 font-bold text-white cursor-pointer shadow-lg"
				@click="$emit('tryAgain')"
			>
				{{ $strings.try_again() }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'
import LoginBackground from '~/components/auth/LoginBackground.vue'

@Component({
	components: { LoginBackground },
	head: {
		bodyAttrs: {
			dir: 'rtl',
			lang: 'fa',
		},
	},
})
export default class LoginContainer extends Vue {
	@Prop({}) loading?: boolean
	@Prop({ default: true }) fetched?: boolean
}
</script>

<style scoped></style>
