<template>
	<div class="flex flex-col px-12">
		<div
			class="flex rounded-3xl overflow-hidden"
			:style="{
				backgroundImage: `url('${image}')`,
				backgroundSize: 'cover',
			}"
		>
			<div
				class="w-full flex items-center justify-center bg-black bg-opacity-50 py-20 px-6"
			>
				<span class="text-white font-bold text-5xl">
					{{ title }}
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '@/components/utils/MyIcon.vue'
import { ShopCategory } from '~/config/types'

@Component({
	components: { MyIcon },
})
export default class ShopCover extends Vue {
	@Prop({}) title?: string
	@Prop({}) image?: string
}
</script>

<style scoped></style>
