<template>
	<div
		class="relative flex flex-col"
		:class="{ 'pointer-events-none': disabled }"
	>
		<div
			v-if="mode === 'underline'"
			class="textinput-underline relative border-b-2 focus-within:border-primary duration-300"
			:class="{
				'pointer-events-none ': type === 'date',
			}"
		>
			<input
				v-if="['number', 'text', 'date', 'password'].includes(type)"
				type="text"
				:name="name"
				placeholder=" "
				:value="value"
				:disabled="disabled || type === 'date'"
				:id="id"
				@change="(v) => $emit('change', v)"
				class="block w-full appearance-none focus:outline-none text-base bg-transparent py-3 text-natural-dark font-bold"
				:class="{
					[inputDirectionClass]: !inputClass,
					[inputClass]: inputClass,
				}"
				@focus="(e) => $emit('focus', e)"
				@blur="(e) => $emit('blur', e)"
			/>
			<label
				class="absolute top-0 pointer-events-none duration-300 origin-start py-3 text-gray-700 font-bold text-base whitespace-nowrap truncate"
			>
				{{ label }}
			</label>
		</div>
		<div
			v-else-if="mode === 'outline'"
			class="textinput-outline relative border-2 border-transparent focus-within:border-primary duration-300 rounded-lg bg-primary bg-opacity-5"
			:class="{
				'pointer-events-none ': type === 'date',
			}"
		>
			<input
				v-if="['number', 'text', 'date', 'password'].includes(type)"
				:type="type === 'password' ? 'password' : 'text'"
				:name="name"
				placeholder=" "
				:value="valueFormatted"
				@input="onChange"
				:disabled="disabled || type === 'date'"
				:id="id"
				class="block w-full rounded-lg appearance-none focus:outline-none text-base bg-transparent py-4 px-5 text-natural-dark font-bold"
				:class="{
					[inputDirectionClass]: !inputClass,
					[inputClass]: inputClass,
				}"
				@focus="(e) => $emit('focus', e)"
				@blur="(e) => $emit('blur', e)"
			/>
			<select
				v-if="type === 'select'"
				:name="name"
				placeholder=" "
				:value="value"
				@input="onChange"
				required
				:disabled="disabled || type === 'date'"
				:id="id"
				class="block w-full appearance-none focus:outline-none text-base bg-transparent py-4 px-5 text-natural-dark font-bold"
				@focus="(e) => $emit('focus', e)"
				@blur="(e) => $emit('blur', e)"
			>
				<option selected disabled class="hidden" value=""></option>
				<option
					v-for="(option, index) in options"
					:key="index"
					:value="optionValue ? option[optionValue] : option"
					:selected="
						optionValue
							? option[optionValue] === value
							: option === value
					"
				>
					{{ option && (optionName ? option[optionName] : option) }}
				</option>
			</select>
			<MyIcon
				v-if="type === 'select'"
				name="arrow-down"
				class="cg-textinput-arrow transform duration-300 transition-transform w-5 h-5 text-natural-dark absolute end-0 top-0 bottom-0 my-auto me-4 pointer-events-none"
			/>
			<label
				class="absolute top-0 pointer-events-none text-gray-700 font-bold py-4 px-5 rounded duration-300 origin-start text-base bg-white bg-opacity-0 whitespace-nowrap truncate"
			>
				{{ label }}
			</label>
		</div>
		<div
			v-if="type === 'date'"
			class="w-full h-full absolute left-0 right-0 top-0 bottom-0 cursor-pointer"
			@click="show = true"
		/>
		<client-only>
			<VuePersianDatetimePicker
				v-if="type === 'date'"
				:element="id"
				color="#1D66FF"
				:editable="true"
				@close="show = false"
				:value="value"
				@input="onDateChange"
				format="jYYYY/jMM/jDD HH:mm:ss"
				:show="show"
			/>
		</client-only>
		<TransitionExpand from="0" to="auto">
			<span
				v-if="isErrorVisible"
				class="text-xs text-red-500 mt-1 ms-1 self-start"
			>
				{{ targetErrors[0] || 'error' }}
			</span>
		</TransitionExpand>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import { v4 as uuid } from 'uuid'
import TransitionExpand from '~/components/anim/TransitionExpand.vue'

export default Vue.extend({
	data() {
		return {
			id: `text-input-${uuid()}`,
			show: false,
			isDropdownOpen: false,
			isTextChanged: false,
		}
	},
	components: {
		TransitionExpand,
		MyIcon,
		VuePersianDatetimePicker: () =>
			process.client
				? import('vue-persian-datetime-picker')
				: Promise.resolve({ MyIcon }),
	},
	mounted() {},
	destroyed() {},
	model: {
		prop: 'value',
		event: 'change',
	},
	props: {
		mode: {
			type: String,
			default: 'outline',
		},
		value: {
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		type: {
			type: String as PropType<any>,
			default: 'text',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Array as PropType<any[]>,
			default: () => [],
		},
		optionValue: {
			default: 'value',
			type: String,
		},
		optionName: {
			default: 'name',
			type: String,
		},
		inputClass: {
			default: '',
			type: String,
		},
		errors: Object as PropType<any>,
	},
	watch: {
		errors(n) {
			this.isTextChanged = false
		},
	},
	computed: {
		valueFormatted(): string {
			if (this.type == 'date') {
				return this.value?.split(' ')[0]
			} else {
				return this.value
			}
		},
		inputDirectionClass(): string {
			if (!this.value) return ''
			const v = this.value + ''
			const c = v.substr(0, 1)
			var p = /^[\u0600-\u06FF\s]+$/
			if (!p.test(c)) {
				return 'direction-ltr'
			} else {
				return 'direction-rtl'
			}
		},
		targetErrors(): string[] {
			try {
				const errors = this.errors?.[this.name]
				if (!errors) {
					return []
				} else if (typeof errors === 'string') {
					return [errors]
				} else {
					return [...errors]
				}
			} catch (e) {
				return []
			}
		},
		isErrorVisible(): boolean {
			return !!this.targetErrors[0] && !this.isTextChanged
		},
	},
	methods: {
		onDateChange(v: any): void {
			this.isTextChanged = true
			this.$emit('change', v)
		},
		onChange(e: any): void {
			this.isTextChanged = true
			const value = e.target.value
			if (this.type === 'number' && isNaN(Number(value))) {
				e.target.value = e.target._value || ''
				return
			}
			this.$emit('input', e)
			this.$emit('change', value)
		},
	},
})
</script>

<style lang="postcss">
.textinput-underline input:focus-within ~ label,
.textinput-underline input:not(:placeholder-shown) ~ label,
.textinput-underline input:-webkit-autofill ~ label {
	@apply transform scale-75 -translate-y-6;
}

.textinput-underline input:focus-within ~ label {
	@apply text-primary font-normal;
}

.textinput-outline input:focus-within ~ label,
.textinput-outline input:not(:placeholder-shown) ~ label,
.textinput-outline input:-webkit-autofill ~ label,
.textinput-outline select:focus-within ~ label,
.textinput-outline select:valid ~ label {
	@apply transform scale-75 -translate-y-4 z-0 ms-4 px-1 py-0 font-normal bg-opacity-100;
}

.vpd-next,
.vpd-prev {
	@apply flex items-center justify-center;
}

.vpd-next svg,
.vpd-prev svg {
	@apply m-auto;
}

.vpd-content {
	@apply rounded-2xl;
}

.vpd-content .vpd-header {
	@apply rounded-t-2xl;
}

.vpd-content button {
	@apply rounded-xl;
}
</style>
