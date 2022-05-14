<template>
	<div class="flex flex-col">
		<div class="relative w-full">
			<div class="pt-9/16">
				<img
					:src="article.image"
					alt=""
					class="absolute left-0 top-0 w-full h-full rounded-t-lg"
				/>
			</div>
		</div>
		<div class="flex items-center mt-3">
			<span
				class="text-sm text-white py-0.5 px-4 me-4"
				:style="{ backgroundColor: categoryColor }"
			>
				{{ article.category || '~' }}
			</span>
			<span class="text-sm text-natural-semidark">
				{{ article.date || '~' }}
			</span>
		</div>
		<nuxt-link
			:to="$routeUrl.BlogArticleUrl(article.id)"
			class="text-natural-dark font-medium mt-3 hover:text-primary duration-300"
		>
			{{ article.title || '~' }}
		</nuxt-link>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Article } from '~/config/types'

export const colors = [
	'#f44336',
	'#e91e63',
	'#9c27b0',
	'#673ab7',
	'#3f51b5',
	'#2196f3',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#4caf50',
	'#8bc34a',
	'#cddc39',
	'#ffeb3b',
	'#ffc107',
	'#ff9800',
	'#ff5722',
	'#795548',
]

export const getCategoryColor = (id: string) => {
	const n = String(id)
		.split('')
		.filter((v) => v)
		.map((c) => c.charCodeAt(0))
		.reduce((a, b) => a + b, 0)
	return colors[n % colors.length]
}

@Component({
	components: { MyIcon },
})
export default class ArticleCard extends Vue {
	@Prop() article!: Article

	get categoryColor(): string {
		return getCategoryColor(this.article.category)
	}
}
</script>

<style scoped></style>
