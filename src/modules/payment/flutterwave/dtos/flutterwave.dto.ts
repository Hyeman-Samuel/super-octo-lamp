
export class FlutterwaveTransferResponseBody{

    status!: string
    message!: string
    checkoutLink!:string
}

export class FlutterwaveWebhookData{
    status!: string
    tx_ref!:string
    transaction_id!:string
}

export class FlutterwaveVerificationResponseData{
    flw_ref!:string
    status!:string
    created_at!: Date
}