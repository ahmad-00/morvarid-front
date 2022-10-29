<template>
	<MainContainer :fetched="fetched" :loading.sync="loading">
		<ShopCover
			:title="$strings.terms_of_use()"
			image="/img/image_rules.jpg"
			class="mb-20 mt-9"
		/>
		<div class="flex flex-col px-6 mb-32">
			<div class="max-w-screen-lg w-full self-center">
				<nuxt-content class="prose max-w-none" :document="content" />
			</div>
		</div>
	</MainContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import MainContainer from '~/components/home/MainContainer.vue'
import { FetchReturn } from '@nuxt/content/types/query-builder'
import ShopCover from '~/components/shop/ShopCover.vue'

@Component({
	middleware: ['fetch'],
	components: { ShopCover, MainContainer },
})
export default class AboutUsPage extends Vue {
	fetched = true
	loading = false

	content = null as FetchReturn | null

	async fetch() {
		this.content = (await this.$content(
			'terms-of-use'
		).fetch()) as FetchReturn
	}

	head() {
		return {
			title:
				this.$strings.terms_of_use() +
				' | ' +
				this.$strings.app_subtitle(),
		}
	}
}
</script>

<style scoped></style>
