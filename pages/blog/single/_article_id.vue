<template>
	<MainContainer>
		<div class="flex flex-col px-12">
			<BlogHeader :article="article" />
		</div>
		<div class="flex flex-col px-6 mt-20 mb-32 items-center">
			<div class="w-full max-w-screen-xl grid grid-cols-12 gap-16">
				<div class="col-span-8 flex flex-col text-natural-semidark">
					<p class="mb-8 text-lg">
						ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ
						ﭼﺎپ و ﺑﺎ اﺳﺘﻔﺎده از ﻃﺮاﺣﺎن ﮔﺮاﻓﯿﮏ اﺳﺖ ﭼﺎﭘﮕﺮﻫﺎ و ﻣﺘﻮن
						ﺑﻠﮑﻪ روزﻧﺎﻣﻪ و ﻣﺠﻠﻪ در ﺳﺘﻮن و ﺳﻄﺮآﻧﭽﻨﺎن ﮐﻪ ﻟﺎزم اﺳﺖ و
						ﺑﺮای ﺷﺮاﯾﻂ ﻓﻌﻠﯽ ﺗﮑﻨﻮﻟﻮژی ﻣﻮرد ﻧﯿﺎز و ﮐﺎرﺑﺮدﻫﺎی ﻣﺘﻨﻮع ﺑﺎ
						ﻫﺪف ﺑﻬﺒﻮد اﺑﺰارﻫﺎی ﮐﺎرﺑﺮدی ﻣﯽ ﺑﺎﺷﺪ ﮐﺘﺎﺑﻬﺎی زﯾﺎدی در ﺷﺼﺖ
						و ﺳﻪ درﺻﺪ ﮔﺬﺷﺘﻪ ﺣﺎل و آﯾﻨﺪه ﺷﻨﺎﺧﺖ ﻓﺮاوان ﺟﺎﻣﻌﻪ و ﻣﺘﺨﺼﺼﺎن
						را ﻣﯽ ﻃﻠﺒﺪ ﺗﺎ ﺑﺎ ﻧﺮم اﻓﺰارﻫﺎ ﺷﻨﺎﺧﺖ ﺑﯿﺸﺘﺮی را ﺑﺮای ﻃﺮاﺣﺎن
						راﯾﺎﻧﻪ ای ﻋﻠﯽ اﻟﺨﺼﻮص ﻃﺮاﺣﺎن ﺧﻠﺎﻗﯽ و ﻓﺮﻫﻨﮓ ﭘﯿﺸﺮو در زﺑﺎن
						ﻓﺎرﺳﯽ اﯾﺠﺎد ﮐﺮد در اﯾﻦ ﺻﻮرت ﻣﯽ ﺗﻮان اﻣﯿﺪ داﺷﺖ ﮐﻪ ﺗﻤﺎم و
						دﺷﻮاری ﻣﻮﺟﻮد در اراﺋﻪ راﻫﮑﺎرﻫﺎ و ﺷﺮاﯾﻂ ﺳﺨﺖ ﺗﺎﯾﭗ ﺑﻪ ﭘﺎﯾﺎن
						رﺳﺪ و زﻣﺎن ﻣﻮرد ﻧﯿﺎز ﺷﺎﻣﻞ ﺣﺮوﻓﭽﯿﻨﯽ دﺳﺘﺎوردﻫﺎی اﺻﻠﯽ و
						ﺟﻮاﺑﮕﻮی ﺳﻮاﻟﺎت ﭘﯿﻮﺳﺘﻪ اﻫﻞ دﻧﯿﺎی ﻣﻮﺟﻮد ﻃﺮاﺣﯽ اﺳﺎﺳﺎ ﻣﻮرد
						اﺳﺘﻔﺎده ﻗﺮار ﮔﯿﺮد.
					</p>
					<p class="text-lg text-natural-dark font-bold mb-8">
						ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ
						ﭼﺎپ
					</p>
					<p class="mb-10 text-lg">
						ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ
						ﭼﺎپ و ﺑﺎ اﺳﺘﻔﺎده از ﻃﺮاﺣﺎن ﮔﺮاﻓﯿﮏ اﺳﺖ ﭼﺎﭘﮕﺮﻫﺎ و ﻣﺘﻮن
						ﺑﻠﮑﻪ روزﻧﺎﻣﻪ و ﻣﺠﻠﻪ در ﺳﺘﻮن و ﺳﻄﺮآﻧﭽﻨﺎن ﮐﻪ ﻟﺎزم اﺳﺖ و
						ﺑﺮای ﺷﺮاﯾﻂ ﻓﻌﻠﯽ ﺗﮑﻨﻮﻟﻮژی ﻣﻮرد ﻧﯿﺎز و ﮐﺎرﺑﺮدﻫﺎی ﻣﺘﻨﻮع ﺑﺎ
						ﻫﺪف ﺑﻬﺒﻮد اﺑﺰارﻫﺎی ﮐﺎرﺑﺮدی ﻣﯽ ﺑﺎﺷﺪ ﮐﺘﺎﺑﻬﺎی زﯾﺎدی در ﺷﺼﺖ
						و ﺳﻪ درﺻﺪ ﮔﺬﺷﺘﻪ ﺣﺎل و آﯾﻨﺪه ﺷﻨﺎﺧﺖ ﻓﺮاوان ﺟﺎﻣﻌﻪ و ﻣﺘﺨﺼﺼﺎن
						را ﻣﯽ ﻃﻠﺒﺪ ﺗﺎ ﺑﺎ ﻧﺮم اﻓﺰارﻫﺎ ﺷﻨﺎﺧﺖ ﺑﯿﺸﺘﺮی را ﺑﺮای ﻃﺮاﺣﺎن
						راﯾﺎﻧﻪ ای ﻋﻠﯽ اﻟﺨﺼﻮص ﻃﺮاﺣﺎن ﺧﻠﺎﻗﯽ و ﻓﺮﻫﻨﮓ ﭘﯿﺸﺮو در زﺑﺎن
						ﻓﺎرﺳﯽ اﯾﺠﺎد ﮐﺮد در اﯾﻦ ﺻﻮرت ﻣﯽ ﺗﻮان اﻣﯿﺪ داﺷﺖ ﮐﻪ ﺗﻤﺎم و
						دﺷﻮاری ﻣﻮﺟﻮد در اراﺋﻪ راﻫﮑﺎرﻫﺎ و ﺷﺮاﯾﻂ ﺳﺨﺖ ﺗﺎﯾﭗ ﺑﻪ ﭘﺎﯾﺎن
						رﺳﺪ و زﻣﺎن ﻣﻮرد ﻧﯿﺎز ﺷﺎﻣﻞ ﺣﺮوﻓﭽﯿﻨﯽ دﺳﺘﺎوردﻫﺎی اﺻﻠﯽ و
						ﺟﻮاﺑﮕﻮی ﺳﻮاﻟﺎت ﭘﯿﻮﺳﺘﻪ اﻫﻞ دﻧﯿﺎی ﻣﻮﺟﻮد ﻃﺮاﺣﯽ اﺳﺎﺳﺎ ﻣﻮرد
						اﺳﺘﻔﺎده ﻗﺮار ﮔﯿﺮد.
					</p>
					<img
						src="/img/image_article_sample_2.jpg"
						alt=""
						class="w-full h-auto mb-10"
					/>
					<p class="mb-10 text-lg">
						ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ
						ﭼﺎپ و ﺑﺎ اﺳﺘﻔﺎده از ﻃﺮاﺣﺎن ﮔﺮاﻓﯿﮏ اﺳﺖ ﭼﺎﭘﮕﺮﻫﺎ و ﻣﺘﻮن
						ﺑﻠﮑﻪ روزﻧﺎﻣﻪ و ﻣﺠﻠﻪ در ﺳﺘﻮن و ﺳﻄﺮآﻧﭽﻨﺎن ﮐﻪ ﻟﺎزم اﺳﺖ و
						ﺑﺮای ﺷﺮاﯾﻂ ﻓﻌﻠﯽ ﺗﮑﻨﻮﻟﻮژی ﻣﻮرد ﻧﯿﺎز و ﮐﺎرﺑﺮدﻫﺎی ﻣﺘﻨﻮع ﺑﺎ
						ﻫﺪف ﺑﻬﺒﻮد اﺑﺰارﻫﺎی ﮐﺎرﺑﺮدی ﻣﯽ ﺑﺎﺷﺪ ﮐﺘﺎﺑﻬﺎی زﯾﺎدی در ﺷﺼﺖ
						و ﺳﻪ درﺻﺪ ﮔﺬﺷﺘﻪ ﺣﺎل و آﯾﻨﺪه ﺷﻨﺎﺧﺖ ﻓﺮاوان ﺟﺎﻣﻌﻪ و ﻣﺘﺨﺼﺼﺎن
						را ﻣﯽ ﻃﻠﺒﺪ ﺗﺎ ﺑﺎ ﻧﺮم اﻓﺰارﻫﺎ ﺷﻨﺎﺧﺖ ﺑﯿﺸﺘﺮی را ﺑﺮای ﻃﺮاﺣﺎن
						راﯾﺎﻧﻪ ای ﻋﻠﯽ اﻟﺨﺼﻮص ﻃﺮاﺣﺎن ﺧﻠﺎﻗﯽ و ﻓﺮﻫﻨﮓ ﭘﯿﺸﺮو در زﺑﺎن
						ﻓﺎرﺳﯽ اﯾﺠﺎد ﮐﺮد در اﯾﻦ ﺻﻮرت ﻣﯽ ﺗﻮان اﻣﯿﺪ داﺷﺖ ﮐﻪ ﺗﻤﺎم و
						دﺷﻮاری ﻣﻮﺟﻮد در اراﺋﻪ راﻫﮑﺎرﻫﺎ و ﺷﺮاﯾﻂ ﺳﺨﺖ ﺗﺎﯾﭗ ﺑﻪ ﭘﺎﯾﺎن
						رﺳﺪ و زﻣﺎن ﻣﻮرد ﻧﯿﺎز ﺷﺎﻣﻞ ﺣﺮوﻓﭽﯿﻨﯽ دﺳﺘﺎوردﻫﺎی اﺻﻠﯽ و
						ﺟﻮاﺑﮕﻮی ﺳﻮاﻟﺎت ﭘﯿﻮﺳﺘﻪ اﻫﻞ دﻧﯿﺎی ﻣﻮﺟﻮد ﻃﺮاﺣﯽ اﺳﺎﺳﺎ ﻣﻮرد
						اﺳﺘﻔﺎده ﻗﺮار ﮔﯿﺮد.
					</p>
				</div>
				<div class="col-span-4 flex flex-col">
					<span class="text-natural-dark text-xl font-bold mb-10">
						{{ $strings.most_visited() }}
					</span>
					<ArticleHCard
						v-for="(a, i) in mostVisitedArticles"
						:key="i"
						:article="a"
						class="mb-6"
					/>
				</div>
			</div>
		</div>
	</MainContainer>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import Vue from 'vue'
