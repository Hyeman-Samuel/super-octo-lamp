
export class FlutterwaveTransferResponseBody{

    status!: string
    message!: string
    checkoutLink!:string
}

export class FlutterwaveWebhookData{
    status!: string
    tx_ref!:string
    id!:string
    flw_ref!: string
    amount!: number
    currency!: string
    charged_amount!: number
    app_fee!: number
    merchant_fee!: number
    processor_response!:string
    auth_model!: string
    ip!: string
    narration!: string
    payment_type!: string
    created_at!: string
}

export class FlutterwaveVerificationResponseData{
    flw_ref!:string
    status!:string
    created_at!: Date
}