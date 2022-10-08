<template>
	<div class="flex flex-col items-center px-6">
		<div class="flex flex-col max-w-screen-xl w-full">
			<div class="flex items-center mb-12">
				<span
					class="text-2xl lg:text-3xl font-bold flex-grow text-natural-dark line-clamp-1 me-4"
				>
					{{ $strings.comments() }}
				</span>
				<div class="flex-grow" />
				<span
					class="flex items-center ripple-bg-primary-dark px-5 py-2 text-white rounded-md cursor-pointer flex-shrink-0"
					@click="openCommentDialog"
				>
					<span class="text-sm font-medium">
						{{ $strings.write_a_comment() }}
					</span>
				</span>
			</div>
		</div>
		<div
			v-if="comments.length"
			class="grid grid cols-1 md:grid-cols-2 gap-x-10 gap-y-8 w-full"
		>
			<div
				v-for="(comment, i) in comments"
				:key="i"
				class="flex flex-row items-start px-4 py-4 rounded-lg border border-gray-200"
			>
				<div class="flex-shrink-0 me-4 flex">
					<span
						class="w-14 h-14 bg-gray-300 overflow-hidden"
						:style="{
							borderRadius: '70% 30% 30% 70% / 30% 30% 70% 70%',
						}"
					>
						<MyIcon
							name="person"
							class="text-gray-400 w-full h-full transform scale-125 translate-y-2"
						/>
					</span>
				</div>
				<div class="flex flex-col flex-grow">
					<div class="flex items-center">
						<div class="flex items-center text-natural-dark me-8">
							<MyIcon
								name="person"
								class="w-5 h-5 me-1 flex-shrink-0"
							/>
							<span class="text-sm font-semibold line-clamp-1">
								{{ comment.user_name || '~' }}
							</span>
						</div>
						<div class="flex items-center text-natural-semidark">
							<MyIcon
								name="recent-time"
								class="w-5 h-5 me-1 flex-shrink-0"
							/>
							<span class="text-sm font-medium line-clamp-1">
								{{
									getDateString(comment.created_at || '') ||
									'~'
								}}
							</span>
						</div>
					</div>
					<span class="border-b border-gray-200 mt-3 mb-3" />
					<div class="">
						<p class="text-natural-semidark m-0">
							{{ comment.comment || '~' }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<span
			v-else
			class="text-2xl font-bold text-natural-mute opacity-50 self-center"
		>
			{{ $strings.no_comment_has_been_registered_yet() }}
		</span>
		<ModalContainer
			v-show="isCommentDialogVisible"
			:title="$strings.submit_comment()"
			:buttonName="$strings.send()"
			@button-click="sendComment"
			@close="isCommentDialogVisible = false"
			size="lg"
			:loading="commentDialogLoading"
		>
			<div class="flex flex-col items-start px-6 py-6">
				<MaterialLabel
					:value="commentData.comment"
					:label="$strings.your_comment()"
					class="w-full bg-primary bg-opacity-5 flex outline-none rounded-lg"
				>
					<textarea
						v-model="commentData.comment"
						class="outline-none w-full resize-none bg-transparent py-4 px-5 text-natural-dark text-base"
						:style="{
							minHeight: '150px',
						}"
					/>
				</MaterialLabel>
			</div>
		</ModalContainer>
		<ModalContainer
			v-show="isReportDialogVisible"
			:title="$strings.violation_report()"
			:buttonName="$strings.send()"
			@button-click="sendReport"
			@close="isReportDialogVisible = false"
			size="lg"
			:loading="reportDialogLoading"
		>
			<div class="flex flex-col items-start px-6 py-6">
				<MaterialLabel
					:value="reportData.description"
					:label="$strings.description()"
					class="w-full"
				>
					<textarea
						v-model="reportData.description"
						:style="{
							minHeight: '120px',
						}"
					></textarea>
				</MaterialLabel>
			</div>
		</ModalContainer>
		<ModalContainer
			v-show="isLoginAlertVisible"
			:title="$strings.please_login()"
			:buttonName="$strings.login()"
			@btnClick="$router.push($routeUrl.LoginUrl())"
			@close="isLoginAlertVisible = false"
			size="md"
		>
			<div class="flex flex-col p-6 text-center items-center">
				<MyIcon name="person" class="w-16 h-16 text-primary" />
				<span class="text-natural-semidark text-sm mt-6">
					{{ $strings.for_comment_login_first() }}
				</span>
			</div>
		</ModalContainer>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Review, Product, User } from '~/config/types'
import MaterialLabel from '~/components/utils/MaterialLabel.vue'
import ModalContainer from '~/components/utils/ModalContainer.vue'
import TextInput from '~/components/utils/TextInput.vue'
import moment from 'moment-jalaali'
import MyIcon from '~/components/utils/MyIcon.vue'

export default Vue.extend({
	components: { MyIcon, ModalContainer, MaterialLabel, TextInput },
	data() {
		return {
			isLoginAlertVisible: false,
			isCommentDialogVisible: false,
			commentDialogLoading: false,
			commentData: {} as Review,
			isReportDialogVisible: false,
			reportDialogLoading: false,
			reportData: {
				review_id: '',
				description: '',
			},
		}
	},
	props: {
		product: Object as PropType<Product>,
		loading: Boolean,
	},
	computed: {
		user(): User | null {
			return this.$store.state.user.user || null
		},
		comments(): Review[] {
			return this.product?.reviews || []
		},
	},
	methods: {
		async sendComment() {
			const errors = [
				...this.$validator.validate(
					this.commentData.comment,
					this.$strings.comment(),
					'valid'
				),
			]

			if (errors.length) {
				this.$toast.error(errors[0], '', {} as any)
				return
			}

			this.commentDialogLoading = true
			try {
				await this.$axios.post(this.$apiUrl.SubmitReviewUrl(), {
					product_id: this.product.id,
					comment: this.commentData.comment,
				})
				this.$toast.success(this.$strings.comment_sent(), '', {} as any)
				this.isCommentDialogVisible = false
				this.commentData = {} as any
			} catch (e: any) {
				this.$toastErrors(this, e)
			}
			this.commentDialogLoading = false
		},
		async sendReport() {
			this.$toast.info(
				"function 'sendReport' not implemented yet",
				'',
				{} as any
			)
			return
			// this.reportDialogLoading = true
			// try {
			// 	await this.$axios.post(this.$apiUrl.ReportReviewUrl(), {
			// 		review_id: this.reportData.review_id,
			// 		description: this.reportData.description,
			// 	})
			// 	this.$toast.success(
			// 		this.$strings.violation_report_sent(),
			// 		'',
			// 		{} as any
			// 	)
			// 	this.isReportDialogVisible = false
			// 	this.reportData = {} as any
			// } catch (e) {
			// 	this.$toastErrors(this, e)
			// }
			// this.reportDialogLoading = false
		},
		getDateString(date: string) {
			return moment(date).format('jDD jMMMM , jYYYY')
		},
		openCommentDialog() {
			if (this.user) {
				this.isCommentDialogVisible = true
			} else {
				this.isLoginAlertVisible = true
			}
		},
		openReportDialog(comment: Review) {
			if (this.user) {
				this.reportData = {
					review_id: comment.id,
					description: '',
				}
				this.isReportDialogVisible = true
			} else {
				this.isLoginAlertVisible = true
			}
		},
	},
	mounted() {},
})
</script>

<style scoped></style>