import MainContainer from '~/components/home/MainContainer.vue'
import { Article } from '~/config/types'
import BlogHeader from '~/components/blog/BlogHeader.vue'
import ArticleHCard from '~/components/article/ArticleHCard.vue'

@Component({
	middleware: ['fetch'],
	components: { ArticleHCard, BlogHeader, MainContainer, MyIcon },
})
export default class SingleArticlePage extends Vue {
	get articleId(): string {
		return this.$route.params.article_id
	}

	article = {
		id: this.articleId,
		title: 'ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ ﭼﺎپ',
		content: '',
		date: '۲۱ ﻓﺮوردﯾﻦ ۹۹',
		category: 'ﻧﺎم دﺳﺘﻪ',
		image: '/img/image_article_sample.jpg',
	} as Article

	mostVisitedArticles = Array(5)
		.fill('')
		.map((i) => ({
			id: i + 1,
			title: 'ﻟﻮرم اﯾﭙﺴﻮم ﻣﺘﻦ ﺳﺎﺧﺘﮕﯽ ﺑﺎ ﺗﻮﻟﯿﺪ ﺳﺎدﮔﯽ ﻧﺎﻣﻔﻬﻮم از ﺻﻨﻌﺖ ﭼﺎپ',
			content: '',
			date: '۲۱ ﻓﺮوردﯾﻦ ۹۹',
			category: 'ﻧﺎم دﺳﺘﻪ',
			image: '/img/image_article_sample.jpg',
		})) as Article[]

	head() {
		if (this.article?.id) {
			return {
				title: this.article.title + ' | ' + this.$strings.app_blog(),
			}
		} else {
			return {
				title:
					this.$strings.app_title() +
					' | ' +
					this.$strings.app_subtitle(),
			}
		}
	}
}
</script>

<style scoped></style>
