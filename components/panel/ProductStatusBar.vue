<template>
	<div
		class="w-full bg-white rounded-xl py-4 px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
		:style="{ boxShadow: '0px 0px 19px -19px #F2F2F2' }"
	>
		<nuxt-link
			v-for="(item, index) in orderStatuses"
			:key="index"
			class="bg-opacity-10 hover:bg-opacity-20 duration-300 rounded-2xl flex items-center cursor-pointer"
			:class="[item.bgClass]"
			:to="{
				path: $routeUrl.PanelOrdersUrl(),
				query: {
					status: item.value,
				},
			}"
		>
			<span
				class="flex items-center justify-center w-12 h-12 rounded-lg ms-8 my-6"
				:class="[item.bgClass]"
			>
				<MyIcon name="bag" class="w-10 h-10 text-white" />
			</span>
			<div class="flex flex-col items-center justify-center flex-grow">
				<span class="text-natural-dark -mb-px text-sm font-light">
					{{ item.name }}
				</span>
				<span class="text-natural-dark text-3xl font-bold -mb-2">
					{{ items[index] }}
				</span>
			</div>
		</nuxt-link>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import { StatusType } from '~/store/type'

export default Vue.extend({
	components: { MyIcon },
	data() {
		return {}
	},
	computed: {
		orderStatuses(): StatusType[] {
			return this.$store.state.type.orderStatuses || []
		},
	},
	created() {},
	props: {
		items: Array,
	},
})
</script>

<style></style>
