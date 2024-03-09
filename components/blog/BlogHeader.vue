<template>
	<div
		class="rounded-3xl overflow-hidden flex flex-col"
		:style="{
			boxShadow: '0px 0px 16px 0px #40464E1A',
		}"
	>
		<div
			v-if="article"
			class=""
			:style="{
				backgroundImage: `url(${article.image})`,
				backgroundSize: 'cover',
			}"
		>
			<div class="flex flex-col bg-black bg-opacity-50 p-12">
				<MyIcon
					name="arrow-left"
					class="w-12 h-12 text-white -me-4 -mt-4 self-end cursor-pointer hover:text-primary duration-300"
					@click="goBack"
				/>

				<div class="flex items-center mt-28">
					<span
						class="text-white py-0.5 px-4 me-5"
						:style="{
							backgroundColor: getCategoryColor(article.category),
						}"
					>
						{{ article.category || '~' }}
					</span>
					<span class="text-white">
						{{ article.date || '~' }}
					</span>
				</div>
				<span class="text-white font-medium mt-6 text-3xl">
					{{ article.title || '~' }}
				</span>
			</div>
		</div>
		<div
			v-else
			class=""
			:style="{
				backgroundImage: 'url(/img/image_blog.jpg)',
				backgroundSize: 'cover',
			}"
		>
			<div
				class="flex items-center justify-center py-28 px-6 bg-black bg-opacity-50"
			>
				<span class="text-white font-bold text-4xl">
					{{
						category
							? $strings.n_category(category.title)
							: $strings.app_blog()
					}}
				</span>
			</div>
		</div>
		<div class="flex items-center overflow-x-hidden" v-dragscroll.x>
			<div class="flex-grow" />
			<div class="flex items-center">
				<span class="w-8 flex-shrink-0" />
				<div class="flex items-center border-s border-slate-200">
					<nuxt-link
						v-for="(c, i) in categories"
						:key="i"
						:to="$routeUrl.BlogCategoryUrl(c.id)"
						class="flex flex-col border-e border-slate-200 ripple-bg-white"
					>
						<span
							class="text-natural-semidark py-5 px-10 whitespace-nowrap font-medium"
						>
							{{ c.title }}
						</span>
						<span
							class="h-1"
							:style="{ backgroundColor: getCategoryColor(c.id) }"
						/>
					</nuxt-link>
				</div>
				<span class="w-8 flex-shrink-0" />
			</div>
			<div class="flex-grow" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Article, BlogCategory } from '~/config/types'
import { getCategoryColor as _getCategoryColor } from '~/components/article/ArticleCard.vue'
import MyIcon from '~/components/utils/MyIcon.vue'

@Component({
	components: { MyIcon },
})
export default class BlogHeader extends Vue {
	@Prop({}) article?: Article

	get categoryId(): string | null {
		return this.$route.params.category_id || null
	}

	get categories(): BlogCategory[] {
		return this.$store.state.category.articleCategories || []
	}

	get category(): BlogCategory | null {
		return this.categories.find((c) => c.id == this.categoryId) || null
	}

	getCategoryColor(id: string) {
		return _getCategoryColor(id)
	}

	goBack() {
		if (this.article) {
			if (window.history.length > 2) {
				this.$router.back()
			} else {
				this.$router.push(this.$routeUrl.BlogUrl())
			}
		}
	}
}
</script>
