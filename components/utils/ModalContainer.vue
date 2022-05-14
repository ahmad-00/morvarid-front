<template>
	<transition name="modal-fade">
		<div
			v-if="visible"
			class="modal-backdrop z-50 flex flex-col items-center justify-center md:px-6"
			:class="{
				'px-6': !page,
			}"
		>
			<div
				ref="ctr"
				role="dialog"
				aria-labelledby="modalTitle"
				aria-describedby="modalDescription"
				class="modal-container w-full bg-white rounded-2xl relative"
				:class="{
					page: page,
					'max-w-sm': size === 'sm' && !innerSize,
					'max-w-md': size === 'md' && !innerSize,
					'max-w-lg': size === 'lg' && !innerSize,
					'max-w-xl': size === 'xl' && !innerSize,
					'max-w-2xl': size === '2xl' && !innerSize,
					'max-w-3xl': size === '3xl' && !innerSize,
					'max-w-4xl': size === '4xl' && !innerSize,
					'max-w-5xl': size === '5xl' && !innerSize,
					'max-w-6xl': size === '6xl' && !innerSize,
					'max-w-7xl': size === '7xl' && !innerSize,
					'w-full': size === 'largest' && !innerSize,
					'h-full w-full': innerSize,
				}"
			>
				<div id="modal-header" class="flex justify-between">
					<h4
						class="m-5 my-4 fons font-bold text-natural-dark text-lg"
					>
						{{ title }}
					</h4>
					<div class="flex">
						<div
							class="border-s border-gray-200 p-3 flex items-center justify-center ripple-bg-white rounded-te-2xl cursor-pointer"
							@click="close"
							aria-label="Close modal"
						>
							<MyIcon name="close" class="w-8 h-8" />
						</div>
					</div>
				</div>
				<div class="h-px w-full bg-gray-200 relative" />
				<client-only>
					<rescrollbar
						class="scroll-area"
						:settings="{
							suppressScrollY: false,
							suppressScrollX: true,
						}"
					>
						<div class="flex-grow">
							<slot></slot>
						</div>
					</rescrollbar>
				</client-only>
				<slot name="footer" v-if="!hideFooter">
					<div class="flex relative">
						<div
							class="h-px w-full bg-gray-200 absolute left-0 right-0 top-0 -mt-px"
						/>
						<div class="flex-grow" />
						<button
							class="m-4 ripple-bg-primary text-white px-8 py-3 font-bold rounded-xl"
							@click="click"
						>
							{{ buttonName }}
						</button>
					</div>
				</slot>
				<div
					v-if="loading"
					class="bg-white bg-opacity-50 absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center"
				>
					<div class="bg-primary rounded-full w-8 h-8 animate-ping" />
				</div>
				<div
					v-if="!fetched && !loading"
					class="bg-white bg-opacity-50 absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center"
				>
					<span
						class="ripple-bg-yellow-500 text-white font-bold text-sm rounded-md px-4 py-2.5 shadow-lg cursor-pointer"
						@click="$emit('tryAgain')"
					>
						{{ $strings.try_again() }}
					</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import Vue from 'vue'
import MyIcon from './MyIcon.vue'

export default Vue.extend({
	name: 'modalContainer',
	data() {
		return {
			innerSize: false,
		}
	},
	props: {
		title: {
			type: String,
		},
		buttonName: {
			type: String,
		},
		size: {
			type: String,
			default: '',
		},
		loading: {
			type: Boolean,
			default: false,
		},
		fetched: {
			type: Boolean,
			default: true,
		},
		page: Boolean,
		hideFooter: Boolean,
		visible: {
			default: true,
			type: Boolean,
		},
	},
	components: { MyIcon },
	mounted() {
		if (process.browser) {
			document.addEventListener('click', this.clickOutside)
		}
	},
	destroyed() {
		if (process.browser) {
			document.removeEventListener('click', this.clickOutside)
		}
	},
	methods: {
		close() {
			this.$emit('close')
		},
		clickOutside(e: any) {
			if (
				// @ts-ignore
				!this.$refs.ctr?.contains(e.target) &&
				e.target?.contains(this.$refs.ctr) &&
				!this.loading
			) {
				this.close()
			}
		},
		click() {
			this.$emit('button-click')
		},
	},
})
</script>

<style>
.modal-container {
	overflow: auto;
	max-height: calc(100vh - 64px);
	display: flex;
	flex-direction: column;
}

.modal-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-fade-enter,
.modal-fade-leave-active {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.5s ease;
}

.scroll-area {
	position: relative;
	margin: auto;
	width: 100%;
	height: 100%;
}

.scroll-area > .ps__rail-y {
	background-color: #f2f2f2 !important;
	width: 9px !important;
	margin-top: 5px;
	left: auto !important;
	right: 0 !important;
	margin-bottom: 5px !important;
	margin-right: 5px !important;
	border-radius: 9px;
	overflow: hidden !important;
	padding: 0 !important;
}

.scroll-area > .ps__rail-y > .ps__thumb-y {
	padding: 0 !important;
	margin: 0 !important;
	border: none !important;
	width: 100% !important;
	right: 0 !important;
	left: 0 !important;
	@apply bg-primary;
}

@media (max-width: 768px) {
	.modal-container.page {
		height: 100vh;
		max-height: 100vh;
		@apply rounded-none border-none max-w-full;
	}
}
</style>
