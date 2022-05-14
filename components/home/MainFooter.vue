<template>
	<div class="flex flex-col bg-primary">
		<nuxt-link :to="$routeUrl.HomeUrl()" class="my-16 self-center">
			<img class="w-auto h-20" src="/img/site_logo_white.png" alt=""/>
		</nuxt-link>
		<div class="flex flex-col px-6">
			<div class="self-center max-w-screen-xl w-full h-px bg-white opacity-50"/>
		</div>
		<div class="flex flex-col py-4 px-6">
			<div class="self-center max-w-screen-xl w-full grid grid-cols-3 text-base font-medium text-white gap-6">
				<div class="flex items-center justify-center">
					<span class="me-6">
						{{ $strings.phone_number() + ' :' }}
					</span>
					<span class="font-bold">
						{{ "09216873562" }}
					</span>
				</div>
				<div class="flex items-center justify-center">
					<span class="me-6">
						{{ $strings.email_address() + ' :' }}
					</span>
					<span class="font-bold">
						{{ "shahab_yousefi@live.com" }}
					</span>
				</div>
				<div class="flex items-center justify-center">
					<span class="me-6">
						{{ $strings.follow_us() + ' :' }}
					</span>
					<nuxt-link to="#" class="me-3">
						<MyIcon name="twitter" class="w-6 h-6"/>
					</nuxt-link>
					<nuxt-link to="#" class="me-3">
						<MyIcon name="instagram" class="w-6 h-6"/>
					</nuxt-link>
					<nuxt-link to="#">
						<MyIcon name="linkedin" class="w-6 h-6"/>
					</nuxt-link>
				</div>
			</div>
		</div>
		<div class="w-full h-px bg-white opacity-100"/>
		<div class="flex flex-col px-6 py-6">
			<div class="max-w-screen-xl w-full flex items-start self-center">
				<div class="flex-grow flex flex-col me-20 text-white">
					<b class="font-bold mb-6">
						{{ $strings.app_subtitle() }}
					</b>
					<p class="mb-0">
						{{ $strings.app_description() }}
					</p>
				</div>
				<div class="flex items-center">
					<div class="w-40 h-40 rounded-xl bg-gray-100 me-6">
						<img v-if="false" src="" alt="" class="w-full h-full">
					</div>
					<div class="w-40 h-40 rounded-xl bg-gray-100">
						<img v-if="false" src="" alt="" class="w-full h-full">
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col px-6">
			<div class="self-center max-w-screen-xl w-full h-px bg-white opacity-50"/>
		</div>
		<div class="flex flex-col px-6 relative">
			<div class="self-center max-w-screen-xl w-full py-8 text-center">
				<p class="m-0 text-xs text-white">
					{{ $strings.copyright_text() }}
				</p>
			</div>
			<div
				class="flex items-center text-white bg-natural-dark rounded-t-md text-xs px-3 py-1 absolute end-0 bottom-0 me-6">
				<span class="">
					{{ $strings.website_developer() }}
				</span>
				<span class="mx-1.5">-</span>
				<a href="https://codegames.ir" class="font-bold" target="_blank">
					CodeGames
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import MyIcon from "~/components/utils/MyIcon.vue";

@Component({
	components: {MyIcon},
})
export default class MainHeader extends Vue {

}
</script>

<style scoped>

</style>
