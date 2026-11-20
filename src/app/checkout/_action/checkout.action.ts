'use server'

type shippingAddressType = {
    details: string;
    phone: string;
    city: string;
}

// أضف معامل token هنا واستخدمه مباشرة في الـ headers
export async function checkoutOnline(cartId: string, shippingAddress: shippingAddressType, token: string) {
    try {
        const apiUrl = process.env.API || "https://routemisr.com"; 
        const currentUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

        const res = await fetch(`${apiUrl}/orders/checkout-session/${cartId}?url=${currentUrl}`, {
            method: 'POST',
            body: JSON.stringify({
                shippingAddress
            }),
            headers: {
                'token': token, // الهيدر المطلوب لـ RouteMisr
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Checkout Error:", error);
        throw error;
    }
}