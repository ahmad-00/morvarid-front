<template>
	<label class="relative flex flex-col">
		<slot>
			<div
				class="p-4 w-full border-2 border-primary border-dashed rounded-xl overflow-hidden duration-300"
				:class="{
					'hover:bg-gray-100': !src,
				}"
			>
				<div
					v-if="!src"
					class="flex flex-col items-center text-primary"
				>
					<MyIcon name="attach" class="w-6 h-6" />
					<span class="text-sm mt-1">
						{{ $strings.upload_n(name) }}
					</span>
				</div>
				<div v-if="src" class="flex flex-col">
					<span class="self-center mb-4 relative">
						<img
							:src="src"
							alt=""
							class="w-auto h-auto max-w-full rounded-md"
							:style="{
								maxHeight: '200px',
							}"
						/>
						<span
							class="rounded-md border-2 border-grey-300 absolute left-0 top-0 right-0 bottom-0 pointer-events-none"
						/>
					</span>
					<div class="grid grid-cols-1">
						<div
							v-if="!disableUpload"
							class="flex flex-col items-center"
						>
							<div
								class="flex flex-col items-center text-red-500 cursor-pointer"
								@click="removeFile"
							>
								<MyIcon name="trash" class="w-6 h-6" />
								<span class="text-sm mt-1">
									{{ $strings.delete_n(name) }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</slot>
		<span
			v-if="!src && !disableUpload"
			class="absolute start-0 end-0 top-0 bottom-0 overflow-hidden"
		>
			<input
				type="file"
				ref="setInputImage"
				class="absolute left-0 top-0 right-0 bottom-0 w-full h-full opacity-0 cursor-pointer"
				style="transform: scale(10)"
				@change="selectImage($event)"
			/>
		</span>
	</label>
</template>

<script>
import MyIcon from '~/components/utils/MyIcon'

export default {
	components: { MyIcon },
	props: {
		name: {
			type: String,
		},
		disableUpload: {
			type: Boolean,
			default: false,
		},
		src: {
			type: String,
			default: '',
		},
		size: {
			type: Number,
			default: 1024,
		},
	},
	data() {
		return {}
	},
	methods: {
		removeFile() {
			this.$emit('change', null)
			this.$emit('input', null)
		},
		async onUploadImage(file) {
			this.$emit('uploading', true)
			try {
				const toBase64 = (f) => {
					return new Promise((resolve, reject) => {
						const reader = new FileReader()
						reader.readAsDataURL(f)
						reader.onload = () => resolve(reader.result)
						reader.onerror = reject
					})
				}
				const base64File = await toBase64(file)
				this.$emit('uploading', false)
				return base64File
			} catch (e) {
				this.$emit('uploading', false)
				this.$toastErrors(this, e)
				return null
			}
		},
		async selectImage(event) {
			if (this.disableUpload) return
			let files = [
				...(event.target.files || event.dataTransfer.files || []),
			]
			const file = files.length && files[0]
			if (!file) {
				this.$emit('change', null)
				return
			}
			const f = await this.onUploadImage(file)
			event.target.value = null
			this.$emit('change', f)
			this.$emit('input', file)
		},
	},
}
</script>

<style lang="scss" scoped></style>
