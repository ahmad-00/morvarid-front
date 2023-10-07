<template>
	<div class="flex flex-col pe-12 ps-6 py-12 relative">
		<div class="absolute top-0 bottom-0 start-0 end-0 flex -z-1">
			<div class="bg-primary bg-opacity-5 flex-grow" />
			<div
				class="bg-primary bg-opacity-5 rounded-e-10 max-w-screen-xl w-full"
			/>
			<div class="flex-grow ms-6" />
		</div>
		<div
			class="flex flex-col w-full self-center text-center"
			:style="{ maxWidth: '650px' }"
		>
			<span class="text-natural-dark text-3xl font-bold">
				<span v-if="false"> خــــریــــد </span>
				<span class="text-saffron">زعــــفــــران</span>
				<span> و </span>
				<span class="text-cardamom">هــــل</span>
			</span>
			<span v-if="false" class="text-natural-dark opacity-50 mt-5">
				{{ $strings.main_hero_text() }}
			</span>
			<img
				src="/img/image_main_page.png"
				alt=""
				class="w-full h-auto mt-8"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'

@Component({
	components: { MyIcon },
})
export default class MainHeroSection extends Vue {}
</script>

<style scoped></style>
