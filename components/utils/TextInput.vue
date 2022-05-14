<template>
	<div class="relative" :class="{ 'pointer-events-none': disabled }">
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
					[inputClass]: inputClass
				}"
				@focus="(e) => $emit('focus', e)"
				@blur="(e) => $emit('blur', e)"
			/>
			<label
				class="absolute top-0 pointer-events-none duration-300 origin-start py-3 text-gray-700 font-bold text-base"
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
					[inputClass]: inputClass
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
				class="absolute top-0 pointer-events-none text-gray-700 font-bold py-4 px-5 rounded duration-300 origin-start text-base bg-white bg-opacity-0"
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
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import MyIcon from '~/components/utils/MyIcon.vue'

let uidCounter = 1

export default Vue.extend({
	data() {
		return {
			id: `text-input-${uidCounter++}`,
			show: false,
			isDropdownOpen: false,
		}
	},
	components: {
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
			type: String,
			default: 'text',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Array,
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
			type: String
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
	},
	methods: {
		onDateChange(v: any): void {
			this.$emit('change', v)
		},
		onChange(e: any): void {
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
