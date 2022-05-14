<template>
	<div class="flex flex-col items-center px-6">
		<div class="flex flex-col max-w-screen-xl w-full">
			<div class="flex items-center mb-12">
				<span class="text-4xl font-bold flex-grow text-natural-dark">
					{{ title }}
				</span>
				<nuxt-link
					class="flex items-center text-primary-dark rounded-md hover:text-primary duration-300 cursor-pointer"
					:to="moreLink"
				>
					<span class="text-lg font-medium me-2.5">
						{{ $strings.view_all_articles() }}
					</span>
					<MyIcon name="arrow-left-square" class="w-5 h-5" />
				</nuxt-link>
			</div>
			<div class="grid grid-cols-4 gap-10">
				<ArticleCard
					v-for="(article, i) in articles"
					:key="i"
					:article="article"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import ArticleCard from '~/components/article/ArticleCard.vue'
import { Article } from '~/config/types'

@Component({
	components: { ArticleCard, MyIcon },
})
export default class ArticleList extends Vue {
	@Prop() articles!: Article[]
	@Prop() title!: string
	@Prop() moreLink!: string
}
</script>

<style scoped></style>
