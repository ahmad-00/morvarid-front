<template>
	<div class="flex flex-col min-h-screen">
		<MainHeader
			:type="type"
			:loading="loading"
			@update:loading="(v) => $emit('update:loading', v)"
		/>
		<div
			class="flex flex-col flex-grow gradient-to-b from-white to-grey-50"
		>
			<slot></slot>
		</div>
		<MainFooter />
		<div
			v-if="loading"
			class="fixed left-0 top-0 right-0 h-screen bg-white bg-opacity-40 flex items-center justify-center z-50"
		>
			<span class="bg-primary rounded-full w-12 h-12 animate-ping" />
		</div>
		<div
			v-else-if="!fetched"
			class="fixed left-0 top-0 right-0 h-screen bg-white bg-opacity-40 flex items-center justify-center z-50"
		>
			<span
				class="ripple-bg-yellow-500 rounded-lg px-6 py-3 font-bold text-white cursor-pointer shadow-lg"
				@click="$emit('tryAgain')"
			>
				{{ $strings.try_again() }}
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import MainFooter from '~/components/home/MainFooter.vue'
import MainHeader from '~/components/home/MainHeader.vue'

@Component({
	components: { MyIcon, MainFooter, MainHeader },
})
export default class MainContainer extends Vue {
	@Prop({ default: 'main' }) type?: 'main' | 'shop'
	@Prop({ default: true }) fetched?: boolean
	@Prop({ default: false }) loading?: boolean
}
</script>

<style scoped></style>
