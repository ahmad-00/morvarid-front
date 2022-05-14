<template>
	<div class="flex flex-col items-center px-6">
		<div
			class="w-full max-w-screen-xl flex items-center justify-center bg-primary-dark bg-opacity-5 rounded-full"
		>
			<nuxt-link
				v-for="(c, i) in categories"
				:key="i"
				:to="
					c.id ? $routeUrl.ShopCategoryUrl(c.id) : $routeUrl.ShopUrl()
				"
				class="font-bold text-primary-dark py-4 px-8 flex flex-col relative bg-primary-dark bg-opacity-0 hover:bg-opacity-5 duration-300"
			>
				<span>{{ c.name }}</span>
				<span
					v-if="categoryId === c.id"
					class="h-1 absolute left-0 right-0 bottom-0 bg-primary-dark rounded-t-full pointer-events-none duration-300"
				/>
			</nuxt-link>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyIcon from '@/components/utils/MyIcon.vue'
import { ShopCategory } from '~/config/types'

@Component({
	components: { MyIcon },
})
export default class ShopCategories extends Vue {
	get categoryId(): string | null {
		return this.$route.params.category_id || null
	}

	get categories(): ShopCategory[] {
		return [
			{
				id: null,
				name: this.$strings.all(),
			},
			...this.$store.state.category.shopCategories,
		]
	}
}
</script>

<style scoped></style>
