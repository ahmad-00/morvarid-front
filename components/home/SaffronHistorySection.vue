<template>
	<div class="px-6 flex flex-col items-center">
		<div class="flex items-center w-full max-w-screen-xl">
			<div class="flex max-w-xs w-full me-16">
				<span class="w-1 bg-natural-dark flex-shrink-0 rounded-full"
					  :style="{
						  boxShadow: '-2px 2px 4px rgba(64, 70, 78, 0.25)'
					  }"
				/>
				<img src="/img/image_saffron_history.png" alt="" class="w-full h-auto flex-grow my-9"/>
			</div>
			<div class="flex flex-col">
				<span class="relative text-2xl font-bold text-natural-dark mb-8">
					<span>{{ $strings.saffron_history() }}</span>
					<span
						class="absolute -z-1 rounded-full h-3 w-24 bg-primary bg-opacity-30 start-0 top-0 bottom-0 my-auto"/>
				</span>
				<span class="text-natural-dark opacity-50 flex-grow">
					{{ $strings.saffron_history_message() }}
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import MyIcon from "~/components/utils/MyIcon.vue";

@Component({
	components: {MyIcon},
})
export default class SaffronHistorySection extends Vue {

}
</script>

<style scoped>

</style>
