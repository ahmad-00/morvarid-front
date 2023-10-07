<template>
	<div class="flex items-center ps-3">
		<template v-for="(page, i) in pages">
			<nuxt-link
				v-if="page.page"
				:key="i"
				class="flex items-center justify-center h-8 w-8 text-xs text-natural-dark rounded-xl me-3"
				:class="{
					'bg-black bg-opacity-5 font-bold pointer-events-none':
						page.page === current,
					'cursor-pointer bg-white': page.page !== current,
				}"
				:to="createLink(page.page)"
			>
				{{ page.page }}
			</nuxt-link>
			<span v-else :key="i" class="flex items-center me-3">
				<span class="w-1 h-1 bg-natural-dark rounded-full me-1" />
				<span class="w-1 h-1 bg-natural-dark rounded-full me-1" />
				<span class="w-1 h-1 bg-natural-dark rounded-full" />
			</span>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		total: Number,
		limit: Number,
		current: {
			type: Number,
			default: 1,
		},
		link: Function,
	},
	computed: {
		max(): number {
			return Math.ceil(this.total / this.limit)
		},
		pages(): any[] {
			const pages = Array(11)
				.fill('')
				.map((_, i) => ({
					page: (this.current + (i - 5)) as any,
				}))
				.filter((v) => v.page > 0)
				.filter((v) => v.page <= this.max)
			if (!pages.length) return pages
			if (pages[0].page !== 1) pages[0].page = 1
			if (pages[pages.length - 1].page !== this.max)
				pages[pages.length - 1].page = this.max
			if (this.current < this.max - 4) pages[pages.length - 2].page = null
			if (this.current > 5) pages[1].page = null
			return pages
		},
	},
	methods: {
		createLink(i: number): object {
			return {
				path: this.link(i),
				query: this.$route.query,
			}
		},
	},
})
</script>

<style scoped></style>
