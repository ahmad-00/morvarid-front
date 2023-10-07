<template>
	<div
		class="flex flex-col"
		:style="{
			backgroundImage: `url('/img/image_saffron_footer.jpg')`,
			backgroundSize: 'cover',
		}"
	>
		<div
			class="flex items-center justify-center px-6 py-28 -mt-px -mb-px"
			:style="{
				background:
					'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)',
			}"
		>
			<span class="text-center text-3xl text-natural-dark font-normal">
				{{ $strings.saffron_footer_message() }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'

@Component({
	components: { MyIcon },
})
export default class SaffronFooterSection extends Vue {}
</script>

<style scoped></style>
