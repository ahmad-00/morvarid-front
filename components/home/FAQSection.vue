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
				title: 'چطور میتوانم سفارشم را پیگیری کنم؟',
				text: 'وارد سایت مروارید شوید. روی گزینه سفارش های کلیک کنید. در این قسمت میتوانید جزییات سفارش خود را ببینید. همچنین میتوانید در این قسمت روند آماده سازی و مراحل ارسال سفارش خود را پیگیری کنید.'
			},
			{
				title: 'چطور میتوانم سفارشم را لغو کنم؟',
				text: 'شما میتوانید با مراجعه به پروفایل خود سفارش یا مرسوله ایی که از ارسال آن منصرف شدید را لغو نمایید.'
			},
			{
				title: 'میتوانم سفارشم را بصورت اقساطی پرداخت کنم؟',
				text: 'خیر، امکان پرداخت اقساطی وجود ندارد.'
			},
			{
				title: 'چطور درخواست خود را جهت بازگرداندن کالا (مرجوعی کالا) به شما اطلاع دهم؟',
				text: 'شما میتوانید از طریق فرم درخواست مرجوعی در حساب کاربری و یا تماس با ما درخواست خود را ثبت نمایید.'
			},
			{
				title: 'هزینه ی ارسال چگونه محاسبه میشود؟',
				text: 'هزینه ارسال سفارشات بالای پنج میلیون ریال برای مشتریان ساکن تهران رایگان میباشد و کمتر از پنج میلیون ریال مبلغ سیصد هزار ریال به مبلغ فاکتور شما جهت ارسال اضافه میشود. همچنین هزینه ارسال سفارشات بالای ده میلیون ریال برای مشتریان حومه تهران و سایر شهرها رایگان میباشد.'
			},
		]
	}
}
</script>

<style scoped></style>
