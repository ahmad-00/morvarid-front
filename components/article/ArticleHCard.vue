<template>
	<div class="flex items-center">
		<img
			:src="article.image"
			alt=""
			class="w-20 h-20 flex-shrink-0 me-4"
		/>
		<nuxt-link
			:to="$routeUrl.BlogArticleUrl(article.id)"
			class="text-natural-dark text-base font-medium hover:text-primary duration-300 clam"
		>
			{{ article.title || '~' }}
		</nuxt-link>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Article } from '~/config/types'

@Component({
	components: { MyIcon },
})
export default class ArticleCard extends Vue {
	@Prop() article!: Article
}
</script>

<style scoped></style>
