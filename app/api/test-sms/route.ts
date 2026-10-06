import {NextResponse} from "next/server";
export async function POST(req:Request){
 try{
  const body=await req.json();
  const recipients=String(body.recipients??"").split(",").map((x:string)=>x.trim()).filter(Boolean);
  const message=String(body.message??"").trim();
  const senderid=String(body.senderid??"").trim();
  const gateway=String(body.gateway??"1").trim();
  if(!recipients.length||!message||!senderid)return NextResponse.json({error:"Recipients, sender ID and message are required"},{status:400});
  if(recipients.length>100)return NextResponse.json({error:"Bulk-SMS.ng allows at most 100 recipients per request"},{status:400});
  const email=process.env.BULK_SMS_EMAIL, password=process.env.BULK_SMS_PASSWORD, apiUrl=process.env.BULK_SMS_API_URL||"https://account.bulk-sms.ng/api/promotional/";
  if(!email||!password)return NextResponse.json({error:"Server SMS credentials are not configured"},{status:500});
  const upstream=await fetch(apiUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password,message,recipient:recipients.join(","),senderid,smsgateway:gateway}),cache:"no-store"});
  const text=await upstream.text(); let data:unknown; try{data=JSON.parse(text)}catch{data={raw:text}};
  return NextResponse.json({providerStatus:upstream.status,providerResponse:data},{status:upstream.ok?200:502});
 }catch(error){return NextResponse.json({error:"Unable to reach SMS provider"},{status:502})}
}