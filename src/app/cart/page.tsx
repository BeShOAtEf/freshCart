import { authOptions } from '@/auth'
import Cart from './_components/Cart';
// import { getServerSession } from 'next-auth'
// import { NextResponse } from 'next/server';


// export default async function page() {
//     const session = getServerSession(authOptions);
    
//     if(session){
//         return NextResponse.next()
//     }else{
//         return NextResponse.redirect('/auth/login' , '')
//     }
  
// }


// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation"; // الخطوة 1: استيراد دالة redirect الصحيحة

export default async function CartPage() {
  // const session = await getServerSession(authOptions);

  // الخطوة 2: التحقق من الجلسة والتوجيه في حال عدم تسجيل الدخول
  // if (!session) {
  //   redirect('/auth/login'); 
  // }

  // الخطوة 3: إذا كانت الجلسة موجودة، يتم عرض محتوى الصفحة بشكل طبيعي (JSX)
  return (
    // <div className="p-6">
    //   <h1>سلة المشتريات</h1>
    //   {/* هنا تضع المكونات الخاصة بسلة المشتريات */}
    // </div>
    <Cart/>
  );
}
