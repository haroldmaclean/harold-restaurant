// src/app/api/payfast/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { amount, item_name } = body

  const payfastData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID!,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
    return_url: process.env.PAYFAST_RETURN_URL!,
    cancel_url: process.env.PAYFAST_CANCEL_URL!,
    notify_url: process.env.PAYFAST_NOTIFY_URL!,
    amount: Number(amount).toFixed(2),
    item_name: item_name,
  }

  const formFields = Object.entries(payfastData)
    .map(
      ([key, value]) => `<input type="hidden" name="${key}" value="${value}" />`
    )
    .join('\n')

  const html = `
    <html>
    
      <body onload="document.forms['payfast_form'].submit()">
        <form id="payfast_form" name="payfast_form" method="post" action="https://sandbox.payfast.co.za/eng/process"
>
          ${formFields}
        </form>
      </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
