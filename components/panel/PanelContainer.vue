<template>
	<div
		class="flex flex-col"
		:style="{
			backgroundColor: '#F6F8FC',
		}"
	>
		<div class="flex flex-col min-h-screen">
			<MainHeader
				type="main"
				:loading="loading"
				@update:loading="(v) => $emit('update:loading', v)"
				class="shadow-md"
			/>
			<div class="grid grid-cols-12 w-full px-8 py-8 gap-8 flex-grow">
				<div class="col-span-3 flex flex-col">
					<div
						class="flex flex-col bg-white rounded-2xl overflow-hidden"
						:style="{
						boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
					}"
					>
						<UserMenu
							:loading="loading"
							@update:loading="(v) => $emit('update:loading', v)"
							:selected="selected"
						/>
					</div>
				</div>
				<div class="col-span-9 flex flex-col">
					<slot></slot>
				</div>
			</div>
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
import UserMenu, { MenuItemIds } from "~/components/home/UserMenu.vue";

@Component({
	components: { UserMenu, MyIcon, MainFooter, MainHeader },
})
export default class MainContainer extends Vue {
	@Prop({ default: 'main' }) type?: 'main' | 'shop'
	@Prop({ }) selected?: MenuItemIds
	@Prop({ default: true }) fetched?: boolean
	@Prop({ default: false }) loading?: boolean
}
</script>

<style scoped></style>
