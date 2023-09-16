<template>
	<div id="home-faq-section" class="flex flex-col items-center px-6">
		<div class="flex flex-col max-w-screen-xl w-full">
			<div class="flex items-center mb-6">
				<span
					class="text-2xl lg:text-3xl font-bold flex-grow text-natural-dark line-clamp-1 me-4"
				>
					{{ this.$strings.faq() }}
				</span>
			</div>
			<div class="grid grid-cols-1 flex-grow">
				<div
					v-for="(item, i) in items"
					:key="i"
					class="flex flex-col"
					:class="{
						'': items.length === i + 1,
						'border-b border-grey-300 border-opacity-50':
							items.length !== i + 1,
					}"
				>
					<div
						class="flex items-center py-5 cursor-pointer"
						@click="expandedItemIndex = expandedItemIndex !== i ? i : null"
					>
						<span class="text-lg text-natural-dark flex-grow">
							{{ item.title }}
						</span>
						<span class="w-6 h-6 relative transform scale-75">
							<span
								class="h-1 rounded-full bg-natural-dark absolute left-0 right-0 top-0 bottom-0 my-auto"
							/>
							<span
								class="h-1 rounded-full bg-natural-dark absolute left-0 right-0 top-0 bottom-0 my-auto transform duration-300"
								:class="{
									'rotate-90': expandedItemIndex !== i,
									'rotate-0': expandedItemIndex === i,
								}"
							/>
						</span>
					</div>
					<TransitionExpand from="0" to="auto">
						<div
							v-if="expandedItemIndex === i"
							class="flex flex-col"
						>
							<span class="text-natural-semidark text-sm pb-5">
								{{ item.text }}
							</span>
						</div>
					</TransitionExpand>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import TransitionExpand from '~/components/anim/TransitionExpand.vue'

@Component({
	components: {TransitionExpand,},
})
export default class FAQSection extends Vue {

	expandedItemIndex = null as any

	get items() {
		return [
			{
				title: 'چطور میتوانم سفارشم را پیگیری کنم ؟',
				text: 'وارد سایت مروارید شوید. بر روی سه خط سمت چپ کلیک کنید. در این قسمت گزینه داشبورد یا سفارش ها را انتخاب کنید. همچنین میتوانید در این قسمت روند ارسال سفارش خود را پیگیری کنید.'
			},
			{
				title: 'چطور میتوانم سفارشم را لغو کنم ؟',
				text: 'شما میتوانید با مراجعه به داشبورد یا سفارش ها سفارشی که از خرید آن منصرف شدید را لغو نمایید. '
			},
			{
				title: 'چطور درخواست خود را جهت بازگرداندن کالا (مرجوعی کالا) به شما اطلاع دهم؟',
				text: 'شما میتوانید از طریق تماس با ما درخواست خود را ثبت نمایید.'
			},
			{
				title: 'هزینه ی ارسال چگونه محاسبه میشود؟',
				text: 'هزینه ارسال سفارشات بالای یک میلیون تومان برای مشتریان ساکن شهر تهران رایگان میباشد و کمتر از یک میلیون تومان مبلغ چهل هزار تومان به مبلغ فاکتور شما جهت ارسال اضافه میشود. \n' +
					'هزینه ارسال سفارشات بالای یک میلیون و پانصد هزار تومان برای مشتریان حومه تهران و سایر شهرها رایگان میباشد و کمتر از یک میلیون و پانصد هزار تومان متغیر، مبلغی بین چهل و پنج تا نود هزار تومان به مبلغ فاکتور شما جهت ارسال اضافه میشود.\n'
			},
		]
	}
}
</script>

<style scoped></style>
