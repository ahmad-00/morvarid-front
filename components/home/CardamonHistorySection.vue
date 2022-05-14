<template>
	<div class="px-6 flex flex-col items-center">
		<div class="flex items-center w-full max-w-screen-xl">
			<div class="flex max-w-sm w-full me-16">
				<img
					src="/img/image_cardamon_history.png"
					alt=""
					class="w-full h-auto flex-grow"
				/>
			</div>
			<div class="flex flex-col">
				<span
					class="relative text-2xl font-bold text-natural-dark mb-8"
				>
					<span>{{ $strings.cardamon_history() }}</span>
					<span
						class="absolute -z-1 rounded-full h-3 w-24 bg-primary bg-opacity-30 start-0 top-0 bottom-0 my-auto"
					/>
				</span>
				<span class="text-natural-dark opacity-50 flex-grow">
					{{ $strings.cardamon_history_message() }}
				</span>
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
export default class CardamonHistorySection extends Vue {}
</script>

<style scoped></style>
