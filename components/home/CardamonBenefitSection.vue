<template>
	<div class="px-6 flex flex-col items-center">
		<div
			class="flex flex-col-reverse lg:flex-row lg:items-center w-full max-w-screen-xl"
		>
			<div class="flex flex-col flex-grow w-full">
				<span
					class="relative text-2xl font-bold text-natural-dark mb-8 mt-8 lg:mt-0 self-center lg:self-start"
				>
					<span>{{ $strings.cardamon_benefits() }}</span>
					<span
						class="absolute -z-1 rounded-full h-3 w-20 bg-primary bg-opacity-30 start-0 top-0 bottom-0 my-auto"
					/>
				</span>
				<div
					class="grid grid-cols-2 md:grid-cols-3 flex-grow gap-y-3 gap-x-16"
				>
					<div
						v-for="(text, i) in items"
						:key="i"
						class="flex items-center"
					>
						<span
							class="me-3 w-8 h-8 rounded-full bg-primary bg-opacity-50 font-bold text-white text-sm flex-shrink-0 flex items-center justify-center"
						>
							{{ i + 1 }}
						</span>
						<span
							class="text-sm text-natural-dark opacity-50 truncate"
							>{{ text }}</span
						>
					</div>
				</div>
			</div>
			<div class="flex max-w-sm w-full ms-0 lg:ms-16 self-center">
				<img
					src="/img/image_cardamon_benefits.png"
					alt=""
					class="w-full h-auto flex-grow"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'

@Component({
	components: { MyIcon },
})
export default class CardamonHistorySection extends Vue {
	items = [
		'ضد سرطان',
		'کنترل کلسترول',
		'بهبود گردش خون',
		'خوشبو کننده نفس',
		'سلامت قلب',
		'سلامت پوست',
		'سلامت مو',
		'درمان سکسکه',
		'خواص ضد باکتریایی',
		'تسکین دهنده و آرامش بخش',
		'خواص آنتی اکسیدانی',
		'خواص ضد اسپاسم و ضد التهابی',
	]
}
</script>

<style scoped></style>
